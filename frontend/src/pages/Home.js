import { Link } from "react-router-dom";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-surface p-5 p-md-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="display-5 hero-title">
              Book your next event space with BookIT
            </h1>
            <p className="lead mt-3 hero-subtitle">
              Find and reserve the perfect hall for meetings, seminars, and celebrations.
            </p>

            <div className="mt-4 d-flex gap-3 flex-wrap">
              <Link to="/halls" className="btn btn-primary btn-lg">
                Browse Halls
              </Link>

              {!user ? (
                <Link to="/register" className="btn btn-outline-primary btn-lg">
                  Create Account
                </Link>
              ) : (
                <Link to="/my-bookings" className="btn btn-outline-primary btn-lg">
                  My Bookings
                </Link>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm p-4 h-100" style={{ background: "rgba(255,255,255,0.75)" }}>
              <h5 className="section-title mb-3">Quick highlights</h5>
              <div className="row g-3">
                <div className="col-4">
                  <div className="fw-bold">50+</div>
                  <div className="text-muted small">Halls</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold">100+</div>
                  <div className="text-muted small">Bookings</div>
                </div>
                <div className="col-4">
                  <div className="fw-bold">10+</div>
                  <div className="text-muted small">Cities</div>
                </div>
              </div>
              <div className="mt-3 text-muted small">
                Satisfy by location, capacity, and price — then book in minutes.
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* HALL TYPES */}
      <div className="mt-5">
        <h2 className="text-center mb-4 section-title">Popular Hall Types</h2>

        <div className="row">

          {/* Wedding */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0 hall-card">
              <img src={home1} alt="Wedding Hall" className="card-img-top hall-img" />
              <div className="card-body text-center">
                <h4>Wedding Halls</h4>
                <p>Spacious halls perfect for weddings and large family events.</p>
              </div>
            </div>
          </div>

          {/* Conference */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0 hall-card">
              <img src={home2} alt="Conference Hall" className="card-img-top hall-img" />
              <div className="card-body text-center">
                <h4>Conference Halls</h4>
                <p>Ideal venues for business meetings, seminars, and conferences.</p>
              </div>
            </div>
          </div>

          {/* Party */}
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 border-0 hall-card">
              <img src={home3} alt="Party Venue" className="card-img-top hall-img" />
              <div className="card-body text-center">
                <h4>Party Venues</h4>
                <p>Perfect locations for birthdays, parties, and celebrations.</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* HOW IT WORKS */}
<div className="mt-5">
  <h2 className="text-center mb-4 section-title">How It Works</h2>

  <div className="row">

    {/* Step 1 */}
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0 work-card">
        <img src={img1} alt="Browse Halls" className="card-img-top work-img" />
        <div className="card-body text-center">
          <h4>1. Browse Halls</h4>
          <p>Explore halls based on location, capacity, and price.</p>
        </div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0 work-card">
        <img src={img2} alt="Select Date" className="card-img-top work-img" />
        <div className="card-body text-center">
          <h4>2. Select Date & Time</h4>
          <p>Choose your preferred date and available time slot.</p>
        </div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100 border-0 work-card">
        <img src={img3} alt="Confirm Booking" className="card-img-top work-img" />
        <div className="card-body text-center">
          <h4>3. Confirm Booking</h4>
          <p>Reserve your hall instantly and manage bookings easily.</p>
        </div>
      </div>
    </div>

  </div>
</div>


      {/* WHY CHOOSE US */}
      <div className="card p-5 mt-5">
        <h2 className="text-center mb-4 section-title">Why Choose BookIT?</h2>

        <div className="row text-center">

          <div className="col-md-4 mb-3">
            <h5>Quick Booking</h5>
            <p>Book halls instantly in just a few clicks.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Secure System</h5>
            <p>Protected authentication and reliable booking management.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Admin Control</h5>
            <p>Admins manage halls and monitor bookings efficiently.</p>
          </div>

        </div>
      </div>


      {/* PLATFORM STATS */}
      <div className="hero-surface p-5 mt-5">
        <div className="row text-center g-4">

          <div className="col-md-3">
            <h2>50+</h2>
            <p className="text-muted mb-0">Available Halls</p>
          </div>

          <div className="col-md-3">
            <h2>100+</h2>
            <p className="text-muted mb-0">Successful Bookings</p>
          </div>

          <div className="col-md-3">
            <h2>25+</h2>
            <p className="text-muted mb-0">Events Hosted</p>
          </div>

          <div className="col-md-3">
            <h2>10+</h2>
            <p className="text-muted mb-0">Cities Covered</p>
          </div>

        </div>
      </div>


      {/* CTA SECTION */}
      <div className="text-center mt-5 p-5">
        <h2 className="section-title">Ready to Book Your Hall?</h2>
        <p className="mt-2 text-muted">
          Start exploring halls and reserve your preferred slot easily.
        </p>
      </div>

    </div>
  );
};

export default Home;