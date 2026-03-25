import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const HallDetails = () => {
  const { id } = useParams();

  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
  const fetchHall = async () => {
    try {
      const res = await API.get(`/halls/${id}`);
      setHall(res.data);
    } catch (error) {
      console.error("Error fetching hall:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchHall();
}, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/bookings",
        {
          hall: id,
          date,
          startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message || "Booking successful");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return <h2>Loading hall details...</h2>;
  }

  if (!hall) {
    return <h2>Hall not found</h2>;
  }

  return (
    <div className="card shadow p-4">
      <img
        src={
          hall.image && hall.image.trim() !== ""
            ? hall.image
            : "https://dummyimage.com/600x400/cccccc/000000&text=Hall+Image"
        }
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://dummyimage.com/600x400/cccccc/000000&text=Hall+Image";
        }}
        alt={hall.name}
        className="img-fluid rounded mb-3"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />

      <h2>{hall.name}</h2>
      <p><strong>Location:</strong> {hall.location}</p>
      <p><strong>Capacity:</strong> {hall.capacity}</p>
      <p><strong>Price:</strong> ₹{hall.price}</p>
      <p><strong>Description:</strong> {hall.description}</p>

      <hr />

      <h4>Book This Hall</h4>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleBooking}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            className="form-control"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Time</label>
          <input
            type="time"
            className="form-control"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default HallDetails;