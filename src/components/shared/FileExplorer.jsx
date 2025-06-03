import React from "react";
import { icons } from "../../constants/icons";
import { useFieleExplorer } from "../../hooks/useFileExplorer";
import "../../styles/fileexplorer.css";
const FileExplorer = () => {
  const {
    filesAndFolders,
    handleCollapseAll,
    handleExpandCollapse,
    handleNew,
    isExpanded,
    items,
    setFilesAndFolders,
    handleSelect,
    selectedPath,
    isFieldEnabled,
    mode,
    handleNameChange,
    inputRef,
    handleAddNewItem,
    whoSelected,
    type,
    hasDuplicate,
  } = useFieleExplorer();

  const renderFilesAndFolders = (
    items = [],
    parentIndex = "",
    parentWidth = 290
  ) => {
    return items.map((item, index) => {
      let path = parentIndex.concat(index);
      let newFilePath =
        whoSelected === "file" ? selectedPath.slice(0, -1) : selectedPath;
      if (item.type === "folder") {
        return (
          <React.Fragment key={path}>
            <div
              className={`folder ${selectedPath === path ? "selected" : ""}`}
              style={{ width: `${parentWidth}px` }}
              onClick={(event) => {
                event.stopPropagation();
                handleExpandCollapse(path);
              }}
            >
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
              <div className="nested-container">
                {isFieldEnabled && mode === "new" && newFilePath == path && (
                  <div className="new-field-container">
                    <div className={`${type}-icon`}>{icons[type]}</div>
                    <input
                      type="text"
                      className={`name-input-field ${
                        hasDuplicate ? "duplicate" : ""
                      }`}
                      style={{ width: `${parentWidth - 40}px` }}
                      onChange={(event) => handleNameChange(event, item.items)}
                      ref={inputRef}
                      onKeyUp={handleAddNewItem}
                    />
                    <div
                      className={`dupliacte-info ${hasDuplicate ? "show" : ""}`}
                    >
                      A {type} already exist at this location. Please choose a
                      different name.
                    </div>
                  </div>
                )}
                {item.items &&
                  renderFilesAndFolders(item.items, path, parentWidth - 10)}
              </div>
            </div>
          </React.Fragment>
        );
      } else if (item.type === "file") {
        return (
          <div
            key={path}
            onClick={(event) => {
              event.stopPropagation();
              handleSelect(path, "file");
            }}
            className={`file ${selectedPath === path ? "selected" : ""}`}
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
          <div className="parent-folder-name">{filesAndFolders.name}</div>
          {isExpanded && (
            <div className="icons-container">
              <div
                onClick={(event) =>
                  handleNew({ event, mode: "new", type: "file" })
                }
              >
                {icons.newfile}
              </div>
              <div
                onClick={(event) =>
                  handleNew({ event, mode: "new", type: "folder" })
                }
              >
                {icons.newfolder}
              </div>
              <div onClick={(event) => handleNew({ event })}>
                {icons.refresh}
              </div>
              <div onClick={handleCollapseAll}>{icons.minimize}</div>
            </div>
          )}
        </div>
        <div className="files-and-folders">
          {isFieldEnabled && mode === "new" && !selectedPath && (
            <div className="new-field-container" style={{ width: "100%" }}>
              <div className={`${type}-icon`}>{icons[type]}</div>
              {isFieldEnabled && mode === "new" && !selectedPath && (
                <input
                  type="text"
                  className={`name-input-field ${
                    hasDuplicate ? "duplicate" : ""
                  }`}
                  onChange={handleNameChange}
                  ref={inputRef}
                  onKeyUp={handleAddNewItem}
                />
              )}
            </div>
          )}
          {renderFilesAndFolders(items)}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
