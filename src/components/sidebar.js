import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';
import './sub-menu.css';

const Sidebar = () => {
    const [active, setActive] = useState(true);
    const [size, setSize] = useState(103);
    const [option, setOption] = useState('home');

    function collapseSideBar(active) {
        if (active === true) {
            const recolher = document.getElementById('content');
            recolher.style.flex = 8;
            setSize(55);
            setActive(false);
        } else {
            const recolher = document.getElementById('content');
            recolher.style.flex = 9.7;
            setSize(103);
            setActive(true);
        }
    }

    const expandedRegister = (name) => {
        setOption(name);

        const disp = document.getElementById(name);
        if (disp.style.display === 'block') {
            disp.style.display = 'none';
            if (name === 'sidebar-extra-register') {
                const disp = document.getElementById('sidebar-extra-report');
                disp.style.display = 'none';
            } else if (name === 'sidebar-extra-report') {
                const disp = document.getElementById('sidebar-extra-register');
                disp.style.display = 'none';
            }
        } else {
            disp.style.display = 'block';
            if (name === 'sidebar-extra-register') {
                const disp = document.getElementById('sidebar-extra-report');
                disp.style.display = 'none';
            } else if (name === 'sidebar-extra-report') {
                const disp = document.getElementById('sidebar-extra-register');
                disp.style.display = 'none';
            }
        }
    };

    const optionStyle = {
        borderLeft: 'solid 0.4rem',
        borderLeftColor: '#1bb99a',
    };
    const optionStyle2 = {};

    const activeStatus = (id) => {
        setOption(id);
        const disp = document.getElementById('sidebar-extra-register');
        disp.style.display = 'none';
        const disp1 = document.getElementById('sidebar-extra-report');
        disp1.style.display = 'none';
    };

    return (
        <nav className="container-sidebar">
            <div id="fixo">
                <div id="rolavel">
                    <ul>
                        <li
                            onClick={() => activeStatus('home')}
                            style={
                                option === 'home' ? optionStyle : optionStyle2
                            }
                        >
                            <Link
                                to={'/'}
                                className="icon-sidebar fas fa-desktop"
                            >
                                {/* <i
                                    className="icon-sidebar fas fa-desktop"

                                ></i> */}

                                {active === true && <span>Home</span>}
                            </Link>
                        </li>
                        <li
                            onClick={() =>
                                expandedRegister('sidebar-extra-register')
                            }
                            style={
                                option === 'sidebar-extra-register'
                                    ? optionStyle
                                    : optionStyle2
                            }
                        >
                            <div id="register">
                                <div
                                    id="sidebar-register"
                                    className="icon-sidebar fas fa-pencil-alt"
                                >
                                    {/* <i
                                        className="icon-sidebar fas fa-pencil-alt"

                                    ></i> */}

                                    {active === true && <span>Cadastros</span>}
                                </div>
                            </div>

                            <div
                                style={{ left: size }}
                                id="sidebar-extra-register"
                            >
                                <nav>
                                    <ul>
                                        <li>
                                            <Link
                                                to={'/categorias'}
                                                className="icon-sidebar fas fa-list-alt"
                                            >
                                                {/* <i


                                                ></i> */}
                                                <span>Categorias</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={'/clientes'}
                                                className="icon-sidebar fas fa-users"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-users"

                                                ></i> */}
                                                <span className="text">
                                                    Clientes
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to={'/vendedores'}
                                                className="icon-sidebar fas fa-user"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-user"

                                                ></i> */}
                                                <span className="text">
                                                    Vendedores
                                                </span>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to={'/produtos'}
                                                className="icon-sidebar fas fa-list"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-list"

                                                ></i> */}
                                                <span className="text">
                                                    Produtos
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </li>
                        <li
                            onClick={() => activeStatus('caixa')}
                            style={
                                option === 'caixa' ? optionStyle : optionStyle2
                            }
                        >
                            <Link
                                to={'/'}
                                className="icon-sidebar fas fa-chart-bar"
                            >
                                {/* <i
                                    className="icon-sidebar fas fa-chart-bar"

                                ></i> */}

                                {active === true && <span>Caixa</span>}
                            </Link>
                        </li>
                        <li
                            onClick={() =>
                                expandedRegister('sidebar-extra-report')
                            }
                            style={
                                option === 'sidebar-extra-report'
                                    ? optionStyle
                                    : optionStyle2
                            }
                        >
                            <div id="register">
                                <div
                                    id="sidebar-register"
                                    className="icon-sidebar fas fa-list"
                                >
                                    {/* <i
                                        className="icon-sidebar fas fa-list"

                                    ></i> */}

                                    {active === true && <span>Relatório</span>}
                                </div>
                            </div>

                            <div
                                style={{ left: size }}
                                id="sidebar-extra-report"
                            >
                                <div className="menu-extra-position">
                                    <span className="title-sidebar-extra">
                                        Vendas
                                    </span>
                                    <ul>
                                        <li>
                                            <Link
                                                to="/produtos"
                                                className="icon-sidebar fas fa-list"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-list"

                                                ></i> */}
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/produtos"
                                                className="icon-sidebar fas fa-list"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-list"

                                                ></i> */}
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <span className="title-sidebar-extra">
                                        Despesas
                                    </span>
                                    <ul>
                                        <li>
                                            <Link
                                                to="/produtos"
                                                className="icon-sidebar fas fa-list"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-list"

                                                ></i> */}
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/produtos"
                                                className="icon-sidebar fas fa-list"
                                            >
                                                {/* <i
                                                    className="icon-sidebar fas fa-list"

                                                ></i> */}
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li
                            onClick={() => activeStatus('config')}
                            style={
                                option === 'config' ? optionStyle : optionStyle2
                            }
                        >
                            <Link to={'/'} className="icon-sidebar fas fa-cog">
                                {/* <i className="icon-sidebar fas fa-cog"></i> */}

                                {active === true && <span>Configurações</span>}
                            </Link>
                        </li>
                        <li
                            onClick={() => activeStatus('config')}
                            style={
                                option === 'config' ? optionStyle : optionStyle2
                            }
                        >
                            <Link to={'/'} className="icon-sidebar fas fa-cog">
                                {/* <i className="icon-sidebar fas fa-cog"></i> */}

                                {active === true && <span>Configurações</span>}
                            </Link>
                        </li>
                        <li
                            onClick={() => activeStatus('config')}
                            style={
                                option === 'config' ? optionStyle : optionStyle2
                            }
                        >
                            <Link to={'/'} className="icon-sidebar fas fa-cog">
                                {/* <i className="icon-sidebar fas fa-cog"></i> */}

                                {active === true && <span>Configurações</span>}
                            </Link>
                        </li>
                        {/* <li className="recall" onClick={() => collapseSideBar(active)}>
                    <div id="register">
                        <i
                            className="fas fa-compress-arrows-alt"

                        ></i>
                        {active === true && <span>Recolher</span>}
                    </div>
                </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
