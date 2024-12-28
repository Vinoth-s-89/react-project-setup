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

const Popover = ({
  open,
  elementRef,
  onClose,
  menuItems = [],
  isNested = false,
  zIndex = 5,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerProps, setInnerProps] = useState({
    open: false,
    menuItems: null,
  });
  const popoverRef = useRef(null);
  const innerRef = useRef(null);

  const handleInnerMenuOpen = useCallback((event, menuItems) => {
    event.stopPropagation();
    if (innerRef.current !== event.currentTarget) {
      innerRef.current = event.currentTarget;
      setInnerProps({ open: true, menuItems });
    }
  }, []);

  const handleInnerMenuClose = useCallback(() => {
    setInnerProps({ open: false, menuItems: null });
    innerRef.current = null;
  }, []);

  const handlePosition = useCallback(() => {
    if (elementRef?.current && open) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        x: isNested ? rect.x + rect.width + 3 : rect.x,
        y: !isNested ? rect.y + rect.height + 3 : rect.y,
      });
    }
  }, [elementRef, isNested, open]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popoverRef.current && !popoverRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    handlePosition();
  }, [handlePosition]);

  useEffect(() => {
    if (!open && !elementRef.current) handleInnerMenuClose();
  }, [open, elementRef, handleInnerMenuClose]);

  useEffect(() => {
    window.addEventListener("resize", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [handlePosition]);

  if (!open) return null;

  return (
    <>
      <div
        style={{
          top: position.y,
          left: position.x,
          zIndex,
        }}
        className="popover"
        ref={popoverRef}
      >
        <div>
          {menuItems.map(({ label, menuItems: innerMenus }, index) => (
            <div
              key={label + index}
              className="menu-item"
              onClick={
                !innerMenus
                  ? onClose
                  : (e) => handleInnerMenuOpen(e, innerMenus)
              }
            >
              <div className="label">{label}</div>
              {innerMenus && <div>{icons.forward}</div>}
            </div>
          ))}
        </div>
      </div>
      {innerProps?.open && innerProps?.menuItems && innerRef && (
        <Popover
          open={innerProps?.open}
          elementRef={innerRef}
          onClose={handleInnerMenuClose}
          menuItems={innerProps.menuItems}
          key={`${"Default"}-${Math.random()}`}
          isNested
          zIndex={zIndex + 5}
        />
      )}
    </>
  );
};

export default Popover;
