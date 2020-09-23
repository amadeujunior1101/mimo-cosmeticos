import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import './register.css'

const UpdateCategory = () => {

    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false)

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient)
    }

    let { id } = useParams();

    return (
        <div className="content">
            <Navbar />
            <div className="wrapper d-flex">
                <Sidebar />
                <div className="content">
                    <main>
                        <div className="container-fluid">
                            <div className="row" id="title-category">

                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12 new-category mt-4">
                                            <span className="my-3 title-span-new-category">Alterar categoria</span>
                                        </div>
                                        <div className="col-sm-12 my-3 justify-content-center">

                                            <form id="form-new-category">
                                                <div className="form-group">
                                                    <label htmlFor="name-new-category" className="name-new-category">{id} Nome da categoria *</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                    <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                </div>

                                                <div className="position-bnt-save">
                                                    <button className="btn btn-primary bnt-save">alterar</button>
                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}
export default UpdateCategory;