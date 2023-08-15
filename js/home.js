const apiUrl = 'https://sancaul-default-rtdb.firebaseio.com/.json';

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayTabsAndData(data);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
  }
}

function displayTabsAndData(data) {
  const tabContainer = document.getElementById('pills-tab');
  const contentContainer = document.getElementById('pills-tabContent');

  // Loại bỏ lớp active khỏi tất cả các tab và nội dung
  const existingTabs = tabContainer.querySelectorAll('.nav-link');
  existingTabs.forEach(tab => tab.classList.remove('active'));

  const existingContents = contentContainer.querySelectorAll('.tab-pane');
  existingContents.forEach(content => content.classList.remove('show', 'active'));

  let isFirstTab = true;

  for (const key in data.tabs) {
    const tab = data.tabs[key];
    const tabButton = document.createElement('button');
    tabButton.className = 'nav-link';
    tabButton.setAttribute('data-bs-toggle', 'pill');
    tabButton.setAttribute('data-bs-target', `#pills-${key}`);
    tabButton.type = 'button';
    tabButton.role = 'tab';
    tabButton.ariaControls = `pills-${key}`;
    tabButton.textContent = tab.name;
    tabButton.setAttribute('aria-selected', isFirstTab ? 'true' : 'false');
    tabContainer.appendChild(tabButton);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-pane fade';
    tabContent.id = `pills-${key}`;
    tabContent.role = 'tabpanel';
    tabContent.setAttribute('aria-labelledby', `pills-${key}-tab`);
    contentContainer.appendChild(tabContent);

    if (isFirstTab) {
      tabButton.classList.add('active');
      tabContent.classList.add('show', 'active');
      isFirstTab = false;
    }
  }

  // Bổ sung lắng nghe sự kiện show.bs.tab
  const tabList = document.querySelector('ul.nav');
  tabList.addEventListener('show.bs.tab', (event) => {
    const previousTab = tabList.querySelector('.nav-link.active');
    if (previousTab) {
      previousTab.classList.remove('active');
    }
  });

  fetchDataForTabs(data.tabs);
}

async function fetchDataForTabs(tabs) {
  for (const key in tabs) {
    const tab = tabs[key];
    const tabContent = document.getElementById(`pills-${key}`);
    const scheduleTable = createScheduleTable(tab);
    tabContent.innerHTML = '';
    tabContent.appendChild(scheduleTable);
  }
}

function createScheduleTable(tab) {
    const courts = Object.keys(tab.courts);
    const unsortedTimeSlots = Object.keys(tab.courts[courts[0]].schedule);
  
    // Sắp xếp lại danh sách thời gian từ 4:00 đến 23:30
    const sortedTimeSlots = unsortedTimeSlots.sort((a, b) => {
      const timeA = parseInt(a.split(':')[0]);
      const timeB = parseInt(b.split(':')[0]);
      return timeA - timeB;
    });
  
    const scheduleTable = document.createElement('table');
    scheduleTable.className = 'table';
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Time</th>';
  
    for (const court of courts) {
      headerRow.innerHTML += `<th>${court}</th>`;
    }
  
    scheduleTable.appendChild(headerRow);
  
    for (const timeSlot of sortedTimeSlots) {
      const timeRow = document.createElement('tr');
      timeRow.innerHTML = `<td>${timeSlot}</td>`;
  
      for (const court of courts) {
        const status = tab.courts[court].schedule[timeSlot].status;
        const statusCell = document.createElement('td');
      
        // Kiểm tra trạng thái và thiết lập màu sắc
        if (status === 'Chưa book') {
          statusCell.classList.add('yellow-bg');
          const bookButton = document.createElement('button');
          bookButton.classList.add('btn-dat');
          bookButton.textContent = 'Đặt lịch';
          statusCell.appendChild(bookButton);
        } else if (status === 'Đã book') {
          statusCell.classList.add('red-bg');
          const nameGruop = document.createElement('h5')
          nameGruop.innerHTML = tab.courts[court].schedule[timeSlot].groupId
          statusCell.appendChild(nameGruop); // Thêm phần tử <h5> vào ô <td>
        }
  
        timeRow.appendChild(statusCell);
      }
  
      scheduleTable.appendChild(timeRow);
    }
  
    return scheduleTable;
  }
  
fetchData();
