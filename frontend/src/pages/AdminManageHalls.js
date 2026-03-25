import { useEffect, useState } from "react";
import API from "../services/api";

const AdminManageHalls = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editHallId, setEditHallId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    image: "",
  });

  const fetchHalls = async () => {
    try {
      const res = await API.get("/halls");
      setHalls(res.data);
    } catch (error) {
      setMessage("Failed to load halls");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/halls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Hall deleted successfully");
      setHalls((prev) => prev.filter((hall) => hall._id !== id));

      if (editHallId === id) {
        setEditHallId(null);
        setFormData({
          name: "",
          location: "",
          capacity: "",
          price: "",
          description: "",
          image: "",
        });
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to delete hall");
    }
  };

  const handleEditClick = (hall) => {
    setEditHallId(hall._id);
    setFormData({
      name: hall.name,
      location: hall.location,
      capacity: hall.capacity,
      price: hall.price,
      description: hall.description,
      image: hall.image,
    });
    setMessage("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.put(`/halls/${editHallId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Hall updated successfully");

      setHalls((prev) =>
        prev.map((hall) =>
          hall._id === editHallId ? res.data.hall : hall
        )
      );

      setEditHallId(null);
      setFormData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update hall");
    }
  };

  if (loading) {
    return <h2>Loading halls...</h2>;
  }

  return (
    <div>
      <h2 className="mb-4">Manage Halls</h2>

      {message && <div className="alert alert-info">{message}</div>}

      {editHallId && (
        <div className="card shadow-sm p-4 mb-4">
          <h3 className="mb-3">Edit Hall</h3>

          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label">Hall Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Capacity</label>
              <input
                type="number"
                className="form-control"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              Update Hall
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setEditHallId(null);
                setFormData({
                  name: "",
                  location: "",
                  capacity: "",
                  price: "",
                  description: "",
                  image: "",
                });
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {halls.length > 0 ? (
        <div className="row">
          {halls.map((hall) => (
            <div className="col-md-6 mb-4" key={hall._id}>
              <div className="card shadow-sm h-100">
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
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h4>{hall.name}</h4>
                  <p>
                    <strong>Location:</strong> {hall.location}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {hall.capacity}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{hall.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {hall.description}
                  </p>

                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEditClick(hall)}
                  >
                    Edit Hall
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(hall._id)}
                  >
                    Delete Hall
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h4>No halls found</h4>
      )}
    </div>
  );
};

export default AdminManageHalls;