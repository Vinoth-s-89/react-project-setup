import { useCallback, useRef, useState } from "react";
import "./App.css";
import Popover from "./components/shared/Popover";

const menuItems = [
  {
    label: "Item -1",
  },
  {
    label: "Item -2",
  },
  {
    label: "Item -3",
  },
  {
    label: "Item -4",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const elementRef = useRef(null);
  const handleOpen = useCallback(
    (event) => {
      event.stopPropagation();
      setOpen(!open);
    },
    [open]
  );
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="container">
      <button ref={elementRef} onClick={handleOpen}>
        Click Here
      </button>
      <Popover
        open={open}
        elementRef={elementRef}
        onClose={handleClose}
        menuItems={menuItems}
      />
    </div>
  );
}

export default App;
