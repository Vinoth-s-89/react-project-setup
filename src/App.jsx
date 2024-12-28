import { useCallback, useRef, useState } from "react";
import "./App.css";
import Popover from "./components/shared/Popover";

const menuItems = [
  {
    label: "Item -1",
    menuItems: [
      {
        label: "1st Inner Item -1",
      },
      {
        label: "1st Inner Item -2",
        menuItems: [
          {
            label: "1st Inner Item -1",
          },
          {
            label: "1st Inner Item -2",
          },
          {
            label: "1st Inner Item -3",
            menuItems: [
              {
                label: "1st Inner Item -1",
              },
              {
                label: "1st Inner Item -2",
              },
              {
                label: "1st Inner Item -3",
              },
            ],
          },
        ],
      },
      {
        label: "1st Inner Item -3",
      },
    ],
  },
  {
    label: "Item -2",
    menuItems: [
      {
        label: "2nd Inner Item -1",
      },
      {
        label: "2nd Inner Item -2",
      },
      {
        label: "2nd Inner Item -3",
      },
    ],
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
      elementRef.current = event.currentTarget;
    },
    [open]
  );
  const handleClose = useCallback(() => {
    setOpen(false);
    elementRef.current = null;
  }, []);

  return (
    <div className="container">
      <button onClick={handleOpen}>Click Here</button>
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
