import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
export default function Header(props) {
  return (
    <div className='header'>
      <div>{props.title}</div>
      <NavLink to='/'
      onClick={()=>{
        localStorage.clear()
      }}
      ><div
      
      ><button className='logoutBtn'>logout</button></div></NavLink>
       
    </div>
  )
}
