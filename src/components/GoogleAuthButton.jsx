import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { googleLogin } from '../utils/backend';

function GoogleAuthButton({ setError }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        username: decoded.name,
        email: decoded.email,
        authSource: 'google',
      };
      const user = await googleLogin(userData);
      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed');
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => setError('Google login failed')}
    />
  );
}

export default GoogleAuthButton;