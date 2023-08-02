export function sortTransactionsBy(array, sortType) {
    return array.sort(function(a, b) {
        switch (sortType) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'trans-amount-desc':
                return b.amount - a.amount;
            case 'trans-amount-asc':
                return a.amount - b.amount;
            case 'contr-amount-desc':
                return b.fundContribution - a.fundContribution;
            case 'contr-amount-asc':
                return a.fundContribution - b.fundContribution;
            default:
                return 0;
        }
    });
}

function getImpactValue(impact) {
    if (impact === 'high') {
        return 2;
    } else if (impact === 'medium') {
        return 1;
    } else if (impact === 'low') {
        return 0;
    }
}

export function sortPurchasesBy(array, sortType) {
    return array.sort(function(a, b) {
        switch (sortType) {
            case 'newest':
                return new Date(b.date) - new Date(a.date);
            case 'oldest':
                return new Date(a.date) - new Date(b.date);
            case 'price-desc':
                return b.pricePaid - a.pricePaid;
            case 'price-asc':
                return a.pricePaid - b.pricePaid;
            case 'impact-desc':
                return getImpactValue(b.investment.impact) - getImpactValue(a.investment.impact);
            case 'impact-asc':
                return getImpactValue(a.investment.impact) - getImpactValue(b.investment.impact);
            default:
                return 0;
        }
    });
}

export function sortProductsBy(array, sortType) {
    return array.sort(function(a, b) {
        switch (sortType) {
            case 'price-desc':
                return b.discountedPrice - a.discountedPrice;
            case 'price-asc':
                return a.discountedPrice - b.discountedPrice;
            case 'impact-desc':
                return getImpactValue(b.impact) - getImpactValue(a.impact);
            case 'impact-asc':
                return getImpactValue(a.impact) - getImpactValue(b.impact);
            default:
                return 0;
        }
    });
}
