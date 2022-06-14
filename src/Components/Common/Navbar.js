import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className="top-navBar">

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <li><Link to={'/'} className="nav-link"> Home </Link></li>

                </ul>
            </nav>
        </div>
    )
}
