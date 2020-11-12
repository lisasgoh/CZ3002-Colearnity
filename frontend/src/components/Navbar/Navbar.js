import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import { Link } from 'react-router-dom';
import Search from '../Search';
import './Navbar.css';

class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }
    
    render() {
        return(
            <nav className="NavbarItems">
                <Link to="/" style={{textDecoration: "none"}}><h1 className="navbar-logo">Colearnity</h1></Link>
                <div className="searchbar"><Search /></div>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} 
                                href={item.url}
                                style={{textDecoration: "none"}}>
                                <Link to={item.url} style={{color: "black", textDecoration: "none"}}>
                                    {item.title}
                                </Link>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        )
    }
}

export default Navbar
