import { useState, useEffect } from 'react';
import apiClient from './api.js';

const tableContainerStyle = { background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const thStyle = { padding: '1rem', textAlign: 'right', borderBottom: '2px solid var(--border-color)', color: '#64748b' };
const tdStyle = { padding: '1rem', textAlign: 'right', borderBottom: '1px solid var(--border-color)' };
const deleteBtnStyle = { border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold' };

function UsersAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get('/admin/users');
            setUsers(response.data);
        } catch (err) {
            setError('فشل في جلب المستخدمين.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ▼▼▼ دالة الحذف التي سنعيد تفعيلها ▼▼▼
    const handleDelete = async (userId) => {
        if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المستخدم؟")) {
            try {
                await apiClient.delete(`/admin/users/${userId}`);
                fetchUsers(); // إعادة جلب القائمة المحدثة بعد الحذف
            } catch (error) {
                console.error("Failed to delete user:", error);
                alert(error.response?.data || "فشل في حذف المستخدم.");
            }
        }
    };

    if (loading) return <p>جاري تحميل المستخدمين...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>إدارة المستخدمين</h1>
            <div style={tableContainerStyle}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>البريد الإلكتروني</th>
                            <th style={thStyle}>الاسم الأول</th>
                            <th style={thStyle}>الصلاحية</th>
                            <th style={thStyle}>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td style={tdStyle}>{user.id}</td>
                                <td style={tdStyle}>{user.email}</td>
                                <td style={tdStyle}>{user.firstName}</td>
                                <td style={tdStyle}>{user.role}</td>
                                <td style={tdStyle}>
                                    <button onClick={() => handleDelete(user.id)} style={deleteBtnStyle}>
                                        حذف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UsersAdminPage;