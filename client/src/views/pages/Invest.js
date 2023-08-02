import { useState } from 'react';
import Layout from '../layout/Layout';
import InvestmentProduct from '../components/InvestmentProduct';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import { getTotalNZFundContributions } from "../../services/userTransactions";
import { getTotalInvested } from "../../services/userInvestments";

function Invest({ userId }) {

    const [sortType, setSortType] = useState('newest');

    const { loadingA, errorA, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    const { loadingB, errorB, value: totalNZFundContribution } = useAsync(() => getTotalNZFundContributions({ userId }), [userId]);

    const { loadingC, errorC, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    if (loadingA || loadingB || loadingC) return <h1>Loading</h1>

    if (errorA || errorB || errorC) return <h1 className="error-msg">{errorA || errorB || errorC}</h1>

    // TO DELETE: 
    const description = "Smart thermostat";
    const benefit = "Reduce energy consumption";
    const originalPrice = 132.91;
    const discountedPrice = 112.98;
    const impact = "high";

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
                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />

                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />
                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />
                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />
                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />
                <InvestmentProduct 
                    description={description} 
                    benefit={benefit} 
                    originalPrice={originalPrice}
                    discountedPrice={discountedPrice}
                    impact={impact}
                />
            </div>

        </Layout>
    );
}

export default Invest;
