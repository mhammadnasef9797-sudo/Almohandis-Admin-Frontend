import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <h1 className="sidebar-title">لوحة التحكم</h1>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/orders">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>الطلبات</span>
          </NavLink>
          <NavLink to="/products">
            <FontAwesomeIcon icon={faBox} />
            <span>إدارة المنتجات</span>
          </NavLink>
          <NavLink to="/users">
            <FontAwesomeIcon icon={faUsers} />
            <span>إدارة المستخدمين</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="admin-info">
          <span className="admin-avatar">A</span>
          <span className="admin-name">Admin</span>
        </div>
        <button onClick={handleLogout} className="logout-button">
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;