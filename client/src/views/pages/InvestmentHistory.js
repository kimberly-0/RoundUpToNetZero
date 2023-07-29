import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getInvestments } from '../../services/userInvestments';
import Layout from '../layout/Layout';

export default function InvestmentHistory({ userId }) {

    const { loading, error, value: investments } = useAsync(() => getInvestments({ userId }), [userId]);

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
                {investments?.length > 0 ? (
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
                            {investments.map(investment => 
                                <tr key={investment.investment_id}>
                                    <td>{investment.date}</td>
                                    <td>{investment.description}</td>
                                    <td>{investment.benefit}</td>
                                    <td>{investment.price && `£${investment.price?.toFixed(2)}`}</td>
                                    <td>{investment.impact && <p className={`impact-label ${investment.impact}`}>{investment.impact}</p>}</td>
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
