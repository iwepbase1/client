import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DrawerMenu from "./DrawerMenu";
import { adminDrawerList } from "../../constants";
import { logout } from "../../../store/Auth/AuthSlice";
import InitialsAvatar from "../AvatarCircle";

const AdminLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [drawerList] = useState<any>(adminDrawerList);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose()
    dispatch(logout());
  };

  const toggleDrawer = (open: any) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentIndex = drawerList.findIndex(
      (item: any) => item.nav === currentPath
    );
    setSelectedIndex(currentIndex !== -1 ? currentIndex : 0);
  }, [location.pathname, drawerList]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{
          width: isMobile ? "100%" : "100%",
          background: "rgba(253, 251, 251, 0.25)",
          // boxShadow: 'none',
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          backdropFilter: "blur(7.5px)",
          WebkitBackdropFilter: "blur(7.5px)",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon style={{ color: "black" }} />
            </IconButton>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
          <Box
            mr={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Typography fontSize={16} style={{ color: "black" }}>
              {user.fullName}
            </Typography>
            <Typography fontSize={14} style={{ color: "black" }}>
              {user.designation}
            </Typography>
          </Box>
          <Box onClick={(e: any) => handleClick(e)} sx={{ mr: 3 }}>
            <InitialsAvatar
              name={user.fullName}
              size={45}
              imageUrl={user?.profilePicture}
            />
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <DrawerMenu
        drawerList={drawerList}
        selectedIndex={selectedIndex}
        drawerOpen={drawerOpen}
        onClose={(val: any) => {
          setDrawerOpen(val);
        }}
      />

      <Box
        style={{
          flexGrow: 1,
          paddingBottom: 20,
          marginTop: 60,
          width: "100%",
          height: "93vh",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
