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
  handleMenuClick,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [innerProps, setInnerProps] = useState({
    open: false,
    menuItems: null,
    parentIndex: "",
  });
  const popoverRef = useRef(null);
  const innerRef = useRef(null);

  const handleInnerMenuOpen = (event, menuItems, index, props) => {
    event.stopPropagation();
    if (!menuItems) {
      if (handleMenuClick) handleMenuClick(props);
      onClose();
      return;
    }
    if (innerRef.current !== event.currentTarget) {
      innerRef.current = event.currentTarget;
      const newIndex = !parentIndex ? `${index}` : parentIndex + index;
      setInnerProps({ open: false });
      setTimeout(() => {
        setInnerProps({
          open: true,
          menuItems,
          parentIndex: newIndex,
        });
      }, 1);
    }
  };

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
    window.addEventListener("resize", handlePosition);

    return () => {
      window.removeEventListener("resize", handlePosition);
    };
  }, [handlePosition]);

  useEffect(() => {
    if (!open) setInnerProps({ open: false, menuItems: null, parentIndex: "" });
  }, [open]);

  if (!open) return null;

  return (
    <>
      {!parentIndex && (
        <div className="popover-overlay" style={{ zIndex: zIndex - 1 }}></div>
      )}
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
          {menuItems.map(
            (
              {
                label,
                menuItems: innerMenus,
                icon,
                labelStyles = {},
                iconStyles = {},
                ...props
              },
              index
            ) => (
              <div
                key={label + index}
                className="menu-item"
                onClick={(e) =>
                  handleInnerMenuOpen(e, innerMenus, index, props)
                }
              >
                {icon && (
                  <div className="menu-icon" style={iconStyles}>
                    {icon}
                  </div>
                )}
                <div className="label" style={labelStyles}>
                  {label}
                </div>
                {innerMenus && (
                  <div className="nested-menu">{icons.forward}</div>
                )}
              </div>
            )
          )}
        </div>
        {innerProps?.open && (
          <Popover
            open={innerProps?.open}
            elementRef={innerRef}
            onClose={onClose}
            menuItems={innerProps.menuItems}
            key={parentIndex}
            parentIndex={innerProps.parentIndex}
            zIndex={zIndex + 5}
            handleMenuClick={handleMenuClick}
          />
        )}
      </div>
    </>
  );
};

export default Popover;
