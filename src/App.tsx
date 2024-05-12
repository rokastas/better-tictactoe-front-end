import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";
import { CheckName } from './pages/CheckName';
import { CheckFullInfo } from './pages/CheckFullInfo';
import { Home } from './pages/Home';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="check-name" element={<CheckName />} />
        <Route path="check-full-info" element={<CheckFullInfo />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) =>
              (isActive ? 'nav-link nav-link--active' : 'nav-link')}>
                Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-name" className={({ isActive }) =>
              (isActive ? 'nav-link nav-link--active' : 'nav-link')}>
                Check Name
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-full-info" className={({ isActive }) =>
              (isActive ? 'nav-link nav-link--active' : 'nav-link')}>
                Check Full Info
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
