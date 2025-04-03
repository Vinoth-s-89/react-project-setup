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

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      optpRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      optpRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      optpRef.current[index + 1].focus();
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
      optpRef.current[index + 1].focus();
    }
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
        />
      ))}
    </div>
  );
};

export default InputOTP;
