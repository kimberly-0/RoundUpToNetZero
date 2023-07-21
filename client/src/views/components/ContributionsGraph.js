import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';

export default function ContributionsGraph() {

    const userId = 0;
    const { loading, error, value: transactions } = useAsync(() => getTransactions({ userId }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    return (
        <div className='component-container contributions-graph-container'>
            <div className='component-header'>
                <h3 className='component-title'>Net Zero Fund contributions</h3>
                <Link 
                    to='/transaction-history'
                    className='component-button-text-only'
                >View all</Link>
            </div>

            {transactions?.length > 0 ? (
                <div>Graph here</div> // TO DO: replace with actual graph
            ) : (
                <p>You haven't made any transactions yet</p>
            )}

        </div>
    )
}