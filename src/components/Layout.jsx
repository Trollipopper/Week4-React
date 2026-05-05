import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <nav>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ul
            style={{
              display: 'flex',
              gap: '1rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
          </ul>
          {user && (
            <div style={{paddingRight: '1rem'}}>
              Logged in as: <strong>{user.username}</strong>
            </div>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
