import * as React from 'react';
import { makeStyles } from "@mui/styles";
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import {useAuth} from '../context/Auth';
import { toast } from 'react-toastify';
import logo2 from '../assets/imgs/logo.png';
import logo1 from '../assets/imgs/low-res-logo.png';
import { Avatar } from '@mui/material';
import nav from "../util";
import AuthorizeLogoutRequest from '../api/authorizeLogoutRequest';

const drawerWidth = 240;
const LeftbarStyle = makeStyles(_theme => ({
    appBar: {
        color: 'white',
        backgroundColor: '#F44336'
    },
    topbarLogo:{
        height:'50px',
        width:'198px'
    }
}))
 const userrole = localStorage.getItem('role');
const SideMenu = (
    { role, dropdown, title, to, titleIcon, dropdownItems,user }) => {
        
    const history = useNavigate()
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    if (dropdown === true) {
        if(user === role){
            return (
                <List>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                {titleIcon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {dropdownItems.map((task1) => {
                                    return (
                                        <ListItemButton key={task1.id} onClick={() => history(task1.to)} sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    {task1.titleIcon}
                                                </ListItemIcon>
                                                <ListItemText primary={task1.title} />
                                            </ListItemButton>
                                    )
                                })}
                            </List>
                        </Collapse>
                    </List>
            )
        }
       
    } 
    if(user === role){
        
        return (
            <List>
                    <ListItemButton onClick={() => history(to)}>
                        <ListItemIcon>
                            {titleIcon}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItemButton>
                </List>
        );
    }else{
        return(
           <>
           </>
        )
    }
    

        
    

}
function ResponsiveDrawer(props) {
    const cl = LeftbarStyle()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const auth =useAuth();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
      };
      const history = useNavigate();
      const onSubmitLogout = (e) => {
       
        e.preventDefault();
        AuthorizeLogoutRequest('api/logout').then((response) => {
          console.log('login', response.data);
          if (response.status === 200) {
            toast.success(response.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            handleMenuClose()
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            history('/')
            auth.logout();
          } else {
            toast.error("Ooops Contact Admin", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={onSubmitLogout}>Sign Out{``} <LogoutIcon/> </MenuItem>
    </Menu>
  );


    const container = window !== undefined ? () => window().document.body : undefined;
   
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={cl.appBar}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <Avatar variant='circle' src={logo2} alt='App Logo'/>
                    </div>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                       {/* <Avatar variant='square' src={logo1} alt='App Logo'  className={cl.topbarLogo}/> */}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={0} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={`mobileMenuId`}
                            aria-haspopup="true"
                            // onClick={`handleMobileMenuOpen`}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
                {renderMenu}
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    classes={{ paper: cl.drawerPaper }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth, color: 'black',
                            backgroundColor: '#F3f3f3'
                        },
                    }}
                    open
                >
                    <Toolbar />
                    <Divider />
                    {nav.map((task, index) => (
                        <SideMenu
                            user={userrole}
                            role={task.role}
                            key={task.id}
                            id={task.id}
                            dropdown={task.dropdown}
                            title={task.title}
                            to={task.to}
                            titleIcon={task.titleIcon}
                            dropdownItems={task.dropdownItems}

                        />
                    ))}
                    {/* {drawer} */}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <main>
                    {props.children}
                </main>

            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    children: PropTypes.func,
};

export default ResponsiveDrawer;
