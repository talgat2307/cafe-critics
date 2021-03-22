import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box, Container, Menu, MenuItem } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import { logout } from '../../store/actions/userActions';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  appBar: {
    marginBottom: 40,
  },
  headerLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
  menu: {
    marginTop: theme.spacing(4),
  },
  menuItem: {
    margin: theme.spacing(0, 1),
  },
}));

const Header = () => {

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <>
      <AppBar position="static" color='primary' elevation={0} className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <Link className={classes.headerLink} to={'/'}>Cafe Critic</Link>
            </Typography>
            {userInfo && userInfo ?
              <>
                <Button
                  startIcon={<AccountCircle/>}
                  onClick={handleMenu}
                  color="inherit"
                >
                  {userInfo.name}
                </Button>
                <Menu
                  className={classes.menu}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {userInfo.role === 'user' ?
                    <Box>
                      <MenuItem
                        component={Link}
                        to={'/add-cafe'}
                        className={classes.menuItem}
                        onClick={handleClose}
                      >Add new place</MenuItem>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                          handleClose();
                          logoutHandler()
                        }}
                      >Log Out</MenuItem>
                    </Box>
                    :
                    <Box>
                      <MenuItem
                        component={Link}
                        to={'/add-cafe'}
                        className={classes.menuItem}
                        onClick={handleClose}
                      >Add new cafe</MenuItem>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                          handleClose();
                          logoutHandler()
                        }}
                      >Log Out</MenuItem>
                    </Box>
                  }
                </Menu>
              </>
              :
              <Button
                className={classes.headerBtn}
                color='inherit'
                startIcon={<PersonIcon/>}
                component={Link}
                to={'/login'}
              >
                Login
              </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;