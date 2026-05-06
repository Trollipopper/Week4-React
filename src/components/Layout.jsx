import {Link, Outlet} from 'react-router';
import {useEffect} from 'react';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="space-y-4">
      <nav>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-3 p-0 m-0 list-none *:list-none">
            <li>
              <Link
                to="/"
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/5 hover:text-sky-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/5 hover:text-sky-600"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/5 hover:text-sky-600"
              >
                Upload
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  to="/login"
                  className="rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/5 hover:text-sky-600"
                >
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link
                  to="/logout"
                  className="rounded-full px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-900/5 hover:text-sky-600"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
          {user && (
            <div className="rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200/70">
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
