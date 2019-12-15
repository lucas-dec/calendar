const initialBox = document.querySelector(".initial-box");
const startBtn = document.querySelector(".set-date");
const setupBox = document.querySelector(".setup-box");
let year = "";
let month = "";
let day = "";
const btnChangeMonth = document.querySelectorAll(".panel button");
const days = document.querySelector(".days");

const showDays = (year, month, day) => {
  const numberOfDays = new Date(year, month + 1, 0).getDate();
  let startDay = new Date(year, month, 1).getDay();
  if (startDay === 0) startDay = 7;

  days.innerHTML = "";

  const ul = document.createElement("ul");
  for (let i = 1; i < startDay; i++) {
    const li = document.createElement("li");
    li.innerText = "";
    ul.appendChild(li);
  }
  for (let i = 1; i <= numberOfDays; i++) {
    const li = document.createElement("li");
    li.innerText = i;
    li.dataset.day = i;
    if (i === day) li.classList.add("active-day");
    ul.appendChild(li);
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
  if (year == "") {
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

const calendar = () => {
  initialBox.classList.add("hidden");
  setupBox.classList.add("slide-in");
  setDate();
  daysOfWeek();
};

startBtn.addEventListener("click", calendar);
