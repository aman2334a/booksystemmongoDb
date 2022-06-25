import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { loginApi } from '../../Shared/Services';

export default function Login() {
    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')
    const [warn, setWarn] = useState(false)
    const [loginobject, setLoginobject] = useState({
        username: '',
        password: '',
    })

    const displayErrorMsg=(msgToShow)=>{
        console.log(msgToShow)
        setErrorMsg(msgToShow)
        setWarn(true)
        setTimeout(()=>{
          setWarn(false)
        },[3000])
    }

    const login = (e) => {
        if(!loginobject.username||!loginobject.password){
            alert(`fill value`)
            return

        }
        // console.log(loginobject)
        loginApi(loginobject)
        .then(function (response) {
            console.log(response.data);
            localStorage.setItem('token',response.data)
            navigate('/dashboard')
          })
          .catch(function (error) {
              if(error.response.status==500){
                  console.log(error)
              }else{
                displayErrorMsg(error.response.data)
              }
          });



    }
    return (
        <div className='login'>
            <div className='heading'>Login</div>
            <label htmlFor="fname">Username</label>
            <input type="text" id="username" name="username" value={loginobject.username} required placeholder="Your Username.."
                onChange={(e) => {
                    setLoginobject((old) => {
                        old.username = e.target.value
                        return { ...old }
                    })
                }}
            />

            <label htmlFor="fname">Password</label>
            <input type="password" id="password" name="password" value={loginobject.password} required placeholder="Your Password.."
                onChange={(e) => {
                    setLoginobject((old) => {
                        old.password = e.target.value
                        return { ...old }
                    })
                }} />
            <span className='errormsg'>{warn&&errorMsg}</span>
            <input type="button" value="Login"
                onClick={login}
            ></input>
            <NavLink to='/signup'>SignUp</NavLink>


        </div>
    )
}
