import React from 'react'
import {NavLink} from 'react-router-dom'
import train from '../Css/Images/train.png'
import bus from '../Css/Images/bus.png'
import '../Css/Header.css'
const Header = () => {
  return (
    <div className="header">
        <div className="list">
            <NavLink to="/" className='Link'>
            <li>
                <img src={train} alt="Train" />
                <h4>Train</h4>
            </li>
            </NavLink>
            <NavLink to="/bus" className='Link'>
            <li>
                <img src={bus} alt="Bus" />
                <h4>Bus</h4>
            </li>
            </NavLink>
        </div>
    </div>
  )
}

export default Header
