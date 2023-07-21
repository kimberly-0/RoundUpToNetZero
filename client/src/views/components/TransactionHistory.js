import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';

export default function TransactionHistory() {

    const userId = 0;
    const { loading, error, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <div className='component-container transaction-history-container'>
            <div className='component-header'>
                <h3 className='component-title'>Transaction history</h3>
                <Link 
                    to='/transaction-history' // TO DO: add correct route
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
                                <td>{transaction.date}</td>
                                <td>{transaction.amount.toFixed(2)}</td>
                                <td>{transaction.rounded}</td>
                                <td>{transaction.contributed.toFixed(2)}</td>
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