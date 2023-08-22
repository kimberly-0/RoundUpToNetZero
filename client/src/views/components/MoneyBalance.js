export default function MoneyBalance({ balances, isColoured, className }) {
    return (
        <div className={`component-container balance-container ${isColoured ? "coloured" : ""} ${className}`}>
            {balances.map((balance, i) => {
                return (
                    <div key={i}>
                        <h4 
                            className='balance-title'>
                                {balance.title}
                        </h4>
                        {typeof balance.amount === 'number' && 
                            <p 
                                className='balance-amount'>
                                    £{balance.amount?.toFixed(2)}
                            </p>
                        }
                    </div>
                )
            })}
        </div>
    )
}
