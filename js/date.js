function generateDateOptions() {
    const today = new Date();
    const options = [];
  
    for (let i = 0; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      options.push(formattedDate);
    }
  
    return options;
  }
  
  const dateOptions = generateDateOptions();
  
  const selectElement = document.createElement('select');
  selectElement.name = 'selectedDate';
  
  for (const optionText of dateOptions) {
    const optionElement = document.createElement('option');
    optionElement.value = optionText;
    optionElement.textContent = optionText;
    selectElement.appendChild(optionElement);
  }
  
  const viewDayDiv = document.querySelector('.view-day')

  viewDayDiv.innerHTML = `
    <label for="selectedDate">Xem Ngày</label>
  `;
  
  viewDayDiv.appendChild(selectElement);
