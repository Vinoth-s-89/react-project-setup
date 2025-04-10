export const checkboxOptions = [
  {
    label: "Option 1",
    options: [
      {
        label: "Option 1.1",
        options: [
          {
            label: "Option 1.1.1",
          },
          {
            label: "Option 1.1.2",
            options: [
              {
                label: "Option 1.1.2.1",
              },
              {
                label: "Option 1.1.2.2",
              },
            ],
          },
        ],
      },
      {
        label: "Option 1.2",
      },
      {
        label: "Option 1.3",
      },
    ],
  },
  {
    label: "Option 2",
    options: [
      {
        label: "Option 2.1",
      },
      {
        label: "Option 2.2",
      },
    ],
  },
  {
    label: "Option 3",
  },
  {
    label: "Option 4",
  },
  {
    label: "Option 5",
  },
  {
    label: "Option 6",
  },
];

const checkAndUncheckChild = (options = [], checked) =>
  options.map((option) => {
    if (option?.options?.length > 0) {
      option.options = checkAndUncheckChild(option.options, checked);
    }
    option.checked = checked;
    return option;
  });

const checkChildern = (options = []) => {
  let allChecked = true,
    anyChecked = false;

  options.forEach((option) => {
    if (option?.options?.length > 0) {
      const { allChecked: childAllChecked, anyChecked: childAnyChecked } =
        checkChildern(option.options);
      allChecked = allChecked && childAllChecked;
      anyChecked = anyChecked || childAnyChecked;
    }
    if (option.checked) {
      anyChecked = true;
    } else {
      allChecked = false;
    }
  });

  return { allChecked, anyChecked };
};

export const updateCheckboxOption = (options, path) => {
  const indices = path.slice(1).split("-");
  let index = 0;
  const recursiveUpdate = (innerOptions) => {
    return innerOptions.map((option, i) => {
      if (i === Number(indices[index])) {
        index++;
        if (index < indices.length) {
          option.options = recursiveUpdate(option.options || []);
          const { allChecked, anyChecked } = checkChildern(option.options);
          option.checked = allChecked;
          if (!anyChecked && option.checked) {
            option.checked = false;
          }
        } else {
          option.checked = !option.checked;
          option.options = checkAndUncheckChild(option.options, option.checked);
        }
        return option;
      }
      return option;
    });
  };
  return recursiveUpdate(options, indices);
};
