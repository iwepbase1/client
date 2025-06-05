import React, { JSX, useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Typography,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { logo } from "../../constants";
import { FontWeight } from "../../types";
import { ADMINDASHBOARD } from "../../../router/config";

interface DrawerItem {
  label: string;
  nav: string;
  icon?: JSX.Element;
  children?: {
    segment: string;
    title: string;
    icon: JSX.Element;
    nav: string;
  }[];
}

const DrawerMenu = ({
  drawerList,
  drawerOpen,
  onClose,
}: {
  drawerList: DrawerItem[];
  selectedIndex: number;
  drawerOpen?: boolean;
  onClose?: any;
}) => {
  const location = useLocation();

  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isWeb = useMediaQuery("(min-width: 600px)");
  const isTab = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (isTab) {
      setIsDrawerCollapsed(true);
      setMobileOpen(false);
    }
  }, [isTab]);

  useEffect(() => {
    if (isWeb) {
      setIsDrawerCollapsed(false);
      setMobileOpen(false);
    }
  }, [isWeb]);

  useEffect(() => {
    if (isMobile) {
      setIsDrawerCollapsed(false);
      setMobileOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (drawerOpen) {
      setMobileOpen(true);
    }
  }, [drawerOpen]);

  useEffect(() => {
    onClose(mobileOpen);
  }, [mobileOpen, onClose]);

  const handleSubmenuClick = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const toggleDrawer = () => {
    setIsDrawerCollapsed(!isDrawerCollapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Typography variant={isDrawerCollapsed ? "h6" : "h3"} fontWeight={FontWeight.BOLD}>IWEP</Typography>
      {!isDrawerCollapsed ? (
        <Box
          mt={1}
          ml={0}
          mb={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            sx={{
              backgroundImage: `url(${logo})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `100px 100px`,
              height: 20,
              width: 100,
            }}
          />

          <Box sx={{ paddingLeft: 1 }}>
            <IconButton onClick={isMobile ? handleMobileToggle : toggleDrawer}>
              <Menu />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `50px 50px`,
            height: 50,
            width: 50,
            marginLeft: 1,
          }}
          onClick={toggleDrawer}
        />
      )}

      <List>
        {drawerList.map((item: DrawerItem, index: number) => (
          <React.Fragment key={index}>
            <ListItemButton
              sx={{
                padding: isDrawerCollapsed ? "10px 16px" : "10px 20px",
                backgroundColor: location.pathname.includes(
                  `${ADMINDASHBOARD}/${item.nav}`
                )
                  ? "#d5def5"
                  : "transparent",
                borderRadius: 3,
                mb: 1,
                "&:hover": {
                  backgroundColor: location.pathname.includes(
                    `${ADMINDASHBOARD}/${item.nav}`
                  )
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
              component={item.children ? "div" : Link}
              to={
                item.children
                  ? isDrawerCollapsed
                    ? undefined
                    : undefined
                  : item.nav
              }
              onClick={() =>
                isDrawerCollapsed
                  ? toggleDrawer()
                  : item.children && handleSubmenuClick(index)
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon
                    sx={{
                      color: location.pathname.includes(
                        `${ADMINDASHBOARD}/${item.nav}`
                      )
                        ? "#005792"
                        : "#757575",
                      minWidth: isDrawerCollapsed ? "unset" : 40,
                      justifyContent: isDrawerCollapsed
                        ? "center"
                        : "flex-start",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isDrawerCollapsed && (
                    <Typography
                      fontWeight="medium"
                      fontSize={14}
                      color={
                        location.pathname.includes(`/dashboard/${item.nav}`)
                          ? "#005792"
                          : "#757575"
                      }
                    >
                      {item.label}
                    </Typography>
                  )}
                </Box>
                {item.children &&
                  !isDrawerCollapsed &&
                  (openSubmenuIndex === index ? (
                    <ExpandLess style={{ color: "gray" }} />
                  ) : (
                    <ExpandMore style={{ color: "gray" }} />
                  ))}
              </Box>
            </ListItemButton>
            {item.children && !isDrawerCollapsed && (
              <Collapse
                in={openSubmenuIndex === index}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child, childIndex) => (
                    <ListItemButton
                      key={childIndex}
                      sx={{ paddingLeft: 4 }}
                      component={Link}
                      to={child.nav}
                    >
                      <ListItemIcon sx={{ color: "#72777a" }}>
                        {child.icon}
                      </ListItemIcon>
                      <Typography fontSize={14} color="#72777a">
                        {child.title}
                      </Typography>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <>
      {/* Drawer for desktop and tablet */}
      {(isWeb || isTab) && (
        <Drawer
          variant="permanent"
          sx={{
            width: isDrawerCollapsed ? 87 : 270,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: isDrawerCollapsed ? 87 : 270,
              boxSizing: "border-box",
              transition: "width 0.3s",
              padding: "15px",
              backgroundColor: "white",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: 240,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default DrawerMenu;
