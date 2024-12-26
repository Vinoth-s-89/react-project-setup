import { useEffect, useRef, useState } from "react";

const Popover = ({ open, elementRef, onClose, menuItems = [] }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popoverRef = useRef(null);
  //   const innerRef = useRef(null);
  //   const [innerPoperOpen, setInnerPoperOpen] = useState(false);

  //   const handleOpen = () => setInnerPoperOpen(true);
  //   const handleClose = () => setInnerPoperOpen(false);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target))
        onClose();
    });
    return () =>
      document.removeEventListener("click", () => {
        onClose();
      });
  }, [onClose]);

  useEffect(() => {
    if (elementRef) {
      const rect = elementRef?.current?.getBoundingClientRect();
      setPosition({ x: rect.x, y: rect.y });
    }
  }, [elementRef, open]);

  if (!open) return null;

  return (
    <div
      style={{
        top: position.y + 30,
        left: position.x,
      }}
      className="popover"
      ref={popoverRef}
    >
      {menuItems.map(({ label = "", index }) => (
        <div
          key={label + index}
          className="menu-item"
          onClick={() => onClose()}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Popover;
