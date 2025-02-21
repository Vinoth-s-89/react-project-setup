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

export const getInitialUserInput = (maxDate) => {
  if (currentDate.getFullYear() > maxDate?.getFullYear())
    return { year: maxDate.getFullYear(), month: maxDate.getMonth() };
  if (currentDate.getMonth() > maxDate?.getMonth())
    return { year: currentDate.getFullYear(), month: maxDate.getMonth() };
  return { year: currentDate.getFullYear(), month: currentDate.getMonth() };
};

export const getIconClass = ({ minDate, maxDate, userInput }) => {
  if (
    minDate &&
    userInput.year === minDate.getFullYear() &&
    userInput.month === minDate.getMonth()
  )
    return "icon-conatainer diabled-icon";
  if (
    maxDate &&
    userInput.year === maxDate.getFullYear() &&
    userInput.month === maxDate.getMonth()
  )
    return "icon-conatainer diabled-icon";
  return "icon-conatainer";
};

export const getDayClassName = ({
  date,
  maxDate,
  userInput,
  value,
  minDate,
}) => {
  const pickerDate = new Date(userInput.year, userInput.month, date);
  if (!date) return "empty-day";
  else if (
    value &&
    value.getDate() === date &&
    value.getMonth() === userInput.month &&
    value.getFullYear() === userInput.year
  )
    return "selected-date";
  // else if (index === 0 || index === 6) return "week-end";
  else if (
    userInput.year === currentDate.getFullYear() &&
    userInput.month === currentDate.getMonth() &&
    date === currentDate.getDate()
  )
    return "current-day";
  else if (maxDate && minDate) {
    if (pickerDate > maxDate || pickerDate < minDate)
      return "week-day disabled-day";
    return "week-day";
  } else if (maxDate && pickerDate > maxDate) return "week-day disabled-day";
  else if (minDate && pickerDate < minDate) return "week-day disabled-day";
  else return "week-day";
};
