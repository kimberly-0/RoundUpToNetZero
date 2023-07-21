import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import Layout from '../layout/Layout';

export default function TransactionHistory() {

    const userId = 0;
    const { loading, error, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Transaction History</h2>

            <div className='page-header'>
                <div className='page-header-info'>
                    <div className='balanace-info coloured'>
                        <h6 className='balance-info__label'>Net Zero Fund</h6>
                        <p className='balance-info__amount'>£262.42</p>
                    </div>
                    <div className='balanace-info'>
                        <h6 className='balance-info__label'>Total contributions</h6>
                        <p className='balance-info__amount'>£780.72</p>
                    </div>
                </div>
                <div className='page-header-buttons'>
                    <select className='filter-button' name="sort-by" id="sort-by"> 
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option> 
                        <option value="trans-amount">Transaction amount</option> 
                        <option value="contr-amount">Contribution amount</option> 
                    </select>
                    <button className='filter-button'>Filter</button>
                    <Link 
                        to='/transaction-history' // TO DO: add correct route
                        className='component-button'
                    >+ Add new</Link>
                </div>
            </div>

            <div className='page-table-container component-container'>
                {transactions?.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Rounded up</th>
                                <th>Added to NZF</th>
                                <th>Payment method</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.slice(0, 5).map(transaction => 
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.amount.toFixed(2)}</td>
                                    <td>{transaction.rounded}</td>
                                    <td>{transaction.contributed.toFixed(2)}</td>
                                    <td>{transaction.paymethod}</td>
                                    <td>{transaction.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't made any transactions yet</p>
                )}
            </div>

        </Layout>
    );
}
