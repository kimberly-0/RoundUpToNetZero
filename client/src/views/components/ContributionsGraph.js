import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getTransactions } from '../../services/userTransactions';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Net Zero Fund contributions',
    },
  },
};

// Get current month and past 12 months
function getPastTwelveMonths() {
    const pastTwelveMonths = [];
    const date = new Date(); // Get today's date
    date.setDate(1); // Set to first day of the month as default

    for (let i = 0; i < 13; i++) {
        pastTwelveMonths.unshift(new Date(date));
        date.setMonth(date.getMonth() - 1);
    }
    return pastTwelveMonths;
}

function convertToLabels(dates) {
    // Format: 'Jan 23'
    const labels = [];
    dates.forEach(date => {
        labels.push(date.toLocaleString('default', { month: 'short' }) + " " + (date.getFullYear().toString().substring(2)));
    })
    return labels;
}

function getContributionsPerMonth({ userId, monthsIncluded }) {
    return getTransactions({ userId }).then(transactions => {

        // Find sum of all contributions made in the same month and year
        const sumContributionsPerMonthYear = Object.values(transactions.reduce((r, transaction) => {
            let monthYear = transaction.date.substring(3);
            r[monthYear] = r[monthYear] || {date: monthYear, contributed : 0};
            r[monthYear].contributed += transaction.contributed;
            return r;
        }, {}));

        // Create result array with all months included and set contribution to 0 where there's missing data
        const result = [];
        monthsIncluded.forEach(date => {
            const month = date.getMonth() + 1;
            const monthString = ((month < 10) ? ("0" + month) : month).toString();
            const monthYear = monthString + "/" + date.getFullYear();

            const existingContribution = sumContributionsPerMonthYear.find(contribution => contribution.date === monthYear);
            if (existingContribution) {
                result.push(existingContribution);
            } else {
                result.push({date: monthYear, contributed: 0});
            }
        })

        return result;

    }).catch(error => console.log(error));
}

export default function ContributionsGraph({ userId }) {

    const pastTwelveMonths = getPastTwelveMonths();
    
    const { loading, error, value: contributionsPerMonth } = useAsync(() => getContributionsPerMonth({ userId, monthsIncluded: pastTwelveMonths }), [userId]);

    if (loading) return <h1>Loading</h1>

    if (error) return <h1 className="error-msg">{error}</h1>

    const data = {
        labels: convertToLabels(pastTwelveMonths),
        datasets: [{
            fill: true,
            label: 'Contributions',
            data: contributionsPerMonth?.map(o => o.contributed),
            borderColor: 'rgba(113, 151, 113, 1)',
            backgroundColor: 'rgba(214, 228, 214, 0.5)',
        }]
    };

    return (
        <div className='component-container contributions-graph-container'>
            <div className='component-header'>
                <h3 className='component-title'>Net Zero Fund contributions</h3>
                <Link 
                    to='/transaction-history'
                    className='component-button-text-only'
                >View all</Link>
            </div>

            {contributionsPerMonth?.length > 0 ? (
                <div className='graph-container'>
                    <Line options={options} data={data} />
                </div>
            ) : (
                <p>You haven't made any contributions in the last 12 months</p>
            )}

        </div>
    )
}