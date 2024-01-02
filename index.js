const monthEl = document.querySelector(".date h1");
const fullDateEl = document.querySelector(".date p");
const daysEl = document.querySelector(".days");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const monthDropdown = document.getElementById("monthDropdown");
const yearDropdown = document.getElementById("yearDropdown");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Populate month and year dropdowns
months.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = month;
  monthDropdown.add(option);
});

for (let year = 1947; year <= 2050; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  yearDropdown.add(option);
}

// Set initial values to the current month and year
const currentDate = new Date();
monthDropdown.value = currentDate.getMonth();
yearDropdown.value = currentDate.getFullYear();

// Event listeners for buttons and dropdowns
prevMonthBtn.addEventListener("click", showPreviousMonth);
nextMonthBtn.addEventListener("click", showNextMonth);
monthDropdown.addEventListener("change", showSelectedMonth);
yearDropdown.addEventListener("change", showSelectedYear);

function updateDateHeading() {
  const currentDate = new Date();
  const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(currentDate);
  const day = currentDate.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(currentDate);
  const year = currentDate.getFullYear();

  const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;
  fullDateEl.innerText = formattedDate;
}

// Initial rendering
renderCalendar();
updateDateHeading();
// ... existing code ...

function renderCalendar() {
  const selectedMonth = parseInt(monthDropdown.value);
  const selectedYear = parseInt(yearDropdown.value);

  const monthIndex = selectedMonth;
  const lastDay = new Date(selectedYear, monthIndex + 1, 0).getDate();
  const firstDay = new Date(selectedYear, monthIndex, 1).getDay() - 1;

  const monthName = months[monthIndex];

  // Update the heading with the current date
  const currentDateHeading = new Date(selectedYear, monthIndex).toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  monthEl.innerText = monthName;
  fullDateEl.innerText = currentDateHeading;

  let days = "";

  for (let i = firstDay; i > 0; i--) {
    days += `<div class="empty"></div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === currentDate.getDate() &&
      monthIndex === currentDate.getMonth() &&
      selectedYear === currentDate.getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  daysEl.innerHTML = days;
}

// ... existing code ...

function showPreviousMonth() {
  const currentMonth = parseInt(monthDropdown.value);
  monthDropdown.value = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar();
}

function showNextMonth() {
  const currentMonth = parseInt(monthDropdown.value);
  monthDropdown.value = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar();
}

function showSelectedMonth() {
  renderCalendar();
}

function showSelectedYear() {
  renderCalendar();
}

setInterval(updateDateHeading, 24 * 60 * 60 * 1000); // Update every 24 hours