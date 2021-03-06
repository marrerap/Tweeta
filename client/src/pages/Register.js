import React, { useState } from 'react'
import {  useHistory } from 'react-router'


function Register() {

    const [ username, setUsername] = useState('')
    const [ password, setPassword] = useState('')
    const [  error, setError ] = useState('')
    const history = useHistory()


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.error) {
                setError(data.error)
            }else {
                history.push('/login')
            }
        })

    }

    return (
        <div>
           { error && (<div className="error">{error}</div>) }

            <form onSubmit={handleSubmit} >
                <label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)}  />
                </label>
                <br/>
                <label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)}  />
                </label>
                <br/>
                <button type='submit' >Register</button>

            </form>
        </div>
    )
}

export default Register
