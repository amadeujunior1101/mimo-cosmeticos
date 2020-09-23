import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import './register.css'

const Category = () => {

    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false)
    const [data, setData] = useState([])
    const [category_name, setCategory_name] = useState("")
    const [error, setError] = useState("")

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient)
    }

    const loadCategories = async () => {
        const response = await api.get('/category')
        setData(response.data)
        // console.log(response.data)
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color
        // console.log(color);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (event) => {
        setCategory_name(event.target.value);
        // console.log(category_name)
    }

    const createNewcategory = async () => {
        if (category_name.length === 0) {
            setError("Insira um nome para a nova categoria")
        }
        else if (category_name.length <= 3) {
            setError("Tamanho mínimo de 4 caracteres")
        }
        else if (category_name.length > 50) {
            setError("Tamanho máximo de 50 caracteres")
        }
        else {
            const response = await api.post('/category',
                {
                    category_name: category_name,
                    category_color: getRandomColor()
                },
                {
                    "Accept": "application/json,text/*;q=0.99"
                })
            if (response.data.error !== false) {
                console.log(response)
                setError("Categoria já cadastrada!")
            } else {
                loadCategories()
                setError("")
                setCategory_name("")
            }
            // console.log(response)
        }


    }

    useEffect(() => {
        loadCategories();

    }, [])

    return (
        <div className="content">
            <Navbar />
            <div className="wrapper d-flex">
                <Sidebar />
                <div className="content">
                    <main>
                        <div className="container-fluid">
                            <div className="row" id="title-category">
                                <div className="col-sm-8 my-3">
                                    <h4 className="font-card title-category">Categorias</h4>
                                </div>
                                <div className="col-sm-4 my-3">
                                    <h4 className="font-card text-right">
                                        <button onClick={() => collapseRegisters()} type="button" className="btn btn-primary">Nova categoria</button>
                                    </h4>
                                </div>

                                {
                                    isVisibleItemClient === true &&
                                    <>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12 new-category">
                                                    <span className="my-3 title-span-new-category">Nova Categoria</span>
                                                </div>
                                                <div className="col-sm-12 my-3 justify-content-center">

                                                    <form id="form-new-category" onSubmit={handleFormSubmit}>
                                                        <div className="form-group">
                                                            <label htmlFor="name-new-category" className="name-new-category">Categoria *</label>
                                                            <input type="text" className="form-control" placeholder="" value={category_name}
                                                                onChange={handleChange} />
                                                            <label id="name-new-category" className="name-new-category-warning">{error}</label>
                                                        </div>
                                                        <div className="position-bnt-save">
                                                            {/* <button className="btn btn-primary bnt-save">salvar</button> */}
                                                            <input type="submit" className="btn btn-primary bnt-save" value="Enviar" onClick={createNewcategory} />
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>

                                    </>
                                }

                            </div>

                            <div className="row ml-0 mr-0">
                                {
                                    data.map(item => (
                                        <div key={item.id} className="col-md-3 my-2 d-flex flex-column">
                                            <div style={{ backgroundColor: item.category_color }} className="col-12 col-md-12 bg-card-categories-up">
                                                <h6 className="font-card-categories-up">{item.category_name.length > 7 ?
                                                    (item.category_name.substring(0, 7)) :
                                                    item.category_name}</h6>
                                            </div>
                                            <div className="col-12 col-md-12 bg-card-categories-down">
                                                <h6 className="font-card-categories-down">{item.category_name}</h6>
                                                <div className="edit_category">
                                                    <a href="/edit_category" className="btn-title-products">Ver produtos</a>
                                                    {/* <Link to={"/categoria/update_category_id/" + item.id}>Home</Link> */}
                                                    {/* <a className="icon_edit_category"> */}
                                                        <Link className="icon_edit_category" to={"/categoria/update_category/" + item.id}><i className="fas fa-pencil-alt"></i></Link>

                                                    {/* </a> */}
                                                    {/* <h6 className="font-card-categories-down-title-products">Ver produtos</h6> */}
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }

                                {/* <div className="col-md-3 my-2 d-flex flex-column">
                                    <div className="col-12 col-md-12 bg-card-categories-up">
                                        <h6 className="font-card-categories-up">ampola</h6>
                                    </div>
                                    <div className="col-12 col-md-12 bg-card-categories-down">
                                        <h6 className="font-card-categories-down">ampola</h6>
                                        <a className="btn-title-products">Ver produtos</a>
                                    </div>
                                </div>
                                <div className="col-md-3 my-2 d-flex flex-column">
                                    <div className="col-12 col-md-12 bg-card-categories-up">
                                        <h6 className="font-card-categories-up">ampola</h6>
                                    </div>
                                    <div className="col-12 col-md-12 bg-card-categories-down">
                                        <h6 className="font-card-categories-down">ampola</h6>
                                        <a className="btn-title-products">Ver produtos</a>
                                    </div>
                                </div>
                                <div className="col-md-3 my-2 d-flex flex-column">
                                    <div className="col-12 col-md-12 bg-card-categories-up">
                                        <h6 className="font-card-categories-up">ampola</h6>
                                    </div>
                                    <div className="col-12 col-md-12 bg-card-categories-down">
                                        <h6 className="font-card-categories-down">ampola</h6>
                                        <a className="btn-title-products">Ver produtos</a>
                                    </div>
                                </div>
                                <div className="col-md-3 my-2 d-flex flex-column">
                                    <div className="col-12 col-md-12 bg-card-categories-up">
                                        <h6 className="font-card-categories-up">ampola</h6>
                                    </div>
                                    <div className="col-12 col-md-12 bg-card-categories-down">
                                        <h6 className="font-card-categories-down">ampola</h6>
                                        <a className="btn-title-products">Ver produtos</a>
                                    </div>
                                </div>
                                <div className="col-md-3 my-2 d-flex flex-column">
                                    <div className="col-12 col-md-12 bg-card-categories-up">
                                        <h6 className="font-card-categories-up">ampola</h6>
                                    </div>
                                    <div className="col-12 col-md-12 bg-card-categories-down">
                                        <h6 className="font-card-categories-down">ampola</h6>
                                        <a className="btn-title-products">Ver produtos</a>
                                    </div>
                                </div> */}

                            </div>

                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default Category;