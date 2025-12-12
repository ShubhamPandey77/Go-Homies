import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../Store/UserDataSlice';
import Cookies from 'js-cookie';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  padding: '12px 16px',
  height: '70px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.UserData || {});

  const Logout = () => {
    Cookies.remove('uid');
    dispatch(
      setUserData({
        name: '',
        email: '',
        username: '',
        designation: '',
        about: '',
        title: '',
        isAuthenticated: false,
      })
    );
    // redirect to home after logout
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 8px)',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* Logo with Text */}
            <Box 
              onClick={() => navigate('/')}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 0.8,
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="45"
                height="45"
                viewBox="0 0 1024 1024"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                  fill="#6B8E23"
                  stroke="none"
                >
                  <path d="M4783 6471 c-23 -11 -48 -30 -57 -43 -8 -12 -71 -176 -139 -363 -69 -187 -142 -386 -163 -441 l-38 -102 -50 -6 c-28 -3 -136 -6 -239 -6 -156 0 -189 2 -193 15 -6 14 178 580 242 747 19 48 34 97 34 109 0 11 -13 34 -29 50 -25 25 -37 29 -83 29 -29 0 -107 -14 -173 -31 -499 -128 -705 -265 -705 -466 0 -135 67 -208 201 -220 106 -10 139 42 80 123 -29 40 -34 56 -32 108 2 62 137 154 319 220 84 30 92 31 92 12 0 -18 -94 -343 -158 -546 l-49 -155 -94 -13 c-128 -18 -222 -51 -345 -123 -58 -33 -108 -58 -113 -55 -4 3 -11 35 -13 71 -17 209 -196 323 -400 254 -186 -62 -363 -286 -445 -560 -24 -80 -28 -111 -27 -209 1 -133 22 -206 80 -270 67 -74 197 -106 312 -76 184 47 341 222 426 475 19 57 38 107 43 111 13 12 289 130 366 156 72 25 117 31 117 16 0 -9 -198 -592 -219 -645 -30 -78 3 -123 90 -121 55 2 141 44 158 77 6 12 61 168 122 347 61 179 117 335 125 347 18 28 37 31 283 38 l204 7 -7 -29 c-4 -15 -31 -94 -61 -174 -79 -211 -115 -359 -115 -470 0 -107 15 -151 61 -175 63 -32 210 3 221 54 3 9 -2 34 -9 56 -21 62 -16 154 16 278 26 101 174 519 452 1276 102 281 103 289 39 323 -44 24 -74 24 -127 0z m-1936 -996 c29 -20 43 -73 43 -157 0 -67 0 -68 -27 -68 -69 0 -123 67 -123 152 0 77 51 112 107 73z m-253 -260 c35 -59 100 -102 188 -124 86 -23 86 -18 23 -146 -94 -192 -228 -282 -314 -210 -43 37 -54 82 -49 194 4 75 11 111 33 161 26 63 83 170 90 170 2 0 15 -20 29 -45z" />
                </g>
              </svg>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', fontSize: '1.2rem', color: '#6B8E23' }}>
                GoHomies
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 1 }}>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#6B8E23',
                    backgroundColor: 'rgba(107, 142, 35, 0.1)',
                  }
                }}
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#6B8E23',
                    backgroundColor: 'rgba(107, 142, 35, 0.1)',
                  }
                }}
                onClick={() => navigate('/posts')}
              >
                Posts
              </Button>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#6B8E23',
                    backgroundColor: 'rgba(107, 142, 35, 0.1)',
                  }
                }}
                onClick={() => navigate('/vlogs')}
              >
                Vlogs
              </Button>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#6B8E23',
                    backgroundColor: 'rgba(107, 142, 35, 0.1)',
                  }
                }}
                onClick={() => navigate('/about_us')}
              >
                About
              </Button>
              <Button 
                variant="text" 
                sx={{ 
                  color: '#333',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#6B8E23',
                    backgroundColor: 'rgba(107, 142, 35, 0.1)',
                  }
                }}
                onClick={() => navigate('/contact_us')}
              >
                Contact
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              alignItems: 'center',
            }}
          >
            {!userData?.isAuthenticated && (
              <>
                <Button
                  variant="text"
                  sx={{
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: '#6B8E23',
                      backgroundColor: 'rgba(107, 142, 35, 0.1)',
                    }
                  }}
                  onClick={() => navigate('/signin')}
                >
                  Sign in
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#6B8E23',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    '&:hover': {
                      backgroundColor: '#5a7a1c',
                      boxShadow: '0 4px 12px rgba(107, 142, 35, 0.3)',
                    }
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}

            {userData?.isAuthenticated && (
              <>
                <Button 
                  variant="text"
                  sx={{
                    color: '#333',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': {
                      color: '#6B8E23',
                      backgroundColor: 'rgba(107, 142, 35, 0.1)',
                    }
                  }}
                  onClick={() => navigate('/userprofile')}
                >
                  {userData?.name ? userData.name.split(' ')[0] : 'User'}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#6B8E23',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    '&:hover': {
                      backgroundColor: '#5a7a1c',
                      boxShadow: '0 4px 12px rgba(107, 142, 35, 0.3)',
                    }
                  }}
                  onClick={() => Logout()}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                  backgroundColor: '#fff',
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem 
                  onClick={() => { navigate('/'); setOpen(false); }}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                >
                  Home
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/posts'); setOpen(false); }}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                >
                  Posts
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/vlogs'); setOpen(false); }}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                >
                  Vlogs
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/about_us'); setOpen(false); }}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                >
                  About Us
                </MenuItem>
                <MenuItem 
                  onClick={() => { navigate('/contact_us'); setOpen(false); }}
                  sx={{ py: 1.5, fontSize: '1rem', fontWeight: 500 }}
                >
                  Contact Us
                </MenuItem>

                <Divider sx={{ my: 3 }} />

                {!userData?.isAuthenticated && (
                  <>
                    <MenuItem>
                      <Button
                        sx={{
                          backgroundColor: '#6B8E23',
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: '#5a7a1c',
                          }
                        }}
                        fullWidth
                        onClick={() => {
                          navigate('/signup');
                          setOpen(false);
                        }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>

                    <MenuItem>
                      <Button
                        variant="outlined"
                        sx={{
                          color: '#6B8E23',
                          borderColor: '#6B8E23',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: 'rgba(107, 142, 35, 0.1)',
                            borderColor: '#6B8E23',
                          }
                        }}
                        fullWidth
                        onClick={() => {
                          navigate('/signin');
                          setOpen(false);
                        }}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}

                {userData?.isAuthenticated && (
                  <>
                    <MenuItem>
                      <Button
                        sx={{
                          color: '#333',
                          fontWeight: 500,
                          textTransform: 'none',
                          '&:hover': {
                            color: '#6B8E23',
                          }
                        }}
                        fullWidth
                        onClick={() => {
                          navigate('/userprofile');
                          setOpen(false);
                        }}
                      >
                        Profile ({userData?.name?.split(' ')[0]})
                      </Button>
                    </MenuItem>

                    <MenuItem>
                      <Button
                        sx={{
                          backgroundColor: '#6B8E23',
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'none',
                          borderRadius: '8px',
                          '&:hover': {
                            backgroundColor: '#5a7a1c',
                          }
                        }}
                        fullWidth
                        onClick={() => {
                          Logout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
