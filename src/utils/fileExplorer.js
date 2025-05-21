export const expandAndCollapse = (path, items) => {
  let index = 0;
  const recursiveUpdate = (items, path) => {
    return items.map((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveUpdate(item.items || [], path);
        } else {
          item.isExpanded = !item.isExpanded;
        }
      }
      return item;
    });
  };
  return recursiveUpdate(items, path);
};

export const addNewItem = (items = [], newItem = {}, path, whoSelected) => {
  let index = 0;
  if (whoSelected === "file") {
    path = path.slice(0, -1);
  }
  if (path.length === 0) {
    items.push(newItem);
    return items;
  }
  const recursiveAdd = (items, path) => {
    return items.map((item, i) => {
      if (i === Number(path[index])) {
        index++;
        if (index < path.length) {
          item.items = recursiveAdd(item.items, path);
        } else {
          item.items.push(newItem);
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
