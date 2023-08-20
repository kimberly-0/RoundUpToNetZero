import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '../../../hooks/useAsync';
import { useAsyncFn } from '../../../hooks/useAsync';
import { getPaymethods } from '../../../services/userPaymethods';
import { updatePaymethod } from '../../../services/userPaymethods';

export default function PaymentMethodsSettings({  
    userId,
    onSubmit,
    initialData = {
        paymethods: []
    } }) {

    const [userPaymethods, setUserPaymethods] = useState(initialData.paymethods);

    const { loadingPaymethods, errorPaymethods } = useAsync(() => getPaymethods({ userId }).then(paymethods => {
        setUserPaymethods(paymethods);
    }), [userId]);

    const { loadingUpdate, errorUpdate, execute: updatePaymethodFn } = useAsyncFn(updatePaymethod);

    function toggleChecked(paymethodId) {
        const paymethodObject = userPaymethods.find(paymethod => paymethod.id === paymethodId);
        onSubmit({
            updateFn: updatePaymethodFn, 
            args: { 
                userId, 
                paymethodId,
                paymethod: {
                    cardNumber: paymethodObject.cardNumber,
                    type: paymethodObject.type,
                    monitored: !paymethodObject.monitored,
                }
            }, 
            confirmMessage: 'Are you sure you want to ' + (!paymethodObject.monitored ? `have ${paymethodObject.type} ending in ${paymethodObject.cardNumber} monitored?` : `stop monitoring ${paymethodObject.type} ending in ${paymethodObject.cardNumber}?`)             
        })?.then(() => {
            const newUserPaymethods = userPaymethods.map(paymethod => {
                if (paymethod.id === paymethodId) {
                    return {...paymethod, monitored: !paymethod.monitored};
                }
                return paymethod;
            });
            setUserPaymethods(newUserPaymethods);
        });
    }

    if (loadingPaymethods) return <h1>Loading</h1>

    if (errorPaymethods) return <h1 className="error-msg">{errorPaymethods}</h1>

    return (
        <div className='page-table-container component-container'>
            <div className='settings-title-container'>
                <h2 className='section-title'>Payment methods</h2>
                <p>Update your payment details here.</p>
            </div>

            <form className='paymethods-settings-form' >
                <div className='paymethods-container full-width'>
                    {userPaymethods?.length > 0 ? (
                    <>
                        <div className='paymethods-label-container'>
                            <label>Linked payment methods</label>
                            <label htmlFor='monitored' className='paymethods-list-item-label'>Monitored</label>
                        </div>
                        <div className="paymethods-list">
                                {userPaymethods.map(paymethod => 
                                    <ul className='paymethods-list-item-box' key={paymethod.id}>
                                        <li>{paymethod.type} ending in {paymethod.cardNumber.slice(-4)}</li>
                                        <input 
                                            type="checkbox" 
                                            id='monitored' 
                                            checked={paymethod.monitored}
                                            onChange={() => toggleChecked(paymethod.id)}
                                            disabled={loadingUpdate}
                                        ></input>
                                    </ul>
                                )}
                        </div>
                    </>
                    ) : (
                        <p>There are no linked payment methods</p>
                    )}
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    <p className={`error-msg ${!errorUpdate ? "hide" : ""}`}>{errorUpdate}</p>
                    <Link to='/settings/add-payment-method'><button 
                        className='form-button rounded-button coloured-light' 
                        type='button'
                        disabled={loadingPaymethods}
                    >Add new payment method</button></Link>
                </div>
            </form>
        </div>
    )
}

