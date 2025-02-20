import { useCallback, useEffect, useState, useRef } from "react";
import { currentDate, getDays } from "../constants/calender";

export const useCalendar = ({ value, setValue, maxDate, minDate }) => {
  const [userInput, setUserInput] = useState({
    year:
      maxDate && maxDate?.getFullYear() < currentDate.getFullYear()
        ? maxDate?.getFullYear()
        : currentDate.getFullYear(),
    month:
      maxDate?.getMonth() < currentDate.getMonth()
        ? maxDate?.getMonth()
        : currentDate.getMonth(),
  });
  const [days, setDays] = useState([]);
  const [currentView, setCurrentView] = useState("days");
  const [open, setOpen] = useState(false);
  const selectedYearRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) setCurrentView("days");
    const handleClickOutside = (event) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const { year, month } = userInput;
    if (year && month >= 0) {
      setDays(getDays(parseInt(month), parseInt(year)));
    }
  }, [userInput]);

  useEffect(() => {
    if (currentView === "years" && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentView]);

  const prevMonthChange = useCallback(() => {
    setUserInput((prev) => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year,
    }));
  }, []);

  const nextMonthChange = useCallback(() => {
    setUserInput((prev) => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year,
    }));
  }, []);

  const handleYearChange = useCallback((event, year) => {
    event.stopPropagation();
    setUserInput((prev) => ({ ...prev, year }));
    setCurrentView("months");
  }, []);

  const handleMonthChange = useCallback((event, month) => {
    event.stopPropagation();
    setUserInput((prev) => ({ ...prev, month }));
    setCurrentView("days");
  }, []);

  const getDayClassName = useCallback(
    (date) => {
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
      // else if (
      //   maxDate &&
      //   minDate &&
      //   pickerDate > minDate &&
      //   pickerDate < maxDate
      // )
      //   return "week-day";
      else if (maxDate && maxDate < pickerDate) return "week-day disabled-day";
      // else if (minDate && pickerDate > minDate) return "week-day disabled-day";
      else return "week-day";
    },
    [maxDate, userInput, value]
  );

  const handleDateSelection = useCallback(
    (date) => {
      setValue(new Date(userInput.year, userInput.month, date));
      setOpen(false);
    },
    [setValue, userInput.month, userInput.year]
  );

  return {
    userInput,
    days,
    prevMonthChange,
    nextMonthChange,
    getDayClassName,
    handleDateSelection,
    currentView,
    setCurrentView,
    handleYearChange,
    handleMonthChange,
    selectedYearRef,
    open,
    setOpen,
    containerRef,
  };
};
