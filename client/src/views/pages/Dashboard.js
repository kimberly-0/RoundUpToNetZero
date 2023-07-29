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

    const dataNetZeroFund = (typeof (totalNZFundContribution - totalInvested).toFixed(2) === 'number') ? (totalNZFundContribution - totalInvested).toFixed(2) : 0;

    const dataTotalNZFundContributions = (typeof totalNZFundContribution?.toFixed(2) === 'number') ? totalNZFundContribution?.toFixed(2) : 0;

    const dataTotalInvested = (typeof totalInvested?.toFixed(2) === 'number') ? totalInvested?.toFixed(2) : 0;
    
    return (
        <Layout>
            <h2 className='page-title'>Dashboard</h2>

            <div className='columns'>
                <MoneyBalance 
                    balances={[{
                        title: 'Net Zero Fund',
                        amount: dataNetZeroFund
                    }]} 
                    isColoured={true} 
                />

                <MoneyBalance 
                    balances={[{
                        title: 'Total Net Zero Fund contributions',
                        amount: dataTotalNZFundContributions
                    }, {
                        title: 'Total invested',
                        amount: dataTotalInvested
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
