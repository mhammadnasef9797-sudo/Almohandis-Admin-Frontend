import { useState, useEffect } from 'react';
import './ProductForm.css'; // We will create this file

function ProductForm({ onSubmit, initialData = {} }) {
  // Initialize state with default values to avoid issues
  const [product, setProduct] = useState({
    name: '', description: '', price: 0, imageUrl: '', category: '', ...initialData
  });

  // This useEffect ensures the form resets when the selected product changes
  useEffect(() => {
    setProduct({
        name: '', description: '', price: 0, imageUrl: '', category: '', ...initialData
    });
  }, [initialData]);

  // This is the crucial function that updates the state as you type
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    // Clear the form only if it's not for editing
    if (!initialData.id) {
        setProduct({ name: '', description: '', price: 0, imageUrl: '', category: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-row">
        <input name="name" value={product.name || ''} onChange={handleChange} placeholder="اسم المنتج" required />
        <input name="category" value={product.category || ''} onChange={handleChange} placeholder="فئة المنتج" required />
      </div>
      <input name="price" type="number" step="0.01" value={product.price || 0} onChange={handleChange} placeholder="السعر" required />
      <input name="imageUrl" value={product.imageUrl || ''} onChange={handleChange} placeholder="رابط الصورة" required />
      <textarea name="description" value={product.description || ''} onChange={handleChange} placeholder="وصف المنتج" rows="4" required />
      <button type="submit">{initialData.id ? 'تحديث المنتج' : 'إضافة منتج'}</button>
    </form>
  );
}

export default ProductForm;