import { use, useRef } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useCalendar = (value, setValue) => {
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
  const [currentView, setCurrentView] = useState("days");

  const currentDate = useMemo(() => {
    const date = new Date();
    if (
      userInput.year === date.getFullYear() &&
      userInput.month === date.getMonth()
    ) {
      return date.getDate();
    }
    return null;
  }, [userInput]);

  useEffect(() => {
    const { year, month } = userInput;
    if (year && month >= 0) {
      setDays(getDays(parseInt(month), parseInt(year)));
    }
  }, [userInput]);

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

  const handleYearChange = useCallback((year) => {
    setUserInput((prev) => ({ ...prev, year }));
    setCurrentView("days");
  }, []);

  const handleMonthChange = useCallback((month) => {
    setUserInput((prev) => ({ ...prev, month }));
    setCurrentView("days");
  }, []);

  const getDayClassName = useCallback(
    (date, index) => {
      if (!date) return "empty-day";
      else if (
        value &&
        value.getDate() === date &&
        value.getMonth() === userInput.month &&
        value.getFullYear() === userInput.year
      )
        return "selected-date";
      else if (index === 0 || index === 6) return "week-end";
      else if (date === currentDate) return "current-day";
      else return "week-day";
    },
    [currentDate, value, userInput]
  );

  const handleDateSelection = useCallback(
    (date) => {
      setValue(new Date(userInput.year, userInput.month, date));
    },
    [setValue, userInput.month, userInput.year]
  );

  const selectedYearRef = useRef(null);

  useEffect(() => {
    if (currentView === "years" && selectedYearRef.current) {
      selectedYearRef.current.scrollIntoView({
        behavior: "smooth",
        // block: "center",
      });
    }
  }, [currentView]);

  return {
    months,
    weekDays,
    getYears,
    userInput,
    days,
    prevMonthChange,
    nextMonthChange,
    getDayClassName,
    currentDate,
    handleDateSelection,
    currentView,
    setCurrentView,
    handleYearChange,
    handleMonthChange,
    selectedYearRef,
  };
};
