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

export const updateCheckboxOption = (options, path) => {
  const indices = path.slice(1).split("-");
  let index = 0;
  const recursiveUpdate = (innerOptions) => {
    return innerOptions.map((option, i) => {
      if (i === Number(indices[index])) {
        index++;
        const updatedOption = { ...option };
        if (index < indices.length) {
          updatedOption.options = recursiveUpdate(option.options || []);
        } else {
          updatedOption.checked = !option.checked;
        }
        return updatedOption;
      }
      return option;
    });
  };
  return recursiveUpdate(options, indices);
};
