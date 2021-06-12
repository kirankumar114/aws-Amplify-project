const stripe = require('stripe')('sk_test_51IyHVpHRhsrQBIZxbGA5I0P7J8DsohZXnG7C3lnwSzXFcAjPD9n8XiWtsuYKIrq85frw53fM1rDT7YQ5ChaYrB7y00s4etMBCP:');

exports.handler = async (event) => {
    const {typeName, arguments} = event;

    console.log("Success");
    if (typeName !== "Mutation"){
        throw new Error('Request is not a mutation');
    }

    if(!arguments?.amount){
        throw new Error('Amount argument is required');
    }
    //Creating the payment intent
    const paymentIntent = await stripe.paymentIntent.create({
        amount: arguments.amount,
        currency:'usd'
    }) 

    return {
        clientSecret : paymentIntent.client_secret
    }
};
