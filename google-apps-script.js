// ============================================================
// PHÚC TEA DNA - Google Apps Script Backend
// ============================================================
// HƯỚNG DẪN CÀI ĐẶT:
// 1. Mở Google Sheets mới: https://sheets.google.com → "Trang tính trống"
// 2. Đặt tên: "Phúc Tea DNA Data"
// 3. Ở hàng 1, nhập headers (cột A→N):
//    Timestamp | Họ Tên | SĐT | DNA1 | DNA2 | DNA3 | DNA4 | DNA5 | DNA6 | DNA7 | DNA8 | Điểm TB | Archetype | Trạng thái | Chi tiết
// 4. Vào menu: Tiện ích mở rộng → Apps Script
// 5. Xóa hết code mẫu, paste TOÀN BỘ code bên dưới vào
// 6. Nhấn 💾 Lưu
// 7. Nhấn "Triển khai" → "Triển khai mới"
//    - Loại: "Ứng dụng web"
//    - Thực thi với tư cách: "Tôi" (your Google account)
//    - Ai có quyền truy cập: "Bất kỳ ai"
//    - Nhấn "Triển khai"
// 8. Cho phép quyền truy cập (nhấn "Nâng cao" → "Đi đến..." nếu cần)
// 9. Copy URL triển khai (dạng https://script.google.com/macros/s/xxx/exec)
// 10. Gửi URL đó cho em để cập nhật vào web app
// ============================================================

const SHEET_NAME = 'Sheet1'; // Tên sheet (mặc định)

// ==================== POST: Nhận data từ web app ====================
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    let data;
    if (e.postData) {
      data = JSON.parse(e.postData.contents);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ error: 'No data' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const phone = String(data.phone || '').trim();
    if (!phone) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Missing phone' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Tìm dòng có SĐT này (cột C = cột 3)
    const allData = sheet.getDataRange().getValues();
    let existingRow = -1;
    for (let i = 1; i < allData.length; i++) { // Bỏ qua header (i=0)
      if (String(allData[i][2]).trim() === phone) {
        existingRow = i + 1; // 1-indexed cho Sheet
        break;
      }
    }

    // Parse scores array
    const scores = Array.isArray(data.scores) ? data.scores : [];
    const paddedScores = Array.from({ length: 8 }, (_, i) => {
      const s = parseFloat(scores[i]) || 0;
      return Math.round(s * 100) / 100; // Round to 2 decimals
    });

    const rowData = [
      data.timestamp || new Date().toISOString(),  // A: Timestamp
      data.name || '',                               // B: Họ Tên
      phone,                                         // C: SĐT
      paddedScores[0],                               // D: DNA1
      paddedScores[1],                               // E: DNA2
      paddedScores[2],                               // F: DNA3
      paddedScores[3],                               // G: DNA4
      paddedScores[4],                               // H: DNA5
      paddedScores[5],                               // I: DNA6
      paddedScores[6],                               // J: DNA7
      paddedScores[7],                               // K: DNA8
      parseFloat(data.avgScore) || 0,                // L: Điểm TB
      data.archetype || '',                          // M: Archetype
      data.status || '0/8',                          // N: Trạng thái
      typeof data.answers === 'string' ? data.answers : JSON.stringify(data.answers || {}) // O: Chi tiết
    ];

    if (existingRow > 0) {
      // Update dòng cũ (cùng SĐT)
      sheet.getRange(existingRow, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Thêm dòng mới
      sheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, updated: existingRow > 0 }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== GET: Admin dashboard đọc data ====================
function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) || 'getAll';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return sendJson({ error: 'Sheet not found' });
    }

    if (action === 'getAll') {
      const data = sheet.getDataRange().getValues();
      if (data.length <= 1) {
        return sendJson({ data: [] }); // Chỉ có header, không có data
      }

      const headers = data[0];
      const rows = [];

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const phone = String(row[2]).trim();
        if (!phone) continue; // Skip dòng trống

        // Parse answers JSON
        let answers = {};
        try {
          if (row[14]) answers = JSON.parse(row[14]);
        } catch (e) { }

        rows.push({
          timestamp: row[0] ? new Date(row[0]).toISOString() : '',
          name: row[1] || '',
          phone: phone,
          scores: [
            parseFloat(row[3]) || 0,
            parseFloat(row[4]) || 0,
            parseFloat(row[5]) || 0,
            parseFloat(row[6]) || 0,
            parseFloat(row[7]) || 0,
            parseFloat(row[8]) || 0,
            parseFloat(row[9]) || 0,
            parseFloat(row[10]) || 0
          ],
          avgScore: parseFloat(row[11]) || 0,
          archetype: row[12] || '',
          status: row[13] || '0/8',
          completedDNAs: [], // Tính từ scores
          answers: answers,
          assessmentHistory: []
        });
      }

      // Tính completedDNAs từ scores
      rows.forEach(r => {
        r.completedDNAs = r.scores.reduce((acc, s, idx) => {
          if (s > 0) acc.push(idx);
          return acc;
        }, []);
      });

      return sendJson({ data: rows });
    }

    return sendJson({ error: 'Unknown action' });

  } catch (err) {
    return sendJson({ error: err.message });
  }
}

function sendJson(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
