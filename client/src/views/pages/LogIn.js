import { useState } from 'react';
import Header from '../layout/Header';

function LogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='layout'>

            <Header showNotificationButton={false} />

            <main className='main'>
                <div className='page-content small'>

                    <h2 className='page-title'>Log In</h2>

                    <div className='page-table-container component-container'>
                        <form className='login-form'>
                            <div className='input-container'>
                                <label htmlFor="username">Username</label>
                                <input
                                    type='username'
                                    id='username'
                                    name='username'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder='Username'
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

export default LogIn;
