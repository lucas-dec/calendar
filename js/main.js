const initialBox = document.querySelector(".initial-box");
const startBtn = document.querySelector(".set-date");
const setupBox = document.querySelector(".setup-box");
const calendarPicker = document.querySelector(".calendar-picker");
let year = "",
  month = "",
  day = "";
const btnChangeMonth = document.querySelectorAll(".panel img.btn");
const days = document.querySelector(".days");

const showDays = (year, month, day) => {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  let startDay = new Date(year, month, 1).getDay();

  if (startDay === 0) startDay = 7;
  let dayOfTheWeek = startDay;
  days.innerHTML = "";

  const ul = document.createElement("ul");
  for (let i = 1; i < startDay; i++) {
    const li = document.createElement("li");
    li.innerText = "";
    ul.appendChild(li);
  }
  for (let i = 1; i <= numberOfDays; i++) {
    if (dayOfTheWeek === 8) dayOfTheWeek = 1;

    const li = document.createElement("li");
    li.innerText = i;
    li.dataset.day = i;
    li.dataset.dayOfTheWeek = dayOfTheWeek;
    if (i === day) li.classList.add("active-day");
    if (dayOfTheWeek === 6 || dayOfTheWeek === 7) li.classList.add("weekend");
    ul.appendChild(li);

    dayOfTheWeek++;
  }
  days.appendChild(ul);
};

const showDate = (year, month) => {
  const panelDate = document.querySelector(".panel .date");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "October",
    "Novmber",
    "December"
  ];
  panelDate.innerText = `${months[month]} ${year}`;
};

const changeMonth = e => {
  if (e.target.classList.contains("prevMonth")) {
    if (month === 0) {
      year = year - 1;
      month = 11;
    } else month = month - 1;
    setDate(year, month);
  } else if (e.target.classList.contains("nextMonth")) {
    if (month === 11) {
      year = year + 1;
      month = 0;
    } else month = month + 1;
    setDate(year, month);
  }
};

const setDate = () => {
  if (!year) {
    const currentDate = new Date();
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
    day = currentDate.getDate();
  }

  btnChangeMonth.forEach(btn => btn.addEventListener("click", changeMonth));
  showDate(year, month);
  showDays(year, month, day);
};

const daysOfWeek = () => {
  const header = document.querySelector(".header");
  header.innerHTML = "";
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const ul = document.createElement("ul");

  days.forEach(day => {
    const li = document.createElement("li");
    li.innerText = day;
    ul.appendChild(li);
  });
  header.appendChild(ul);
};

const closeCalendarPicker = e => {
  const clickInside = setupBox.contains(e.target);
  if (!clickInside && !e.target.classList.contains("set-date")) {
    initialBox.classList.remove("hidden");
    setupBox.classList.remove("slide-in");
  } else if (e.target.dataset.day) {
    day = parseInt(e.target.dataset.day);
    showDays(year, month, day);

    initialBox.classList.remove("hidden");
    setupBox.classList.toggle("slide-in");

    const div = document.createElement("div");
    div.className = "result";
    initialBox.appendChild(div);
    const result = document.querySelector(".result");
    result.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerText = `${day}.${month + 1}.${year}`;
    result.appendChild(h1);
  }
};

const calendar = () => {
  initialBox.classList.add("hidden");
  setupBox.classList.add("slide-in");
  setDate();
  daysOfWeek();
  document.addEventListener("click", closeCalendarPicker);
};

startBtn.addEventListener("click", calendar);
