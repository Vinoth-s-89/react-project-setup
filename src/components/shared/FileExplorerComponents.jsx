import { icons } from "../../constants/icons";

export const ParentContainer = ({
  isExpanded,
  filesAndFolders,
  handleNew,
  handleCollapseAll,
  setFilesAndFolders,
}) => {
  return (
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
            onClick={(event) => handleNew({ event, mode: "new", type: "file" })}
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
          <div onClick={(event) => handleNew({ event })}>{icons.refresh}</div>
          <div onClick={handleCollapseAll}>{icons.minimize}</div>
        </div>
      )}
    </div>
  );
};

export const NewFieldContainer = ({
  type,
  hasDuplicate,
  handleNameChange,
  inputRef,
  handleAddNewItem,
  style = {},
  parentWidth = 310,
  items = [],
  position = {},
  name,
}) => {
  return (
    <div className="new-field-container" style={style}>
      <div className={`${type}-icon`}>{icons[type]}</div>
      <input
        type="text"
        className={`name-input-field ${hasDuplicate ? "duplicate" : ""}`}
        style={{ width: `${parentWidth - 40}px` }}
        onChange={(event) => handleNameChange(event, items)}
        ref={inputRef}
        onKeyUp={handleAddNewItem}
        onClick={(event) => event.stopPropagation()}
      />
      <div
        className={`dupliacte-info ${hasDuplicate ? "show" : ""}`}
        style={{
          width: `${parentWidth - 30}px`,
          left: position.x,
          top: position.y,
        }}
      >
        A {type} name {name} already exist at this location. Please choose a
        different name.
      </div>
    </div>
  );
};
