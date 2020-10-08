import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import './new-update-category.css'

import api from '../../services/api'

const NewUpdateCategory = () => {
    const [data, setData] = useState([])
    const [category_name, setCategory_name] = useState("")
    const [error, setError] = useState("")
    const [empty, setEmpty] = useState(true)

    let { id } = useParams();
    let history = useHistory()

    const findCategory = async () => {
        if (id !== undefined) {
            // alert(id)
            const response = await api.get(`/category-id?id=${id}`,
            )
            if (response.data.error === false) {
                setCategory_name(response.data.info.category_name)
                setData(response.data)
                setEmpty(false)
            } else {
                setEmpty(true)
            }

            // return console.log(response.data.info.category_name)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (event) => {
        setCategory_name(event.target.value);
        // console.log(category_name)
    }

    const updateCategory = async () => {
        if (category_name.length === 0) {
            setError("Insira um nome para a nova categoria")
        }
        else if (category_name.length <= 3) {
            setError("Tamanho mínimo de 4 caracteres")
        }
        else if (category_name.length > 50) {
            setError("Tamanho máximo de 50 caracteres")
        }
        else if (category_name === data.info.category_name) {
            setError("Este é o nome atual da categoria")
        }
        else {
            const response = await api.put('/update-category',
                {
                    id: id,
                    category_name: category_name,
                    // category_color: getRandomColor()
                },
                {
                    "Accept": "application/json,text/*;q=0.99"
                })
            if (response.data.error !== false) {
                console.log(response)
                setError("Categoria já cadastrada!")
            } else {
                setError("")
                setCategory_name("")
                history.push('/categorias')
            }
            // return console.log(response)
        }


    }

    useEffect(() => {
        findCategory();
    }, [])

    return (
        <div id="page-wrap">
            <Navbar />
            <div className="page-container">
                <Sidebar />
                <div className="content" id="content">
                    <div className="box">
                        <div className="card-new-category">
                            <div className="position-title-category">

                            </div>
                        </div>

                        <div className="box-general">
                            <div className="col-sm-12 new-category">
                                <span className="my-3 title-span-new-category">Alterar Categoria</span>
                            </div>
                            <div className="content-center">
                                {
                                    empty === false ?
                                        <form id="form-new-category" onSubmit={handleFormSubmit}>
                                            <div className="input-group">
                                                <label htmlFor="name-new-category" className="name-new-category">Categoria *</label>
                                                <input type="text" className="input-new-category" placeholder="" value={category_name}
                                                    onChange={handleChange} />
                                                <label id="name-new-category" className="name-new-category-warning">{error}</label>
                                            </div>
                                            <div className="position-bnt-save">
                                                <input type="submit" className="button-new-category" value="Salvar" onClick={updateCategory} />
                                            </div>
                                        </form>
                                        :
                                        <div>
                                            <span>categoria não encontrada</span>
                                        </div>
                                }
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default NewUpdateCategory;