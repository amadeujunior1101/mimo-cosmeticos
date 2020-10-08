import React from 'react'

import './navbar.css';
import ImgProfile from '../assets/img/i.jpg'

const Navbar = () => {
    return (
        <div className="nav-bar">
            <div className="title">
                <span className="title-name">Mimo Cosméticos</span>
            </div>
            <div className="circle-photo">
                <span>Amadeu de Sousa C. Júnior</span>
                <div className="circle">
                    <img src={ImgProfile} alt="Profile" style={{ borderRadius: 50, width: 40, height: 40 }} />
                </div>
            </div>
        </div>
    )
}

export default Navbar;