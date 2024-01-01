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

// Initial rendering
renderCalendar();

function renderCalendar() {
  const selectedMonth = parseInt(monthDropdown.value);
  const selectedYear = parseInt(yearDropdown.value);

  const monthInx = selectedMonth;
  const lastDay = new Date(selectedYear, monthInx + 1, 0).getDate();
  const firstDay = new Date(selectedYear, monthInx, 1).getDay() - 1;

  monthEl.innerText = months[monthInx];
  fullDateEl.innerText = new Date(selectedYear, monthInx).toDateString();

  let days = "";

  for (let i = firstDay; i > 0; i--) {
    days += `<div class="empty"></div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === currentDate.getDate() &&
      monthInx === currentDate.getMonth() &&
      selectedYear === currentDate.getFullYear()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  daysEl.innerHTML = days;
}

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
