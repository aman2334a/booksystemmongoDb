import React, { useState } from 'react'
import { signupApi } from '../../Shared/Services';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('')
    const [warn, setWarn] = useState(false)
    const [dataObject, setdataObject] = useState({
        username: '',
        password: '',
    })


    const displayErrorMsg=(msgToShow)=>{
        setErrorMsg(msgToShow)
        setWarn(true)
        setTimeout(()=>{
          setWarn(false)
        },[3000])
    }

    const submitFunction = () => {
        if(!dataObject.username ||!dataObject.password){
            alert(`fill`)
            return
        }
        signupApi(dataObject)
        .then(function (response) {
            console.log(response.data);
            alert("Signup Successfully")
        })
        .catch(function (error) {
            if(error.response.status==500){
                console.log(error)
            }else{
              displayErrorMsg(error.response.data)
            }
            console.log(error)
        });
        
    }
    return (
        <div className='signup'>
            <div className='heading'>SignUp</div>
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" value={dataObject.username} placeholder="Your Username.."
                onChange={(e) => {
                    setdataObject((old) => {
                        old.username = e.target.value
                        return { ...old }
                    })
                }}
            />

            

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={dataObject.password} placeholder="Your Password.."

                onChange={(e) => {
                    setdataObject((old) => {
                        old.password = e.target.value
                        return { ...old }
                    })
                }} />

            <span className='errormsg'>{warn&&errorMsg}</span>
            <input type="button" value="Submit"
                onClick={submitFunction}
            ></input>
            <span>Already have account ?<NavLink to='/'> LogIn</NavLink></span>

        </div>
    )
}
