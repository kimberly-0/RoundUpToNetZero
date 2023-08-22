import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getPurchases } from '../../services/userInvestments';
import { getTotalInvested } from "../../services/userInvestments";
import Layout from '../layout/Layout';
import { parseDate } from '../../util/parseDate';
import { sortPurchasesBy } from '../../util/sortBy';

export default function InvestmentHistory({ userId }) {

    const [sortType, setSortType] = useState('newest');

    const { loadingA, errorA, value: purchases } = useAsync(() => getPurchases({ userId }), [userId]);

    const { loadingB, errorB, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    if (loadingA || loadingB) return <h1>Loading</h1>

    if (errorA || errorB) return <h1 className="error-msg">{errorA || errorB}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Investment history</h2>

            <div className='page-header'>
                <div className='page-header__info'>
                    <div className='balance-info'>
                        <h6 className='balance-info__label'>Total invested</h6>
                        <p className='balance-info__amount'>£{typeof totalInvested === 'number' ? totalInvested?.toFixed(2) : 0}</p>
                    </div>
                </div>
                <div className='page-header__buttons'>
                    <select 
                        className='rounded-button' 
                        name="sort-by" 
                        id="sort-by"
                        onChange={e => {setSortType(e.target.value)}}
                    > 
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option> 
                        <option value="price-desc">Price desc</option>
                        <option value="price-asc">Price asc</option> 
                        <option value="impact-desc">Impact desc</option> 
                        <option value="impact-asc">Impact asc</option> 
                    </select>
                    {/* <button className='rounded-button'>Filter</button> */}
                    <Link 
                        to='/invest'
                        className='rounded-button coloured'
                    >+ Invest now</Link>
                </div>
            </div>

            <div className='page-table-container component-container investment-history-page-table'>
                {purchases?.length > 0 ? (
                    <table>
                        <thead>
                            <tr className='top-row'>
                                <th className='column-date'>Date</th>
                                <th className='column-description'>Description</th>
                                <th className='column-benefit'>Benefit</th>
                                <th className='column-price'>Price</th>
                                <th className='column-impact'>Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortPurchasesBy(purchases, sortType).map(purchase => 
                                <tr key={purchase.id}>
                                    <td className='column-date'>{parseDate(purchase.date)}</td>
                                    <td className='column-description'>{purchase.investment.description}</td>
                                    <td className='column-benefit'>{purchase.investment.benefit}</td>
                                    <td className='column-price'>{purchase.pricePaid && `£${Number(purchase.pricePaid)?.toFixed(2)}`}</td>
                                    <td className='column-impact'>{purchase.investment.impact && <p className={`impact-label ${purchase.investment.impact}`}>{purchase.investment.impact}</p>}</td>
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
