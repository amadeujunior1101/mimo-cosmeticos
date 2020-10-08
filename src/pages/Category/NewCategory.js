import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// import ReactPlaceholder from 'react-placeholder';
// import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
// import 'react-placeholder/lib/reactPlaceholder.css';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import api from '../../services/api';

import './new-category.css';

export default function NewCategory() {
    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [category_name, setCategory_name] = useState('');
    const [error, setError] = useState('');
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient);
    };

    const loadCategories = async () => {
        const response = await api.get('/categories');
        setData(response.data);
        setLoading(false);
        // console.log(response.data)
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
        // console.log(color);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (event) => {
        setCategory_name(event.target.value);
        // console.log(category_name)
    };

    const createNewcategory = async () => {
        if (category_name.length === 0) {
            setError('Insira um nome para a nova categoria');
        } else if (category_name.length <= 3) {
            setError('Tamanho mínimo de 4 caracteres');
        } else if (category_name.length > 50) {
            setError('Tamanho máximo de 50 caracteres');
        } else {
            const response = await api.post(
                '/category',
                {
                    category_name: category_name,
                    category_color: getRandomColor(),
                },
                {
                    Accept: 'application/json,text/*;q=0.99',
                }
            );
            if (response.data.error !== false) {
                console.log(response);
                setError('Categoria já cadastrada!');
            } else {
                loadCategories();
                setError('');
                setCategory_name('');
            }
            // console.log(response)
        }
    };

    function teste() {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        let dimension = { largura: windowWidth, altura: windowHeight };
        // console.log(dimension)
    }

    useEffect(() => {
        loadCategories();
    }, []);

    // const awesomePlaceholder = (
    //     <div className='my-awesome-placeholder'>
    //         <RectShape color='#bbb0b0' style={{ height: 300 }} />
    //         {/* <TextBlock rows={1} color='yellow' /> */}
    //     </div>
    // );

    // <ReactPlaceholder ready={false} showLoadingAnimation customPlaceholder={awesomePlaceholder }>

    // </ReactPlaceholder>

    return (
        <div id="page-wrap">
            <Navbar />
            <div className="page-container">
                <Sidebar />
                <div className="content" id="content">
                    <div className="box">
                        <div className="card-new-category">
                            <div className="position-title-category">
                                <h4 className="">Categorias</h4>
                            </div>
                            <div className="position-button-new-category">
                                <button
                                    onClick={() => collapseRegisters()}
                                    type="submit"
                                    className="button-new-category"
                                >
                                    Nova categoria
                                </button>
                            </div>
                        </div>

                        {isVisibleItemClient === true && (
                            <>
                                <div className="box-general">
                                    <div className="col-sm-12 new-category">
                                        <span className="my-3 title-span-new-category">
                                            Nova Categoria
                                        </span>
                                    </div>
                                    <div className="content-center">
                                        <form
                                            id="form-new-category"
                                            onSubmit={handleFormSubmit}
                                        >
                                            <div className="input-group">
                                                <label
                                                    htmlFor="name-new-category"
                                                    className="name-new-category"
                                                >
                                                    Categoria *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="input-new-category"
                                                    placeholder=""
                                                    value={category_name}
                                                    onChange={handleChange}
                                                />
                                                <label
                                                    id="name-new-category"
                                                    className="name-new-category-warning"
                                                >
                                                    {error}
                                                </label>
                                            </div>
                                            <div className="position-bnt-save">
                                                <input
                                                    type="submit"
                                                    className="button-new-category"
                                                    value="Criar"
                                                    onClick={createNewcategory}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* new cards */}

                        <div className="base-categories">
                            {loading === false ? (
                                data.map((item) => (
                                    <div
                                        key={item.id}
                                        className="card-category"
                                        // style={{margin: '1rem 0px 1rem 0px'}}
                                    >
                                        <div
                                            className="title-card-main"
                                            style={{
                                                backgroundColor:
                                                    item.category_color,
                                            }}
                                        >
                                            <span className="">
                                                {item.category_name.length > 7
                                                    ? item.category_name.substring(
                                                          0,
                                                          7
                                                      )
                                                    : item.category_name}
                                            </span>
                                        </div>
                                        <div className="title-card-secundary">
                                            <div className="name">
                                                <span className="">
                                                    {item.category_name}
                                                </span>
                                            </div>

                                            <div className="position-products">
                                                <Link
                                                    className=""
                                                    to={'/produtos'}
                                                    className=""
                                                >
                                                    Ver produtos
                                                </Link>
                                                {/* <div className=""> */}
                                                    <Link
                                                        className="circle-alt-category"
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
                                <>
                                    <div className="card-category" style={{}}>
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
                                    <div className="card-category" style={{}}>
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
                                    <div className="card-category" style={{}}>
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
                                    <div className="card-category" style={{}}>
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
