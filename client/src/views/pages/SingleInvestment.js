import { useParams, useNavigate } from 'react-router-dom';
import { useAsync, useAsyncFn } from '../../hooks/useAsync';
import { getTotalNZFundContributions } from "../../services/userTransactions";
import { addPurchase } from "../../services/userInvestments";
import { getTotalInvested } from "../../services/userInvestments";
import { getInvestmentById } from '../../services/investments';
import Layout from '../layout/Layout';
import { FaLeaf } from 'react-icons/fa';

export default function SingleInvestment({ userId }) {

    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, value: investment } = useAsync(() => getInvestmentById({ investmentId: params.id }), [params.id]);

    const { loadingB, errorB, value: totalNZFundContribution } = useAsync(() => getTotalNZFundContributions({ userId }), [userId]);

    const { loadingC, errorC, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    const { loadingPurchase, errorPurchase, execute: purchaseInvestmentFn } = useAsyncFn(addPurchase);

    function onInvestmentPurchase() {
        if (window.confirm("Are you sure you want to purchase this investment?")) {
            return purchaseInvestmentFn({ userId, purchase: {
                pricePaid: investment.discountedPrice,
                userId: userId,
                investmentId: params.id,
            }}).then(() => {
                navigate(`/investment-history`);
            }).catch(error => {
                console.log("Error: " + error)
            });
        } else {
            console.log("Investment not purchased");
            return;
        }
    };

    if (loading || loadingB || loadingC || loadingPurchase) return <h1>Loading</h1>

    if (error || errorB || errorC || errorPurchase) return <h1 className="error-msg">{error || errorB || errorC}</h1>

    const canAfford = (totalNZFundContribution - totalInvested) - investment.discountedPrice < 0 ? true : false;

    // TO DO: add img src to database and delete variable below !!!!!!!!!!!!!!!!!!!
    investment.imageSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAMFBMVEX////MzMzJycnp6enw8PDt7e36+vrj4+P39/ff39/b29vQ0ND09PTd3d3o6OjT09Nr7EITAAADJUlEQVR4nO3c23aqMBRAUYwVBCz8/98esGi57CRgE8LmrPncUc0aCAkYswwAAAAAAAAAAAAAAAAAAAAAAAAAtMpjSz1An2tr4muvqYfp8LiYyx7M5ZF6qDa3fQo8K9xSD1b2tV+CLsJX6uGKdizQSz1cSbHnYdAdCEXqAQvq97uL6/UydeoBL+XDmzPlNa7y9ULHmyg8zF6H6PChM8e7Pg5XhR0uWsMl+IBXBhrQoEcDGvRoYGuQN1U/d2rLgBcyZQ2K17SuW/QHq6CqQV6PlxCmCfRKmhrkkVY5mhrUl3mEMOdLRQ1KYS0dZJmjp0EuJDBliFfS00C+pRLilfQ0WJwNgr1vPQ2kBOuuj76nB2oaSKeDdSeE0ny7/0BNg7t8h9XfoLuceCKoaWA5DrzTpOcV1R1BTQPL+cD3WR8mFc4IehpUYoO7+5+851WuCHoaiA8fPc8ERlNLRwQ9DaQPg+ejMJld2yMoaiAcCK3zP8wWGNYIihpk3/MI7idDizWWqeQ/1NQgq2ajcp4QhWWmJYKqBpN1k6m3HQX2CLoaZPfq50GxMbV7pSAmsJwTlDXo5ou3oqrKxnND1ZJAjqCuwSrWBGKEUzZwJJAinLGBM4EQ4YQNPAmWEc7XwJtgcYk8XYMVCeYRztZgVYJZBM0NiuUkYWWCaQTFDbqJ83zBsDrBJILeBs+1wzTChgTjCGobDMuncYRNCUYRtDZ4ryB/I2xM8HszUmmD0SL6FWFzAuUNJvcRfkayPYHuBrNH0P1QPkigusHiKfz9owSaGwhfRJjfaDx7g3DbW9Q2CLjDR2uDkJuclDYIus9LZ4OwW91UNgi8209jg9AbHhU2CL7nU1+Dj6aC52pg+V4aDWhAAxrQgAY0oAEN/vsG4WlrkDfBfwilGb7gqKZBRDSgQY8GNOjR4MgNXpOi2rNt6+8vVE+nTEfyns79eULo9v7/qQcsEDfzRWTZ6ZPUI/YBMHXAn4zLYtxNdyUI8nMS4bX7RTDubYIJffb9kk8SHPFkMLjVEZbMS/VBf1l48GiK2HwbxAAAAAAAAAAAAAAAAAAAAAAAAIBD+gcdMi0YuTIcVgAAAABJRU5ErkJggg==';

    return (
        <Layout>
            <h2 className='page-title'>Investment</h2>

            <div className='page-table-container component-container'>
                {investment ? (
                    <div className='single-investment-container product-container'>
                        <div className='single-investment-row'>
                            <div>
                                <h5 className='product-description'>{investment.description}</h5>
                                <p className='product-benefit'>{investment.benefit}</p>
                            </div>

                            <p className='impact big'>{investment.impact && <FaLeaf className={`impact-icon ${investment.impact || ""}`}/>}</p>
                        </div>

                        {investment.imageSrc && (
                            <div className='single-investment-row'>
                                <img src={investment.imageSrc} alt='investment product'/>
                            </div>
                        )}

                        <div className='product-container-footer'>
                            <div className='price-container'>
                                <p className='discount-price'>{investment.discountedPrice && `£${Number(investment.discountedPrice).toFixed(2)}`}</p>
                                <p className='original-price'>{investment.originalPrice && `£${Number(investment.originalPrice).toFixed(2)}`}</p>
                            </div>
                            <button 
                                className='form-button rounded-button coloured' 
                                type='button'
                                onClick={onInvestmentPurchase}
                                disabled={loading || canAfford}
                            >Purchase investment</button>
                        </div>
                    </div>
                ) : (
                    <p>Could not find investment</p>
                )}
            </div>

        </Layout>
    );
}
