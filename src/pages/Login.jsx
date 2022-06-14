import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';
import { purple } from '@mui/material/colors';
import AuthorizeGetRequest from '../api/authorizeGetRequest';
import AuthorizeLoginRequest from '../api/authorizeLoginRequest';
import {useAuth} from '../context/Auth';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Rental Online
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
    const [formData, setFormData] = useState({
        Email: '',
        password: '',
      });
      const [formSignup, setFormSignup] = useState({
        Full_name:'',  
        Email: '',
        NIN: '',
        password: '',
      });
      const [FirstName, setFirstName] = useState('');
      const [Lasterr, setLasterr] = useState(false)
      const [LastName, setLastName] = useState('');
      const [Emailerr, setEmailerr] = useState(false)
      const [NINerr, setNINerr] = useState(false)
      const [passerr, setpasserr] = useState(false)
      const [Firsterr, setFirsterr] = useState(false)
      const [Signupform, setSignupForm] = useState(false);
      const [Passworderr, setPassworderr] = useState(false)
      const [loading, setLoading] = useState(false);
      const { Email, password } = formData;
      const  auth = useAuth();
      let history = useNavigate();
      useEffect(() => {
        AuthorizeGetRequest('api/ValidateToken').then((response) => {
          if (response.status === 200) {
            history('/dashboard/Add_Roles');
          }
        });
      }, []);
      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const onChangeFirstName = (e) =>{
          setFirstName(e.target.value);
          setFirsterr(false)
      }
      const onChangeLastName = (e) =>{
          setLastName(e.target.value);
          setLasterr(false)
      }
      const addNames = (e) =>{
        var names = `${FirstName} ${LastName}`;
        console.log(names);
    setFormSignup({...formSignup,['Full_name']:names});
      }
      const onChangeSignup = (e) => {
        if (e.target.name==='Email'){
          setEmailerr(false)
        }
        if (e.target.name==='NIN'){
          setNINerr(false);
        }
        if (e.target.name ==='password'){
          setpasserr(false)
        }
        setFormSignup({...formSignup,[e.target.name]:e.target.value});
      }
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailerr(false)
    if( formData.email === ''){
        setEmailerr(true)
        return;
    }
     if( formData.password === ''){
        setPassworderr(true)
        return;
    }
    setLoading(true);
    setPassworderr(false);
    AuthorizeLoginRequest('api/signin', formData).then((response) => {
      console.log('login', response.data);
      if (response.data.status === 'success') {
        console.log('login', response.data);
        toast.success('Successfully Logged in', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const accessToken = response.data.token;
        const roles = response.data.user.role_id;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.Full_name);
        localStorage.setItem('role', response.data.user.role_id);
        console.log(roles);
        // setAuth({roles, accessToken });
        auth.login(response.data.user.role_id);
        if (roles === 'Tenant'){
          history('/dashboard/tenant',{ replace: true });
        }
        if (roles=== 'Landlord'){
          history('/dashboard/property',{ replace: true });
        }
        if (roles === 'Admin'){
          history('/dashboard/Add_Roles',{ replace: true })
        }
        setLoading(false);

      }
      else if (response.data.statusCode === 401){
        setLoading(false);
        toast.error('Please Provide Correct Email or PassCode', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    })
    .catch((error)=>{
      setLoading(false);
      console.log('errr',error)
        
    });
   
  };
  const handleSignup = (event) => {
    event.preventDefault();
    if (FirstName === ''){
      setFirsterr(true)
      return;
    }
    if ( LastName === ''){
      setLasterr(true)
      return;
    }
    if( formSignup.email === ''){
        setEmailerr(true)
    }
    if (formSignup.NIN === ''){
        setNINerr(true);
    }
    if (formSignup.password===''){
      setpasserr(true);
      return;
    }
    setLoading(true);
    AuthorizeLoginRequest('api/user', formSignup).then((response) => {
      console.log('login', response.data);
      if (response.status == 201) {
        console.log('login', response.data);
        toast.success('Successfully Registered as user', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      }
      else if (response.data.statusCode === 401){
        toast.error('Please Provide Correct Email or PassCode', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
    })
    .catch((error)=>{
      console.log(error)
        
    });
    
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {Signupform ? (<>
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSignup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  error={Firsterr ? true : false}
                  helperText={Firsterr ?  'This field is required.':''}
                  fullWidth
                  onChange={onChangeFirstName}
                  onBlur={addNames}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  error={Lasterr ? true: false}
                  helperText={Lasterr ?  'This field is required.':''}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={onChangeLastName}
                  onBlur={addNames}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={NINerr ? true : false}
                  helperText={NINerr ?  'This field is required.':''}
                  onChange={onChangeSignup}
                  id="NIN"
                  label="National Identification Number"
                  name="NIN"
                  autoComplete=""
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Emailerr ? true : false}
                  helperText={Emailerr ?  'This field is required.':''}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="Email"
                  onChange={onChangeSignup}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={onChangeSignup}
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#"  onClick={()=>{setSignupForm(false)}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
        </>):(<>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                helperText={Emailerr?'This field is required.':''} 
                error={Emailerr ? true : false}
                value={Email}
                onChange={onChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                helperText={Passworderr?'This field is required.':''} 
                error={Passworderr ? true : false}
                onChange={onChange}
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {loading ? (<>
                              <LoadingButton
                                  loading
                                 
                                  variant="outlined"
                              >
                                   Sign In
                              </LoadingButton>
              </>):(<><Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button></>)}
              
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" onClick={()=>{setSignupForm(true)}} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        
        </>)}
        
      </Grid>
    </ThemeProvider>
  );
}