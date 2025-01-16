import { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/Popover.css";
import { icons } from "../../constants/icons";

const Popover = ({
  open,
  elementRef,
  onClose,
  menuItems = [],
  parentIndex = "",
  zIndex = 5,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerProps, setInnerProps] = useState({
    open: false,
    menuItems: null,
    parentIndex: "",
  });
  const popoverRef = useRef(null);
  const innerRef = useRef(null);

  const handleInnerMenuOpen = useCallback(
    (event, menuItems, index) => {
      event.stopPropagation();
      if (!menuItems) {
        onClose();
        return;
      }
      if (innerRef.current !== event.currentTarget) {
        innerRef.current = event.currentTarget;
        setInnerProps({
          open: true,
          menuItems,
          parentIndex: !parentIndex ? `${index}` : parentIndex + index,
        });
      }
    },
    [onClose, parentIndex]
  );

  const handleInnerMenuClose = useCallback(() => {
    setInnerProps({ open: false, menuItems: null });
    innerRef.current = null;
  }, []);

  const handlePosition = useCallback(() => {
    if (elementRef?.current && open) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        x: parentIndex ? rect.x + rect.width + 3 : rect.x,
        y: !parentIndex ? rect.y + rect.height + 3 : rect.y,
      });
    }
  }, [elementRef, parentIndex, open]);

  const handleClickOutside = useCallback(
    (event) => {
      event.stopPropagation();
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    handlePosition();
  }, [handlePosition]);

  useEffect(() => {
    if (!open) handleInnerMenuClose();
  }, [handleInnerMenuClose, open]);

  useEffect(() => {
    window.addEventListener("resize", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [handlePosition]);

  console.log(parentIndex);

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
              onClick={(e) => handleInnerMenuOpen(e, innerMenus, index)}
            >
              <div className="label">{label}</div>
              {innerMenus && <div>{icons.forward}</div>}
            </div>
          ))}
        </div>
      </div>
      {innerProps?.open && (
        <Popover
          open={innerProps?.open}
          elementRef={innerRef}
          onClose={handleInnerMenuClose}
          menuItems={innerProps.menuItems}
          key={parentIndex}
          parentIndex={innerProps.parentIndex}
          zIndex={zIndex + 5}
        />
      )}
    </>
  );
};

export default Popover;
