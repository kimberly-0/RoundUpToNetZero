import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getInvestments } from '../../services/userInvestments';
import { FaLeaf } from 'react-icons/fa';

export default function InvestmentHistory({ userId }) {

    const { loading, error, value: investments } = useAsync(() => getInvestments({ userId }), [userId]);

    // console.log("Investments: " + JSON.stringify(investments));

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

            {investments?.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="align-right">Impact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investments.slice(0, 5).map(investment => 
                            <tr key={investment.investment_id}>
                                <td>{investment.date}</td>
                                <td>{investment.description}</td>
                                <td className="align-right">{investment.impact && <FaLeaf className={`impact-icon ${investment.impact || ""}`}/>}</td>
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