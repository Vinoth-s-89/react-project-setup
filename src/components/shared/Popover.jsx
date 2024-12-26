import { useCallback, useEffect, useRef, useState } from "react";

const icons = {
  forward: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e8eaed"
    >
      <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
    </svg>
  ),
};

const Popover = ({ open, elementRef, onClose, menuItems = [] }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerMenuOpen, setInnerMenuOpen] = useState(false);
  const [innerMenuItems, setInnerMenuItems] = useState(null);
  const popoverRef = useRef(null);
  const innerRef = useRef(null);

  const handleInnerMenuOpen = useCallback((event, innerItems) => {
    innerRef.current = event.currentTarget;
    setInnerMenuOpen(true);
    setInnerMenuItems(innerItems);
  }, []);

  const handleInnerMenuClose = useCallback(() => {
    setInnerMenuOpen(false);
  }, []);

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

  console.log({ open, elementRef, menuItems, innerRef });

  if (!open) return null;

  return (
    <div
      style={{
        top: position.y + 25,
        left: position.x,
      }}
      className="popover"
      ref={popoverRef}
    >
      {menuItems.map(({ label = "", index, menuItems: innerMenus }) => (
        <div
          key={label + index}
          className="menu-item"
          onClick={
            !innerMenus ? onClose : (e) => handleInnerMenuOpen(e, innerMenus)
          }
        >
          <div className="label">{label}</div>
          {innerMenus && <div>{icons.forward}</div>}
        </div>
      ))}
      {innerMenuOpen && (
        <Popover
          open={innerMenuOpen}
          elementRef={innerRef}
          onClose={handleInnerMenuClose}
          menuItems={innerMenuItems}
          key={innerMenuItems?.[0]?.label || "Default"}
        />
      )}
    </div>
  );
};

export default Popover;
