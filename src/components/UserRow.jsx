// ▼▼▼ 1. تعريف متغيرات التنسيق المفقودة ▼▼▼
const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid var(--border-color)',
  textAlign: 'right',
};
const actionButtonStyle = { 
  border: 'none', 
  background: 'transparent', 
  cursor: 'pointer', 
  margin: '0 5px', 
  color: '#ef4444',
  fontSize: '1rem'
};

function UserRow({ user, onDelete }) {
  return (
    // 2. الكود هنا صحيح
    <tr>
      <td style={tdStyle}>{user.id}</td>
      <td style={tdStyle}>{user.email}</td>
      <td style={tdStyle}>{user.role}</td>
      <td style={tdStyle}>
        <button onClick={() => onDelete(user.id)} style={actionButtonStyle}>
          حذف
        </button>
      </td>
    </tr>
  );
}

export default UserRow;