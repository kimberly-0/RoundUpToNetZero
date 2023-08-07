import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useAsync } from '../../hooks/useAsync';
import { getTransactionById } from '../../services/userTransactions';
import { parseDate } from '../../util/parseDate';
import { FaTrash, FaEdit } from 'react-icons/fa'

export default function SingleTransaction({ userId }) {

    const params = useParams();

    const { loading, error, value: transaction } = useAsync(() => getTransactionById({ userId, transactionId: params.id }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Transaction</h2>

            <div className='page-table-container component-container'>
                {transaction ? (
                    <div className='single-transaction-container'>

                        <h4 className='section-title'>Transaction details</h4>
                        <div className='transaction-form-section details-section'>

                            <div className='input-container'>
                                <label htmlFor="date">Date of transaction</label>
                                <p>{parseDate(transaction.date)}</p>
                            </div>

                            <div className='input-container'>
                                <label htmlFor="description">Description</label>
                                <p>{transaction.description}</p>
                            </div>

                            <div className='input-container'>
                                <label htmlFor="paymethodId">Payment method</label>
                                <p>{transaction.paymethod.type} ending {transaction.paymethod.cardNumber}</p>
                            </div>

                            <div className='input-container'>
                                <label htmlFor="amount">Amount</label>
                                <p>£{Number(transaction.amount)?.toFixed(2)}</p>
                            </div>
                        </div>

                        <h4 className='section-title'>Contribution to Net Zero Fund</h4>
                        <div className='transaction-form-section contribution-section'>
                            <div className='section-row'>
                                <p className='label'>Transaction was rounded up to</p>
                                <p>£{Number(transaction.roundedAmount)?.toFixed(2)}</p>
                            </div>
                            <div className='section-row'>
                                <p className='label'>Contribution to Net Zero Fund</p>
                                <p>£{Number(transaction.fundContribution)?.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className='transaction-form-section button-section'>
                            <button 
                                className='form-button rounded-button coloured' 
                                type='button'
                                disabled={loading}
                            >Edit transaction</button>
                            <button 
                                className='form-button rounded-button icon-button red' 
                                type='button'
                                disabled={loading}
                            ><FaTrash /></button>
                        </div>
                    </div>
                ) : (
                    <p>Could not find transaction</p>
                )}
            </div>

        </Layout>
    );
}
