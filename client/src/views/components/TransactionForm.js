import { useState, useEffect } from 'react';
import { roundUp } from '../../util/roundUp';

export function TransactionForm({
    formType,
    loading, 
    error, 
    onSubmit, 
    user, 
    paymethods, 
    initialData = {
        date: new Date(Date.now()).toISOString().split('T')[0] || '',
        description: '',
        amount: '',
        roundedAmount: 0,
        fundContribution: 0,
        paymethod: {
            id: '',
        },
    }
}) {
    
    const [date, setDate] = useState(initialData.date.split('T')[0]);
    const [description, setDescription] = useState(initialData.description);
    const [amount, setAmount] = useState(initialData.amount);
    const [roundedAmount, setRoundedAmount] = useState(initialData.roundedAmount);
    const [fundContribution, setFundContribution] = useState(initialData.fundContribution);
    const [paymethodId, setPaymethodId] = useState(initialData.paymethod.id);

    useEffect(() => {
        setRoundedAmount(roundUp(amount));
        setFundContribution(roundUp(amount) - amount);
    }, [amount]);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            date: date + 'T00:00:00.000Z',
            description: description,
            amount: amount,
            roundedAmount: roundedAmount,
            fundContribution: fundContribution,
            userId: user.id,
            paymethodId: paymethodId,
            companyId: user.companyId
        }).then(() => {
            console.log("Success!");
            // setDate(new Date(Date.now()).toISOString().split('T')[0] || '');
            // setDescription('');
            // setAmount('');
            // setRoundedAmount(0);
            // setFundContribution(0);
            // setPaymethodId('');
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
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        placeholder='Date'
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="description">Description</label>
                    <input
                        type='text'
                        name='description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Description'
                    />
                </div>

                <div className='input-container'>
                    <label htmlFor="paymethodId">Payment method</label>
                        {paymethods?.length > 0 ? (
                            <select
                                name='paymethodId'
                                onChange={e => setPaymethodId(e.target.value)}
                                value={paymethodId}
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
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder='Amount'
                    />
                </div>
            </div>

            <h4 className='section-title'>Contribution to Net Zero Fund</h4>
            <div className='transaction-form-section contribution-section'>
                <div className='section-row'>
                    <p>Transaction will be rounded up to</p>
                    <p>£{Number(roundedAmount)?.toFixed(2)}</p>
                </div>
                <div className='section-row'>
                    <p>Contribution to Net Zero Fund</p>
                    <p>£{Number(fundContribution)?.toFixed(2)}</p>
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