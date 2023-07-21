import { Link } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

export default function InvestmentHistory() {

    const investments = [{
        id: 1,
        date: "02/07/2023",
        description: "Smart thermostat",
        impact: "high"
    }, {
        id: 2,
        date: "15/06/2023",
        description: "Electric bicycle",
        impact: "high"
    }, {
        id: 3,
        date: "24/05/2023",
        description: "Carbon neutral printer",
        impact: "medium"
    }, {
        id: 4,
        date: "08/05/2023",
        description: "Plant a tree",
        impact: "low"
    }, {
        id: 5,
        date: "29/04/2023",
        description: "Smart plug",
        impact: "medium"
    }];

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
                            <tr key={investment.id}>
                                <td>{investment.date}</td>
                                <td>{investment.description}</td>
                                <td className="align-right"><FaLeaf className={`impact-icon ${investment.impact || ""}`}/></td>
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