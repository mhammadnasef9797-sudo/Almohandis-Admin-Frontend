import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';

// ▼▼▼ 1. استيراد المكونات والـ CSS من المكتبة ▼▼▼
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div>جاري التحميل...</div>;
  }
  
  return (
    <> {/* <-- 2. استخدم Fragment لوضع الحاوية بجانب التطبيق */}
      {token ? <DashboardLayout /> : <LoginPage />}
      
      {/* ▼▼▼ 3. أضف حاوية التنبيهات هنا ▼▼▼ */}
      <ToastContainer 
        position="bottom-left" // ستظهر التنبيهات في أسفل يسار الشاشة
        autoClose={4000} // ستختفي بعد 4 ثوانٍ
        hideProgressBar={false}
        closeOnClick
        rtl={true} // تدعم اللغة العربية
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;