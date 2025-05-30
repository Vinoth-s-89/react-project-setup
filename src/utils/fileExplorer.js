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

export const addNewItem = (
  items = [],
  newItem = {},
  path,
  whoSelected,
  duplicate
) => {
  let index = 0;
  if (!path?.length) {
    items.push(newItem);
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
            item.items = [];
            item.items.push(newItem);
          } else {
            let { hasDuplicate, index } = findDuplicateAndIndex(
              newItem,
              item.items
            );
            if (hasDuplicate) {
              duplicate.hasDuplicate = hasDuplicate;
              return item;
            }
            index = index === -1 ? item.items.length : index;
            item.items.splice(index, 0, newItem);
          }
        }
      }
      return item;
    });
  };
  return recursiveAdd(items, path);
};

const findDuplicateAndIndex = (newItem, items = []) => {
  let index = newItem.type === "folder" ? 0 : items.length,
    hasDuplicate = false;
  for (let j = 0; j < items.length; j++) {
    let { name = "", type = "" } = items[j];
    if (name == newItem.name && type == newItem.type) {
      hasDuplicate = true;
      break;
    }
    if (newItem.type === type && name.localeCompare(newItem.name) > 0) {
      index = j;
      break;
    }
  }
  return { hasDuplicate, index };
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
