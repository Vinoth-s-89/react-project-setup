import "../../styles/calendar.css";
import { icons } from "@constants/icons";
import { useCalendar } from "../../hooks/useCalendar";
import {
  formatDate,
  getDayClassName,
  getIconClass,
  getMonths,
  getYears,
  weekDays,
} from "../../constants/datepicker";
import CalendarIcon from "../../assets/calendar.svg?react";

const DatePicker = ({ value, setValue, maxDate, minDate }) => {
  const {
    userInput,
    days,
    prevMonthChange,
    nextMonthChange,
    handleDateSelection,
    currentView,
    setCurrentView,
    handleYearChange,
    selectedYearRef,
    handleMonthChange,
    open,
    setOpen,
    containerRef,
  } = useCalendar({ value, setValue, maxDate, minDate });

  return (
    <div ref={containerRef} className="outer-container">
      <input
        type="text"
        placeholder="Date"
        className="date-input-field"
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.preventDefault()}
        onChange={(e) => e.preventDefault()}
        value={formatDate(value)}
      />
      <CalendarIcon className="calendar-icon" onClick={() => setOpen(!open)} />
      <div className={`calendar-container ${open ? "open" : ""}`}>
        <div
          className={`calendar ${currentView === "years" ? "years-view" : ""}`}
        >
          <div className="picker">
            <div
              className="selected-year"
              onClick={() => setCurrentView("years")}
            >
              {userInput.year}
            </div>
            <div
              className="selected-month"
              onClick={() => setCurrentView("months")}
            >
              {getMonths(maxDate, userInput)[userInput.month]}
            </div>
            {currentView === "days" && (
              <div className="month-changer">
                <div
                  className={`${getIconClass({ minDate, userInput })}`}
                  onClick={prevMonthChange}
                >
                  {icons["arrow-left"]}
                </div>
                <div
                  className={`${getIconClass({ maxDate, userInput })}`}
                  onClick={nextMonthChange}
                >
                  {icons["arrow-right"]}
                </div>
              </div>
            )}
          </div>
          {currentView === "years" && (
            <div className="years-container">
              {getYears({
                minYear: minDate?.getFullYear(),
                maxYear: maxDate?.getFullYear(),
              }).map((year, index) => (
                <div
                  key={index}
                  className={`year ${
                    year === userInput.year ? "picked-year" : ""
                  }`}
                  onClick={(event) => handleYearChange(event, year)}
                  ref={year === userInput.year ? selectedYearRef : null}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
          {currentView === "months" && (
            <div className="months-container">
              {getMonths(maxDate, userInput).map((month, index) => (
                <div
                  className={`month ${
                    index === userInput.month ? "picked-month" : ""
                  }`}
                  key={index}
                  onClick={(event) => handleMonthChange(event, index)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
          {currentView === "days" && (
            <>
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
                        className={getDayClassName({
                          date,
                          maxDate,
                          minDate,
                          userInput,
                          value,
                        })}
                        onClick={() => handleDateSelection(date)}
                      >
                        {date || ""}
                      </div>
                    ))
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
