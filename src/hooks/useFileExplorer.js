import { useEffect, useRef, useState } from "react";
import { filesAndFoldersContants } from "../constants/filesAndFolders";
import {
  addNewItem,
  collapseAll,
  expandAndCollapse,
  findDuplicate,
  handleDelete,
  renameItem,
  sortItems,
} from "../utils/fileExplorer";

export const useFieleExplorer = () => {
  const [filesAndFolders, setFilesAndFolders] = useState({});
  const [open, setOpen] = useState(false);
  const [selectInfo, setSelectInfo] = useState({
    mode: "",
    selectedPath: null,
    isFieldEnabled: false,
    name: "",
    type: "",
    whoSelected: "",
    hasDuplicate: false,
    position: {},
  });
  const inputRef = useRef(null);
  const elementRef = useRef(null);

  const { isExpanded = false, items = [] } = filesAndFolders;
  const {
    mode,
    selectedPath,
    isFieldEnabled,
    name,
    type,
    whoSelected,
    hasDuplicate,
    position = {},
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
    setSelectInfo({
      ...selectInfo,
      isFieldEnabled: true,
      type,
      mode,
    });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleAddNewItem = (event) => {
    if (event.key === "Enter" && !hasDuplicate) {
      event.preventDefault();
      setFilesAndFolders({
        ...filesAndFolders,
        items:
          mode === "rename"
            ? renameItem([...items], selectedPath, name)
            : addNewItem([...items], { name, type }, selectedPath, whoSelected),
      });
      setSelectInfo({
        ...selectInfo,
        isFieldEnabled: false,
        name: "",
        mode: "",
        type: "",
        hasDuplicate: false,
        position: {},
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
      position: {},
    });
  };

  const onOpen = ({ event, name, type }) => {
    elementRef.current = event.currentTarget;
    event.stopPropagation();
    event.preventDefault();
    setOpen(!open);
    setSelectInfo((prev) => ({
      ...prev,
      name,
      type,
    }));
  };

  const onDragStart = ({ event, name, type, path }) => {
    event.dataTransfer.setData("type", type);
    event.dataTransfer.setData("name", name);
    event.dataTransfer.setData("path", path);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, path) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("type");
    const name = event.dataTransfer.getData("name");
    const draggedPath = event.dataTransfer.getData("path");
    if (draggedPath === path) return;
    setFilesAndFolders((prev) => ({
      ...prev,
      items: addNewItem([...items], { name, type }, path, whoSelected),
    }));
    setFilesAndFolders((prev) => ({
      ...prev,
      items: handleDelete(prev.items, draggedPath),
    }));
  };

  const onClose = () => {
    setOpen(false);
    elementRef.current = null;
  };

  const fileMenuItems = [
    {
      label: "Rename",
      onClick: () => {
        setSelectInfo((prev) => ({
          ...prev,
          mode: "rename",
        }));
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      },
    },
    {
      label: "Delete",
      onClick: () =>
        setFilesAndFolders((prev) => ({
          ...prev,
          items: handleDelete(prev.items, selectedPath),
        })),
    },
  ];

  useEffect(() => {
    if (inputRef.current) {
      setSelectInfo((prev) => ({
        ...prev,
        position: {
          x: inputRef.current.offsetLeft,
          y: inputRef.current.offsetTop + inputRef.current.offsetHeight + 2,
        },
      }));
    }
  }, [inputRef, selectInfo.mode]);

  useEffect(() => {
    setFilesAndFolders({
      ...filesAndFoldersContants,
      items: sortItems(filesAndFoldersContants.items),
    });
  }, []);

  useEffect(() => {
    if (!filesAndFolders.isExpanded) {
      setSelectInfo({
        mode: "",
        selectedPath: null,
        isFieldEnabled: false,
        name: "",
        type: "",
        whoSelected: "",
        hasDuplicate: false,
        position: {},
      });
    }
  }, [filesAndFolders.isExpanded]);

  useEffect(() => {
    const handleClickOutside = () => {
      setSelectInfo({
        mode: "",
        selectedPath: null,
        isFieldEnabled: false,
        name: "",
        type: "",
        whoSelected: "",
        position: {},
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
    position,
    name,
    open,
    onOpen,
    onClose,
    elementRef,
    fileMenuItems,
    onDrop,
    onDragOver,
    onDragStart,
  };
};
