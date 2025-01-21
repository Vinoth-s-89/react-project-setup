import "../../styles/calendar.css";
import { icons } from "../../constants/icons";
import { useCalendar } from "../../hooks/useCalendar";

const Calendar = ({ value, setValue }) => {
  const {
    months,
    weekDays,
    // getYears,
    userInput,
    days,
    prevMonthChange,
    nextMonthChange,
    getDayClassName,
    handleDateSelection,
  } = useCalendar(value, setValue);

  return (
    <div>
      <div className="calendar">
        <div className="picker">
          <div className="current-year">{userInput.year}</div>
          <div className="current-month">{months[userInput.month]}</div>
          <div className="month-changer">
            <div className="icon-conatainer" onClick={prevMonthChange}>
              {icons["arrow-left"]}
            </div>
            <div className="icon-conatainer" onClick={nextMonthChange}>
              {icons["arrow-right"]}
            </div>
          </div>
        </div>
        <div className="week-day-conatainer">
          {weekDays.map((weekday, index) => (
            <div key={index} className="week-header">
              {weekday}
            </div>
          ))}
        </div>
        <div className={`days-container`}>
          {!!days.length &&
            days.map((week, weekIndex) =>
              week.map((date, index) => (
                <div
                  key={`${weekIndex}${index}`}
                  className={getDayClassName(date, index)}
                  onClick={() => handleDateSelection(date)}
                >
                  {date || ""}
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
