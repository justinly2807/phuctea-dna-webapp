# HỆ THỐNG ARCHETYPE - PHÚC TEA DNA WEB APP
## 3 Archetype Đối Tác Nhượng Quyền Thành Công

> **Version:** 2.0 - Chuẩn Chủ Phúc Tea
> **Ngày cập nhật:** 2026-03-03
> **Tone:** Mentor đồng hành - Positive, thẳng thắn, tạo động lực hành động
> **Nguồn gốc:** Đúc kết từ nhóm đối tác có doanh thu dẫn đầu 3 năm gần nhất

---

## PHẦN 0: TỔNG QUAN HỆ THỐNG

### Triết lý thiết kế

Hệ thống 3 Archetype "Chuẩn Chủ Phúc Tea" được xây dựng trên nguyên tắc:

1. **Dựa trên thực tế** - 3 archetype được rút ra từ pattern thành công thực sự của đối tác dẫn đầu hệ thống, không phải lý thuyết.
2. **Ghi nhận ĐTNQ thành công** - Mỗi archetype thể hiện một CON ĐƯỜNG thành công riêng, không có con đường nào tốt hơn con đường nào.
3. **Tạo động lực, không tạo áp lực** - Đối tác nhìn thấy hình tượng của mình trong nhóm thành công, không phải điểm số đánh giá.
4. **Muốn share, muốn khoe** - Tên gọi, tagline, hình ảnh đều được thiết kế để đối tác tự hào chia sẻ.
5. **Hành động được ngay** - Mỗi archetype đi kèm hướng dẫn phát huy điểm mạnh và cảnh báo bẫy thường gặp.

### Chuẩn Chủ Phúc Tea là gì?

> **Chuẩn Chủ Phúc Tea** là hình tượng "chủ nhượng quyền xuất sắc" theo chuẩn hệ thống.
> Đúc kết từ nhóm đối tác có doanh thu dẫn đầu 3 năm gần nhất.
> Benchmark DNA: commitment 4.5, strategic 4.2, decisive 4.3, winwin 4.4, communication 4.5, emotional 4.1, customer 4.6, research 4.3.
> Trung bình: 4.36/5.0

### 3 Archetype Chuẩn Chủ:

Trong nhóm đối tác thành công nhất của Phúc Tea, có 3 kiểu "chủ thành công" nổi bật:

| # | Tên | Cluster DNA chính | Từ khóa |
| --- | --- | --- | --- |
| 1 | **Chủ Tấn Công Tăng Trưởng** | Strategic + Decisive + Research | Quyết đoán, cạnh tranh, marketing lớn |
| 2 | **Chủ Hài Hoà Bền Vững** | Commitment + WinWin + Communication | Đồng cảm, ổn định, xây cùng hệ thống |
| 3 | **Chủ Hiếu Khách Hành Động** | Customer + Emotional + Decisive | Khách hàng trung tâm, hành động nhanh |

---

## PHẦN 1: LOGIC PHÂN LOẠI

### 1.1 Chuẩn Chủ Phúc Tea - Benchmark

```javascript
const CHUAN_CHU_PHUC_TEA = {
  commitment: 4.5,
  strategic: 4.2,
  decisive: 4.3,
  winwin: 4.4,
  communication: 4.5,
  emotional: 4.1,
  customer: 4.6,
  research: 4.3
};
// Benchmark trung bình: 4.36
```

### 1.2 DNA Cluster - 3 nhóm DNA tạo nên 3 Archetype

Ba cluster DNA phản ánh ba con đường thành công trong nhượng quyền:

| Cluster | DNA thành phần | Ý nghĩa | Archetype |
| --- | --- | --- | --- |
| **Growth (Tăng trưởng)** | Tư duy Chiến lược (strategic) + Quyết đoán & Hành động (decisive) + Nghiên cứu Thị trường (research) | Khả năng nhìn xa, quyết nhanh, đón đầu thị trường | Chủ Tấn Công Tăng Trưởng |
| **Harmony (Hài hoà)** | Cam kết & Sâu sát (commitment) + Tư duy Win-Win (winwin) + Giao tiếp Chủ động (communication) | Khả năng gắn bó, hợp tác, xây nền bền vững | Chủ Hài Hoà Bền Vững |
| **Customer (Khách hàng)** | Hướng về Khách hàng (customer) + Kiểm soát Cảm xúc (emotional) + Quyết đoán & Hành động (decisive) | Khả năng thấu hiểu khách, hành động nhanh, không đổ lỗi | Chủ Hiếu Khách Hành Động |

> **Lưu ý:** DNA "Decisive" xuất hiện ở cả cluster Growth và Customer — đây là chủ đích, vì quyết đoán là tố chất chung của mọi đối tác thành công.

```javascript
// Tính điểm cluster
function calculateClusters(scores) {
  const growthScore = (scores.strategic + scores.decisive + scores.research) / 3;
  const harmonyScore = (scores.commitment + scores.winwin + scores.communication) / 3;
  const customerScore = (scores.customer + scores.emotional + scores.decisive) / 3;
  return { growthScore, harmonyScore, customerScore };
}
```

### 1.3 Algorithm Phân loại Archetype

```javascript
function getArchetype(scores) {
  const growthScore = (scores.strategic + scores.decisive + scores.research) / 3;
  const harmonyScore = (scores.commitment + scores.winwin + scores.communication) / 3;
  const customerScore = (scores.customer + scores.emotional + scores.decisive) / 3;

  const clusterScores = {
    'tan-cong-tang-truong': growthScore,
    'hai-hoa-ben-vung': harmonyScore,
    'hieu-khach-hanh-dong': customerScore
  };

  // Sắp xếp cluster từ cao đến thấp
  const sorted = Object.entries(clusterScores).sort((a, b) => b[1] - a[1]);

  // Kiểm tra tie-breaking nếu 2 cluster quá sát nhau (< 0.2 điểm)
  if (sorted[0][1] - sorted[1][1] < 0.2) {
    // Ưu tiên theo DNA đơn lẻ cao nhất trong các cluster liên quan
    return handleTieBreak(scores, sorted[0], sorted[1]);
  }

  return ARCHETYPE_DATA[sorted[0][0]];
}

function handleTieBreak(scores, first, second) {
  // Tìm DNA cao nhất trong mỗi cluster để tie-break
  const clusterDNAs = {
    'tan-cong-tang-truong': [scores.strategic, scores.decisive, scores.research],
    'hai-hoa-ben-vung': [scores.commitment, scores.winwin, scores.communication],
    'hieu-khach-hanh-dong': [scores.customer, scores.emotional, scores.decisive]
  };

  const maxFirst = Math.max(...clusterDNAs[first[0]]);
  const maxSecond = Math.max(...clusterDNAs[second[0]]);

  if (maxFirst >= maxSecond) {
    return ARCHETYPE_DATA[first[0]];
  }
  return ARCHETYPE_DATA[second[0]];
}
```

### 1.4 Tỷ lệ phân bổ kỳ vọng

Dựa trên phân phối tự nhiên của đối tác:

| Archetype | Tỷ lệ dự kiến | Ghi chú |
| --- | --- | --- |
| Chủ Tấn Công Tăng Trưởng | 30-35% | Đối tác thiên về chiến lược & tốc độ |
| Chủ Hài Hoà Bền Vững | 35-40% | Đối tác thiên về ổn định & quan hệ |
| Chủ Hiếu Khách Hành Động | 25-35% | Đối tác thiên về khách hàng & thực thi |

---

## PHẦN 2: 3 ARCHETYPE CHI TIẾT

---

### ARCHETYPE 1: CHỦ TẤN CÔNG TĂNG TRƯỞNG
**English:** Growth Attacker
**Tagline:** "Bạn nhìn thấy cơ hội trước người khác — và dám chạy nhanh hơn."

**Mô tả tổng quan:**
Bạn thuộc nhóm đối tác Chuẩn Chủ có tư duy tăng trưởng mạnh mẽ. Bạn không chỉ vận hành — bạn chinh phục. Mỗi ngày bạn đều tự hỏi: "Làm sao để lớn hơn, nhanh hơn, tốt hơn?" Bạn nghiên cứu đối thủ, bạn đón đầu xu hướng, bạn dám quyết khi người khác còn lưỡng lự. Phúc Tea ghi nhận: đây là kiểu đối tác thường dẫn đầu về tốc độ tăng trưởng doanh thu.

**DNA Cluster đặc trưng:**
- **Tư duy Chiến lược (strategic) ★** — Bạn nhìn cửa hàng như một bài toán kinh doanh. Bạn biết khách đến từ đâu, đối thủ đang làm gì, và cần đầu tư gì tiếp theo. Bạn không chạy theo doanh thu từng ngày — bạn nghĩ theo quý, theo năm.
- **Quyết đoán & Hành động (decisive) ★** — Khi thấy cơ hội, bạn không chờ. Chương trình marketing mới? Triển khai ngay. Đối thủ giảm giá? Phản ứng trong ngày. Bạn tin vào nguyên tắc: "70% thông tin là đủ để quyết."
- **Nghiên cứu Thị trường (research) ★** — Bạn chủ động ghé quán đối thủ, theo dõi trend, đọc review. Bạn không đợi thông tin đến — bạn đi tìm.

**Điểm mạnh cốt lõi:**
- Tốc độ tăng trưởng doanh thu thường thuộc top hệ thống — nhờ kết hợp tư duy chiến lược và hành động nhanh.
- Luôn đi trước đối thủ 1-2 bước về marketing, sản phẩm mới, chương trình khuyến mãi.
- Có khả năng "đọc" thị trường tốt — biết khi nào đẩy mạnh, khi nào co lại.
- Thường là người đầu tiên triển khai chương trình mới từ hệ thống Phúc Tea.

**⚠️ Bẫy thường gặp — CẦN CẢNH GIÁC:**
- **Cảm xúc khi áp lực cao:** Khi doanh thu không như kỳ vọng hoặc gặp sự cố bất ngờ, bạn dễ phản ứng nóng — nói mạnh với nhân viên, quyết quá gấp mà chưa suy xét kỹ. Nhân viên sợ nhưng không nói thẳng → vấn đề chìm xuống thay vì được giải quyết.
- **Bảo thủ ngầm:** Vì quen với cách mình đã thành công, bạn có xu hướng tin rằng cách mình luôn đúng. Khi hệ thống đưa hướng đi mới hoặc chính sách thay đổi, bạn dễ phản ứng bằng cách "chờ xem đã" thay vì hợp tác ngay. Điều này có thể khiến bạn bỏ lỡ cơ hội mà chính mình giỏi nhất là nắm bắt.
- **Đội ngũ chạy theo nhưng không kịp:** Tốc độ của bạn đôi khi bỏ lại nhân viên phía sau. Họ thực hiện nhưng không hiểu tại sao — dẫn đến chất lượng không đều khi bạn không có mặt.

**Rủi ro nếu không điều chỉnh:**
Cửa hàng tăng trưởng nhanh nhưng không bền — nhân viên kiệt sức, chất lượng dao động, và bạn tự mình gánh quá nhiều vì không ai theo kịp nhịp.

**Lời khuyên từ Mentor:**
Bạn đã có "chân ga" mạnh — bây giờ hãy xây "hệ thống phanh" tốt. Dành 10 phút mỗi tối tự hỏi: "Hôm nay mình quyết có nhanh quá không? Nhân viên có hiểu mình đang làm gì không?" Tăng trưởng bền vững = tốc độ × sự đồng thuận của đội ngũ.

**3 việc làm ngay trong tuần này:**
1. **Chọn 1 quyết định gần đây mà bạn quyết "nóng"** — nhìn lại: nếu chờ thêm 1 ngày, kết quả có khác không? Ghi ra bài học. (Hôm nay)
2. **Họp nhanh 15 phút với nhân viên** — chia sẻ kế hoạch tuần này: "Tuần này mình sẽ làm ABC, em hỗ trợ bằng cách XYZ." Cho họ HIỂU thay vì chỉ NGHE. (Thứ 2-3)
3. **Tự uống thử sản phẩm quán mình** — khi bạn quá tập trung vào chiến lược, đôi khi chất lượng "lặng lẽ" tụt. Check lại bằng mắt khách hàng. (Thứ 4-5)

**Câu chuyện Chuẩn Chủ:**
Anh Minh — đối tác quản lý 3 cửa hàng ở TP.HCM — là Chủ Tấn Công Tăng Trưởng điển hình. Doanh thu anh luôn top 5 hệ thống. Nhưng anh cũng thừa nhận: "Có lần mình quyết đổi layout quán trong 1 ngày mà không nói team. Nhân viên bối rối cả tuần. Từ đó mình học: nhanh thì nhanh, nhưng phải kéo team theo kịp."

---

### ARCHETYPE 2: CHỦ HÀI HOÀ BỀN VỮNG
**English:** Sustainable Harmony
**Tagline:** "Bạn xây từ gốc, từ người, từ hệ thống — và mọi thứ vững từ trong ra."

**Mô tả tổng quan:**
Bạn thuộc nhóm đối tác Chuẩn Chủ có sức mạnh bền bỉ nhất. Bạn không cần là người nhanh nhất — bạn là người ở lại lâu nhất và ổn định nhất. DNA của bạn thể hiện sự cam kết sâu sắc, tinh thần hợp tác đích thực với hệ thống, và khả năng xây dựng đội ngũ gắn bó. Phúc Tea ghi nhận: đây là kiểu đối tác có tỷ lệ giữ chân nhân viên và khách hàng trung thành cao nhất.

**DNA Cluster đặc trưng:**
- **Cam kết & Sâu sát (commitment) ★** — Bạn có mặt. Mỗi ngày, mỗi ca, bạn biết chuyện gì đang xảy ra ở cửa hàng. Không phải vì bạn "ôm đồm" — mà vì bạn quan tâm thật sự. Nhân viên cảm nhận được điều đó, và họ cũng cam kết theo.
- **Tư duy Win-Win (winwin) ★** — Bạn hiểu nhượng quyền là mối quan hệ hai chiều. Bạn không đối đầu khi có chính sách mới — bạn tìm cách làm cho nó hoạt động tốt nhất cho mình. Thái độ này giúp bạn nhận được nhiều hỗ trợ nhất từ hệ thống.
- **Giao tiếp Chủ động (communication) ★** — Bạn chủ động chia sẻ, báo cáo, hỏi thăm. Team hỗ trợ luôn biết tình hình cửa hàng bạn — nên khi bạn cần giúp, họ hiểu bối cảnh ngay và hỗ trợ nhanh.

**Điểm mạnh cốt lõi:**
- Tỷ lệ giữ chân nhân viên cao nhất — nhân viên cảm thấy được quan tâm và tôn trọng, ít nghỉ việc.
- Mối quan hệ tốt nhất với hệ thống — luôn được ưu tiên hỗ trợ khi cần.
- Cửa hàng vận hành ổn định, ít "tụt" doanh thu đột ngột — vì nền tảng vững.
- Khách hàng quay lại nhiều vì cảm nhận được sự ấm áp và nhất quán.

**⚠️ Bẫy thường gặp — CẦN CẢNH GIÁC:**
- **"Ôm" quá sâu vào vận hành:** Vì quan tâm mọi thứ, bạn dễ bị cuốn vào chi tiết hàng ngày — pha chế, xếp ca, xử lý nhân viên — mà quên dành thời gian suy nghĩ chiến lược: "Tháng tới mình cần làm gì khác? Đối thủ đang làm gì?"
- **Rủi ro kiệt sức (burnout):** Sự cam kết của bạn là tuyệt vời, nhưng nếu không biết "dừng" và phân quyền, bạn sẽ cảm thấy mệt mỏi tích lũy. Đặc biệt khi mở rộng cửa hàng — bạn không thể "có mặt" ở 2-3 nơi cùng lúc.
- **Ngại thay đổi:** Vì mọi thứ đang ổn, bạn có xu hướng "giữ nguyên" thay vì thử cái mới. Marketing mới? "Để xem đã." Sản phẩm mới? "Từ từ, quán mình đang ổn." Sự thận trọng đôi khi khiến bạn bỏ lỡ cơ hội tăng trưởng.

**Rủi ro nếu không điều chỉnh:**
Cửa hàng ổn định nhưng "đi ngang" — doanh thu không giảm nhưng cũng không tăng, trong khi đối thủ xung quanh liên tục đổi mới và thu hút khách mới.

**Lời khuyên từ Mentor:**
Sự bền vững của bạn là tài sản lớn nhất — nhiều đối tác khác ước có được. Bây giờ hãy dành mỗi Chủ Nhật 30 phút để hỏi: "Tuần này mình có thử điều gì MỚI không?" Chỉ 1 điều mới mỗi tuần — đủ để giữ cửa hàng luôn tươi mới mà không phá vỡ sự ổn định bạn đã xây.

**3 việc làm ngay trong tuần này:**
1. **Xác định 1 việc bạn đang tự làm mà có thể giao cho nhân viên** — giao hoàn toàn, quan sát 3 ngày, chỉ hướng dẫn khi cần. Mục đích: bắt đầu ủy quyền. (Thứ 2-4)
2. **Ghé 1 quán đối thủ gần nhất** — mua 1 ly, ngồi 15 phút, ghi lại 2 điều họ làm hay hơn mình. Mục đích: mở rộng góc nhìn. (Thứ 5)
3. **Gửi tin nhắn cho team hỗ trợ** hỏi: "Sắp tới có chương trình marketing nào mới không? Em muốn chuẩn bị trước." Mục đích: chủ động đón sóng thay vì chờ sóng đến. (Thứ 6)

**Câu chuyện Chuẩn Chủ:**
Chị Lan — đối tác ở Đà Nẵng — là Chủ Hài Hoà Bền Vững điển hình. Cửa hàng chị 2 năm liền không mất nhân viên nào. Khách quen gọi chị là "chị chủ dễ thương." Nhưng chị thừa nhận: "8 tháng đầu, doanh thu đi ngang vì mình ngại thử marketing mới. Từ khi mình dám chạy 1 chương trình combo nhỏ, doanh thu tăng 18% mà vẫn giữ được sự ổn định."

---

### ARCHETYPE 3: CHỦ HIẾU KHÁCH HÀNH ĐỘNG
**English:** Customer-Centric Action
**Tagline:** "Bạn đặt khách hàng ở trung tâm mọi quyết định — và hành động ngay để họ hài lòng."

**Mô tả tổng quan:**
Bạn thuộc nhóm đối tác Chuẩn Chủ có DNA "hướng về khách hàng" mạnh nhất. Với bạn, mọi thứ bắt đầu và kết thúc ở khách hàng: ly trà có ngon không? Khách có vui không? Có quay lại không? Và khi thấy vấn đề, bạn không đổ lỗi — bạn SỬA NGAY. Phúc Tea ghi nhận: đây là kiểu đối tác có review khách hàng tốt nhất và tỷ lệ khách quay lại cao nhất.

**DNA Cluster đặc trưng:**
- **Hướng về Khách hàng (customer) ★** — Bạn nhớ tên khách quen, biết họ thích gì, và sẵn sàng xử lý mọi tình huống để khách hài lòng. Cửa hàng bạn luôn có không khí ấm áp — vì bạn đặt trải nghiệm khách hàng lên ưu tiên số 1.
- **Kiểm soát Cảm xúc (emotional) ★** — Khi gặp khách khó tính hoặc sự cố bất ngờ, bạn giữ bình tĩnh. Bạn không đổ lỗi cho nhân viên trước mặt khách, không phản ứng nóng. Sự bình tĩnh này tạo ra không khí yên tâm cho cả đội ngũ và khách hàng.
- **Quyết đoán & Hành động (decisive) ★** — Khách phàn nàn? Sửa ngay. Ly không ngon? Pha lại. Quầy dơ? Dọn liền. Bạn không để vấn đề "chết trên bàn" — hành động nhanh là bản năng của bạn.

**Điểm mạnh cốt lõi:**
- Review khách hàng (Google Maps, app giao hàng) thường thuộc top hệ thống — vì khách cảm nhận được sự quan tâm thật sự.
- Tỷ lệ khách quay lại cao nhất — khách đến không chỉ vì trà ngon, mà vì cảm giác "được chăm sóc."
- Nhân viên ít stress vì có quy trình xử lý tình huống rõ ràng và chủ quán bình tĩnh.
- Khi có sự cố (hàng hỏng, khách phàn nàn), phản ứng nhanh và chuyên nghiệp — giảm thiểu thiệt hại.

**⚠️ Bẫy thường gặp — CẦN CẢNH GIÁC:**
- **FOMO — Sợ bỏ lỡ:** Vì muốn khách hài lòng 100%, bạn dễ rơi vào bẫy "làm tất cả cho khách" — thêm topping, giảm giá, phục vụ quá mức — mà quên tính toán lợi nhuận. Hiếu khách ≠ hy sinh lợi nhuận.
- **Thiếu framework đo lường:** Bạn biết khách vui nhưng có đo lường không? Bao nhiêu khách quay lại? Chương trình nào hiệu quả? Nếu không có số liệu, bạn chạy theo cảm tính — và cảm tính đôi khi sai.
- **Quá tập trung vào hiện tại:** Bạn giỏi xử lý "ngày hôm nay" nhưng đôi khi quên hỏi: "3 tháng nữa cửa hàng mình cần gì?" Khách hàng ngày mai có thể khác khách hàng hôm nay.

**Rủi ro nếu không điều chỉnh:**
Khách hàng yêu quý cửa hàng nhưng lợi nhuận mỏng — vì chi quá nhiều cho trải nghiệm mà không đo lường ROI. Và khi thị trường thay đổi, bạn phản ứng chậm vì thiếu tư duy chiến lược dài hạn.

**Lời khuyên từ Mentor:**
DNA hiếu khách của bạn là "vũ khí bí mật" — nhiều đối tác khác phải rất cố gắng mới có được sự tự nhiên trong cách bạn chăm sóc khách. Bây giờ hãy thêm "con mắt số": Mỗi tuần, ghi lại 3 con số — doanh thu trung bình/ngày, số khách quay lại (ước tính), và chi phí marketing. Khi kết hợp trái tim + số liệu, bạn sẽ không ai cản nổi.

**3 việc làm ngay trong tuần này:**
1. **Bắt đầu ghi "Sổ khách quay lại"** — Mỗi ngày ghi lại: có bao nhiêu khách mà nhân viên nhận ra "đã đến trước đó." Chỉ cần ước tính — sau 1 tuần bạn sẽ có con số cơ bản. (Từ ngày mai)
2. **Tính lại biên lợi nhuận best-seller** — Mở POS, lấy doanh thu best-seller. Trừ chi phí nguyên liệu + nhân công. Lợi nhuận/ly là bao nhiêu? Nếu dưới 40%, cần xem lại. (Thứ 3-4)
3. **Dành 30 phút Chủ Nhật lên kế hoạch tuần** — Không cần phức tạp: "Tuần này mình sẽ thử 1 điều mới [gì?], tập trung vào [khung giờ/nhóm khách nào?], và đo kết quả bằng [gì?]" (Chủ Nhật)

**Câu chuyện Chuẩn Chủ:**
Chị Hoa — đối tác ở Bình Dương — là Chủ Hiếu Khách Hành Động điển hình. Review Google Maps quán chị 4.8 sao, khách viết: "Chị chủ nhớ tên mình, luôn hỏi thăm." Nhưng chị thừa nhận: "Có thời điểm mình tặng topping quá nhiều mà không tính, cuối tháng lỗ. Từ khi mình bắt đầu ghi chép chi phí, mình vẫn hiếu khách nhưng có chừng mực hơn — và lợi nhuận tăng 15%."

---

## PHẦN 3: SHARE CARD CONTENT

### 3.1 Chủ Tấn Công Tăng Trưởng - Share Card

```
+------------------------------------------+
|  [Gradient: #1a5c38 -> #2d7a50]          |
|                                          |
|  Icon: Rocket (Tên lửa)                 |
|                                          |
|  CHỦ TẤN CÔNG TĂNG TRƯỞNG              |
|  ________________________                |
|                                          |
|  "Bạn nhìn thấy cơ hội trước           |
|   người khác — và dám chạy              |
|   nhanh hơn."                           |
|                                          |
|  DNA Score: [X.X] / 5.0                  |
|  Chuẩn Chủ Phúc Tea                     |
|                                          |
|  ________ PHÚC TEA DNA ________          |
|                                          |
+------------------------------------------+
```

**Text hiển thị:**
```
PHÚC TEA DNA — CHỦ TẤN CÔNG TĂNG TRƯỞNG
"Bạn nhìn thấy cơ hội trước người khác — và dám chạy nhanh hơn."
DNA Score: [X.X]/5.0
#PhucTeaDNA #ChuanChuPhucTea #TanCongTangTruong
```

**Màu sắc:**
- Background: Gradient xanh lá đậm (#1a5c38 → #2d7a50)
- Text: Trắng (#FFFFFF)
- Accent: Vàng gold (#c9a84c)
- Badge: Gold viền trắng

**Icon đại diện:** Tên lửa (Rocket) — biểu tượng của tốc độ, tăng trưởng, đón đầu.

**Hashtag:** `#PhucTeaDNA` `#ChuanChuPhucTea` `#TanCongTangTruong` `#GrowthAttacker`

---

### 3.2 Chủ Hài Hoà Bền Vững - Share Card

```
+------------------------------------------+
|  [Gradient: #2d7a50 -> #3d9465]          |
|                                          |
|  Icon: Tree (Cây lớn)                   |
|                                          |
|  CHỦ HÀI HOÀ BỀN VỮNG                  |
|  ________________________                |
|                                          |
|  "Bạn xây từ gốc, từ người,            |
|   từ hệ thống — và mọi thứ             |
|   vững từ trong ra."                    |
|                                          |
|  DNA Score: [X.X] / 5.0                  |
|  Chuẩn Chủ Phúc Tea                     |
|                                          |
|  ________ PHÚC TEA DNA ________          |
|                                          |
+------------------------------------------+
```

**Text hiển thị:**
```
PHÚC TEA DNA — CHỦ HÀI HOÀ BỀN VỮNG
"Bạn xây từ gốc, từ người, từ hệ thống — và mọi thứ vững từ trong ra."
DNA Score: [X.X]/5.0
#PhucTeaDNA #ChuanChuPhucTea #HaiHoaBenVung
```

**Màu sắc:**
- Background: Gradient xanh lá trung (#2d7a50 → #3d9465)
- Text: Trắng (#FFFFFF)
- Accent: Vàng gold sáng (#f0d98a)
- Badge: Vàng gold

**Icon đại diện:** Cây lớn (Tree) — biểu tượng của sự bền vững, rễ sâu, tán rộng.

**Hashtag:** `#PhucTeaDNA` `#ChuanChuPhucTea` `#HaiHoaBenVung` `#SustainableHarmony`

---

### 3.3 Chủ Hiếu Khách Hành Động - Share Card

```
+------------------------------------------+
|  [Gradient: #c9a84c -> #dfc06a]          |
|                                          |
|  Icon: Heart-handshake (Bắt tay + Tim)  |
|                                          |
|  CHỦ HIẾU KHÁCH HÀNH ĐỘNG              |
|  ________________________                |
|                                          |
|  "Bạn đặt khách hàng ở trung tâm      |
|   mọi quyết định — và hành động        |
|   ngay để họ hài lòng."                |
|                                          |
|  DNA Score: [X.X] / 5.0                  |
|  Chuẩn Chủ Phúc Tea                     |
|                                          |
|  ________ PHÚC TEA DNA ________          |
|                                          |
+------------------------------------------+
```

**Text hiển thị:**
```
PHÚC TEA DNA — CHỦ HIẾU KHÁCH HÀNH ĐỘNG
"Bạn đặt khách hàng ở trung tâm mọi quyết định — và hành động ngay để họ hài lòng."
DNA Score: [X.X]/5.0
#PhucTeaDNA #ChuanChuPhucTea #HieuKhachHanhDong
```

**Màu sắc:**
- Background: Gradient vàng gold (#c9a84c → #dfc06a)
- Text: Xanh lá đậm (#1a5c38)
- Accent: Trắng (#FFFFFF)
- Badge: Xanh lá trắng

**Icon đại diện:** Bắt tay + Tim (Heart-handshake) — biểu tượng của sự chăm sóc chân thành và hành động.

**Hashtag:** `#PhucTeaDNA` `#ChuanChuPhucTea` `#HieuKhachHanhDong` `#CustomerCentricAction`

---

### 3.4 Thiết kế chung cho Share Card

**Kích thước:** 1080 x 1080px (Instagram/Facebook) hoặc 1080 x 1920px (Story)

**Font:** Be Vietnam Pro - Bold cho tên archetype, Medium cho tagline

**Các yếu tố chung:**
- Logo Phúc Tea (góc trên trái)
- Dòng chữ "Chuẩn Chủ Phúc Tea" (dưới tên archetype)
- Dòng nhỏ: "Đúc kết từ nhóm đối tác dẫn đầu doanh thu 3 năm gần nhất"
- QR code link tới web app (góc dưới phải)
- Dòng chữ "Khám phá DNA của bạn tại phuctea-dna.app" (dưới cùng)
- Watermark nhẹ: "Phúc Tea DNA Assessment"

---

## PHẦN 4: SO SÁNH 3 ARCHETYPE

### 4.1 Bảng so sánh nhanh

| Tiêu chí | Chủ Tấn Công Tăng Trưởng | Chủ Hài Hoà Bền Vững | Chủ Hiếu Khách Hành Động |
| --- | --- | --- | --- |
| **Cluster DNA chính** | Strategic + Decisive + Research | Commitment + WinWin + Communication | Customer + Emotional + Decisive |
| **Điểm mạnh lớn nhất** | Tốc độ tăng trưởng | Sự ổn định bền vững | Trải nghiệm khách hàng |
| **Bẫy nguy hiểm nhất** | Nóng vội, bảo thủ ngầm | Kiệt sức, ngại đổi mới | FOMO, thiếu đo lường |
| **Câu hỏi định hướng** | "Làm sao tăng trưởng nhanh hơn?" | "Làm sao vững hơn nữa?" | "Làm sao khách vui hơn nữa?" |
| **Ưu tiên #1 tuần này** | Chia sẻ kế hoạch với team | Thử 1 điều mới | Ghi chép số liệu |
| **Metric nổi bật** | Tốc độ tăng DT | Tỷ lệ giữ NV | Review khách hàng |
| **Màu sắc** | Xanh đậm #1a5c38 | Xanh trung #2d7a50 | Vàng gold #c9a84c |
| **Icon** | Tên lửa 🚀 | Cây lớn 🌳 | Bắt tay ❤️🤝 |

### 4.2 Ma trận 3 Archetype

```
                    CHIẾN LƯỢC
                        |
          Chủ Tấn Công  |
          Tăng Trưởng   |
                        |
   ỔN ĐỊNH ─────────────+────────────── HÀNH ĐỘNG
                        |
          Chủ Hài Hoà   |    Chủ Hiếu Khách
          Bền Vững      |    Hành Động
                        |
                   KHÁCH HÀNG
```

### 4.3 Vị trí so với Chuẩn Chủ Phúc Tea

```
Chuẩn Chủ Phúc Tea: |============================| 4.36/5.0
(Đúc kết từ nhóm đối tác doanh thu dẫn đầu 3 năm gần nhất)

Mỗi archetype thể hiện MỘT CON ĐƯỜNG đến Chuẩn Chủ:
• Tấn Công Tăng Trưởng → mạnh ở cluster Growth (strategic + decisive + research)
• Hài Hoà Bền Vững → mạnh ở cluster Harmony (commitment + winwin + communication)
• Hiếu Khách Hành Động → mạnh ở cluster Customer (customer + emotional + decisive)

Không có con đường nào "tốt hơn" — chỉ có con đường phù hợp với BẠN.
```

---

## PHẦN 5: LỘ TRÌNH PHÁT TRIỂN

### 5.1 Tổng quan — Mỗi Archetype phát triển theo hướng riêng

Không giống hệ thống "thăng cấp" tuyến tính, 3 Archetype phát triển theo hướng **bổ sung điểm mù**:

```
Chủ Tấn Công Tăng Trưởng
  → Phát triển thêm: Emotional (kiểm soát cảm xúc) + Commitment (sâu sát đội ngũ)
  → Mục tiêu: Tăng trưởng BỀN VỮNG, không chỉ nhanh

Chủ Hài Hoà Bền Vững
  → Phát triển thêm: Strategic (tư duy chiến lược) + Research (nghiên cứu thị trường)
  → Mục tiêu: Ổn định VÀ TĂNG TRƯỞNG, không chỉ giữ

Chủ Hiếu Khách Hành Động
  → Phát triển thêm: Strategic (tư duy chiến lược) + Research (đo lường & phân tích)
  → Mục tiêu: Hiếu khách CÓ CHIẾN LƯỢC, không chỉ theo cảm tính
```

### 5.2 Hành động phát triển cho từng Archetype

#### Chủ Tấn Công Tăng Trưởng → Phát triển cân bằng

| # | Hành động | Thời gian | DNA bổ sung |
| --- | --- | --- | --- |
| 1 | Tập quy tắc 10 phút: khi nóng, đặt xuống, thở, đợi 10 phút rồi phản ứng | Hàng ngày | Emotional |
| 2 | Có mặt tại cửa hàng ít nhất 4 tiếng/ngày vào khung giờ cao điểm | Hàng ngày | Commitment |
| 3 | Mỗi tuần chia sẻ 1 kế hoạch với nhân viên: "Tuần này mình sẽ..." | Hàng tuần | Communication |
| 4 | Gọi điện hỏi team hỗ trợ trước khi ra quyết định lớn | Khi cần | WinWin |
| 5 | Tự uống thử sản phẩm mỗi tuần — giữ chất lượng khi tập trung chiến lược | Hàng tuần | Customer |

#### Chủ Hài Hoà Bền Vững → Phát triển tăng trưởng

| # | Hành động | Thời gian | DNA bổ sung |
| --- | --- | --- | --- |
| 1 | Mỗi Chủ Nhật dành 30 phút review tuần + lên 3 ưu tiên cho tuần mới | Hàng tuần | Strategic |
| 2 | Mỗi tháng ghé 2 quán đối thủ, ghi lại 3 điều học được | Hàng tháng | Research |
| 3 | Thử 1 chương trình marketing nhỏ mỗi tháng — chấp nhận thất bại, miễn là THỬ | Hàng tháng | Decisive |
| 4 | Giao 1 nhiệm vụ cho nhân viên mỗi tuần — quan sát nhưng không can thiệp | Hàng tuần | Commitment (ủy quyền) |
| 5 | Đặt mục tiêu doanh thu tháng — viết ra giấy, dán ở nơi dễ thấy | Hàng tháng | Strategic |

#### Chủ Hiếu Khách Hành Động → Phát triển chiến lược

| # | Hành động | Thời gian | DNA bổ sung |
| --- | --- | --- | --- |
| 1 | Ghi chép 3 con số mỗi ngày: doanh thu, số ly, khách quay lại (ước tính) | Hàng ngày | Research |
| 2 | Mỗi tuần phân tích: chương trình nào hiệu quả, chương trình nào không? Dựa trên SỐ LIỆU | Hàng tuần | Strategic |
| 3 | Đặt ngân sách tối đa cho "hiếu khách" mỗi tháng — không vượt quá | Hàng tháng | Strategic |
| 4 | Lên kế hoạch 3 tháng: khách hàng mục tiêu là ai? Sản phẩm chủ lực là gì? | Hàng quý | Strategic |
| 5 | Mỗi tháng ghé 1 quán đối thủ — xem họ chăm sóc khách bằng cách nào | Hàng tháng | Research |

### 5.3 Khi nào nên Re-test?

| Trường hợp | Thời điểm re-test | Lý do |
| --- | --- | --- |
| Vừa hoàn thành test lần đầu | Sau 8-12 tuần | Đủ thời gian để hành động tạo ra thay đổi |
| Đang phát triển điểm mù | Sau 6-8 tuần | Kiểm tra tiến bộ và điều chỉnh |
| Vừa trải qua thay đổi lớn | Sau 4 tuần ổn định | Đánh giá lại DNA trong bối cảnh mới |
| Đang ổn định và phát triển tốt | Mỗi 6 tháng | Duy trì và tinh chỉnh |

**Gợi ý hiển thị trong app:**
```
"Bạn đã làm bài test cách đây [X] tuần.
Bây giờ có thể là thời điểm tốt để khám phá lại DNA và xem mình đã tiến bộ thế nào.
[Làm lại bài test]"
```

### 5.4 Nguyên tắc quan trọng

1. **Không có archetype "tốt hơn."** Cả 3 đều là con đường thành công — chỉ khác cách đi.
2. **Phát triển = bổ sung, không phải thay đổi.** Bạn không cần "bỏ" kiểu hiện tại — chỉ cần THÊM những DNA còn thiếu.
3. **Chuẩn Chủ = cân bằng.** Đối tác Chuẩn Chủ Phúc Tea không xuất sắc ở 1 mặt — họ tốt ĐỀU ở nhiều mặt. Benchmark dao động 4.1-4.6, không phải ai cũng 5.0.
4. **Mỗi người có nhịp khác nhau.** Quan trọng là hướng đi, không phải tốc độ.
5. **Re-test nên tự nguyện.** Không ép, không tạo áp lực. Khi đối tác sẵn sàng, họ sẽ tự muốn làm lại.

---

## PHẦN 6: IMPLEMENTATION NOTES (Dành cho dev)

### 6.1 Data structure

```javascript
const ARCHETYPE_DATA = {
  'tan-cong-tang-truong': {
    id: 'tan-cong-tang-truong',
    name: 'Chủ Tấn Công Tăng Trưởng',
    nameEn: 'Growth Attacker',
    tagline: 'Bạn nhìn thấy cơ hội trước người khác — và dám chạy nhanh hơn.',
    icon: 'rocket',
    emoji: '🚀',
    color: {
      primary: '#1a5c38',
      gradient: ['#1a5c38', '#2d7a50'],
      text: '#FFFFFF',
      accent: '#c9a84c'
    },
    cluster: ['strategic', 'decisive', 'research'],
    hashtags: ['#PhucTeaDNA', '#ChuanChuPhucTea', '#TanCongTangTruong', '#GrowthAttacker']
  },
  'hai-hoa-ben-vung': {
    id: 'hai-hoa-ben-vung',
    name: 'Chủ Hài Hoà Bền Vững',
    nameEn: 'Sustainable Harmony',
    tagline: 'Bạn xây từ gốc, từ người, từ hệ thống — và mọi thứ vững từ trong ra.',
    icon: 'tree',
    emoji: '🌳',
    color: {
      primary: '#2d7a50',
      gradient: ['#2d7a50', '#3d9465'],
      text: '#FFFFFF',
      accent: '#f0d98a'
    },
    cluster: ['commitment', 'winwin', 'communication'],
    hashtags: ['#PhucTeaDNA', '#ChuanChuPhucTea', '#HaiHoaBenVung', '#SustainableHarmony']
  },
  'hieu-khach-hanh-dong': {
    id: 'hieu-khach-hanh-dong',
    name: 'Chủ Hiếu Khách Hành Động',
    nameEn: 'Customer-Centric Action',
    tagline: 'Bạn đặt khách hàng ở trung tâm mọi quyết định — và hành động ngay để họ hài lòng.',
    icon: 'heart-handshake',
    emoji: '❤️🤝',
    color: {
      primary: '#c9a84c',
      gradient: ['#c9a84c', '#dfc06a'],
      text: '#1a5c38',
      accent: '#FFFFFF'
    },
    cluster: ['customer', 'emotional', 'decisive'],
    hashtags: ['#PhucTeaDNA', '#ChuanChuPhucTea', '#HieuKhachHanhDong', '#CustomerCentricAction']
  }
};

const CHUAN_CHU_PHUC_TEA = {
  commitment: 4.5,
  strategic: 4.2,
  decisive: 4.3,
  winwin: 4.4,
  communication: 4.5,
  emotional: 4.1,
  customer: 4.6,
  research: 4.3
};
```

### 6.2 Classification function (production)

```javascript
function getArchetype(scores) {
  // Tính điểm cluster
  const growthScore = (scores.strategic + scores.decisive + scores.research) / 3;
  const harmonyScore = (scores.commitment + scores.winwin + scores.communication) / 3;
  const customerScore = (scores.customer + scores.emotional + scores.decisive) / 3;

  const clusterScores = {
    'tan-cong-tang-truong': growthScore,
    'hai-hoa-ben-vung': harmonyScore,
    'hieu-khach-hanh-dong': customerScore
  };

  // Sắp xếp cluster từ cao đến thấp
  const sorted = Object.entries(clusterScores).sort((a, b) => b[1] - a[1]);

  // Tie-breaking: nếu top 2 cluster chênh < 0.2 điểm
  if (sorted[0][1] - sorted[1][1] < 0.2) {
    // Tìm DNA đơn lẻ cao nhất trong mỗi cluster
    const clusterDNAs = {
      'tan-cong-tang-truong': [scores.strategic, scores.decisive, scores.research],
      'hai-hoa-ben-vung': [scores.commitment, scores.winwin, scores.communication],
      'hieu-khach-hanh-dong': [scores.customer, scores.emotional, scores.decisive]
    };
    const maxFirst = Math.max(...clusterDNAs[sorted[0][0]]);
    const maxSecond = Math.max(...clusterDNAs[sorted[1][0]]);

    if (maxFirst >= maxSecond) {
      return ARCHETYPE_DATA[sorted[0][0]];
    }
    return ARCHETYPE_DATA[sorted[1][0]];
  }

  return ARCHETYPE_DATA[sorted[0][0]];
}
```

### 6.3 Share Card generation

```javascript
function generateShareCardText(archetype, score, userName) {
  return {
    title: `PHÚC TEA DNA — ${archetype.name.toUpperCase()}`,
    subtitle: 'Chuẩn Chủ Phúc Tea',
    tagline: archetype.tagline,
    score: `DNA Score: ${score.toFixed(1)}/5.0`,
    user: userName,
    hashtags: archetype.hashtags.join(' '),
    shareText: `Tôi vừa khám phá DNA Chuẩn Chủ Phúc Tea! Tôi là "${archetype.name}" — ${archetype.tagline} ${archetype.hashtags.join(' ')}`
  };
}
```

### 6.4 Percentile estimation

```javascript
// Ước tính vị trí trong hệ thống
function estimatePercentile(avg) {
  if (avg >= 4.5) return 5;
  if (avg >= 4.2) return 10;
  if (avg >= 4.0) return 15;
  if (avg >= 3.8) return 25;
  if (avg >= 3.5) return 40;
  if (avg >= 3.2) return 55;
  if (avg >= 2.8) return 70;
  if (avg >= 2.5) return 85;
  return 95;
}
```

---

## PHẦN 7: CHECKLIST TRIỂN KHAI

- [ ] Tích hợp `getArchetype()` mới (cluster-based) vào flow hiển thị kết quả
- [ ] Thiết kế UI cho 3 archetype card (3 màu, 3 icon)
- [ ] Thiết kế share card template (1080x1080 và 1080x1920)
- [ ] Tích hợp Web Share API / download image cho share card
- [ ] Hiển thị lộ trình phát triển theo archetype
- [ ] Lưu archetype vào localStorage cùng với scores
- [ ] Thêm "Chuẩn Chủ Phúc Tea" label trên radar chart
- [ ] Thêm nút "Làm lại bài test" với thông báo thời điểm phù hợp
- [ ] A/B test tên archetype với nhóm đối tác thực tế
- [ ] Thu thập feedback về tone và nội dung mentor

---

*Document này là content production-ready cho Phúc Tea DNA Web App — Hệ thống Chuẩn Chủ Phúc Tea. Đúc kết từ nhóm đối tác có doanh thu dẫn đầu 3 năm gần nhất. Mọi thay đổi cần được review bởi team Marketing và Product trước khi triển khai.*
