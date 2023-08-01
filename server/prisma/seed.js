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

    // December 2021
    const transaction11 = await prisma.transaction.create({
        data: {
                date: "2021-12-02T00:00:00.000Z",
                description: "Groceries",
                amount: 110.20,
                roundedAmount: 120,
                fundContribution: 9.80,
                userId: johnDoe.id,
                paymethodId: paymentMethod1.id,
                companyId: greenInc.id,
    }, }) 
    const transaction12 = await prisma.transaction.create({
        data: {
            date: "2021-12-14T00:00:00.000Z",
            description: "Transport",
            amount: 41.80,
            roundedAmount: 50,
            fundContribution: 8.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction13 = await prisma.transaction.create({
        data: {
            date: "2021-12-21T00:00:00.000Z",
            description: "Post office",
            amount: 72.50,
            roundedAmount: 80,
            fundContribution: 7.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction14 = await prisma.transaction.create({
        data: {
            date: "2021-12-28T00:00:00.000Z",
            description: "Coffee shop",
            amount: 24.40,
            roundedAmount: 30,
            fundContribution: 5.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction15 = await prisma.transaction.create({
        data: {
            date: "2021-12-06T00:00:00.000Z",
            description: "Restaurant",
            amount: 140.10,
            roundedAmount: 150,
            fundContribution: 9.90,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction16 = await prisma.transaction.create({
        data: {
            date: "2021-12-13T00:00:00.000Z",
            description: "Office supplies",
            amount: 60.70,
            roundedAmount: 70,
            fundContribution: 9.30,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction17 = await prisma.transaction.create({
        data: {
            date: "2021-12-25T00:00:00.000Z",
            description: "Coffee shop",
            amount: 43.90,
            roundedAmount: 50,
            fundContribution: 6.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction18 = await prisma.transaction.create({
        data: {
            date: "2021-12-30T00:00:00.000Z",
            description: "Transport",
            amount: 98.75,
            roundedAmount: 100,
            fundContribution: 1.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // January 2022
    const transaction19 = await prisma.transaction.create({
        data: {
            date: "2022-01-02T00:00:00.000Z",
            description: "Groceries",
            amount: 105.90,
            roundedAmount: 110,
            fundContribution: 4.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction20 = await prisma.transaction.create({
        data: {
            date: "2022-01-14T00:00:00.000Z",
            description: "Transport",
            amount: 39.80,
            roundedAmount: 40,
            fundContribution: 0.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction21 = await prisma.transaction.create({
        data: {
            date: "2022-01-21T00:00:00.000Z",
            description: "Post office",
            amount: 68.50,
            roundedAmount: 70,
            fundContribution: 1.50,
            paymethodId: paymentMethod1.id,
            userId: johnDoe.id,
            companyId: greenInc.id,
    }, }) 
    const transaction22 = await prisma.transaction.create({
        data: {
            date: "2022-01-28T00:00:00.000Z",
            description: "Coffee shop",
            amount: 22.40,
            roundedAmount: 30,
            fundContribution: 7.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction23 = await prisma.transaction.create({
        data: {
            date: "2022-01-06T00:00:00.000Z",
            description: "Restaurant",
            amount: 145.20,
            roundedAmount: 150,
            fundContribution: 4.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction24 = await prisma.transaction.create({
        data: {
            date: "2022-01-13T00:00:00.000Z",
            description: "Office supplies",
            amount: 56.70,
            roundedAmount: 60,
            fundContribution: 3.30,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction25 = await prisma.transaction.create({
        data: {
            date: "2022-01-25T00:00:00.000Z",
            description: "Coffee shop",
            amount: 40.90,
            roundedAmount: 50,
            fundContribution: 9.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction26 = await prisma.transaction.create({
        data: {
            date: "2022-01-30T00:00:00.000Z",
            description: "Transport",
            amount: 92.75,
            roundedAmount: 100,
            fundContribution: 7.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // February 2022
    const transaction27 = await prisma.transaction.create({
        data: {
            date: "2022-02-03T00:00:00.000Z",
            description: "Groceries",
            amount: 105.80,
            roundedAmount: 110,
            fundContribution: 4.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction28 = await prisma.transaction.create({
        data: {
            date: "2022-02-14T00:00:00.000Z",
            description: "Transport",
            amount: 35.90,
            roundedAmount: 40,
            fundContribution: 4.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction29 = await prisma.transaction.create({
        data: {
            date: "2022-02-21T00:00:00.000Z",
            description: "Post office",
            amount: 68.50,
            roundedAmount: 70,
            fundContribution: 1.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction30 = await prisma.transaction.create({
        data: {
            date: "2022-02-28T00:00:00.000Z",
            description: "Coffee shop",
            amount: 23.40,
            roundedAmount: 30,
            fundContribution: 6.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction31 = await prisma.transaction.create({
        data: {
            date: "2022-02-06T00:00:00.000Z",
            description: "Restaurant",
            amount: 145.20,
            roundedAmount: 150,
            fundContribution: 4.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction32 = await prisma.transaction.create({
        data: {
            date: "2022-02-13T00:00:00.000Z",
            description: "Office supplies",
            amount: 56.70,
            roundedAmount: 60,
            fundContribution: 3.30,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction33 = await prisma.transaction.create({
        data: {
            date: "2022-02-25T00:00:00.000Z",
            description: "Coffee shop",
            amount: 40.90,
            roundedAmount: 50,
            fundContribution: 9.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction34 = await prisma.transaction.create({
        data: {
            date: "2022-02-28T00:00:00.000Z",
            description: "Transport",
            amount: 97.75,
            roundedAmount: 100,
            fundContribution: 2.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction35 = await prisma.transaction.create({
        data: {
            date: "2022-02-16T00:00:00.000Z",
            description: "Energy-Efficient Appliances",
            amount: 650.00,
            roundedAmount: 700,
            fundContribution: 50.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction36 = await prisma.transaction.create({
        data: {
            date: "2022-02-22T00:00:00.000Z",
            description: "Renewable Energy System",
            amount: 480.50,
            roundedAmount: 500,
            fundContribution: 19.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // March 2022
    const transaction37 = await prisma.transaction.create({
        data: {
            date: "2022-03-02T00:00:00.000Z",
            description: "Groceries",
            amount: 115.90,
            roundedAmount: 120,
            fundContribution: 4.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction38 = await prisma.transaction.create({
        data: {
            date: "2022-03-14T00:00:00.000Z",
            description: "Transport",
            amount: 37.80,
            roundedAmount: 40,
            fundContribution: 2.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction39 = await prisma.transaction.create({
        data: {
            date: "2022-03-21T00:00:00.000Z",
            description: "Post office",
            amount: 68.50,
            roundedAmount: 70,
            fundContribution: 1.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction40 = await prisma.transaction.create({
        data: {
            date: "2022-03-28T00:00:00.000Z",
            description: "Coffee shop",
            amount: 24.40,
            roundedAmount: 30,
            fundContribution: 5.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction41 = await prisma.transaction.create({
        data: {
            date: "2022-03-06T00:00:00.000Z",
            description: "Restaurant",
            amount: 145.20,
            roundedAmount: 150,
            fundContribution: 4.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction42 = await prisma.transaction.create({
        data: {
            date: "2022-03-13T00:00:00.000Z",
            description: "Office supplies",
            amount: 56.70,
            roundedAmount: 60,
            fundContribution: 3.30,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction43 = await prisma.transaction.create({
        data: {
            date: "2022-03-25T00:00:00.000Z",
            description: "Coffee shop",
            amount: 40.90,
            roundedAmount: 50,
            fundContribution: 9.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction44 = await prisma.transaction.create({
        data: {
            date: "2022-03-30T00:00:00.000Z",
            description: "Transport",
            amount: 92.75,
            roundedAmount: 100,
            fundContribution: 7.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // April 2022
    const transaction45 = await prisma.transaction.create({
        data: {
            date: "2022-04-02T00:00:00.000Z",
            description: "Groceries",
            amount: 95.60,
            roundedAmount: 100,
            fundContribution: 4.40,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction46 = await prisma.transaction.create({
        data: {
            date: "2022-04-14T00:00:00.000Z",
            description: "Transport",
            amount: 42.50,
            roundedAmount: 50,
            fundContribution: 7.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction47 = await prisma.transaction.create({
        data: {
            date: "2022-04-21T00:00:00.000Z",
            description: "Post office",
            amount: 68.90,
            roundedAmount: 70,
            fundContribution: 1.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction48 = await prisma.transaction.create({
        data: {
            date: "2022-04-29T00:00:00.000Z",
            description: "Coffee shop",
            amount: 22.80,
            roundedAmount: 30,
            fundContribution: 7.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction49 = await prisma.transaction.create({
        data: {
            date: "2022-04-07T00:00:00.000Z", 
            description: "Restaurant",
            amount: 120.30,
            roundedAmount: 130,
            fundContribution: 9.70,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction50 = await prisma.transaction.create({
        data: {
            date: "2022-04-12T00:00:00.000Z",
            description: "Office supplies",
            amount: 65.40,
            roundedAmount: 70,
            fundContribution: 4.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction51 = await prisma.transaction.create({
        data: {
            date: "2022-04-25T00:00:00.000Z",
            description: "Coffee shop",
            amount: 43.20,
            roundedAmount: 50,
            fundContribution: 6.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction52 = await prisma.transaction.create({
        data: {
            date: "2022-04-30T00:00:00.000Z",
            description: "Transport",
            amount: 95.75,
            roundedAmount: 100,
            fundContribution: 4.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction53 = await prisma.transaction.create({
        data: {
            date: "2022-04-17T00:00:00.000Z",
            description: "Sustainable Equipment",
            amount: 750.00,
            roundedAmount: 800,
            fundContribution: 50.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction54 = await prisma.transaction.create({
        data: {
            date: "2022-04-22T00:00:00.000Z",
            description: "Renewable Energy System",
            amount: 450.50,
            roundedAmount: 500,
            fundContribution: 49.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // May 2022
    const transaction55 = await prisma.transaction.create({
        data: {
            date: "2022-05-02T00:00:00.000Z",
            description: "Restaurant",
            amount: 150.80,
            roundedAmount: 160,
            fundContribution: 9.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction56 = await prisma.transaction.create({
        data: {
            date: "2022-05-17T00:00:00.000Z",
            description: "Office supplies",
            amount: 45.25,
            roundedAmount: 50,
            fundContribution: 4.75,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction57 = await prisma.transaction.create({
        data: {
            date: "2022-05-24T00:00:00.000Z",
            description: "Post office",
            amount: 67.90,
            roundedAmount: 70,
            fundContribution: 2.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction58 = await prisma.transaction.create({
        data: {
            date: "2022-05-30T00:00:00.000Z",
            description: "Coffee shop",
            amount: 25.40,
            roundedAmount: 30,
            fundContribution: 4.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // June 2022
    const transaction59 = await prisma.transaction.create({
        data: {
            date: "2022-06-03T00:00:00.000Z",
            description: "Groceries",
            amount: 115.20,
            roundedAmount: 120,
            fundContribution: 4.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction60 = await prisma.transaction.create({
        data: {
            date: "2022-06-14T00:00:00.000Z",
            description: "Coffee shop",
            amount: 49.50,
            roundedAmount: 50,
            fundContribution: 0.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction61 = await prisma.transaction.create({
        data: {
            date: "2022-06-27T00:00:00.000Z",
            description: "Office supplies",
            amount: 73.10,
            roundedAmount: 80,
            fundContribution: 6.90,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction62 = await prisma.transaction.create({
        data: {
            date: "2022-06-29T00:00:00.000Z",
            description: "Transport",
            amount: 31.70,
            roundedAmount: 40,
            fundContribution: 8.30,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // July 2022
    const transaction63 = await prisma.transaction.create({
        data: {
            date: "2022-07-07T00:00:00.000Z",
            description: "Office supplies",
            amount: 88.20,
            roundedAmount: 90,
            fundContribution: 1.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction64 = await prisma.transaction.create({
        data: {
            date: "2022-07-15T00:00:00.000Z",
            description: "Coffee shop",
            amount: 49.80,
            roundedAmount: 50,
            fundContribution: 0.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // August 2022
    const transaction65 = await prisma.transaction.create({
        data: {
            date: "2022-08-02T00:00:00.000Z",
            description: "Restaurant",
            amount: 70.25,
            roundedAmount: 80,
            fundContribution: 9.75,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction66 = await prisma.transaction.create({
        data: {
            date: "2022-08-22T00:00:00.000Z",
            description: "Groceries",
            amount: 150.00,
            roundedAmount: 160,
            fundContribution: 10.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // September 2022
    const transaction67 = await prisma.transaction.create({
        data: {
            date: "2022-09-05T00:00:00.000Z",
            description: "Office supplies",
            amount: 112.50,
            roundedAmount: 120,
            fundContribution: 7.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction68 = await prisma.transaction.create({
        data: {
            date: "2022-09-18T00:00:00.000Z",
            description: "Post office",
            amount: 18.90,
            roundedAmount: 20,
            fundContribution: 1.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // October 2022
    const transaction69 = await prisma.transaction.create({
        data: {
            date: "2022-10-10T00:00:00.000Z",
            description: "Stock",
            amount: 215.30,
            roundedAmount: 220,
            fundContribution: 4.70,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction70 = await prisma.transaction.create({
        data: {
            date: "2022-10-28T00:00:00.000Z",
            description: "Office supplies",
            amount: 45.75,
            roundedAmount: 50,
            fundContribution: 4.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // November 2022
    const transaction71 = await prisma.transaction.create({
        data: {
            date: "2022-11-05T00:00:00.000Z",
            description: "Restaurant",
            amount: 92.60,
            roundedAmount: 100,
            fundContribution: 7.40,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction72 = await prisma.transaction.create({
        data: {
            date: "2022-11-21T00:00:00.000Z",
            description: "Transport",
            amount: 35.40,
            roundedAmount: 40,
            fundContribution: 4.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // December 2022
    const transaction73 = await prisma.transaction.create({
        data: {
            date: "2022-12-12T00:00:00.000Z",
            description: "Groceries",
            amount: 120.00,
            roundedAmount: 130,
            fundContribution: 10.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction74 = await prisma.transaction.create({
        data: {
            date: "2022-12-30T00:00:00.000Z",
            description: "Office supplies",
            amount: 65.25,
            roundedAmount: 70,
            fundContribution: 4.75,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // January 2023
    const transaction75 = await prisma.transaction.create({
        data: {
            date: "2023-01-05T00:00:00.000Z",
            description: "Post office",
            amount: 96.80,
            roundedAmount: 100,
            fundContribution: 3.20,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction76 = await prisma.transaction.create({
        data: {
            date: "2023-01-17T00:00:00.000Z",
            description: "Coffee shop",
            amount: 28.90,
            roundedAmount: 30,
            fundContribution: 1.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // February 2023
    const transaction77 = await prisma.transaction.create({
        data: {
            date: "2023-02-08T00:00:00.000Z",
            description: "Stock",
            amount: 180.40,
            roundedAmount: 190,
            fundContribution: 9.60,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction78 = await prisma.transaction.create({
        data: {
            date: "2023-02-24T00:00:00.000Z",
            description: "Office supplies",
            amount: 54.75,
            roundedAmount: 60,
            fundContribution: 5.25,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // March 2023
    const transaction79 = await prisma.transaction.create({
        data: {
            date: "2023-03-15T00:00:00.000Z",
            description: "Restaurant",
            amount: 112.00,
            roundedAmount: 120,
            fundContribution: 8.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction80 = await prisma.transaction.create({
        data: {
            date: "2023-03-28T00:00:00.000Z",
            description: "Office supplies",
            amount: 30.20,
            roundedAmount: 40,
            fundContribution: 9.80,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // April 2023
    const transaction81 = await prisma.transaction.create({
        data: {
            date: "2023-04-06T00:00:00.000Z",
            description: "Post office",
            amount: 85.50,
            roundedAmount: 90,
            fundContribution: 4.50,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction82 = await prisma.transaction.create({
        data: {
            date: "2023-04-22T00:00:00.000Z",
            description: "Transport",
            amount: 52.90,
            roundedAmount: 60,
            fundContribution: 7.10,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // May 223
    const transaction83 = await prisma.transaction.create({
        data: {
            date: "2023-05-11T00:00:00.000Z",
            description: "Groceries",
            amount: 210.00,
            roundedAmount: 220,
            fundContribution: 10.00,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })

    // June 2023
    const transaction84 = await prisma.transaction.create({
        data: {
            date: "2023-06-29T00:00:00.000Z",
            description: "Mobile",
            amount: 23.12,
            roundedAmount: 30,
            fundContribution: 6.88,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction85 = await prisma.transaction.create({
        data: {
            date: "2023-06-22T00:00:00.000Z",
            description: "Transport",
            amount: 62.44,
            roundedAmount: 70,
            fundContribution: 7.56,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction86 = await prisma.transaction.create({
        data: {
            date: "2023-06-20T00:00:00.000Z",
            description: "Office supplies",
            amount: 98.05,
            roundedAmount: 100,
            fundContribution:1.95,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction87 = await prisma.transaction.create({
        data: {
            date: "2023-06-15T00:00:00.000Z",
            description: "Gas station",
            amount: 36.85,
            roundedAmount: 40,
            fundContribution: 3.15,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, })

    // July 2023
    const transaction88 = await prisma.transaction.create({
        data: {
            date: "2023-07-19T00:00:00.000Z",
            description: "Office supplies",
            amount: 123.45,
            roundedAmount: 130,
            fundContribution: 6.55,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, }) 
    const transaction89 = await prisma.transaction.create({
        data: {
            date: "2023-07-18T00:00:00.000Z",
            description: "Utilities",
            amount: 261.32,
            roundedAmount: 270,
            fundContribution: 8.68,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction90 = await prisma.transaction.create({
        data: {
            date: "2023-07-13T00:00:00.000Z",
            description: "Post office",
            amount: 16.10,
            roundedAmount: 20,
            fundContribution: 3.90,
            userId: johnDoe.id,
            paymethodId: paymentMethod2.id,
            companyId: greenInc.id,
    }, }) 
    const transaction91 = await prisma.transaction.create({
        data: {
            date: "2023-07-04T00:00:00.000Z",
            description: "Office supplies",
            amount: 58.93,
            roundedAmount: 60,
            fundContribution: 1.07,
            userId: johnDoe.id,
            paymethodId: paymentMethod1.id,
            companyId: greenInc.id,
    }, })
    const transaction92 = await prisma.transaction.create({
        data: {
            date: "2023-07-02T00:00:00.000Z",
            description: "Stock",
            amount: 502.11,
            roundedAmount: 510,
            fundContribution: 7.89,
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