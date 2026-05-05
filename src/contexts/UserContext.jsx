import {createContext, useState, useCallback} from 'react';
import {useAuthentication, useUser as useApiUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router';

const UserContext = createContext(null);

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useApiUser();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      if (loginResult && loginResult.token) {
        localStorage.setItem('token', loginResult.token);
        // fetch user data
        const userResult = await getUserByToken(loginResult.token);
        setUser(userResult.user || null);
        if (userResult.user && userResult.user.username) {
          localStorage.setItem('username', userResult.user.username);
        }
        navigate('/', {replace: true});
      }
    } catch (e) {
      console.error('handleLogin error', e);
      throw e;
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setUser(null);
      navigate('/', {replace: true});
    } catch (e) {
      console.error('handleLogout error', e);
    }
  };

  const handleAutoLogin = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user || null);
        if (userResult.user && userResult.user.username) {
          localStorage.setItem('username', userResult.user.username);
        }
      }
    } catch (e) {
      console.error('handleAutoLogin error', e);
    }
  }, [getUserByToken]);

  return (
    <UserContext.Provider
      value={{user, setUser, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
