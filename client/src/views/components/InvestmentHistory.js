import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getPurchases } from '../../services/userInvestments';
import { FaLeaf } from 'react-icons/fa';

export default function InvestmentHistory({ userId }) {

    const { loading, error, value: purchases } = useAsync(() => getPurchases({ userId }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <div className='component-container investment-history-container'>
            <div className='component-header'>
                <h3 className='component-title'>Investment history</h3>
                <Link 
                    to='/invest'
                    className='component-button'
                >+ Invest now</Link>
            </div>

            {purchases?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="align-right">Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.slice(0, 5).map(purchase => 
                            <tr key={purchase.id}>
                                <td>{purchase.date}</td>
                                <td>{purchase.investment.description}</td>
                                <td className="align-right">{purchase.investment.impact && <FaLeaf className={`impact-icon ${purchase.investment.impact || ""}`}/>}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            ) : (
                <p>You don't have any investments yet</p>
            )}

        </div>
    )
}