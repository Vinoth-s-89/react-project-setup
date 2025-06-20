export const expandAndCollapse = (path, items, isExpanded) => {
  let index = 0;
  const recursiveUpdate = (items, path) => {
    return items.map((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveUpdate(item.items || [], path);
        } else {
          item.isExpanded = isExpanded || !item.isExpanded;
        }
      }
      return item;
    });
  };
  return recursiveUpdate(items, path);
};

export const handleDelete = (items = [], path) => {
  let index = 0;
  const recursiveDelete = (items, path) => {
    return items.filter((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveDelete(item.items || [], path);
        } else {
          return false;
        }
      }
      return true;
    });
  };
  return recursiveDelete(items, path);
};

export const renameItem = (items = [], path, name) => {
  let index = 0;
  const recursiveRename = (items, path) => {
    return items.map((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveRename(item.items || [], path);
        } else {
          item.name = name;
        }
      }
      return item;
    });
  };
  return recursiveRename(items, path);
};

export const addNewItem = (
  items = [],
  newItem = {},
  path,
  whoSelected,
  deletePath
) => {
  if (deletePath) items = handleDelete(items, deletePath);
  let index = 0;
  if (!path?.length) {
    let index = findIndex(newItem, items);
    items.splice(index, 0, newItem);
    return items;
  }
  if (whoSelected === "file") {
    path = path.slice(0, -1);
  }
  const recursiveAdd = (items, path) => {
    return items.map((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveAdd(item.items, path);
        } else {
          if (!item.items) {
            item.items = [newItem];
          } else {
            let index = findIndex(newItem, item.items);
            if (index > -1) item.items.splice(index, 0, newItem);
          }
        }
      }
      return item;
    });
  };
  return recursiveAdd(items, path);
};

export const findDuplicate = (newItem, items = []) =>
  items.some(
    (item) => item.name === newItem.name && item.type === newItem.type
  );

const findIndex = (newItem, items = []) => {
  let index = newItem.type === "folder" ? 0 : items.length;
  for (let j = 0; j < items.length; j++) {
    let { name = "", type = "" } = items[j];
    if (name.localeCompare(newItem.name) === 0) {
      return -1;
    }
    if (newItem.type === type && name.localeCompare(newItem.name) > 0) {
      index = j;
      break;
    } else if (newItem.type === "folder" && newItem.type === type) {
      index = j + 1;
    }
  }
  return index;
};

export const collapseAll = (items = []) =>
  items.map((item) => {
    if (item.type === "folder") {
      item.isExpanded = false;
      if (item.items) {
        item.items = collapseAll(item.items);
      }
    }
    return item;
  });

export function sortItems(items = []) {
  return items.sort((a, b) => {
    [a, b].forEach((item) => {
      if (
        item.type === "folder" &&
        Array.isArray(item.items) &&
        !item.isSorted
      ) {
        item.items = sortItems(item.items);
        item.isSorted = true;
      }
    });
    if (a.type !== b.type) {
      return a.type === "folder" ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  });
}
