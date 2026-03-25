import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="mt-5 pt-5 pb-3"
      style={{
        color: "rgba(15, 23, 42, 0.75)",
        background: "rgba(15, 23, 42, 0.06)",
        borderTop: "1px solid rgba(15, 23, 42, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container">

        <div className="row text-center text-md-start">

          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">BookIT</h5>
            <p className="small" style={{ textAlign: "justify" }}>
              BookIT is your trusted platform to find and reserve the perfect
              hall for meetings, events, and celebrations with ease.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/halls" className="footer-link">Browse Halls</Link>
              </li>
              <li>
                <Link to="/my-bookings" className="footer-link">My Bookings</Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">📍 Chennai, India</p>
            <p className="small mb-1">📧 support@bookit.com</p>
            <p className="small mb-0">📞 +91 98765 43210</p>
          </div>

        </div>

        <hr />

        {/* BOTTOM */}
        <div className="text-center small">
          © 2026 BookIT | Hall Booking System. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;