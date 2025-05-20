import React, { useState } from "react";
import { icons } from "../../constants/icons";
import "../../styles/fileexplorer.css";
import { filesAndFoldersContants } from "../../constants/filesAndFolders";

const FileExplorer = () => {
  const [filesAndFolders, setFilesAndFolders] = useState(
    filesAndFoldersContants
  );
  const { isExpanded = false, items = [] } = filesAndFolders;

  const renderFilesAndFolders = (
    items,
    parentIndex = "",
    parentWidth = 290
  ) => {
    return items.map((item, index) => {
      if (item.type === "folder") {
        return (
          <React.Fragment key={parentIndex + index}>
            <div className="folder" style={{ width: `${parentWidth}px` }}>
              <div
                className={`expand-icon ${item.isExpanded ? "expanded" : ""}`}
              >
                {icons["arrow-right"]}
              </div>
              <div className="folder-icon">{icons.folder}</div>
              <div className="folder-name">{item.name}</div>
            </div>
            <div
              className={`nested-folder ${item.isExpanded ? "expanded" : ""}`}
            >
              <div>
                {item.items &&
                  renderFilesAndFolders(item.items, index, parentWidth - 10)}
              </div>
            </div>
          </React.Fragment>
        );
      } else if (item.type === "file") {
        return (
          <div
            key={parentIndex + index}
            className="file"
            style={{ width: `${parentWidth}px` }}
          >
            <div className="expand-icon"></div>
            <div className="file-icon">{icons.file}</div>
            <div className="file-name">{item.name}</div>
          </div>
        );
      }
      return null;
    });
  };
  return (
    <div className="app-container">
      <div className={`explorer-container ${isExpanded ? "expanded" : ""}`}>
        <div
          className="parent-container"
          onClick={() =>
            setFilesAndFolders({ ...filesAndFolders, isExpanded: !isExpanded })
          }
        >
          <div className={`expand-icon ${isExpanded ? "expanded" : ""}`}>
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
        <div className="files-and-folders">{renderFilesAndFolders(items)}</div>
      </div>
    </div>
  );
};

export default FileExplorer;
