import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  useEffect(() => {
    handleLogout();
  }, []);
  return null;
};

export default Logout;
