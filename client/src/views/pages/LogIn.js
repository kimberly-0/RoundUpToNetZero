import React, { useState } from 'react';
import Header from '../layout/Header';

async function loginUser(credentials) {
    return fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json());
}

export default function LogIn({ setToken }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({ email, password });
        setToken(token);
    }

    return (
        <div className='layout'>

            <Header showNotificationButton={false} />

            <main className='main'>
                <div className='page-content small'>

                    <h2 className='page-title'>Log In</h2>

                    <div className='page-table-container component-container'>
                        <form className='login-form' onSubmit={handleSubmit}>
                            <div className='input-container'>
                                <label htmlFor="email">Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Email'
                                    autoComplete='email'
                                />
                            </div>

                            <div className='input-container'>
                                <label htmlFor="password">Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Password'
                                    autoComplete='current-password'
                                />
                            </div>

                            <div className='button-section'>
                                {/* <p className={`error-msg ${!error ? "hide" : ""}`}>{error}</p> */}

                                <button 
                                    className='form-button rounded-button coloured' 
                                    type='submit'
                                >Log in</button>
                            </div>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
}
