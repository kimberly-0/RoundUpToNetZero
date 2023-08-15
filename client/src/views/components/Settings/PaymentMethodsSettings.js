import { useState } from 'react';
import { useAsync } from '../../../hooks/useAsync';
// import { useAsyncFn } from '../../../hooks/useAsync';
import { getUser } from '../../../services/user';
// import { updateCompany } from '../../../services/company';

export default function PaymentMethodsSettings({  
    userId,
    onSubmit,
    initialData = {
        paymethods: [{
            id: '',
    }]} }) {

    const [userPaymethods, setUserPaymethods] = useState(initialData.paymethods);

    const { loadingUser, errorUser, value: user } = useAsync(() => getUser({ userId }).then(user => {
        // console.log("User: " + JSON.stringify(user));
        console.log("User paymethods: " + JSON.stringify(user.paymethods));

        setUserPaymethods(user.paymethods);
    }), [userId]);

    // TO CHANGE !!!!!
    // const { loadingUpdate, errorUpdate, execute: updateCompanyFn } = useAsyncFn(updateCompany);

    // TO CHANGE !!!!!
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Saved");
        console.log("User: " + user);
        // onSubmit(updateCompanyFn, { companyId, company: {
        //     name: companyName,
        //     registrationNumber: companyRegNumber,
        //     industry: industry,
        //     numberOfEmployees: Number(numOfEmployees),
        // }});
    };

    if (loadingUser) return <h1>Loading</h1>

    if (errorUser) return <h1 className="error-msg">{errorUser}</h1>
  
    return (
        <div className='page-table-container component-container'>
            <div className='settings-title-container'>
                <h2 className='section-title'>Payment methods</h2>
                <p>Update your payment details here.</p>
            </div>

            <form className='settings-form' onSubmit={handleSubmit}>
                <div className='input-container full-width'>
                    <div className='paymethods-label-container'>
                        <label>Linked payment methods</label>
                        <label htmlFor='monitored' className='paymethods-list-item-label'>Monitored</label>
                    </div>
                    <div className="paymethods-list">
                        {userPaymethods?.length > 0 ? (
                            userPaymethods.map(paymethod => 
                                <ul className='paymethods-list-item-box' key={paymethod.id}>
                                    <li>{paymethod.type} ending in {paymethod.cardNumber}</li>
                                    <input type="checkbox" id='monitored' name={`monitored-${paymethod.id}`} value={paymethod.monitored}></input>
                                </ul>
                            )
                        ) : (
                            <p>There are no linked payment methods</p>
                        )}
                    </div>
                </div>
                
                <div className='input-container'>
                    <label htmlFor="add-new-payment-method">Add new payment method</label>
                    
                </div>

                <div className='transaction-form-section button-section  full-width'>
                    {/* <p className={`error-msg ${!errorUpdate ? "hide" : ""}`}>{errorUpdate}</p> */}
                    <button 
                        className='form-button rounded-button coloured' 
                        type='submit'
                        // disabled={loadingUpdate}
                    >Save changes</button>
                </div>
            </form>
        </div>
    )
}

