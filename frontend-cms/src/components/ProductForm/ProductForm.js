import React, { useEffect, useState } from 'react';
import { createProduct, deleteProduct, updateProduct, uploadimages } from '../../api/products';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ProductForm.css';

const ProductForm = ({ editProduct = false, data }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        brand: '',
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loadingImageUpload, setLoadingImageUpload] = useState(false);
    const [errorImageUpload, setErrorImageUpload] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigateToDashboard = () => {
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000)
    }

    const handleImageUpload = async (e) => {
        setLoadingImageUpload(true);
        setErrorImageUpload('')
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);

        const imagesFormData = new FormData();
        files.forEach((image) => {
            imagesFormData.append('images', image);
        });

        try {
            const data = await uploadimages(imagesFormData)
            setLoadingImageUpload(false);
            console.log(data)
            setImagePreviews([...imagePreviews, ...data.images.map((image) => image.url)]);
            toast.success("Images uploaded successfully");
        } catch (err) {
            setLoadingImageUpload(false);
            toast.error(err?.response?.data?.message || err?.message || "Failed to upload images");
            console.error('Error adding product:', err.response ? err.response.data : err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        if (formData.name === '' || formData.description === '' || formData.price === '' || formData.category === '' || formData.stock === '' || formData.brand === '') {
            setLoading(false);
            return toast.error("all fields are required! ")
        }
        if (imagePreviews.length === 0) {
            setLoading(false);
            return toast.error("atleast one image is required! ")
        }

        const product = { ...formData, images: imagePreviews }

        if (editProduct) {
            try {
                await updateProduct(data._id, product);
                setLoading(false);
                setImages([]);
                setImagePreviews([]);
                setFormData({ name: '', description: '', price: '', category: '', stock: '', brand: '' });
                toast.success("Product updated successfully");
                navigateToDashboard()
            } catch (err) {
                toast.error(err?.response?.data?.message || err?.message || "Failed to Add Product");
                setLoading(false);
            }

        } else {

            try {
                await createProduct(product);
                setLoading(false);
                setImages([]);
                setImagePreviews([]);
                setFormData({ name: '', description: '', price: '', category: '', stock: '', brand: '' });
                toast.success("Product added successfully");
                navigateToDashboard()

            } catch (err) {
                setLoading(false);
                toast.error(err?.response?.data?.message || err?.message || "Failed to Add Product");
            }
        }
    }

    useEffect(() => {
        if (editProduct && data) {
            setFormData({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                stock: data.stock,
                brand: data.brand
            });
            setImagePreviews(data.images);
        }
    }, [])

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(data._id);
            toast.success("Product deleted successfully");
            navigateToDashboard()
        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to Delete Product");
        }
    }
    return (
        <div className="product-form-container">
            <div className="form-header">
                <h2>{editProduct ? "Edit" : "Add"} Product</h2>
                {editProduct && (
                    <button
                        type="button"
                        className="delete-btn-header"
                        onClick={handleDeleteProduct} // Create this function
                        disabled={loading}
                    >
                        Delete
                    </button>
                )}
            </div>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Brand</label>
                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Images</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="image-preview-container">
                    {loadingImageUpload ? "uploagin images..." : imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Preview ${index}`} className="image-preview" />
                    ))}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>{loading ? "loading..." : editProduct ? "Edit Product" : "Add Product"}</button>
            </form>
        </div>
    );
};

export default ProductForm;
