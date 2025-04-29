import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';
import Sidebar from "./Sidebar";
import { Pencil, Trash2, Package, Plus } from 'lucide-react';
import "./ProductList.css";

export default function ProductList() {
    const { products = [], loading = true, error } = useSelector(state => state.productsState);
    const { isProductDeleted, error: productError } = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'iD',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: (
                    <div className="action-buttons">
                        <Link
                            to={`/admin/product/${product._id}`}
                            className="edit-button"
                            title="Edit Product"
                        >
                            <Pencil size={16} />
                        </Link>
                        <button
                            onClick={e => deleteHandler(e, product._id)}
                            className="delete-button"
                            title="Delete Product"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                )
            });
        });

        return data;
    };

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error || productError) {
            toast(error || productError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }
        if (isProductDeleted) {
            toast('Product Deleted Successfully!', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductDeleted())
            });
            return;
        }

        dispatch(getAdminProducts);
    }, [dispatch, error, productError, isProductDeleted]);

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <div className="page-header">
                    <div className="header-content">
                        <Package className="header-icons" />
                        <div>
                            <h1>Product Management</h1>
                            <p>Manage and track all products in your inventory</p>
                        </div>
                    </div>

                </div>

                <div className="content-card">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="table-container">
                            <MDBDataTable
                                data={setProducts()}
                                bordered
                                striped
                                hover
                                className="product-table"
                            />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}