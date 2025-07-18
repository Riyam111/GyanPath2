import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AllStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (location.state?.paymentSuccess) {
      toast.success("🎉 Payment successful!", { autoClose: 3000 });
    }
  }, [location.state]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/students/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch students");
        }

        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
    const total = students.length;
  const paid = students.filter((s) => s.feesPaid).length;
  const pending = total - paid;

  return (
    <div className="pt-20 px-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">All Students</h2>

      {/* Dashboard Summary */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-violet-100 border border-blue-300 rounded-lg p-4 text-center shadow-sm">
            <h4 className="text-lg font-semibold text-violet-800">Total Students</h4>
            <p className="text-2xl font-bold text-violet-900">{total}</p>
          </div>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center shadow-sm">
            <h4 className="text-lg font-semibold text-green-800">Fees Paid</h4>
            <p className="text-2xl font-bold text-green-900">{paid}</p>
          </div>
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-center shadow-sm">
            <h4 className="text-lg font-semibold text-red-800">Fees Pending</h4>
            <p className="text-2xl font-bold text-red-900">{pending}</p>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 font-semibold text-left">
              <tr>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b text-center">Fee Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr
                  key={student._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 border-b">{student.name}</td>
                  <td className="px-6 py-4 border-b">{student.email}</td>
                  <td className="px-6 py-4 border-b text-center">
                    {student.feesPaid ? (
                      <span className="text-green-600 font-medium">✅Paid</span>
                    ) : (
                      <span className="text-red-500 font-medium">❌ Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudent;
