import { useEffect, useState, useMemo, useCallback } from "react";
import "../../styles/calendar.css";

const Calendar = () => {
  const months = useMemo(
    () => [
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
    ],
    []
  );

  const weekDays = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  const getYears = useMemo(() => {
    const years = [];
    for (let i = 1970; i <= 2050; i++) {
      years.push(i);
    }
    return years;
  }, []);

  const getDays = (month = 0, year = new Date().getFullYear()) => {
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

  const [userInput, setUserInput] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [days, setDays] = useState([]);

  useEffect(() => {
    const { year, month } = userInput;
    if (year && month >= 0) {
      setDays(getDays(parseInt(month), parseInt(year)));
    }
  }, [userInput]);

  const handleYearChange = useCallback((e) => {
    setUserInput((prev) => ({ ...prev, year: e.target.value }));
  }, []);

  const handleMonthChange = useCallback((e) => {
    setUserInput((prev) => ({ ...prev, month: e.target.value }));
  }, []);

  return (
    <div>
      <select
        name="year"
        value={userInput.year}
        onChange={handleYearChange}
        className="picker"
      >
        {getYears.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select name="month" value={userInput.month} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <div className="calendar">
        {weekDays.map((weekday, index) => (
          <div key={index} className="week week-header">
            {weekday}
          </div>
        ))}
        {!!days.length &&
          days.map((week, weekIndex) =>
            week.map((day, index) => (
              <div
                key={`${weekIndex}${index}`}
                className={
                  !day
                    ? "empty-day"
                    : index === 0 || index === 6
                    ? "week-day week-end"
                    : "week-day"
                }
              >
                {day || ""}
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default Calendar;
