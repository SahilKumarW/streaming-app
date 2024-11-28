import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import CompleteProfile from "./pages/CompleteProfile";
import VerifyEmail from "./pages/VerifyEmail";
import AccountSettings from "./pages/AccountSettings";
import Subscription from "./pages/Subscription";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import MyList from "./pages/MyList";
import VideoPlayer from "./pages/VideoPlayer";
import { post } from "./api/axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import UploadVideo from "./pages/UploadVideo";
import UserManagement from "./pages/UserManagement";
import VideoManagement from "./pages/VideoManagement";
import UserTable from "./components/UserTable";
import UploadThumbnail from "./pages/UploadThumbnail";
import CreateCustomer from "./pages/CreateCustomer";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AccessDenied from "./pages/AccessDenied"; // Import AccessDenied Page
import SearchResults from "./pages/SearchResults";

// Mock Navigation for the video
function MockLogin() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await post(`${apiUrl}/Auth`, {
        userName: values.email,
        password: values.password,
      });

      if (response.apiCode === 0) {
        // Store the token in localStorage
        localStorage.setItem("accessToken", response.data?.token);

        // Optionally store other user details
        localStorage.setItem("userId", response.data?.id);

        toast.success("User Login Successfully");
        navigate("/home");
      } else {
        toast.error(response.displayMessage || "Backend Server Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return <Login onLogin={handleLogin} />; // Pass the mock navigation function
}

function MockSignup() {
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    try {
      const response = await post(`${apiUrl}/Users/add-user`, {
        name: values.fullName,
        email: values.email,
        phone: Math.floor(Math.random() * 9000000000).toString(),
        dateOfBirth: "string",
        role: "string",
        userType: 0,
        gender: 0,
        password: values.password,
        status: true,
      });

      if (response.apiCode === 0) {
        navigate("/login");
        toast.success(response.displayMessage);
      } else {
        toast.error(response.displayMessage || "Backend Server Error");
      }
    } catch (error) {
      throw error;
    }
  };

  return <Signup onSignup={handleSignup} />; // Pass the mock navigation function
}

function MockForgotPassword() {
  const navigate = useNavigate();

  const handleReset = () => {
    // Simulate reset and navigate to Home
    navigate("/home");
  };

  return <ForgotPassword onReset={handleReset} />; // Pass the mock navigation function
}

function App() {
  const [movies, setMovies] = useState([]); // Central state for search results
  useEffect(() => {
    console.log("Movies state updated:", movies); // Debugging state updates
  }, [movies]);

  <Route path="/search-results" element={<ProtectedRoute><SearchResults movies={movies} /></ProtectedRoute>} />

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
        <Route path="/verify-email" element={<ProtectedRoute><VerifyEmail /></ProtectedRoute>} />
        <Route path="/account-settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/tvseries" element={<ProtectedRoute><TvSeries /></ProtectedRoute>} />
        <Route path="/mylist" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
        <Route path="/player" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/videos/:videoId" element={<ProtectedRoute><VideoPlayer /></ProtectedRoute>} />
        <Route path="/search-results" element={<ProtectedRoute><SearchResults movies={movies} /></ProtectedRoute>} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route
            path="user-management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-management/:userId"
            element={
              <ProtectedRoute>
                <UserTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="video-management"
            element={
              <ProtectedRoute>
                <VideoManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="video-management/:id"
            element={
              <ProtectedRoute>
                <VideoManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="addUser"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="uploadVideo"
            element={
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="uploadThumbnail"
            element={
              <ProtectedRoute>
                <UploadThumbnail />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-customer"
            element={
              <ProtectedRoute>
                <CreateCustomer />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Access Denied Page */}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}
export default App;
