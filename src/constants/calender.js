export const months = [
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

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getYears = () => {
  const years = [];
  for (let i = 1970; i <= 2050; i++) {
    years.push(i);
  }
  return years;
};

export const getDays = (month = 0, year = new Date().getFullYear()) => {
  const endDate = new Date(year, month + 1, 0).getDate();
  const days = [];
  let day = new Date(year, month, 1).getDay();
  let weekCount = 0;

  for (let i = 1; i <= endDate; i++) {
    if (!days[weekCount]) days[weekCount] = Array(7).fill(null);
    days[weekCount][day] = i;
    if (day === 6) {
      weekCount++;
    }
    day = day === 6 ? 0 : day + 1;
  }

  return days;
};

export const currentDate = new Date();

export const formatDate = (value) =>
  value
    ? value.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";
