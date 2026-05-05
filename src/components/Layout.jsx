import {Link, Outlet} from 'react-router';
import {useState, useEffect} from 'react';

const Layout = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user);
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUsername(null);
    };
    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  useEffect(() => {
    const handleLogin = (e) => {
      setUsername(e.detail.username);
    };
    window.addEventListener('login', handleLogin);
    return () => window.removeEventListener('login', handleLogin);
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
            {!username && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {username && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
          </ul>
          {username && (
            <div style={{paddingRight: '1rem'}}>
              Logged in as: <strong>{username}</strong>
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
