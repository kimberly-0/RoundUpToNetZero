import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { roundUp } from '../../util/roundUp';

export function TransactionForm({
    formType,
    loading, 
    error, 
    onSubmit, 
    user, 
    paymethods, 
    initialData = {
        transaction: {
            date: new Date(Date.now()).toISOString().split('T')[0] || '',
            description: '',
            amount: '',
            roundedAmount: 0,
            fundContribution: 0,
            paymethodId: '',
        }
    }
}) {

    const [transactionData, setTransactionData] = useState(initialData.transaction);

    const navigate = useNavigate();

    const updateFields = useCallback((fields) => {
        if (fields.paymethodId && fields.paymethodId === 'add-new') {
            if (window.confirm("Do you want to leave this page?")) {
                navigate('/settings/payment-methods/add-new');
            }
            return;
        }
        setTransactionData(prev => {
            return { ...prev, ...fields }
        })
    }, [navigate])

    useEffect(() => {
        updateFields({
            roundedAmount: roundUp(transactionData.amount),
            fundContribution: roundUp(transactionData.amount) - transactionData.amount,
        });
    }, [transactionData.amount, updateFields]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            date: transactionData.date + 'T00:00:00.000Z',
            description: transactionData.description,
            amount: transactionData.amount,
            roundedAmount: transactionData.roundedAmount,
            fundContribution: transactionData.fundContribution,
            userId: user.id,
            paymethodId: transactionData.paymethodId,
            companyId: user.company?.id
        }).then(() => {
            console.log("Success!");
        }).catch(error => {
            console.log(error);
        });
    };

    return (  
        <form className='transaction-form' onSubmit={handleSubmit}>

            <h4 className='section-title'>Transaction details</h4>
            <div className='transaction-form-section details-section'>

                <div className='input-container'>
                    <label htmlFor="date">Date of transaction</label>
                    <input
                        type='date'
                        id='addtransaction-date'
                        name='date'
                        value={transactionData.date}
                        onChange={e => {updateFields({date: e.target.value})}}
                        placeholder='Date'
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="description">Description</label>
                    <input
                        type='text'
                        name='description'
                        value={transactionData.description}
                        onChange={e => {updateFields({description: e.target.value})}}
                        placeholder='Description'
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="paymethodId">Payment method</label>
                        {paymethods?.length > 0 ? (
                            <select
                                name='paymethodId'
                                onChange={e => {updateFields({paymethodId: e.target.value})}}
                                value={transactionData.paymethodId}
                            >
                                <option value='' disabled>Select payment method</option>
                                {paymethods.map(method => 
                                    <option 
                                        key={method.id}
                                        value={method.id}
                                    >{method.type} ending {method.cardNumber.slice(-4)}</option>
                                )}
                                <option value='add-new'>Add new payment method</option>
                            </select>
                        ) : (
                            <p>No payment methods, <Link 
                                to='/settings/payment-methods/add-new'
                                className='link'
                            >click here to add one</Link></p>
                        )}
                </div>

                <div className='input-container'>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type='number'
                        id='addtransaction-amount'
                        name='amount'
                        value={transactionData.amount}
                        onChange={e => {updateFields({amount: e.target.value})}}
                        placeholder='Amount'
                    />
                </div>
            </div>

            <h4 className='section-title'>Contribution to Net Zero Fund</h4>
            <div className='transaction-form-section contribution-section'>
                <div className='section-row'>
                    <p>Transaction will be rounded up to</p>
                    <p>£{Number(transactionData.roundedAmount)?.toFixed(2)}</p>
                </div>
                <div className='section-row'>
                    <p>Contribution to Net Zero Fund</p>
                    <p>£{Number(transactionData.fundContribution)?.toFixed(2)}</p>
                </div>
            </div>

            <div className='transaction-form-section button-section'>
                <p className={`error-msg ${!error ? "hide" : ""}`}>{error}</p>

                <button 
                    className='form-button rounded-button coloured' 
                    type='submit'
                    disabled={loading}
                >{formType === 'edit' ? 'Save' : 'Process transaction'}</button>
            </div>
        </form>
    )
}