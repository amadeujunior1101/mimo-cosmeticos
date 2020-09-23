import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './sub-menu.css';
import './sidebar.css';

const Sidebar = () => {

    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false)
    const [choise, setChoise] = useState("sidebar-extra-report")

    const collapseRegisters = (name) => {
        // setIsVisibleItemClient(!isVisibleItemClient)
        recall(name)
        const disp = document.getElementById(name);
        if (disp.style.display === "block") {
            disp.style.display = "none"
            if (name === "sidebar-extra-register") {
                const disp = document.getElementById("sidebar-extra-report");
                disp.style.display = "none"
                setChoise("sidebar-extra-report")
                // recall("sidebar-extra-report")
            } else if (name === "sidebar-extra-report") {
                const disp = document.getElementById("sidebar-extra-register");
                disp.style.display = "none"
                setChoise("sidebar-extra-register")
            }

        }
        else {
            disp.style.display = "block"
            if (name === "sidebar-extra-register") {
                const disp = document.getElementById("sidebar-extra-report");
                disp.style.display = "none"
                setChoise("sidebar-extra-report")
                // recall("sidebar-extra-report")
            } else if (name === "sidebar-extra-report") {
                const disp = document.getElementById("sidebar-extra-register");
                disp.style.display = "none"
                setChoise("sidebar-extra-register")
            }
        }
    }

    const recall = (name) => {
        const disp1 = document.getElementById(name);
        disp1.style.left = "100%"

    }

    return (
        <div className="sideMenu bg-sidebar-left">

            <div id="sidebar-extra-register">

                <div className="sidebar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/categorias"} className="nav-link">
                                <i className="fas fa-list-alt "></i>
                                <span className="text">Categorias</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/clientes"} className="nav-link pr-2">
                                <i className="fas fa-users"></i>
                                <span className="text">Clientes</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/vendedores"} className="nav-link pr-2">
                                <i className="fas fa-user"></i>
                                <span className="text">Vendedores</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/produtos"} className="nav-link pr-2">
                                <i className="fas fa-list"></i>
                                <span className="text">Produtos</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>

            <div id="sidebar-extra-report">

                <div className="sidebar">
                    <span>Vendas</span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/produtos" className="nav-link pr-2">
                                <i className="fas fa-list"></i>
                                <span className="text">Relatórios</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/produtos" className="nav-link pr-2">
                                <i className="fas fa-list"></i>
                                <span className="text">Relatórios</span>
                            </a>
                        </li>
                    </ul>
                    <span>Despesas</span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/produtos" className="nav-link pr-2">
                                <i className="fas fa-list"></i>
                                <span className="text">Relatórios</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/produtos" className="nav-link pr-2">
                                <i className="fas fa-list"></i>
                                <span className="text">Relatórios</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="sidebar">

                <ul className="navbar-nav">

                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <i className="fas fa-desktop"></i>
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item" onClick={() => collapseRegisters("sidebar-extra-register")} >
                        <div id="sidebar-register" className="nav-link">
                            <i className="fas fa-pencil-alt"></i>
                            <span className="text">Cadastros</span>
                        </div>
                    </li>

                    {/* {
                        isVisibleItemClient === true &&
                        <> */}

                    {/* <li className="nav-item">
                                <a href="/categorias" className="nav-link ml-2">
                                    <i className="fas fa-list-alt "></i>
                                    <span className="text">Categorias</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/clientes" className="nav-link ml-2">
                                    <i className="fas fa-user"></i>
                                    <span className="text">Clientes</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="/vendedores" className="nav-link ml-2">
                                    <i className="fas fa-users"></i>
                                    <span className="text">Vendedores</span>
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="/produtos" className="nav-link ml-2">
                                    <i className="fas fa-list"></i>
                                    <span className="text">Produtos</span>
                                </a>
                            </li> */}
                    {/* </>
                    } */}

                    <li className="nav-item" onClick={() => collapseRegisters("sidebar-extra-report")} >
                        <div id="sidebar-register" className="nav-link">
                            <i className="fas fa-chart-bar"></i>
                            <span className="text">Relatórios</span>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">
                            <i className="fas fa-cog"></i>
                            <span className="text">Configurações</span>
                        </a>
                    </li>

                    <li className="nav-item" onClick={() => recall(choise)}>
                        <div className="nav-link sideMenuToggler">
                            <i className="fas fa-compress-arrows-alt"></i>
                            <span className="text">Recolher</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;