import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import { getTotalNZFundContributions } from "../../services/userTransactions";
import { getTotalInvested } from "../../services/userInvestments";
import Layout from '../layout/Layout';
import { parseDate } from '../../util/parseDate';

export default function TransactionHistory({ userId }) {

    const { loadingA, errorA, value: totalNZFundContribution } = useAsync(() => getTotalNZFundContributions({ userId }), [userId]);

    const { loadingB, errorB, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    const { loadingC, errorC, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    if (loadingA || loadingB || loadingC) return <h1>Loading</h1>

    if (errorA || errorB || errorC) return <h1 className="error-msg">{errorA || errorB || errorC}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Transaction history</h2>

            <div className='page-header'>
                <div className='page-header__info'>
                    <div className='balanace-info coloured'>
                        <h6 className='balance-info__label'>Net Zero Fund</h6>
                        <p className='balance-info__amount'>£{typeof (totalNZFundContribution - totalInvested) === 'number' ? (totalNZFundContribution - totalInvested)?.toFixed(2) : 0}</p>
                    </div>
                    <div className='balanace-info'>
                        <h6 className='balance-info__label'>Total contributions</h6>
                        <p className='balance-info__amount'>£{typeof totalNZFundContribution === 'number' ? totalNZFundContribution?.toFixed(2) : 0}</p>
                    </div>
                </div>
                <div className='page-header__buttons'>
                    <select className='rounded-button' name="sort-by" id="sort-by"> 
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option> 
                        <option value="trans-amount">Transaction amount</option> 
                        <option value="contr-amount">Contribution amount</option> 
                    </select>
                    <button className='rounded-button'>Filter</button>
                    <Link 
                        to='/transaction-history' // TO DO: add correct route
                        className='rounded-button coloured'
                    >+ Add new</Link>
                </div>
            </div>

            <div className='page-table-container component-container'>
                {transactions?.length > 0 ? (
                    <table>
                        <thead>
                            <tr className='top-row'>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Rounded up</th>
                                <th>Added to NZF</th>
                                <th>Payment method</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => 
                                <tr key={transaction.id}>
                                    <td>{parseDate(transaction.date)}</td>
                                    <td>£{Number(transaction.amount)}</td>
                                    <td>£{transaction.roundedAmount}</td>
                                    <td>£{Number(transaction.fundContribution).toFixed(2)}</td>
                                    <td>{transaction.paymethod.type} ending in {transaction.paymethod.cardNumber}</td>
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
