import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

export default function InvestmentProduct({ id, description, benefit, originalPrice, discountedPrice, impact }) {

    const navigate = useNavigate();
    const viewInvestment = (id) => {
        navigate(`/invest/${id}`);
    }

    return (
        <div 
            className='component-container product-container'
            onClick={() => viewInvestment(id)}
        >
            <h5 className='product-description'>{description}</h5>
            <p className='product-benefit'>{benefit}</p>

            <div className='product-container-footer'>
                <div className='price-container'>
                    <p className='discount-price'>{discountedPrice && `£${Number(discountedPrice).toFixed(2)}`}</p>
                    <p className='original-price'>{originalPrice && `£${Number(originalPrice).toFixed(2)}`}</p>
                </div>
                <p className='impact'>{impact && <FaLeaf className={`impact-icon ${impact || ""}`}/>}</p>
            </div>
        </div>
    )
}