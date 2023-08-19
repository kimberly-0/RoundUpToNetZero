import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { makeRequest  } from '../../services/makeRequest';
import PropTypes from 'prop-types';
import Header from '../layout/Header';

async function loginUser(credentials) {
    return makeRequest('/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(credentials),
    });
}

export default function LogIn({ setToken, setUserId }) {

    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.clear();
        await loginUser({ email, password })
        .then(data => {
            setToken(data.token);
            setUserId(data.userId);
            setError('');
            if (location.pathname === '/log-in') {
                navigate('/');
            }
        })
        .catch(error => {
            setError(error);
        });
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
                                <p className={`error-msg ${!error ? "hide" : ""}`}>{error}</p>

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

LogIn.propTypes = {
  setToken: PropTypes.func.isRequired
}