import { Link } from 'react-router-dom';

export default function TransactionHistory() {

    const transactions = [{
        id: 1,
        date: "19/07/2023",
        amount: 123.45,
        rounded: 130,
        contributed: 6.55
    }, {
        id: 2,
        date: "18/07/2023",
        amount: 261.32,
        rounded: 270,
        contributed: 8.68
    }, {
        id: 3,
        date: "13/07/2023",
        amount: 16.10,
        rounded: 20,
        contributed: 3.90
    }, {
        id: 4,
        date: "04/07/2023",
        amount: 58.93,
        rounded: 60,
        contributed: 1.07
    }, {
        id: 5,
        date: "02/07/2023",
        amount: 502.11,
        rounded: 510,
        contributed: 7.89
    }];

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