export default function MoneyBalance({ balances, isColoured }) {
    return (
        <div className={`component-container balance-container ${isColoured ? "coloured" : ""}`}>
            {balances.map((balance, i) => {
                return (
                    <div key={i}>
                        <h4 
                            className='balance-title'>
                                {balance.title}
                        </h4>
                        <p 
                            className='balance-amount'>
                                £{typeof balance.amount === 'number' ? balance.amount?.toFixed(2) : 0}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
