import { useState, useEffect } from 'react';
import apiClient from '@/api.js';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './AdminPages.css'; // استيراد التنسيقات المشتركة

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/admin/orders');
        setOrders(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  if (loading) return <p>جاري تحميل الطلبات...</p>;

  return (
    <div>
      <h1>الطلبات الواردة</h1>
      {/* ▼▼▼ تم وضع الجدول داخل بطاقة ▼▼▼ */}
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>بريد العميل</th>
              <th>تاريخ الطلب</th>
              <th>الإجمالي</th>
              <th>الحالة</th>
              <th>تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.userEmail}</td>
                <td>{new Date(order.orderDate).toLocaleDateString('ar-EG')}</td>
                <td>{order.totalPrice.toFixed(2)} دينار</td>
                <td>{order.orderStatus}</td>
                <td>
                  <button className="action-button view-btn" onClick={() => handleViewDetails(order)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        title={`تفاصيل الطلب #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div>
            <p><strong>العميل:</strong> {selectedOrder.userEmail}</p>
            <p><strong>رقم الهاتف:</strong> {selectedOrder.userPhoneNumber || 'N/A'}</p>
            <p><strong>عنوان الشحن:</strong> {selectedOrder.shippingAddress}</p>
             {/* لاحقاً يمكننا جلب المنتجات هنا */}
            <h3 style={{marginTop: '1rem', textAlign: 'left'}}>الإجمالي: {selectedOrder.totalPrice.toFixed(2)} ريال</h3>
          </div>
        )}
      </Modal>
    </div>
  );
}
export default OrdersPage;