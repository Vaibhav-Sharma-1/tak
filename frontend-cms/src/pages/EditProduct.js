import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import ProductForm from '../components/ProductForm/ProductForm'
import { useParams } from 'react-router-dom';
import { getProduct } from '../api/products';

const EditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchProduct = async () => {
        setError('');
        setLoading(true)
        try {
            const data = await getProduct(id);
            console.log(data)
            setLoading(false);
            setProduct(data)

        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to Add Product");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <Layout>
            {loading ? <div>fetching product details...</div>
                : error ? { error } : <ProductForm data={product} editProduct={true} />
            }

        </Layout>
    )
}

export default EditProduct