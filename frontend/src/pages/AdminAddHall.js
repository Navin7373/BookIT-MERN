import { useId, useMemo, useState } from "react";
import API from "../services/api";

const AdminAddHall = () => {
  const fileInputId = useId();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    price: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);

  const imagePreviewSrc = useMemo(() => {
    const img = (formData.image || "").trim();
    return img.length > 0 ? img : "";
  }, [formData.image]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const setImageFromFile = async (file) => {
    if (!file) return;
    if (!file.type?.startsWith("image/")) {
      setMessage("Please upload an image file (png/jpg/webp).");
      return;
    }
    const maxBytes = 3 * 1024 * 1024; // 3MB
    if (file.size > maxBytes) {
      setMessage("Image is too large. Please use an image under 3MB.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => ({ ...prev, image: dataUrl }));
      setMessage("");
    } catch {
      setMessage("Could not load the selected image.");
    }
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files?.[0];
    await setImageFromFile(file);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    await setImageFromFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post("/halls", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || "Hall added successfully");

      setFormData({
        name: "",
        location: "",
        capacity: "",
        price: "",
        description: "",
        image: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add hall");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center">Add New Hall</h2>

          {message && <div className="alert alert-info">{message}</div>}

          <form onSubmit={handleSubmit}>
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
              <label className="form-label">Hall Image</label>

              <div
                className={`dropzone ${isDragActive ? "dropzone--active" : ""}`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragActive(false);
                }}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onClick={() => document.getElementById(fileInputId)?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    document.getElementById(fileInputId)?.click();
                  }
                }}
              >
                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                  <div>
                    <div className="fw-semibold">Drag & drop an image here</div>
                    <div className="text-muted small">or click to choose a file (PNG/JPG/WEBP)</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById(fileInputId)?.click();
                    }}
                  >
                    Choose file
                  </button>
                </div>

                <input
                  id={fileInputId}
                  type="file"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handleFileInputChange}
                />

                {imagePreviewSrc && (
                  <div className="mt-3">
                    <div className="text-muted small mb-2">Preview</div>
                    <img
                      src={imagePreviewSrc}
                      alt="Hall preview"
                      className="img-fluid rounded"
                      style={{ maxHeight: "260px", width: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="mt-2 d-flex gap-2 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                      >
                        Remove image
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigator.clipboard?.writeText(formData.image)}
                      >
                        Copy image data
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-text mt-2">
                Optional: if you prefer, paste an image URL instead.
              </div>
              <input
                type="text"
                className="form-control"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/hall.jpg"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Add Hall
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddHall;