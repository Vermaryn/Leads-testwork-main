import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PAGE_LIMIT = 5;

const ShowLeads = () => {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 🔹 Fetch Leads from Backend
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/lead/showLeads?page=${page}&limit=${PAGE_LIMIT}`
      );
      if (res.data && res.data.leads) {
        let fetched = res.data.leads;

        // Apply search filter (frontend side)
        if (search.trim()) {
          const q = search.toLowerCase();
          fetched = fetched.filter(
            (lead) =>
              lead.name.toLowerCase().includes(q) ||
              lead.email.toLowerCase().includes(q) ||
              lead.phone.toLowerCase().includes(q)
          );
        }

        setLeads(fetched);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  // 🔹 Update Lead Status
  const updateStatus = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/lead/${id}/updateLead`,
        { status: "Contacted" }
      );
      if (res.data.success === 1) {
        toast.success("Marked as Contacted");
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status");
    }
  };

  // 🔹 Delete Lead
  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/lead/${id}/deleteLead`
      );
      if (res.data.success === 1) {
        toast.success("Lead deleted successfully");
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to delete lead", err);
      toast.error("Failed to delete lead");
    }
  };

  const formatDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-6 text-gray-200">
      <Link
        to="/"
        className="absolute top-4 left-4 bg-gray-900/60 backdrop-blur-md border border-gray-700 p-3 rounded-full text-gray-300 hover:text-blue-400 transition"
        title="Go back to Form"
      >
        <FaArrowLeft size={18} />
      </Link>

      <div className="max-w-6xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Leads <span className="text-blue-400">Dashboard</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Manage all captured leads — view, update, and delete entries.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-6 flex items-center bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 backdrop-blur-lg">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search leads by name, email, or phone..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="bg-transparent w-full text-gray-100 placeholder-gray-500 focus:outline-none"
        />
      </div>

      <div className="max-w-6xl mx-auto bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl backdrop-blur-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : leads.length === 0 ? (
          <p className="text-center text-gray-400 py-16 text-lg">No leads found.</p>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full table-auto text-sm text-gray-300">
                <thead className="bg-gray-800/80 text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone</th>
                    <th className="py-3 px-6 text-left">Feedback</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Created</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition"
                    >
                      <td className="py-3 px-6">{lead.name}</td>
                      <td className="py-3 px-6">{lead.email}</td>
                      <td className="py-3 px-6">{lead.phone}</td>
                      <td className="py-3 px-6 truncate max-w-xs">{lead.feedback}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            lead.status === "New"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-gray-400">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="py-3 px-6 flex items-center gap-4 justify-center">
                        <button
                          onClick={() => updateStatus(lead._id)}
                          disabled={lead.status === "Contacted"}
                          className={`${
                            lead.status === "New"
                              ? "text-green-400 hover:text-green-300"
                              : "text-gray-500"
                          } transition`}
                          title="Mark as Contacted"
                        >
                          <FaCheckCircle size={18} />
                        </button>

                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="text-red-500 hover:text-red-400 transition"
                          title="Delete Lead"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-white">{lead.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === "New"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{lead.email}</p>
                  <p className="text-sm text-gray-400">{lead.phone}</p>
                  <p className="text-sm mt-2 text-gray-300">{lead.feedback}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(lead.createdAt)}
                  </p>
                  <div className="flex gap-4 mt-3">
                    <button
                      onClick={() => updateStatus(lead._id)}
                      disabled={lead.status === "Contacted"}
                      className={`flex items-center gap-1 text-sm ${
                        lead.status === "New"
                          ? "text-green-400 hover:text-green-300"
                          : "text-gray-500"
                      }`}
                    >
                      <FaCheckCircle />
                    </button>

                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center items-center py-6 gap-4 text-gray-400">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`p-2 rounded-full transition ${
                page === 1
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <FaChevronLeft />
            </button>

            <span className="text-sm font-medium text-gray-300">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`p-2 rounded-full transition ${
                page === totalPages
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowLeads;
