import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      toast.error("Name is required");
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      toast.error("Invalid email format");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      toast.error("Phone number is required");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
      toast.error("Phone number must be 10 digits");
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
      toast.error("Feedback is required");
    }

    return newErrors;
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);


      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/lead/createLead`,
        formData
      );

      if (res.data.success === 1) {
        toast.success(res.data.message || "Lead added successfully!");
        setFormData({ name: "", email: "", phone: "", feedback: "" });
        setErrors({});
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-950/70 backdrop-blur-lg">
        {/* Left Info Section */}
        <div className="hidden md:flex flex-col justify-center p-10 text-gray-200 space-y-6 bg-gradient-to-br from-blue-700/30 to-purple-800/20">
          <h2 className="text-4xl font-bold tracking-wide text-white">
            Lead <span className="text-blue-400">Management</span> Portal
          </h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            Capture potential customer details, organize inquiries, and track
            engagement with a sleek, responsive interface.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Real-time Validation
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Fast API Integration
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Responsive UI
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="p-10 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <h3 className="text-3xl font-bold text-white text-center mb-6">
              Add <span className="text-blue-400">New Lead</span>
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <textarea
              name="feedback"
              placeholder="Feedback / Notes"
              value={formData.feedback}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold text-white rounded-lg transition-all 
                ${
                  loading
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg"
                }`}
            >
              {loading ? "Submitting..." : "Submit Lead"}
            </button>

            <p className="text-center text-gray-500 text-sm">
              View all leads →{"  "}
              <Link to="/showLeads" className="text-blue-400 hover:underline">
                Leads List
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
