import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Alert } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { login, userExists } from '../utils/Backend'; // Import userExists
import GoogleAuthButton from '../components/GoogleAuthButton';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value)
          ? ''
          : 'Password must be at least 8 characters, including uppercase, lowercase, number, and special character';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
    };
    setFormErrors(errors);

    if (Object.values(errors).every((err) => err === '')) {
      try {
        // Check if user exists
        if (!userExists(formData.email)) {
          setError('User not found. Redirecting to Sign Up...');
          setTimeout(() => navigate('/SignUp'), 2000); // Redirect after 2 seconds
          return;
        }
        // Proceed with login if user exists
        const userData = await login(formData.email, formData.password);
        authLogin(userData);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const isFormValid = Object.values(formErrors).every((err) => err === '') &&
                      formData.email !== '' && formData.password !== '';

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign In
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 1 }}
            disabled={!isFormValid}
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <GoogleAuthButton setError={setError} />
          </Box>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/SignUp">Sign up</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default SignIn;