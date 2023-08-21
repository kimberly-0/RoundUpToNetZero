import { useParams, useNavigate } from 'react-router-dom';
import { useAsync, useAsyncFn } from '../../hooks/useAsync';
import { getPaymethods } from '../../services/userPaymethods';
import { getUser } from '../../services/user';
import { getTransactionById, updateTransaction } from '../../services/userTransactions';
import { TransactionForm } from '../components/TransactionForm';
import Layout from '../layout/Layout';

export default function EditTransaction({ userId }) {

    const params = useParams();
    const navigate = useNavigate();

    const { loading, error, value: transaction } = useAsync(() => getTransactionById({ userId, transactionId: params.id }), [userId]);

    const { loadingUser, errorUser, value: user } = useAsync(() => getUser({ userId }), [userId]);

    const { loadingPaymethods, errorPaymethods, value: paymethods } = useAsync(() => getPaymethods({ userId }), [userId]);

    const { loadingUpdate, errorUpdate, execute: updateTransactionFn } = useAsyncFn(updateTransaction);
    
    function onTransactionUpdate(transaction) {
        return updateTransactionFn({ userId, transactionId: params.id, transaction }).then(() => {
            navigate(`/transactions/${params.id}`);
        })
    };

    if (loading || loadingUser || loadingPaymethods) return <h1>Loading</h1>

    if (error || errorUser || errorPaymethods) return <h1 className="error-msg">{errorPaymethods}</h1>

    return (
        <Layout>
            <h2 className='page-title'>Edit transaction</h2>

            <div className='page-table-container component-container'>
                <TransactionForm 
                    formType={'edit'}
                    loading={loadingUpdate}
                    error={errorUpdate}
                    onSubmit={onTransactionUpdate}
                    user={user}
                    paymethods={paymethods}
                    initialData={{transaction: transaction}}
                />
            </div>
        </Layout>
    );
}
