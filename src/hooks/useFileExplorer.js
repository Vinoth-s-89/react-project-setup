import { useEffect, useRef, useState } from "react";
import { filesAndFoldersContants } from "../constants/filesAndFolders";
import {
  addNewItem,
  collapseAll,
  expandAndCollapse,
} from "../utils/fileExplorer";

export const useFieleExplorer = () => {
  const [filesAndFolders, setFilesAndFolders] = useState(
    filesAndFoldersContants
  );
  const [selectInfo, setSelectInfo] = useState({
    mode: "",
    selectedPath: null,
    isFieldEnabled: false,
    name: "",
    type: "",
  });
  const inputRef = useRef(null);

  const { isExpanded = false, items = [] } = filesAndFolders;
  const { mode, selectedPath, isFieldEnabled, name, type } = selectInfo;

  const handleExpandCollapse = (path) => {
    setFilesAndFolders({
      ...filesAndFolders,
      items: expandAndCollapse(path, [...items]),
    });
    handleSelect(path);
  };

  const handleCollapseAll = (event) => {
    event.stopPropagation();
    setFilesAndFolders({ ...filesAndFolders, items: collapseAll([...items]) });
  };

  const handleNew = ({ event, type, mode }) => {
    event.stopPropagation();
    // handleExpandCollapse(selectedPath);
    setSelectInfo({ ...selectInfo, isFieldEnabled: true, type, mode });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleAddNewItem = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setFilesAndFolders({
        ...filesAndFolders,
        items: addNewItem([...items], { name, type }, selectedPath),
      });
      setSelectInfo({
        ...selectInfo,
        isFieldEnabled: false,
        name: "",
        mode: "",
        type: "",
      });
    }
  };

  const handleNameChange = (event) => {
    setSelectInfo({ ...selectInfo, name: event.target.value });
  };

  const handleSelect = (selectedPath) => {
    setSelectInfo({
      ...selectInfo,
      selectedPath,
      isFieldEnabled: false,
      name: "",
      mode: "",
      type: "",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setSelectInfo({
          ...selectInfo,
          isFieldEnabled: false,
          name: "",
          mode: "",
          type: "",
        });
      }
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
  };
};
