import { Link, useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import { parseDate } from '../../util/parseDate';

export default function TransactionHistory({ userId }) {

    const { loading, error, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    const navigate = useNavigate();
    
    const viewTransaction = (transaction) => {
        navigate(`/transactions/${transaction.id}`);
    }

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <div className='component-container transaction-history-container'>
            <div className='component-header'>
                <h3 className='component-title'>Transaction history</h3>
                <Link 
                    to='/add-transaction'
                    className='component-button'
                >+ Add new</Link>
            </div>

            {transactions?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th className='column-date'>Date</th>
                            <th className='column-amount'>Amount</th>
                            <th className='column-rounded-amount'>Rounded up</th>
                            <th className='column-contribution'>Added to NZF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.slice(0, 5).map(transaction => 
                            <tr 
                                key={transaction.id}
                                onClick={() => viewTransaction(transaction)}
                                className='link-effect'
                            >
                                <td className='column-date'>{parseDate(transaction.date)}</td>
                                <td className='column-amount'>£{Number(transaction.amount).toFixed(2)}</td>
                                <td className='column-rounded-amount'>£{transaction.roundedAmount}</td>
                                <td className='column-contribution'>£{Number(transaction.fundContribution).toFixed(2)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>You haven't made any transactions yet</p>
            )}

        </div>
    )
}