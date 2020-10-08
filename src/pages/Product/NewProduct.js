import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// import ReactPlaceholder from 'react-placeholder';
// import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
// import 'react-placeholder/lib/reactPlaceholder.css';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import api from '../../services/api';
import imgProduct from '../../assets/img/img-verde-brasil.jpg';

import './new-product.css';

export default function NewProduct() {
    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [minimumStock, setMinimumStock] = useState(5)

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient);
    };

    const loadProducts = async () => {
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
        console.log(response.data);
    };

    const loadCategories = async () => {
        const response = await api.get('/categories');
        setCategories(response.data);
        // setLoading(false);
        // console.log(response.products);
    };

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    // };

    const validate = (values) => {
        const errors = {};
        if (!values.product_name) {
            errors.product_name = 'Obrigatório';
        } else if (values.product_name.length > 50) {
            errors.product_name = 'Máximo de 50 caracters';
        }
        if (!values.category_id) {
            errors.category_id = 'Obrigatório';
        } else if (values.category_id == 0) {
            errors.category_id = 'Escolha um categoria';
        }

        if (!values.stock_quantity) {
            errors.stock_quantity = 'Obrigatório';
        } else if (values.stock_quantity.length === 0) {
            errors.stock_quantity = 'Informe o estoque disponível';
        }

        if (!values.product_price) {
            errors.product_price = 'Obrigatório';
        } else if (values.product_price.length === 0) {
            errors.product_price = 'Informe o valor do produto';
        }

        return errors;
    };

    const cleanFields = () => {
        formik.values.product_name = '';
        formik.values.category_id = '';
        formik.values.stock_quantity = '';
        formik.values.product_price = '';
    };

    const formik = useFormik({
        initialValues: {
            product_name: '',
            category_id: '',
            stock_quantity: '',
            product_price: '',
        },
        validate,
        onSubmit: async (values) => {
            // console.log(values);

            try {
                const response = await api.post(
                    '/product',
                    {
                        product_name: values.product_name,
                        category_id: values.category_id,
                        quantity: values.stock_quantity,
                        product_price: values.product_price,
                    }
                    //   ,
                    //   {
                    //     headers: { Authorization: `Bearer ${token}` },
                    //   },
                );
                // console.log(response.data.data);
                setLoading(true);

                if (response.data.error === false) {
                    // const d = response.data.data;
                    // console.log([...products, response.data.data[0]]);
                    // const newData = [...products, ...d];

                    setProducts([...products, response.data.data[0]]);
                    setLoading(false);
                    // loadProducts()
                    // setIsVisibleItemClient(!isVisibleItemClient);

                    cleanFields();
                } else {
                    formik.errors.product_name =
                        'Este produto já está cadastrado';
                    setLoading(false);
                }
            } catch (error) {
                console.log('Erro no cadastro do produto' + error);
            }
        },
    });

    const verifyQuantity = (id) => {
        const alertQuantity = document.getElementById(id);
        // return alertQuantity.style.backgroundColor = 'red';
        console.log(alertQuantity);
    };

    const belowStock = {
        backgroundColor: '#FF077F'
    };
    const haveStock = {
        backgroundColor: '#808080'
    };

    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    return (
        <div id="page-wrap">
            <Navbar />
            <div className="page-container">
                <Sidebar />
                <div className="content" id="content">
                    <div className="box">
                        <div className="card-new-product">
                            <div className="position-title-product">
                                <h4 className="">Produtos</h4>
                            </div>
                            <div className="position-button-new-product">
                                <button
                                    onClick={() => collapseRegisters()}
                                    type="submit"
                                    className="button-new-product"
                                >
                                    Novo produto
                                </button>
                            </div>
                        </div>

                        {isVisibleItemClient === true && (
                            <>
                                <div className="box-general1">
                                    <div className=" new-product">
                                        <span className="title-span-new-product">
                                            Inserir novo produto
                                        </span>
                                    </div>
                                    <div>
                                        <form onSubmit={formik.handleSubmit}>
                                            <div className="input-group-base-product">
                                                <div className="input-group-product">
                                                    <span className="">
                                                        Nome *
                                                    </span>
                                                    <input
                                                        id="product_name"
                                                        name="product_name"
                                                        type="text"
                                                        className="input-new-product"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .product_name
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-product"
                                                        className="name-new-product-warning"
                                                    >
                                                        {formik.errors
                                                            .product_name
                                                            ? formik.errors
                                                                  .product_name
                                                            : ''}
                                                    </label>
                                                </div>
                                                <div className="input-group-product">
                                                    <span className="">
                                                        Categoria *
                                                    </span>
                                                    <select
                                                        id="category_id"
                                                        name="category_id"
                                                        type="text"
                                                        className="input-new-product"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .category_id
                                                        }
                                                    >
                                                        <option value={0}>
                                                            Escolha uma
                                                            categoria
                                                        </option>
                                                        {categories.map(
                                                            (item) => (
                                                                <option
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {
                                                                        item.category_name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <label
                                                        id="name-new-product"
                                                        className="name-new-product-warning"
                                                    >
                                                        {formik.errors
                                                            .category_id
                                                            ? formik.errors
                                                                  .category_id
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="input-group-base-product">
                                                <div className="input-group-product">
                                                    <span className="">
                                                        Quantidade *
                                                    </span>
                                                    <input
                                                        id="stock_quantity"
                                                        name="stock_quantity"
                                                        type="text"
                                                        className="input-new-product"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .stock_quantity
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-product"
                                                        className="name-new-product-warning"
                                                    >
                                                        {formik.errors
                                                            .stock_quantity
                                                            ? formik.errors
                                                                  .stock_quantity
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group-product">
                                                    <span className="">
                                                        Preço *
                                                    </span>
                                                    <input
                                                        id="product_price"
                                                        name="product_price"
                                                        type="text"
                                                        className="input-new-product"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .product_price
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-product"
                                                        className="name-new-product-warning"
                                                    >
                                                        {formik.errors
                                                            .product_price
                                                            ? formik.errors
                                                                  .product_price
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="position-bnt-save">
                                                <input
                                                    type="submit"
                                                    className="button-new-product"
                                                    value="Criar"
                                                    // onClick={onSubmit}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* new cards */}

                        <div className="base-products">
                            {loading === false ? (
                                products.length !== 0 ? (
                                    products.map((item) => (
                                        <div
                                            key={item.id}
                                            className="card-product"
                                            style={{}}
                                        >
                                            <div
                                                className="category-name-label"
                                                id={item.id}
                                            >
                                                <span
                                                    style={
                                                        item.stocks[0]
                                                            .quantity <= minimumStock
                                                            ? belowStock
                                                            : haveStock
                                                    }
                                                >
                                                    {
                                                        item.categories
                                                            .category_name
                                                    }
                                                </span>
                                            </div>
                                            <div
                                                className="title-card-product"
                                                style={{
                                                    backgroundColor: 'red',
                                                }}
                                            >
                                                <img
                                                    src={imgProduct}
                                                    alt="Product"
                                                    // style={{
                                                    //     resize: 'horizontal',
                                                    //     width: '100%',
                                                    //     height: '15rem',
                                                    // }}
                                                />
                                                {/* <span className="">
                                                    {item.product_name.length >
                                                    7
                                                        ? item.product_name.substring(
                                                              0,
                                                              7
                                                          )
                                                        : item.product_name}
                                                </span> */}
                                            </div>
                                            <div className="title-card-new-product">
                                                <div className="name">
                                                    <span className="name-new-product">
                                                        {item.product_name &&
                                                        item.product_name
                                                            .length > 25
                                                            ? item.product_name.substring(
                                                                  0,
                                                                  25 - 3
                                                              ) + '...'
                                                            : item.product_name}
                                                    </span>
                                                </div>

                                                <div className="position-quantity-stock">
                                                    <span className="quantity-stock">
                                                        Itens:{' '}
                                                        {
                                                            item.stocks[0]
                                                                .quantity
                                                        }
                                                    </span>
                                                </div>

                                                <div className="position-products1">
                                                    <Link
                                                        className=""
                                                        to={'/produtos'}
                                                        className=""
                                                        style={{
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        R$ {item.product_price}
                                                    </Link>
                                                    {/* <div className=""> */}
                                                    <Link
                                                        className="circle-alt-product"
                                                        to={
                                                            '/categoria/update_category/' +
                                                            item.id
                                                        }
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </Link>
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>sem produtos</div>
                                )
                            ) : (
                                <>
                                    <div className="card-product" style={{}}>
                                        <SkeletonTheme
                                            color="#e2e2e2"
                                            highlightColor="#b9b3b3"
                                        >
                                            <Skeleton
                                                height={272}
                                                style={{ borderRadius: 20 }}
                                                duration={3}
                                            ></Skeleton>
                                        </SkeletonTheme>
                                    </div>
                                    <div className="card-product" style={{}}>
                                        <SkeletonTheme
                                            color="#e2e2e2"
                                            highlightColor="#b9b3b3"
                                        >
                                            <Skeleton
                                                height={272}
                                                style={{ borderRadius: 20 }}
                                                duration={3}
                                            ></Skeleton>
                                        </SkeletonTheme>
                                    </div>
                                    <div className="card-product" style={{}}>
                                        <SkeletonTheme
                                            color="#e2e2e2"
                                            highlightColor="#b9b3b3"
                                        >
                                            <Skeleton
                                                height={272}
                                                style={{ borderRadius: 20 }}
                                                duration={3}
                                            ></Skeleton>
                                        </SkeletonTheme>
                                    </div>
                                    <div className="card-product" style={{}}>
                                        <SkeletonTheme
                                            color="#e2e2e2"
                                            highlightColor="#b9b3b3"
                                        >
                                            <Skeleton
                                                height={272}
                                                style={{ borderRadius: 20 }}
                                                duration={3}
                                            ></Skeleton>
                                        </SkeletonTheme>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
