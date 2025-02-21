import { useCallback, useEffect, useState, useRef } from "react";
import { getDays, getInitialUserInput } from "../constants/calender";

export const useCalendar = ({ setValue, maxDate, minDate }) => {
  const [userInput, setUserInput] = useState(getInitialUserInput(maxDate));

  const [days, setDays] = useState([]);
  const [currentView, setCurrentView] = useState("days");
  const [open, setOpen] = useState(false);
  const selectedYearRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setCurrentView("days");
      setUserInput(getInitialUserInput(maxDate));
    }
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
  }, [open, maxDate]);

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
    if (
      minDate &&
      userInput.year === minDate.getFullYear() &&
      userInput.month === minDate.getMonth()
    ) {
      return;
    }
    setUserInput((prev) => ({
      month: prev.month === 0 ? 11 : prev.month - 1,
      year: prev.month === 0 ? prev.year - 1 : prev.year,
    }));
  }, [minDate, userInput.month, userInput.year]);

  const nextMonthChange = useCallback(() => {
    if (
      maxDate &&
      userInput.year === maxDate.getFullYear() &&
      userInput.month === maxDate.getMonth()
    ) {
      return;
    }
    setUserInput((prev) => ({
      month: prev.month === 11 ? 0 : prev.month + 1,
      year: prev.month === 11 ? prev.year + 1 : prev.year,
    }));
  }, [maxDate, userInput.month, userInput.year]);

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

  const handleDateSelection = useCallback(
    (date) => {
      setValue(new Date(userInput.year, userInput.month, date));
      setOpen(false);
    },
    [setValue, userInput]
  );

  return {
    userInput,
    days,
    prevMonthChange,
    nextMonthChange,
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
