// Import stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add this key in .env

// Create Stripe checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Tuition Fee",
              description: "Student semester fee payment",
            },
            unit_amount: 50000, // ₹500.00 in paise
          },
          quantity: 1,
        },
      ],
      success_url: "https://gyanpath2-frontend.onrender.com/PaymentSuccess",
      cancel_url: "https://gyanpath2-frontend.onrender.com/profile",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ message: "Payment session creation failed." });
  }
};

module.exports = {
  createCheckoutSession,
};
