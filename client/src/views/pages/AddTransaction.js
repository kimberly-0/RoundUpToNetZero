import { useNavigate } from 'react-router-dom';
import { useAsync, useAsyncFn } from '../../hooks/useAsync';
import { getPaymethods } from '../../services/userPaymethods';
import { getUser } from '../../services/user';
import Layout from '../layout/Layout';
import { createTransaction } from '../../services/userTransactions';
import { TransactionForm } from '../components/TransactionForm';

export default function AddTransaction({ userId }) {

    const { loadingUser, errorUser, value: user } = useAsync(() => getUser({ userId }), [userId]);

    const { loadingPaymethods, errorPaymethods, value: paymethods } = useAsync(() => getPaymethods({ userId }), [userId]);

    const { loading, error, execute: createTransactionFn } = useAsyncFn(createTransaction);
    
    const navigate = useNavigate();

    function onTransactionCreate(transaction) {
        return createTransactionFn({ transaction }).then(() => {
            navigate('/transaction-history');
        })
    };

    if (loadingUser || loadingPaymethods) return <h1>Loading</h1>

    if (errorUser || errorPaymethods) return <h1 className="error-msg">{errorPaymethods}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Add new transaction</h2>

            <div className='page-table-container component-container'>
                <TransactionForm 
                    loading={loading}
                    error={error}
                    onSubmit={onTransactionCreate}
                    user={user}
                    paymethods={paymethods}
                />
            </div>
        </Layout>
    );
}
