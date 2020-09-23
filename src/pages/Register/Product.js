import React from 'react'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'  

const Product = () => {
    return (
        <div className="content">
            <Navbar />
            <div className="wrapper d-flex">
                <Sidebar />
                <div className="content">
                    <main>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-8 my-3">
                                    <h4 className="mb-1 font-card text-left">Produtos</h4>
                                </div>
                                <div className="col-sm-4 my-3">
                                    <h4 className="mb-1 font-card text-right">Historico</h4>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default Product;