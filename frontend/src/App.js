import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HallList from "./pages/HallList";
import HallDetails from "./pages/HallDetails";
import MyBookings from "./pages/MyBookings";
import AdminAddHall from "./pages/AdminAddHall";
import AdminBookings from "./pages/AdminBookings";
import AdminManageHalls from "./pages/AdminManageHalls";
import PublicRoute from "./components/PublicRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
    <BrowserRouter>
      <Navbar />
      <div className="content   container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route path="/halls" element={<HallList />} />
          <Route path="/hall/:id" element={<HallDetails />} />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-hall"
            element={
              <AdminRoute>
                <AdminAddHall />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/manage-halls"
            element={
              <AdminRoute>
                <AdminManageHalls />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;