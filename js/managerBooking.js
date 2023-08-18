const databaseURL = "https://sancaul-default-rtdb.firebaseio.com"; // Thay bằng URL của Firebase Realtime Database

const tabContainer = document.getElementById("pills-tab");
const contentContainer = document.getElementById("pills-tabContent");

// Hiển thị danh sách khu
fetch(`${databaseURL}/khu.json`)
  .then(response => response.json())
  .then(data => {
    let firstKhuId = null;

    for (const khuId in data) {
      const khu = data[khuId];

      if (!firstKhuId) {
        firstKhuId = khuId; // Lưu lại ID của khu đầu tiên
      }

      // Tạo tab-link cho khu
      const tabLink = document.createElement("button");
      tabLink.classList.add("nav-link");
      tabLink.textContent = khu.ten;
      tabLink.setAttribute("data-bs-toggle", "pill");
      tabLink.setAttribute("data-bs-target", `#khu-${khuId}`);
      tabLink.setAttribute("role", "tab");
      tabLink.setAttribute("aria-controls", `khu-${khuId}`);
      tabLink.setAttribute("aria-selected", "false");
      tabContainer.appendChild(tabLink);

      // Tạo tab-pane cho khu
      const tabPane = document.createElement("div");
      tabPane.classList.add("tab-pane", "fade");
      tabPane.id = `khu-${khuId}`;
      tabPane.setAttribute("role", "tabpanel");
      tabPane.setAttribute("aria-labelledby", `khu-${khuId}-tab`);
      contentContainer.appendChild(tabPane);

      // Hiển thị danh sách sân cho khu
      fetch(`${databaseURL}/khu/${khuId}/sân.json`)
        .then(response => response.json())
        .then(data => {
          for (const sanId in data) {
            const san = data[sanId];
            const sanItem = document.createElement("div");
            sanItem.textContent = san.ten;
            tabPane.appendChild(sanItem);
          }
        })
        .catch(error => {
          console.error("Lỗi khi tải danh sách sân:", error);
        });
    }

    // Kích hoạt tab đầu tiên
    const firstTabLink = document.querySelector(`[data-bs-target="#khu-${firstKhuId}"]`);
    const firstTabPane = document.getElementById(`khu-${firstKhuId}`);
    
    if (firstTabLink && firstTabPane) {
      firstTabLink.classList.add("active");
      firstTabPane.classList.add("show", "active");
    }
  })
  .catch(error => {
    console.error("Lỗi khi tải danh sách khu:", error);
  });
