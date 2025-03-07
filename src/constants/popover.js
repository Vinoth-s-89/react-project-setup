import { icons } from "./icons";

export const menuItems = [
  {
    label: "My Profile",
    icon: icons.account,
  },
  {
    label: "Add Another Account",
    icon: icons["add-account"],
    menuItems: [
      {
        label: "My Profile",
        icon: icons.account,
      },
      {
        label: "Add Another Account",
        icon: icons["add-account"],
      },
      {
        label: "Settings",
        icon: icons.settings,
        menuItems: [
          {
            label: "My Profile",
            icon: icons.account,
          },
          {
            label: "Add Another Account",
            icon: icons["add-account"],
          },
          {
            label: "Settings",
            icon: icons.settings,
            menuItems: [
              {
                label: "My Profile",
                icon: icons.account,
              },
              {
                label: "Add Another Account",
                icon: icons["add-account"],
              },
              {
                label: "Settings",
                icon: icons.settings,
              },
              {
                label: "Logout",
                icon: icons.logout,
              },
            ],
          },
          {
            label: "Logout",
            icon: icons.logout,
          },
        ],
      },
      {
        label: "Logout",
        icon: icons.logout,
      },
    ],
  },
  {
    label: "Settings",
    icon: icons.settings,
  },
  {
    label: "Logout",
    icon: icons.logout,
  },
];
