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
                        id: 1,
                        group: 1,
                        title: 'Net Zero Fund',
                        amount: 262.42
                    }]} 
                    isColoured={true} 
                />

                <MoneyBalance 
                    balances={[{
                        id: 2,
                        group: 2,
                        title: 'Total Net Zero Fund contributions',
                        amount: 780.72
                    }, {
                        id: 3,
                        group: 2,
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
