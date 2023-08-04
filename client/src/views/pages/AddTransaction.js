import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getPaymethods } from '../../services/userPaymethods';
import Layout from '../layout/Layout';
import { roundUp } from '../../util/roundUp';

export default function AddTransaction({ userId, onSubmit, loading, error}) {

    const INITIAL_DATA = {
        date: new Date(Date.now()).toISOString().split('T')[0] || '',
        description: '',
        amount: '',
        roundedAmount: 0,
        fundContribution: 0,
        userId: userId,
        paymethodId: '',
        companyId: '',
    };

    const [transactionData, setTransactionData] = useState(INITIAL_DATA);

    function updateFields(fields) {
        const { name, value, type, checked } = fields.target;
        setTransactionData(prev => {
            return {
                ...prev, 
                ...fields, 
                [name]: type === "checkbox" ? checked : value,
            }
        });
    };

    useEffect(() => {
        setTransactionData(prev => {
            return {
                ...prev,
                roundedAmount: roundUp(prev.amount),
                fundContribution: roundUp(prev.amount) - prev.amount,
            }
        });
    }, [transactionData.amount]);

    function handleSubmit(e) {
        console.log("Submit");

        console.log("   ");
        console.log("date: " + transactionData.date);
        console.log("description: " + transactionData.description);
        console.log("amount: " + transactionData.amount);
        console.log("roundedAmount: " + transactionData.roundedAmount);
        console.log("fundContribution: " + transactionData.fundContribution);
        console.log("userId: " + transactionData.userId);
        console.log("paymethodId: " + transactionData.paymethodId);
        console.log("companyId: " + transactionData.companyId);
        console.log("   ");

        e.preventDefault();
        // onSubmit(transactionData).then(() => setTransactionData(INITIAL_DATA));
    };

    const { loadingPaymethods, errorPaymethods, value: paymethods } = useAsync(() => getPaymethods({ userId }), [userId]);

    if (loadingPaymethods) return <h1>Loading</h1>

    if (errorPaymethods) return <h1 className="error-msg">{errorPaymethods}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Add new transaction</h2>

            <div className='page-table-container component-container'>
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
                                onChange={updateFields}
                                placeholder='Date'
                            />
                        </div>

                        <div className='input-container'>
                            <label htmlFor="description">Description</label>
                            <input
                                type='text'
                                id='addtransaction-description'
                                name='description'
                                value={transactionData.description}
                                onChange={updateFields}
                                placeholder='Description'
                            />
                        </div>

                        <div className='input-container'>
                            <label htmlFor="paymethodId">Payment method</label>
                                {paymethods?.length > 0 ? (
                                    <select
                                        name='paymethodId'
                                        onChange={updateFields}
                                        value={transactionData.paymethodId}
                                    >
                                        <option value='' disabled>Select payment method</option>
                                        {paymethods.map(method => 
                                            <option 
                                                key={method.id}
                                                value={method.id}
                                            >{method.type} ending {method.cardNumber}</option>
                                        )}
                                    </select>
                                ) : (
                                    <p>No payment methods</p>
                                )}
                        </div>
                        

                        <div className='input-container'>
                            <label htmlFor="amount">Amount</label>
                            <input
                                type='number'
                                id='addtransaction-amount'
                                name='amount'
                                value={transactionData.amount}
                                onChange={updateFields}
                                placeholder='Amount'
                            />
                        </div>
                    </div>

                    <h4 className='section-title'>Contribution to Net Zero Fund</h4>
                    <div className='transaction-form-section contribution-section'>
                        <div className='section-row'>
                            <p>Transaction will be rounded up to</p>
                            <p>£{transactionData.roundedAmount.toFixed(2)}</p>
                        </div>
                        <div className='section-row'>
                            <p>Contribution to Net Zero Fund</p>
                            <p>£{transactionData.fundContribution.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className='transaction-form-section button-section'>
                        <button 
                            className='form-button rounded-button coloured' 
                            type='submit'
                            disabled={loading}
                        >Process transaction</button>
                    </div>

                    <div className={`error-msg ${!error ? "hide" : ""}`}>{error}</div>
                </form>
            </div>
        </Layout>
    );
}
