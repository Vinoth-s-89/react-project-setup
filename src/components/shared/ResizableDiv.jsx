import { useCallback, useEffect, useState } from "react";
import "../../styles/resizeables.css";

const ResizableDiv = () => {
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isResizing) {
        setSize(() => ({
          width: e.clientX - e.target.parentNode.offsetLeft,
          height: e.clientY - e.target.parentNode.offsetTop,
        }));
      }
    },
    [isResizing]
  );

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, isResizing]);

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
      }}
      className="resizable"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="resize" onMouseDown={handleMouseDown} />
    </div>
  );
};

export default ResizableDiv;
