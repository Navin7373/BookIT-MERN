import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import hall1 from "../assets/hall1.png";
import hall2 from "../assets/hall2.png";


const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHalls = async () => {
    try {
      const res = await API.get("/halls");
      setHalls(res.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  if (loading) {
    return <h2>Loading halls...</h2>;
  }

  const getHallImage = (hall) => {
    const provided = (hall?.image || "").trim();
    if (provided) return provided;

    const hallName = String(hall?.name || "");
    if (hallName.toLowerCase().includes("royal")) return hall1;
    if (hallName.toLowerCase().includes("pg")) return hall2;
    return "https://dummyimage.com/600x400/cccccc/000000&text=Hall+Image";
  };

  return (
    <div>
      <h2 className="mb-4">Available Halls</h2>

      <div className="row">
        {halls.length > 0 ? (
          halls.map((hall) => (
            <div className="col-md-4 mb-4" key={hall._id}>
              <div className="card h-100 shadow-sm hover-card">
                <img
                  src={getHallImage(hall)}
                  alt={hall.name}
                  className="card-img-top"
                  style={{ height: "250px",width: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://dummyimage.com/600x400/cccccc/000000&text=Hall+Image";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{hall.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {hall.location}
                  </p>
                  <p className="card-text">
                    <strong>Capacity:</strong> {hall.capacity}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{hall.price}
                  </p>
                  <Link to={`/hall/${hall._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No halls found</h4>
        )}
      </div>
    </div>
  );
};

export default HallList;