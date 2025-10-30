import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React from 'react';
import { useNavigate } from 'react-router';
import Clock from '../../Clock/Clock';
import { pages } from '../../../utils';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar: React.FC = ({ }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'var(--main-color)', minHeight: '0px', zIndex: '1', }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO
            </Typography>
            <Box sx={{
              flexGrow: 1, display: {
                xs: 'flex', md: 'none', top: '0px',
                left: '0px',
              }
            }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ top: '0px', left: '0px', }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => {
                  const [key, value] = Object.entries(page)[0];
                  return (
                    <MenuItem key={key} onClick={handleCloseNavMenu}>
                      <Button
                        key={key}
                        onClick={() => { navigate(`/${key}`) }}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {value}
                      </Button>
                    </MenuItem>
                  );
                }
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                const [key, value] = Object.entries(page)[0];
                return (
                  <Button
                    key={key}
                    onClick={() => { navigate(`/${key}`) }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {value}
                  </Button>
                );
              }
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Clock />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavigationBar;