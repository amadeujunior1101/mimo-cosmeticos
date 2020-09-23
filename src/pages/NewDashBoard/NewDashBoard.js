import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import ImgProfile from '../../assets/img/i.jpg'

import './styles.css';
import './sub-menu.css'

export default function NewDashBoard() {
    const [active, setActive] = useState(true)
    const [choise, setChoise] = useState("empty")
    const [size, setSize] = useState(200)
    const [option, setOption] = useState("dashboard")

    function collapseSideBar(active) {
        // alert(name)
        // if (choise !== "") {
        //     const disp1 = document.getElementById(choise);
        //     disp1.style.left = "43px"
        //     alert(choise)
        // }
        // hideShow()
        if (active === true) {
            const recolher = document.getElementById("content");
            recolher.style.flex = 8
            setSize(43)
            // if (choise !== "empty") {
            //     // alert("true")

            //     const disp1 = document.getElementById(choise);
            //     disp1.style.left = "43px"

            //     //     // const disp1 = document.getElementById(choise);
            //     //     // disp1.style.left = "43px"

            // }

            setActive(false)

        } else {
            const recolher = document.getElementById("content");
            recolher.style.flex = 9.7
            // alert("false")
            // if (choise !== "empty") {


            //     const disp1 = document.getElementById(choise);
            //     disp1.style.left = "200px"

            //     //     // const disp1 = document.getElementById(choise);
            //     //     // disp1.style.left = "43px"

            // }
            // else {
            //     const disp1 = document.getElementById(choise);
            //     disp1.style.left = "43px"

            // }
            setSize(200)
            setActive(true)


        }
        // const disp1 = document.getElementById(name);
        // disp1.style.left = 50
        // alert('recolher')
    }

    const expandedRegister = (name) => {
        // optionActive("register1")
        setOption(name)
        // hideShow()
        // setChoise(name)

        // alert(name)
        const disp = document.getElementById(name);
        if (disp.style.display === "block") {
            disp.style.display = "none"
            if (name === "sidebar-extra-register") {
                const disp = document.getElementById("sidebar-extra-report");
                disp.style.display = "none"
                setChoise("sidebar-extra-report")

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
                setChoise("sidebar-extra-register")

            } else if (name === "sidebar-extra-report") {
                const disp = document.getElementById("sidebar-extra-register");
                disp.style.display = "none"

                setChoise("sidebar-extra-report")
            }
        }
    }

    const optionStyle = {
        borderLeft: "solid 0.2rem",
        borderLeftColor: "#000"
    };
    const optionStyle2 = {};

    const activeStatus = (id) => {
        setOption(id)
        const disp = document.getElementById("sidebar-extra-register");
        disp.style.display = "none"
        const disp1 = document.getElementById("sidebar-extra-report");
        disp1.style.display = "none"
    }

    return (
        <div id="page-wrap">

            <div className="nav-bar">
                <div className="title">
                    <span>Mimo Cosméticos</span>
                </div>
                <div className="circle-photo">
                    <span>Amadeu de Sousa C. Júnior</span>
                    <div className="circle">
                        <img src={ImgProfile} alt="Profile"  style={{borderRadius: 50, width: 40, height: 40}}/>
                    </div>
                </div>
            </div>
            <div className="page-container">

                <nav>
                    <ul >
                        <li onClick={() => activeStatus("dashboard")} style={option === "dashboard" ? optionStyle : optionStyle2}>
                            <Link to={"/"}>
                                <i className="fas fa-desktop" id="icon-sidebar"></i>

                                {
                                    active === true &&
                                    <span>Dashboard</span>
                                }
                            </Link>
                        </li>
                        <li onClick={() => expandedRegister("sidebar-extra-register")} style={option === "sidebar-extra-register" ? optionStyle : optionStyle2}>
                            <div id="register">
                                <div id="sidebar-register">
                                    <i className="fas fa-pencil-alt" id="icon-sidebar"></i>

                                    {
                                        active === true &&
                                        <span>Cadastros</span>
                                    }
                                </div>
                            </div>

                            <div style={{ left: size }} id="sidebar-extra-register">

                                <nav >
                                    <ul >
                                        <li >
                                            <Link to={"/categorias"} >
                                                <i className="fas fa-list-alt" id="icon-sidebar"></i>
                                                <span>Categorias</span>
                                            </Link>
                                        </li>
                                        <li >
                                            <Link to={"/clientes"} >
                                                <i className="fas fa-users" id="icon-sidebar"></i>
                                                <span className="text">Clientes</span>
                                            </Link>
                                        </li>

                                        <li >
                                            <Link to={"/vendedores"} >
                                                <i className="fas fa-user" id="icon-sidebar"></i>
                                                <span className="text">Vendedores</span>
                                            </Link>
                                        </li>

                                        <li >
                                            <Link to={"/produtos"} >
                                                <i className="fas fa-list" id="icon-sidebar"></i>
                                                <span className="text">Produtos</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>

                            </div>

                        </li>
                        <li onClick={() => activeStatus("caixa")} style={option === "caixa" ? optionStyle : optionStyle2}>
                            <Link to={"/"}>
                                <i className="fas fa-chart-bar" id="icon-sidebar"></i>

                                {
                                    active === true &&
                                    <span>Caixa</span>
                                }
                            </Link>
                        </li>
                        <li onClick={() => expandedRegister("sidebar-extra-report")} style={option === "sidebar-extra-report" ? optionStyle : optionStyle2}>
                            <div id="register">
                                <div id="sidebar-register">
                                    <i className="fas fa-list" id="icon-sidebar"></i>

                                    {
                                        active === true &&
                                        <span>Relatório</span>
                                    }
                                </div>
                            </div>

                            <div style={{ left: size }} id="sidebar-extra-report">

                                <div>
                                    <span className="text">Vendas</span>
                                    <ul>
                                        <li>
                                            <Link to="/produtos" className="nav-link pr-2">
                                                <i className="fas fa-list" id="icon-sidebar"></i>
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/produtos" className="nav-link pr-2">
                                                <i className="fas fa-list" id="icon-sidebar"></i>
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <span className="text">Despesas</span>
                                    <ul>
                                        <li>
                                            <Link to="/produtos" className="nav-link pr-2">
                                                <i className="fas fa-list" id="icon-sidebar"></i>
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/produtos" className="nav-link pr-2">
                                                <i className="fas fa-list" id="icon-sidebar"></i>
                                                <span>Relatórios</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </li>
                        <li onClick={() => activeStatus("config")} style={option === "config" ? optionStyle : optionStyle2}>
                            <Link to={"/"}>
                                <i className="fas fa-cog" id="icon-sidebar"></i>

                                {
                                    active === true &&
                                    <span>Configurações</span>
                                }
                            </Link>
                        </li>
                        <li className="recall" onClick={() => collapseSideBar(active)}>
                            <div id="register">
                                <i className="fas fa-compress-arrows-alt" id="icon-sidebar"></i>
                                {
                                    active === true &&
                                    <span>Recolher</span>
                                }
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="content" id="content">
                    <span>content area</span>
                </div>
            </div>

        </div>
    )
}

{/* <nav id="side-bar">
                    <ul className="navbar-nav">
                        <li className="nav-item" id="list-hover">
                            <Link to={"/"} className="nav-link">

                                <i className="fas fa-desktop"></i>
                                <span className="text" >Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item" id="list-hover" onClick={() => expandedRegister("sidebar-extra-register")}>
                            <div id="sidebar-register" className="nav-link">
                                <i className="fas fa-pencil-alt"></i>
                                {
                                    active === true &&
                                    <span className="text" >Cadastros</span>
                                }
                            </div>

                            <div style={{ left: size }} id="sidebar-extra-register">

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

                        </li>
                        <li className="nav-item" id="list-hover">
                            <div id="sidebar-register" className="nav-link">
                                <i className="fas fa-chart-bar"></i>
                                {
                                    active === true &&
                                    <span className="text" >Caixa</span>
                                }
                            </div>
                        </li>
                        <li className="nav-item" id="list-hover" onClick={() => expandedRegister("sidebar-extra-report")}>
                            <div id="sidebar-register" className="nav-link">
                                <i className="fas fa-pencil-alt"></i>
                                {
                                    active === true &&
                                    <span className="text" >Relatórios</span>
                                }
                            </div>

                            <div style={{ left: size }} id="sidebar-extra-report">

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

                        </li>
                        <li className="nav-item" id="list-hover" onClick={() => { }}>
                            <Link to={"/"} className="nav-link">
                                <i className="fas fa-cog"></i>
                                {
                                    active === true &&
                                    <span className="text" >Configurações</span>
                                }

                            </Link>
                        </li>

                        <li className="nav-item recall" id="list-hover" onClick={() => collapseSideBar(active)}>
                            <div className="nav-link">
                                <i className="fas fa-compress-arrows-alt"></i>
                                {
                                    active === true &&
                                    <span className="text" >Recolher</span>
                                }
                            </div>
                        </li>
                    </ul>
                </nav> */}

{/* onClick={() => optionActive("dashboard")} */ }