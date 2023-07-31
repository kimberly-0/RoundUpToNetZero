export function parseDate(dateString) {

    const date = new Date(Date.parse(dateString));
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return date.toLocaleDateString(undefined, options);
}