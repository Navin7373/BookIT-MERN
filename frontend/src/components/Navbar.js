import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isOn = (path) => location.pathname === path;

  const collapseRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    closeNavbar();
  };

  // ✅ CLOSE NAVBAR FUNCTION
  const closeNavbar = () => {
    if (collapseRef.current?.classList.contains("show")) {
      collapseRef.current.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg app-navbar px-3">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand ms-2" to="/" onClick={closeNavbar}>
          BookIT
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSE */}
        <div
          className="collapse navbar-collapse"
          id="navbarContent"
          ref={collapseRef}
        >
          <div className="navbar-nav ms-auto">

            {!isOn("/") && (
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            )}

            {!isOn("/halls") && (
              <Link className="nav-link" to="/halls" onClick={closeNavbar}>
                Halls
              </Link>
            )}

            {user ? (
              <>
                <Link className="nav-link" to="/my-bookings" onClick={closeNavbar}>
                  My Bookings
                </Link>

                {user.role === "admin" && (
                  <>
                    <Link className="nav-link" to="/admin/add-hall" onClick={closeNavbar}>
                      Add Hall
                    </Link>
                    <Link className="nav-link" to="/admin/bookings" onClick={closeNavbar}>
                      Admin Bookings
                    </Link>
                    <Link className="nav-link" to="/admin/manage-halls" onClick={closeNavbar}>
                      Manage Halls
                    </Link>
                  </>
                )}

                <span className="nav-link" style={{ color: "rgba(15, 23, 42, 0.7)" }}>
                  Hello, {user.name}
                </span>

                <button
                  className="btn btn-outline-primary btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {!isOn("/login") && (
                  <Link className="nav-link" to="/login" onClick={closeNavbar}>
                    Login
                  </Link>
                )}
                {!isOn("/register") && (
                  <Link className="nav-link" to="/register" onClick={closeNavbar}>
                    Register
                  </Link>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;