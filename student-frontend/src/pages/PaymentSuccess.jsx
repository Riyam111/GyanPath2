import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const PaymentSuccess = () => {
  const navigate = useNavigate();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const markFeePaid = async () => {
      try {
        await fetch(`${BACKEND_URL}/api/students/pay`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
          
        navigate("/all-students"); 
      } catch (err) {
        toast.error("❌ Something went wrong");
        console.error("Fee update failed:", err);
      }
    };

    markFeePaid();
  }, []);

  return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-green-600">✅ Payment Successful!</h2>
      <p className="mt-4 text-gray-600">Redirecting...</p>
    </div>
  );
};

export default PaymentSuccess;
