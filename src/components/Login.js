import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router';

import { toast } from 'react-toastify';
import { purple } from '@mui/material/colors';
import AuthorizeGetRequest from '../api/authorizeGetRequest';
import AuthorizeLoginRequest from '../api/authorizeLoginRequest';

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 280,
    margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const ColorButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  // eslint-disable-next-line prefer-const
  let history = useHistory();
  useEffect(() => {
    AuthorizeGetRequest('api/ValidateToken').then((response) => {
      if (response.status == 200) {
        history.push('/Add_roles');
      }
    });
  }, []);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    setLoading(true);
    AuthorizeLoginRequest('api/signin', formData).then((response) => {
      console.log('login', response.data);
      if (response.status == 201) {
        toast.success('Successfully Logged in', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.user.Full_name);
        history.replace('/dashboard');
      } else if (response.status == 401) {
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
    });
    setLoading(false);
    e.preventDefault();
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={onSubmit}>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '28ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter username"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              fullWidth
              type="password"
              variant="standard"
              required
            />
          </Box>
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <ColorButton type="submit" color="primary" variant="contained" fullWidth>
            Sign in
          </ColorButton>
          <Typography>
            <Link href="#">Forgot password ?</Link>
          </Typography>
        </form>

        <Typography>
          {' '}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
