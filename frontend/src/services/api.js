import axios from "axios";

const API = axios.create({
  // Used in production deployment. Set `REACT_APP_API_BASE_URL` in the frontend host.
  // Example: https://your-backend-domain.com/api
  baseURL: `${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api`,
});

export default API;