import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getPurchases } from '../../services/userInvestments';
import Layout from '../layout/Layout';
import { parseDate } from '../../util/parseDate';

export default function InvestmentHistory({ userId }) {

    const { loading, error, value: purchases } = useAsync(() => getPurchases({ userId }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Investment history</h2>

            <div className='page-header'>
                <div className='page-header__info'>
                    <div className='balanace-info'>
                        <h6 className='balance-info__label'>Total invested</h6>
                        <p className='balance-info__amount'>£518.30</p>
                    </div>
                </div>
                <div className='page-header__buttons'>
                    <select className='rounded-button' name="sort-by" id="sort-by"> 
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option> 
                        <option value="price">Price</option> 
                        <option value="impact">Impact</option> 
                    </select>
                    <button className='rounded-button'>Filter</button>
                    <Link 
                        to='/invest'
                        className='rounded-button coloured'
                    >+ Invest now</Link>
                </div>
            </div>

            <div className='page-table-container component-container'>
                {purchases?.length > 0 ? (
                    <table>
                        <thead>
                            <tr className='top-row'>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Benefit</th>
                                <th>Price</th>
                                <th>Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map(purchase => 
                                <tr key={purchase.id}>
                                    <td>{parseDate(purchase.date)}</td>
                                    <td>{purchase.investment.description}</td>
                                    <td>{purchase.investment.benefit}</td>
                                    <td>{purchase.pricePaid && `£${Number(purchase.pricePaid)?.toFixed(2)}`}</td>
                                    <td>{purchase.investment.impact && <p className={`impact-label ${purchase.investment.impact}`}>{purchase.investment.impact}</p>}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>You haven't made any investments yet</p>
                )}
            </div>

        </Layout>
    );
}
