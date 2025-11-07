import { useState, useEffect } from 'react';
import apiClient from './api.js';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './AdminPages.css'; // <-- 1. استيراد ملف التنسيقات المشترك
import ProductForm from '../components/ProductForm';

function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- دوال جلب البيانات ومعالجة النماذج (تبقى كما هي) ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      toast.error("فشل في جلب قائمة المنتجات.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = async (productData) => {
    const isUpdating = !!productData.id;
    const url = isUpdating ? `/admin/products/${productData.id}` : '/admin/products';
    const method = isUpdating ? 'put' : 'post';
    try {
      await axios[method](url, productData);
      toast.success(isUpdating ? 'تم تحديث المنتج بنجاح!' : 'تم إضافة المنتج بنجاح!');
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      toast.error("فشل في حفظ المنتج.");
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا المنتج؟")) {
      try {
        await apiClient.delete(`/admin/products/${productId}`);
        toast.success('تم حذف المنتج بنجاح!');
        fetchProducts();
      } catch (error) {
        toast.error("فشل في حذف المنتج.");
      }
    }
  };
  
  if (loading) return <p>جاري تحميل المنتجات...</p>;

  return (
    <div>
      <h1>إدارة المنتجات</h1>
      
      {/* ▼▼▼ 2. تم وضع النموذج داخل بطاقة ▼▼▼ */}
      <div className="card">
        <h3>{editingProduct ? `تعديل المنتج: ${editingProduct.name}` : 'إضافة منتج جديد'}</h3>
        <ProductForm 
          onSubmit={handleFormSubmit} 
          initialData={editingProduct || {}}
        />
        {/* زر لإلغاء وضع التعديل */}
        {editingProduct && <button onClick={() => setEditingProduct(null)} style={{marginTop: '1rem'}}>إلغاء التعديل</button>}
      </div>
      
      {/* ▼▼▼ 3. تم وضع الجدول داخل بطاقة وتطبيق الكلاسات الجديدة ▼▼▼ */}
      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الفئة</th>
              <th>السعر</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => setEditingProduct(product)} className="action-button edit-btn">
                     <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="action-button delete-btn">
                     <FontAwesomeIcon icon={faTrash} />
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

export default ProductsAdminPage;