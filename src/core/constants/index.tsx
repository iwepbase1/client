/* eslint-disable */
import DashboardIcon from "@mui/icons-material/Dashboard";
import type { ReactNode } from "react";
import DrawRoundedIcon from "@mui/icons-material/DrawRounded";
import { ADMINDASHBOARDHOME, INTERESTSRECIEVED } from "../../router/config";

export const logo = " "

export const phoneRegExp = /^\+\d{1,4}[\s-]?\d{7,}$/;

export const REQUST_TYPE = {
  GET: "GET",
  POST: "POST",
} as const;

export type REQUST_TYPE = typeof REQUST_TYPE[keyof typeof REQUST_TYPE];


interface DrawerItem {
    label: string;
    nav: string;
    icon?: ReactNode;
    children?: {
      segment: string;
      title: string;
      icon: ReactNode;
      nav: string;
    }[];
  }


export const adminDrawerList: DrawerItem[] = [
    {
      label: "Dashboard",
      nav: ADMINDASHBOARDHOME,
      icon: <DashboardIcon />,
    },
    {
      label: "Interest Revieved",
      nav: INTERESTSRECIEVED,
      icon: <DrawRoundedIcon />,
    },
  ];



  