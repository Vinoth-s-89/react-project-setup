// import { useCallback, useRef, useState } from "react";
import "./App.css";
// import Popover from "@shared/Popover";
// import { menuItems } from "@conatants/popover";
// import { getDateMinusYears, getDatePlusYears } from "./constants/datepicker";
// import CustomDatePicker from "custom-date-selector";
// import InputOTP from "@shared/InputOTP";
// import NestedCheckBox from "@shared/NestedCheckBox";
// import { checkboxOptions } from "./constants/common";
// import BasicLayout from "./components/shared/BasicLayout";
import FileExplorer from "./components/shared/FileExplorer";

function App() {
  // const [open, setOpen] = useState(false);
  // const elementRef = useRef(null);
  // const handleOpen = useCallback(
  //   (event) => {
  //     event.stopPropagation();
  //     setOpen(!open);
  //     elementRef.current = event.currentTarget;
  //   },
  //   [open]
  // );
  // const handleClose = useCallback(() => {
  //   setOpen(false);
  //   elementRef.current = null;
  // }, []);
  // const [value, setValue] = useState("");

  // <div className="container">
  {
    /* <button onClick={handleOpen}>Click Here</button>
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        second
      </button>
      <Popover
        open={open}
        elementRef={elementRef}
        onClose={handleClose}
        menuItems={menuItems}
        handleMenuClick={(props) => console.log(props)}
      /> */
  }
  {
    /* <CustomDatePicker
        value={value}
        setValue={setValue}
        minDate={getDateMinusYears(1)}
        maxDate={getDatePlusYears(2)}
      /> */
  }

  return <FileExplorer />;
}

export default App;
