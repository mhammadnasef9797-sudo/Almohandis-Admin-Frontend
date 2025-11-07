import OrderStatusSelector from './OrderStatusSelector';

const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid var(--border-color)',
  textAlign: 'right',
  verticalAlign: 'middle' // To align content vertically
};

// Add onRowClick to the function parameters
function OrderRow({ order, onUpdate, onRowClick }) {
  const orderDate = new Date(order.orderDate).toLocaleDateString('ar-EG');
  
  return (
    // Add onClick to the <tr> element and a pointer cursor
    <tr onClick={onRowClick} style={{cursor: 'pointer'}}>
      <td style={tdStyle}>#{order.id}</td>
      <td style={tdStyle}>{order.userEmail || 'مستخدم محذوف'}</td>
      <td style={tdStyle}>{order.userPhoneNumber || 'غير متوفر'}</td>
      <td style={tdStyle}>{orderDate}</td>
      <td style={tdStyle}>{order.totalPrice.toFixed(2)} ريال</td>
      <td style={tdStyle}>
        <OrderStatusSelector 
          orderId={order.id} 
          currentStatus={order.orderStatus}
          onStatusChange={onUpdate}
        />
      </td>
    </tr>
  );
}

export default OrderRow;