document.addEventListener("DOMContentLoaded", function () {
  const dateSelect = document.getElementById("dateSelect");

  // Tạo mảng chứa 7 ngày tiếp theo (tính từ ngày hiện tại)
  const dateOptions = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    const formattedDate = currentDate.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    dateOptions.push({ value: formattedDate, text: formattedDate });
  }

  // Thêm các tùy chọn vào phần tử select
  dateOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    dateSelect.appendChild(optionElement);
  });
});



dateSelect.addEventListener("change", function () {
  const selectedDateParts = dateSelect.value.split("/"); // Chuyển đổi thành mảng các phần ngày, tháng, năm
  const selectedDate = new Date(
    selectedDateParts[2], // Năm
    selectedDateParts[1] - 1, // Tháng (để trừ đi 1 vì tháng trong Date bắt đầu từ 0)
    selectedDateParts[0] // Ngày
  );
  
  // Tại đây, bạn có thể xử lý hiển thị thông tin đặt sân cho ngày đã chọn.
  // Bạn có thể sử dụng mã nguồn hiện tại của mình để tạo bảng và cập nhật sân trống.

  console.log("Ngày đã chọn:", selectedDate.toLocaleDateString("vi-VN"));
});


