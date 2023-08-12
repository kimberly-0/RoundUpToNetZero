import { useState } from 'react';
import Layout from '../layout/Layout';
import InvestmentProduct from '../components/InvestmentProduct';
import { useAsync } from '../../hooks/useAsync';
import { getInvestmentProducts } from '../../services/investments';
import { getTotalNZFundContributions } from "../../services/userTransactions";
import { getTotalInvested } from "../../services/userInvestments";
import { sortProductsBy } from '../../util/sortBy';

function Invest({ userId }) {

    const [sortType, setSortType] = useState('newest');

    const { loadingA, errorA, value: products } = useAsync(getInvestmentProducts);

    const { loadingB, errorB, value: totalNZFundContribution } = useAsync(() => getTotalNZFundContributions({ userId }), [userId]);

    const { loadingC, errorC, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    if (loadingA || loadingB || loadingC) return <h1>Loading</h1>

    if (errorA || errorB || errorC) return <h1 className="error-msg">{errorA || errorB || errorC}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Invest</h2>

            <div className='page-header'>
                <div className='page-header__info'>
                    <div className='balanace-info coloured'>
                        <h6 className='balance-info__label'>Net Zero Fund</h6>
                        <p className='balance-info__amount'>£{typeof (totalNZFundContribution - totalInvested) === 'number' ? (totalNZFundContribution - totalInvested)?.toFixed(2) : 0}</p>
                    </div>
                </div>
                <div className='page-header__buttons'>
                    <select 
                        className='rounded-button' 
                        name="sort-by" 
                        id="sort-by"
                        onChange={e => {setSortType(e.target.value)}}
                    > 
                        <option value="impact-desc">Impact desc</option> 
                        <option value="impact-asc">Impact asc</option>
                        <option value="price-desc">Price desc</option>
                        <option value="price-asc">Price asc</option> 
                    </select>
                    {/* <button className='rounded-button'>Filter</button> */}
                </div>
            </div>
            
            <div className='products-container'>
                {products?.length > 0 ? (
                    <>
                    {sortProductsBy(products, sortType).map(product => 
                        <InvestmentProduct 
                            key={product.id}
                            id={product.id}
                            description={product.description} 
                            benefit={product.benefit} 
                            originalPrice={product.originalPrice}
                            discountedPrice={product.discountedPrice}
                            impact={product.impact}
                        />
                    )}
                    </>
                ) : (
                    <p>No investment products could be found</p>
                )}
            </div>
        </Layout>
    );
}

export default Invest;
