import React from 'react'

import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'

const Dashboard = () => {
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
                                    <h4 className="mb-1 font-card text-left">Home</h4>
                                </div>
                                <div className="col-sm-4 my-3">
                                    <h4 className="mb-1 font-card text-right">Historico</h4>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3 my-3 d-flex">
                                    <div className="col-12 col-md-12 bg-card p-3">
                                        <h4 className="mb-1 font-card">Valor de vendas</h4>
                                        <h6 className="mb-1 font-card-values">R$ 100,00</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 my-3 d-flex">
                                    <div className="col-12 col-md-12 bg-card p-3">
                                        <h4 className="mb-1 font-card">Lucro total</h4>
                                        <h6 className="mb-1 font-card-values">R$ 100,00</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 my-3 d-flex">
                                    <div className="col-12 col-md-12 bg-card p-3">
                                        <h4 className="mb-1 font-card">Quantidade de vendas</h4>
                                        <h6 className="mb-1 font-card-values">R$ 100,00</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 my-3 d-flex">
                                    <div className="col-12 col-md-12 bg-card p-3">
                                        <h4 className="mb-1 font-card">Itens vendidos</h4>
                                        <h6 className="mb-1 font-card-values">R$ 100,00</h6>
                                    </div>
                                </div>

                            </div>


                            {/* <div className="row">
                <div className="col-md-6">
                  <div className="bg-mattBlackLight my-2 p-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Ratione libero totam rerum eos nam ab perspiciatis voluptatum
                    in. Quidem natus autem quae. Velit accusamus sit, perspiciatis
                    sunt earum tempora veniam.
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-mattBlackLight my-2 p-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Ratione libero totam rerum eos nam ab perspiciatis voluptatum
                    in. Quidem natus autem quae. Velit accusamus sit, perspiciatis
                    sunt earum tempora veniam.
                  </div>
                </div>
              </div>  */}

                        </div>
                    </main>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
