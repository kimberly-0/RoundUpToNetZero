import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import { parseDate } from '../../util/parseDate';

export default function TransactionHistory({ userId }) {

    const { loading, error, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

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
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Rounded up</th>
                            <th>Added to NZF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.slice(0, 5).map(transaction => 
                            <tr key={transaction.id}>
                                <td>{parseDate(transaction.date)}</td>
                                <td>£{Number(transaction.amount).toFixed(2)}</td>
                                <td>£{transaction.roundedAmount}</td>
                                <td>£{Number(transaction.fundContribution).toFixed(2)}</td>
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