import React from "react";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import GroupIcon from "@mui/icons-material/Group";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import SettingsIcon from "@mui/icons-material/Settings";
interface Route {
  path: string;
  content: string;
  icon: React.ReactElement;
}

const routes: Route[] = [
  {
    path: "/main",
    content: "Asosiy",
    icon: <DashboardCustomizeRoundedIcon />,
  },
  {
    path: "/main/orders",
    content: "Buyurtmalar",
    icon: <DryCleaningIcon />,
  },
  {
    path: "/main/services",
    content: "Xizmatlar",
    icon: <LocalLaundryServiceIcon />,
  },
  {
    path: "/main/clients",
    content: "Mijozlar",
    icon: <GroupIcon />,
  },
  // {
  //   path: "/main/",
  //   content: "SMS Marketing",
  //   icon: <MailOutlineIcon />,
  // },
  // {
  //   path: "/main/",
  //   content: "Sozlamalar",
  //   icon: <SettingsIcon />,
  // },
];

export default routes;
