import { useEffect, useState } from "react";
import API from "../services/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching my bookings:", error);
      setMessage("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Booking cancelled successfully");

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return <h2>Loading my bookings...</h2>;
  }

  return (
    <div>
      <h2 className="mb-4">My Bookings</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-6 mb-4" key={booking._id}>
              <div className="card shadow-sm p-3 h-100"style={{background:"linear-gradient(135deg, #667eea, #764ba2)"}}>
                <h4>{booking.hall?.name}</h4>
                <p>
                  <strong>Location:</strong> {booking.hall?.location}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Start Time:</strong> {booking.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {booking.endTime}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4>No bookings found</h4>
      )}
    </div>
  );
};

export default MyBookings;