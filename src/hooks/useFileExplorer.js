import { useEffect, useRef, useState } from "react";
import { filesAndFoldersContants } from "../constants/filesAndFolders";
import { collapseAll, expandAndCollapse } from "../utils/fileExplorer";

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
  const { mode, selectedPath, isFieldEnabled } = selectInfo;

  const handleExpandCollapse = (path) => {
    setFilesAndFolders({
      ...filesAndFolders,
      items: expandAndCollapse(path, [...items]),
    });
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
  };
};
