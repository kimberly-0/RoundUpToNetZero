const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
    await prisma.company.deleteMany()
    await prisma.user.deleteMany()
    await prisma.paymethod.deleteMany()
    await prisma.transaction.deleteMany()
    await prisma.investment.deleteMany()
    await prisma.purchase.deleteMany()

    /*
    Create companies
    */
    const greenInc = await prisma.company.create({ data: { 
        name: 'Green Inc',
        registrationNumber: 'GI123456',
        industry: 'finance',
        numberOfEmployees: 25,
    }, })

    /*
    Create users
    */
    const johnDoe = await prisma.user.create({ data: { 
        name: 'John Doe',
        email: 'john.doe@email.com', 
        password: 'fakepassword',
        companyId: greenInc.id,
    }, })

    const janeDoe = await prisma.user.create({ data: { 
        name: 'Jane Doe',
        email: 'jane.doe@email.com', 
        password: 'fakepassword',
        companyId: greenInc.id,
    }, })

    /*
    Create payment methods
    */
    const paymentMethod1 = await prisma.paymethod.create({ data: {
            cardNumber: '2776',
            type: 'Visa',
            monitored: true,
            userId: johnDoe.id,
    }, })

    const paymentMethod2 = await prisma.paymethod.create({ data: {
            cardNumber: '8845',
            type: 'Visa',
            monitored: true,
            userId: johnDoe.id,
    }, })

    /*
    Create investments
    */
    const smartThermostat = await prisma.investment.create({ data: { 
        description: 'Smart thermostat',
        benefit: 'Reduce energy consumption',
        originalPrice: 132.91,
        discountedPrice: 112.98,
        impact: 'high',
    }, })

    const printer = await prisma.investment.create({ data: { 
        description: 'Carbon neutral printer',
        benefit: 'Minimise carbon footprint',
        originalPrice: 511.10,
        discountedPrice: 459.99,
        impact: 'medium',
    }, })

    const plantATree = await prisma.investment.create({ data: { 
        description: 'Plant a tree',
        benefit: 'Carbon offsetting',
        originalPrice: 14.99,
        discountedPrice: 11.99,
        impact: 'low',
    }, })

    const electricBicycle = await prisma.investment.create({ data: { 
        description: 'Electric bicycle',
        benefit: 'Lower emissions',
        originalPrice: 1300.00,
        discountedPrice: 975.00,
        impact: 'high',
    }, })

    const coffeeMachine = await prisma.investment.create({ data: { 
        description: 'Recycled coffee machine',
        benefit: 'Use recycled materials',
        originalPrice: 397.23,
        discountedPrice: 337.65,
        impact: 'low',
    }, })

    const smartPlug = await prisma.investment.create({ data: { 
        description: 'Smart plug',
        benefit: 'Reduce energy consumption',
        originalPrice: 34.99,
        discountedPrice: 31.49,
        impact: 'medium',
    }, })

    /*
    Create users' purchased investments
    */
    const purchasedInvestment1 = await prisma.purchase.create({ data: { 
        date: '2023-03-23T00:00:00.000Z', 
        pricePaid: 337.65,
        userId: johnDoe.id,
        investmentId: coffeeMachine.id,
    }, })

    const purchasedInvestment2 = await prisma.purchase.create({ data: { 
        date: '2023-04-29T00:00:00.000Z', 
        pricePaid: 31.49,
        userId: johnDoe.id,
        investmentId: smartPlug.id,
    }, })

    const purchasedInvestment3 = await prisma.purchase.create({ data: { 
        date: '2023-05-08T00:00:00.000Z', 
        pricePaid: 11.99,
        userId: johnDoe.id,
        investmentId: plantATree.id,
    }, })

    const purchasedInvestment4 = await prisma.purchase.create({ data: { 
        date: '2023-07-02T00:00:00.000Z', 
        pricePaid: 112.98,
        userId: johnDoe.id,
        investmentId: smartThermostat.id,
    }, })

    /*
    Create transactions
    */

    const transaction1 = await prisma.transaction.create({
        data: {
            date: '2021-12-02T00:00:00.000Z',
            description: 'Groceries',
            amount: 110.20,
            roundedAmount: 120,
            fundContribution: 9.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    const transaction2 = await prisma.transaction.create({
        data: {
            date: '2021-12-06T00:00:00.000Z',
            description: 'Restaurant',
            amount: 140.10,
            roundedAmount: 150,
            fundContribution: 9.90,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    const transaction3 = await prisma.transaction.create({
        data: {
            date: '2021-12-13T00:00:00.000Z',
            description: 'Office supplies',
            amount: 140.10,
            roundedAmount: 150,
            fundContribution: 9.90,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    const transaction4 = await prisma.transaction.create({
        data: {
            date: '2021-12-21T00:00:00.000Z',
            description: 'Post office',
            amount: 72.50,
            roundedAmount: 80,
            fundContribution: 7.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    const transaction5 = await prisma.transaction.create({
        data: {
            date: '2021-12-25T00:00:00.000Z',
            description: 'Coffee shop',
            amount: 43.90,
            roundedAmount: 50,
            fundContribution: 6.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    const transaction6 = await prisma.transaction.create({
        data: {
            date: '2021-12-28T00:00:00.000Z',
            description: 'Coffee shop',
            amount: 24.40,
            roundedAmount: 30,
            fundContribution: 5.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    const transaction7 = await prisma.transaction.create({
        data: {
            date: '2021-12-30T00:00:00.000Z',
            description: 'Transport',
            amount: 41.80,
            roundedAmount: 50,
            fundContribution: 8.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    const transaction8 = await prisma.transaction.create({
        data: {
            date: '2021-12-30T00:00:00.000Z',
            description: 'Transport',
            amount: 98.75,
            roundedAmount: 100,
            fundContribution: 1.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    const transaction9 = await prisma.transaction.create({
        data: {
            date: '2022-01-02T00:00:00.000Z',
            description: 'Groceries',
            amount: 105.90,
            roundedAmount: 110,
            fundContribution: 4.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    const transaction10 = await prisma.transaction.create({
        data: {
            date: '2022-01-06T00:00:00.000Z',
            description: 'Restaurant',
            amount: 145.20,
            roundedAmount: 150,
            fundContribution: 4.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

}

seed().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})