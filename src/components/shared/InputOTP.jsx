import React, { useEffect } from "react";
import "../../styles/InputOTP.css";

const regex = {
  number: /^[0-9]*$/,
  text: /^[a-zA-Z]*$/,
  alphanumeric: /^[a-zA-Z0-9]*$/,
};

const InputOTP = ({ length = 6, type = "number" }) => {
  const [otp, setOtp] = React.useState(Array(length).fill(""));
  const optpRef = React.useRef([]);

  const moveCusorToEnd = (index) => {
    requestAnimationFrame(() => {
      optpRef.current[index - 1].setSelectionRange(
        optpRef.current[index - 1].value.length,
        optpRef.current[index - 1].value.length
      );
    });
  };

  const handleFocus = (index) => {
    requestAnimationFrame(() => {
      optpRef.current[index].focus();
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      optpRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      optpRef.current[index - 1].focus();
      moveCusorToEnd(index);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      handleFocus(index + 1);
    }
  };

  const handleChange = (e, index) => {
    if (!regex[type].test(e.target.value)) {
      return;
    }
    const { value } = e.target;
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[index] = value.slice(-1);
      return newOtp;
    });
    if (e.target.value && index < length - 1) {
      handleFocus(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (!regex[type].test(pastedData)) return;
    setOtp(otp.map((_, index) => pastedData[index] || ""));
    handleFocus(
      pastedData.length < length ? pastedData.length - 1 : length - 1
    );
  };

  useEffect(() => {
    optpRef.current[0]?.focus();
  }, [optpRef]);

  return (
    <div className="otp-container">
      {otp.map((value, index) => (
        <input
          key={index}
          className="otp-input"
          name={"otp-input-" + index}
          value={value}
          ref={(input) => (optpRef.current[index] = input)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={index !== 0 && !otp[index - 1] && !value}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

export default InputOTP;
