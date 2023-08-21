import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncFn } from '../../../hooks/useAsync';
import { createPaymethod } from '../../../services/userPaymethods';

/*
WARNING: Data is not being encrypted or stored in the database in a secure way. Do not let users enter real payment card information.
*/

export default function AddPaymentMethod({ userId }) {

    const [paymethodData, setPaymethodData] = useState({
        cardholderName: '',
        monitored: 'false',
        cardType: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        postcode: '',
        country: '',
    });

    function updateFields(fields) {    
        setPaymethodData(prev => {
            return { ...prev, ...fields }
        })
    }

    const { loading, error, execute: createPaymethodFn } = useAsyncFn(createPaymethod);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault(); 
        createPaymethodFn({ 
            userId,
            paymethod: {
                cardNumber: paymethodData.cardNumber,
                type: paymethodData.cardType,
                monitored: paymethodData.monitored === 'true' ? true : false,
            }
        })
         .then(() => {
            console.log("Success!");
            navigate('/settings/payment-methods');
        })
        .catch(error => {
            console.log(error);
        });
    }; 

    return (
        <div className='page-table-container component-container'>
            <div className='settings-title-container'>
                <h2 className='section-title'>Add new payment method</h2>
                <p className='warning-msg'>WARNING: Do not enter real payment card information!</p>
            </div>

            <form className='add-paymethod-form' onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor="cardholder-name">Cardholder name</label>
                    <input
                        type='text'
                        name='cardholder-name'
                        value={paymethodData.cardholderName}
                        onChange={e => {updateFields({cardholderName: e.target.value})}}
                        placeholder='John M. Doe'
                        autoComplete='cc-name'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="monitored">Round up transactions</label>
                    <select
                        type='text'
                        name='monitored'
                        value={paymethodData.monitored}
                        onChange={e => {updateFields({monitored: e.target.value})}}
                        required
                    >
                        <option value='false'>No</option>
                        <option value='true'>Yes</option>
                    </select>
                </div>
                <div className='input-container'>
                    <label htmlFor="card-type">Payment type</label>
                    <input
                        type='text'
                        name='card-type'
                        value={paymethodData.cardType}
                        onChange={e => {updateFields({cardType: e.target.value})}}
                        placeholder='Visa'
                        autoComplete='cc-type'
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="card-number">Card number</label>
                    <input
                        type='text'
                        name='card-number'
                        value={paymethodData.cardNumber}
                        onChange={e => {updateFields({cardNumber: e.target.value})}}
                        placeholder='1111-2222-3333-4444'
                        autoComplete='cc-number'
                        required
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="expiry-date">Expiry date</label>
                    <input
                        type='text'
                        name='expiry-date'
                        value={paymethodData.expiryDate}
                        onChange={e => {updateFields({expiryDate: e.target.value})}}
                        placeholder='01/22'
                        autoComplete='cc-exp'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="security-code">Security code</label>
                    <input
                        type='text'
                        name='security-code'
                        value={paymethodData.securityCode}
                        onChange={e => {updateFields({securityCode: e.target.value})}}
                        placeholder='123'
                        autoComplete='cc-csc'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="postcode">Postcode</label>
                    <input
                        type='text'
                        name='postcode'
                        value={paymethodData.postcode}
                        onChange={e => {updateFields({postcode: e.target.value})}}
                        placeholder='AB1 2CD'
                        autoComplete='postal-code'
                    />
                </div>
                <div className='input-container'>
                    <label htmlFor="country">Country</label>
                    <input
                        type='text'
                        name='country'
                        value={paymethodData.country}
                        onChange={e => {updateFields({country: e.target.value})}}
                        placeholder='United Kingdom'
                        autoComplete='country'
                    />
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    <p className={`error-msg ${!error ? "hide" : ""}`}>{error}</p>
                    <button 
                        className='form-button rounded-button coloured' 
                        type='submit'
                        disabled={loading}
                    >Add card</button>
                </div>
            </form>
        </div>
    )
}

