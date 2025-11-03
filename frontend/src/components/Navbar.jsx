import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-950/70 border-b border-gray-800 backdrop-blur-md fixed w-full top-0 left-0 z-50 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Lead <span className="text-blue-400">Management</span>
        </h1>


        <div className="flex gap-8 text-gray-400 font-medium">
          <Link
            to="/"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            Add Lead
          </Link>

          <Link
            to="/showLeads"
            className={`hover:text-blue-400 transition ${
              location.pathname === "/showLeads" ? "text-blue-400" : ""
            }`}
          >
            View Leads
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
