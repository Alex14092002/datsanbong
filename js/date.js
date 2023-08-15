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



  function generateTimeSlots() {
    const timeSlots = [];
    for (let hour = 4; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const timeSlot = `${formattedHour}h${formattedMinute}`;
        timeSlots.push(timeSlot);
      }
    }
    return timeSlots;
  }
  
  const timeSlots = generateTimeSlots();
  
  // // In ra danh sách các khung giờ
  // timeSlots.forEach(timeSlot => {
  //   console.log(timeSlot);
  // });
  