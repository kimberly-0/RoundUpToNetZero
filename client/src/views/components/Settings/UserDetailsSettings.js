import { useState } from 'react';
import { useAsync, useAsyncFn } from '../../../hooks/useAsync';
import { getUser, updateUser } from '../../../services/user';

export default function UserDetailsSettings({  
    userId,
    onSubmit,
    initialData = {
        email: '',
        password: '',
        confirmPassword: '',
    }}) {

    const [email, setEmail] = useState(initialData.email);
    const [password, setPassword] = useState(initialData.password);
    const [confirmPassword, setConfirmPassword] = useState(initialData.password);

    const { loadingUser, errorUser } = useAsync(() => getUser({ userId }).then(user => {
        setEmail(user.email);
        setPassword(user.password);
        setConfirmPassword(user.password);
    }), [userId]);

    const { loadingUpdate, errorUpdate, execute: updateUserFn } = useAsyncFn(updateUser);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            updateFn: updateUserFn, 
            args: { 
                userId, 
                user: {
                    email: email,
                    password: password,
                }
            }, 
            confirmMessage: "Are you sure you want to save the changes?"
        });
    };

    if (loadingUser) return <h1>Loading</h1>

    if (errorUser) return <h1 className="error-msg">{errorUser}</h1>
  
    return (
        <div className='page-table-container component-container'>
            <div className='settings-title-container'>
                <h2 className='section-title'>User details</h2>
                <p>Update your personal details here.</p>
            </div>

            <form className='settings-form' onSubmit={handleSubmit}>
                <div className='input-container full-width'>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type='email'
                        name='email'
                        value={email}
                        autoComplete='email'
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="password">Password</label>
                    <input
                        type='password'
                        name='password'
                        value={password}
                        autoComplete='new-password'
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="confirm-password">Confirm password</label>
                    <input
                        type='password'
                        name='confirm-password'
                        value={confirmPassword}
                        autoComplete='new-password'
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    <p className={`error-msg ${!errorUpdate ? "hide" : ""}`}>{errorUpdate}</p>
                    <button 
                        className='form-button rounded-button coloured' 
                        type='submit'
                        disabled={loadingUpdate}
                    >Save changes</button>
                </div>
            </form>
        </div>
    )
}
