import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import OrdersPage from '../pages/OrdersPage';
import ProductsAdminPage from '../pages/ProductsAdminPage';
import UsersAdminPage from '../pages/UsersAdminPage';

const layoutStyle = { display: 'flex' };
const mainContentStyle = { flexGrow: 1, padding: '2rem', height: '100vh', overflowY: 'auto' };

function DashboardLayout() {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <main style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsAdminPage />} />
          <Route path="/users" element={<UsersAdminPage />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}
export default DashboardLayout;