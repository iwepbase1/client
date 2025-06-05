import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import useAsyncRequest from '../../core/networking/useAsyncRequest';
import { adminLogin } from '../../store/Auth/services';
import { useNavigate } from 'react-router-dom';
import Loader from '../../core/components/Loader';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/Auth/AuthSlice';
import { ADMINDASHBOARD } from '../../router/config';

const AdminLoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { execute, loading } = useAsyncRequest(adminLogin);

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setUserIdError('');
    setPasswordError('');
    setError(null);

    if (!userId.trim()) {
      setUserIdError('User ID is required');
      isValid = false;
    } else if (!/^IW/.test(userId)) {
      setUserIdError('Enter a valid IWEP user ID');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = { userId, password };

    execute(payload, (response: any) => {
      if (response.status === 200) {
        const { data } = response;
        dispatch(signIn(data));
        navigate(ADMINDASHBOARD);
      } else {
        setError(response.data.message || 'Login failed');
      }
    });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f5f7fa">
      <Loader open={loading} />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <Typography variant="h5" gutterBottom align="center">
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              fullWidth
              label="User ID"
              variant="outlined"
              margin="normal"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              error={Boolean(userIdError)}
              helperText={userIdError}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              required
            />
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLoginScreen;
