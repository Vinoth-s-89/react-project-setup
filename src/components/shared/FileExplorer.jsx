import React from "react";
import { icons } from "../../constants/icons";
import { useFieleExplorer } from "../../hooks/useFileExplorer";
import "../../styles/fileexplorer.css";
import { NewFieldContainer, ParentContainer } from "./FileExplorerComponents";
import Popover from "./Popover";
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
    position,
    name,
    elementRef,
    open,
    onOpen,
    onClose,
    fileMenuItems,
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
              className={`folder ${selectedPath === path ? "selected" : ""} ${
                selectedPath === path && mode === "rename" ? "rename" : ""
              }`}
              style={{ width: `${parentWidth}px` }}
              onClick={(event) => {
                event.stopPropagation();
                handleExpandCollapse(path);
              }}
              onContextMenu={(event) =>
                onOpen({ event, name: item.name, type: item.type })
              }
            >
              <div
                className={`expand-icon ${item.isExpanded ? "expanded" : ""}`}
              >
                {icons["arrow-right"]}
              </div>
              {selectedPath === path && mode === "rename" ? (
                <NewFieldContainer
                  handleAddNewItem={handleAddNewItem}
                  handleNameChange={handleNameChange}
                  hasDuplicate={hasDuplicate}
                  inputRef={inputRef}
                  type={type}
                  customWidth={"100%"}
                  name={name}
                  position={position}
                  items={item.items}
                />
              ) : (
                <>
                  <div className="folder-icon">{icons.folder}</div>
                  <div className="folder-name">{item.name}</div>
                </>
              )}
            </div>
            <div
              className={`nested-folder ${item.isExpanded ? "expanded" : ""}`}
            >
              <div className="nested-container">
                {isFieldEnabled && mode === "new" && newFilePath === path && (
                  <NewFieldContainer
                    handleAddNewItem={handleAddNewItem}
                    handleNameChange={handleNameChange}
                    hasDuplicate={hasDuplicate}
                    inputRef={inputRef}
                    type={type}
                    parentWidth={parentWidth}
                    name={name}
                    position={position}
                    items={item.items}
                  />
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
            className={`file ${selectedPath === path ? "selected" : ""} ${
              selectedPath === path && mode === "rename" ? "rename" : ""
            }`}
            style={{ width: `${parentWidth}px` }}
            onContextMenu={(event) =>
              onOpen({ event, name: item.name, type: item.type })
            }
          >
            <div className="expand-icon"></div>
            {selectedPath === path && mode === "rename" ? (
              <NewFieldContainer
                handleAddNewItem={handleAddNewItem}
                handleNameChange={handleNameChange}
                hasDuplicate={hasDuplicate}
                inputRef={inputRef}
                type={type}
                name={name}
                position={position}
                items={item.items}
                customWidth={"100%"}
              />
            ) : (
              <>
                <div className="file-icon">{icons.file}</div>
                <div className="file-name">{item.name}</div>
              </>
            )}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="app-container">
      <div className={`explorer-container ${isExpanded ? "expanded" : ""}`}>
        <ParentContainer
          filesAndFolders={filesAndFolders}
          handleCollapseAll={handleCollapseAll}
          handleNew={handleNew}
          isExpanded={isExpanded}
          setFilesAndFolders={setFilesAndFolders}
        />
        <div className="files-and-folders">
          {isFieldEnabled && mode === "new" && !selectedPath && (
            <NewFieldContainer
              handleAddNewItem={handleAddNewItem}
              handleNameChange={handleNameChange}
              inputRef={inputRef}
              hasDuplicate={hasDuplicate}
              name={name}
              type={type}
              position={position}
              items={items}
              style={{ width: "100%" }}
            />
          )}
          {renderFilesAndFolders(items)}
        </div>
        <Popover
          open={open}
          elementRef={elementRef}
          onClose={onClose}
          menuItems={fileMenuItems}
          parentIndex="in"
        />
      </div>
    </div>
  );
};

export default FileExplorer;
