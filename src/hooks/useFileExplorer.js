import { useEffect, useRef, useState } from "react";
import { filesAndFoldersContants } from "../constants/filesAndFolders";
import {
  addNewItem,
  collapseAll,
  expandAndCollapse,
  findDuplicate,
  sortItems,
} from "../utils/fileExplorer";

export const useFieleExplorer = () => {
  const [filesAndFolders, setFilesAndFolders] = useState({});
  const [selectInfo, setSelectInfo] = useState({
    mode: "",
    selectedPath: null,
    isFieldEnabled: false,
    name: "",
    type: "",
    whoSelected: "",
    hasDuplicate: false,
  });
  const inputRef = useRef(null);
  const duplicateRef = useRef(null);

  const { isExpanded = false, items = [] } = filesAndFolders;
  const {
    mode,
    selectedPath,
    isFieldEnabled,
    name,
    type,
    whoSelected,
    hasDuplicate,
  } = selectInfo;

  const handleExpandCollapse = (path, isExpanded) => {
    setFilesAndFolders({
      ...filesAndFolders,
      items: expandAndCollapse(path, [...items], isExpanded),
    });
    handleSelect(path, "folder");
  };

  const handleCollapseAll = (event) => {
    event.stopPropagation();
    setFilesAndFolders({ ...filesAndFolders, items: collapseAll([...items]) });
  };

  const handleNew = ({ event, type = "", mode = "" }) => {
    event.stopPropagation();
    if (selectedPath) handleExpandCollapse(selectedPath, true);
    setSelectInfo({ ...selectInfo, isFieldEnabled: true, type, mode });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleAddNewItem = (event) => {
    if (event.key === "Enter" && !hasDuplicate) {
      event.preventDefault();
      setFilesAndFolders({
        ...filesAndFolders,
        items: addNewItem(
          [...items],
          { name, type },
          selectedPath,
          whoSelected
        ),
      });
      setSelectInfo({
        ...selectInfo,
        isFieldEnabled: false,
        name: "",
        mode: "",
        type: "",
        hasDuplicate: false,
      });
    }
  };

  const handleNameChange = (event, items) => {
    const name = event.target.value.trim();
    setSelectInfo({
      ...selectInfo,
      name,
      hasDuplicate: findDuplicate({ name, type }, items),
    });
  };

  const handleSelect = (selectedPath, whoSelected) => {
    setSelectInfo({
      ...selectInfo,
      selectedPath,
      isFieldEnabled: false,
      name: "",
      mode: "",
      type: "",
      whoSelected,
    });
  };

  useEffect(() => {
    setFilesAndFolders({
      ...filesAndFoldersContants,
      items: sortItems(filesAndFoldersContants.items),
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectInfo({
        mode: "",
        selectedPath: null,
        isFieldEnabled: false,
        name: "",
        type: "",
        whoSelected: "",
      });
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectInfo]);

  return {
    filesAndFolders,
    handleExpandCollapse,
    handleCollapseAll,
    handleNew,
    items,
    isExpanded,
    setFilesAndFolders,
    handleSelect,
    selectedPath,
    mode,
    isFieldEnabled,
    handleNameChange,
    inputRef,
    handleAddNewItem,
    whoSelected,
    type,
    hasDuplicate,
  };
};
