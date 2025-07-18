import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

const Profile = () => {
  const { student, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handlePayment = async () => {
    try {
      toast.info("🧾 Redirecting to payment...");
      setLoading(true);

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

      const response = await fetch(`${BACKEND_URL}/api/students/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        toast.error("❌ Payment failed. Please try again.");
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      toast.error("Something went wrong while redirecting to Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-violet-700 flex items-center gap-2">
          👤 Student Profile
        </h2>

        {student ? (
          <div className="space-y-4 text-gray-700 text-lg">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p>
              <strong>Fee Status:</strong>{" "}
              <span className={student.feesPaid ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                {student.feesPaid ? "✅ Paid" : "❌ Pending"}
              </span>
            </p>

            {!student.feesPaid && (
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`mt-6 bg-violet-600 text-white px-6 py-2 rounded-xl hover:bg-violet-700 transition flex items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : (
                  "💳 Pay Now"
                )}
              </button>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <FaSpinner className="mx-auto animate-spin text-2xl mb-2" />
            Loading profile...
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
