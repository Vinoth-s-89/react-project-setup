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

export const addNewItem = (items = [], newItem = {}, path, whoSelected) => {
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
          }
          item.items.push(newItem);
          item.items = sortItems(item.items);
        }
      }
      return item;
    });
  };
  return recursiveAdd(items, path);
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

export function sortItems(items) {
  if (!items || !Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (item.type === "folder" && item.items) {
        return { ...item, items: sortItems(item.items) };
      }
      return item;
    })
    .sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
}
