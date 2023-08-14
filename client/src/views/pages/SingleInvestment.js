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
