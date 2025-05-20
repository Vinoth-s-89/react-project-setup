import { useState } from "react";
import { icons } from "../../constants/icons";
import "../../styles/fileexplorer.css";

const FileExplorer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="app-container">
      <div
        className="explorer-container"
        style={{ gridTemplateRows: isExpanded ? "auto 1fr" : "auto 0fr" }}
      >
        <div
          className="parent-container"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div
            className="expand-icon"
            style={{ rotate: isExpanded ? "90deg" : "0deg" }}
          >
            {icons["arrow-right"]}
          </div>
          <div className="parent-folder-name">
            File Explorer File Explorer File Explorer File Explorer
          </div>
          <div className="icons-container">
            {icons.newfile}
            {icons.newfolder}
            {icons.refresh}
            {icons.minimize}
          </div>
        </div>
        <div className="files-and-folders"></div>
      </div>
    </div>
  );
};

export default FileExplorer;
