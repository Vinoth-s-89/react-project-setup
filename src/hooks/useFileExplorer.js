import { useState } from "react";
import { filesAndFoldersContants } from "../constants/filesAndFolders";
import { collapseAll, expandAndCollapse } from "../utils/fileExplorer";

export const useFieleExplorer = () => {
  const [filesAndFolders, setFilesAndFolders] = useState(
    filesAndFoldersContants
  );
  const { isExpanded = false, items = [] } = filesAndFolders;
  const [selectedPath, setSelectedPath] = useState("");
  const [mode, setMode] = useState("");

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

  const handleNewClick = (event) => {
    event.stopPropagation();
    setMode("new");
  };

  const handleNew = ({ type, name }) => {};

  const handleSelect = (path) => {
    setSelectedPath(path);
  };

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
    handleNewClick,
    mode,
  };
};
