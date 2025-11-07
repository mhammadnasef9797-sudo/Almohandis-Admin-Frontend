import { useState } from 'react';
import apiClient from '@/api.js';

const selectStyle = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid var(--border-color)',
  backgroundColor: '#fff',
};

function OrderStatusSelector({ orderId, currentStatus, onStatusChange }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    
    try {
      await apiClient.put(
        `/admin/orders/${orderId}/status`,
        JSON.stringify(newStatus), // Send the status as a JSON string
        { headers: { 'Content-Type': 'application/json' } }
      );
      setStatus(newStatus);
      onStatusChange(orderId, newStatus); // Notify parent component of the change
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("فشل في تحديث حالة الطلب.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select 
      value={status} 
      onChange={handleStatusChange} 
      disabled={loading}
      style={selectStyle}
    >
      <option value="Pending">Pending</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}

export default OrderStatusSelector;