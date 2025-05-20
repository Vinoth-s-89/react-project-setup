export const filesAndFoldersContants = {
  type: "parent-folder",
  name: "React Project Setup",
  items: [
    {
      type: "folder",
      name: "public",
      // isExpanded: true,
      items: [
        {
          type: "file",
          name: "index.html",
        },
        {
          type: "file",
          name: "favicon.ico",
        },
        {
          type: "file",
          name: "manifest.json",
        },
        {
          type: "file",
          name: "robots.txt",
        },
      ],
    },
    {
      type: "folder",
      name: "src",
      items: [
        {
          type: "folder",
          name: "components",
          items: [
            {
              type: "file",
              name: "Header.js",
            },
            {
              type: "file",
              name: "Footer.js",
            },
          ],
        },
        {
          type: "folder",
          name: "shared",
          items: [
            {
              type: "file",
              name: "TextField.js",
            },
            {
              type: "file",
              name: "RadioFile.js",
            },
          ],
        },
        {
          type: "file",
          name: "index.js",
        },
        {
          type: "file",
          name: "App.js",
        },
        {
          type: "file",
          name: "App.css",
        },
      ],
    },
    {
      type: "file",
      name: ".gitignore",
    },
    {
      type: "file",
      name: "package.json",
    },
  ],
};
