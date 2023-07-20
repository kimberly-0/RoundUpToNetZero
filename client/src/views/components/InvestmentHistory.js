import { FaLeaf } from 'react-icons/fa';

export default function InvestmentHistory() {
    return (
        <div className='component-container investment-history-container'>
            <div className='component-header'>
                <h3 className='component-title'>Investment history</h3>
                <button className='component-button'>+ Invest now</button>
            </div>

            <table>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Impact</th>
            </tr>
            <tr>
                <td>02/07/2023</td>
                <td>Smart thermostat</td>
                <td><FaLeaf /></td>
            </tr>
            <tr>
                <td>15/06/2023</td>
                <td>Electric Bicycle</td>
                <td><FaLeaf /></td>
            </tr>
            </table>
        </div>
    )
}