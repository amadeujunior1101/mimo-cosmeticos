import React, { useState } from 'react'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import './register.css'

const Seller = () => {

    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false)

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient)
    }

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
                                    <h4 className="font-card title-category">Vendedores</h4>
                                </div>
                                <div className="col-sm-4 my-3">
                                    <h4 className="font-card text-right">
                                        <button onClick={() => collapseRegisters()} type="button" className="btn btn-primary">Adicionar vendedor</button>
                                    </h4>
                                </div>

                                {
                                    isVisibleItemClient === true &&
                                    <>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12 new-category">
                                                    <span className="my-3 title-span-new-category">Novo vendedor</span>
                                                </div>
                                                <div className="col-sm-12 my-3 justify-content-center">

                                                    <form id="form-new-category">
                                                        <div className="form-group">
                                                            <label htmlFor="name-new-category" className="name-new-category">Nome completo *</label>
                                                            <input type="text" className="form-control" placeholder="" />
                                                            <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="name-new-category" className="name-new-category">CPF *</label>
                                                            <input type="text" className="form-control" placeholder="" />
                                                            <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                        </div>
                                                        <div className="form-group d-flex">
                                                            <div className="col-sm pl-0">
                                                                <label htmlFor="name-new-category" className="name-new-category">Rua *</label>
                                                                <input type="text" className="form-control" placeholder="" />
                                                                <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                            </div>
                                                            <div className="col-sm pr-0">
                                                                <label htmlFor="name-new-category" className="name-new-category">Nº *</label>
                                                                <input type="text" className="form-control" placeholder="" />
                                                                <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group d-flex">
                                                            <div className="col-sm pl-0">
                                                                <label htmlFor="name-new-category" className="name-new-category">Bairro *</label>
                                                                <input type="text" className="form-control" placeholder="" />
                                                                <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                            </div>
                                                            <div className="col-sm pr-0">
                                                                <label htmlFor="name-new-category" className="name-new-category">Celular *</label>
                                                                <input type="text" className="form-control" placeholder="" />
                                                                <label id="name-new-category" className="name-new-category-warning">Campo obrigatório</label>
                                                            </div>
                                                        </div>
                                                        <div className="position-bnt-save">
                                                            <button className="btn btn-primary bnt-save">salvar</button>
                                                        </div>

                                                    </form>
                                                </div>

                                            </div>
                                        </div>

                                    </>
                                }

                            </div>

                            <div className="row ml-0 mr-0">
                                <table className="table table-bordered table-secondary">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cod.</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">CPF</th>
                                            <th scope="col">Celular</th>
                                            <th scope="col">Lim. comprar</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>000.000.000-00</td>
                                            <td>63 9 9999-9999</td>
                                            <td>R$ 1.000,00</td>
                                            <td><i className="fas fa-pencil-alt"></i></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Mark</td>
                                            <td>000.000.000-00</td>
                                            <td>63 9 9999-9999</td>
                                            <td>R$ 1.000,00</td>
                                            <td><i className="fas fa-pencil-alt"></i></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Mark</td>
                                            <td>000.000.000-00</td>
                                            <td>63 9 9999-9999</td>
                                            <td>R$ 1.000,00</td>
                                            <td><i className="fas fa-pencil-alt"></i></td>
                                        </tr>

                                        {/* <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr> */}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default Seller;