import Layout from '../layout/Layout';
import MoneyBalance from '../components/MoneyBalance';
import InvestmentHistory from '../components/InvestmentHistory';
import TransactionHistory from '../components/TransactionHistory';
import ContributionsGraph from '../components/ContributionsGraph';
import { useAsync } from '../../hooks/useAsync';
import { getTotalNZFundContributions } from "../../services/userTransactions";
import { getTotalInvested } from "../../services/userInvestments";

function Dashboard({ userId }) {

    const { loadingA, errorA, value: totalNZFundContribution } = useAsync(() => getTotalNZFundContributions({ userId }), [userId]);
    const { loadingB, errorB, value: totalInvested } = useAsync(() => getTotalInvested({ userId }), [userId]);

    if (loadingA || loadingB) return <h1>Loading</h1>

    if (errorA || errorB) return <h1 className="error-msg">{errorA || errorB}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Dashboard</h2>

            <div className='columns balance-columns'>
                <MoneyBalance 
                    className='main-balance'
                    balances={[{
                        title: 'Net Zero Fund',
                        amount: (totalNZFundContribution - totalInvested) || null
                    }]} 
                    isColoured={true} 
                />

                <MoneyBalance 
                    balances={[{
                        title: 'Total Net Zero Fund contributions',
                        amount: totalNZFundContribution
                    }, {
                        title: 'Total invested',
                        amount: totalInvested
                    }]} 
                    isColoured={false} 
                />
            </div>

            <div className='columns'>
                <InvestmentHistory userId={userId} />
                <TransactionHistory userId={userId} />
            </div>

            <div>
                <ContributionsGraph userId={userId} />
            </div>
        </Layout>
    );
}

export default Dashboard;
