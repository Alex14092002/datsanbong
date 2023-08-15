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
    tabButton.setAttribute('aria-selected', isFirstTab ? 'true' : 'false'); // Cập nhật aria-selected
    tabContainer.appendChild(tabButton);

    const tabContent = document.createElement('div');
    tabContent.className = 'tab-pane fade';
    tabContent.id = `pills-${key}`;
    tabContent.role = 'tabpanel';
    tabContent.setAttribute('aria-labelledby', `pills-${key}-tab`);
    contentContainer.appendChild(tabContent);

    if (isFirstTab) {
      tabButton.classList.add('active');  // Thêm lớp 'active' cho tab đầu tiên
      tabContent.classList.add('show', 'active');  // Thêm lớp 'show' và 'active' cho nội dung tab đầu tiên
      isFirstTab = false;
    }
  }

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
  const timeSlots = Object.keys(tab.courts[courts[0]].schedule);

  const scheduleTable = document.createElement('table');
  scheduleTable.className = 'table';
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Time</th>';

  for (const court of courts) {
    headerRow.innerHTML += `<th>${court}</th>`;
  }

  scheduleTable.appendChild(headerRow);

  for (const timeSlot of timeSlots) {
    const timeRow = document.createElement('tr');
    timeRow.innerHTML = `<td>${timeSlot}</td>`;

    for (const court of courts) {
      const status = tab.courts[court].schedule[timeSlot].status;
      const statusCell = document.createElement('td');
      statusCell.textContent = status;
      timeRow.appendChild(statusCell);
    }

    scheduleTable.appendChild(timeRow);
  }

  return scheduleTable;
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();

  const tabButtons = document.querySelectorAll('.nav-link');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const tabPanes = document.querySelectorAll('.tab-pane');
      tabPanes.forEach((pane) => {
        pane.classList.remove('show', 'active');
      });

      const targetPaneId = button.getAttribute('data-bs-target').substring(1);
      const targetPane = document.getElementById(targetPaneId);
      targetPane.classList.add('show', 'active');
    });
  });
});
