import Layout from '../layout/Layout';
import MoneyBalance from '../components/MoneyBalance';
import InvestmentHistory from '../components/InvestmentHistory';

function Dashboard() {
    return (
        <Layout>
            <h2 className='page-title'>Dashboard</h2>

            <div className='columns'>
                <MoneyBalance 
                    balances={[{
                        title: 'Net Zero Fund',
                        amount: 262.42
                    }]} 
                    isColoured={true} 
                />

                <MoneyBalance 
                    balances={[{
                        title: 'Total Net Zero Fund contributions',
                        amount: 780.72
                    }, {
                        title: 'Total invested',
                        amount: 518.30
                    }]} 
                    isColoured={false} 
                />
            </div>

            <div className='columns'>
                    <InvestmentHistory />
                    <InvestmentHistory />
            </div>
        </Layout>
    );
}

export default Dashboard;
