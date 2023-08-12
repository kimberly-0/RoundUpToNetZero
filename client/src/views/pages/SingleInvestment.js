import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getInvestmentById } from '../../services/investments';
import Layout from '../layout/Layout';
import { FaLeaf } from 'react-icons/fa';

export default function SingleInvestment({ userId }) {

    const params = useParams();

    const { loading, error, value: investment } = useAsync(() => getInvestmentById({ investmentId: params.id }), [params.id]);

    console.log(JSON.stringify(investment));

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

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

                        <div className='product-container-footer'>
                            <div className='price-container'>
                                <p className='discount-price'>{investment.discountedPrice && `£${Number(investment.discountedPrice).toFixed(2)}`}</p>
                                <p className='original-price'>{investment.originalPrice && `£${Number(investment.originalPrice).toFixed(2)}`}</p>
                            </div>
                            <button 
                                className='form-button rounded-button coloured' 
                                type='button'
                                onClick={() => console.log("Purchased investment")}
                                disabled={loading}
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
