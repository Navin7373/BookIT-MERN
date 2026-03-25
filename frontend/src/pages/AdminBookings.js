import { useEffect, useState } from "react";
import API from "../services/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchAllBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  if (loading) {
    return <h2>Loading admin bookings...</h2>;
  }

  return (
    <div>
      <h2 className="mb-4">All Bookings</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {bookings.length > 0 ? (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-6 mb-4" key={booking._id}>
              <div className="card shadow-sm p-3 h-100">
                <h4>{booking.hall?.name}</h4>
                <p>
                  <strong>User:</strong> {booking.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {booking.user?.email}
                </p>
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

export default AdminBookings;