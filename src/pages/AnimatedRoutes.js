import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedComponent from "../components/ProtectedRoute";
import Home from "./Home";
import Events from "./Events";
import Merchandise from "./Merchandise";
import Register from "./Register";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UpdateProfile from "./UpdateProfile";
import UserProfile from "./UserProfile";
import Admin from "./Admin";
import Sponsor from "./Sponsor";
import Preloader from "../components/Preloader"; // Import Preloader

function AnimatedRoutes({
  authUser,
  updateAuthUserAttr,
  handleLogout,
  checkingStatus,
}) {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Track loading state

  // Stop loading after preloader is complete
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  // This effect can be adjusted to simulate loading time or based on actual asset loading
  useEffect(() => {
    // Optionally, you could set a timeout for loading or wait for actual data load
    setTimeout(() => setLoading(false), 3000); // Adjust the time as needed
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader onComplete={handlePreloaderComplete} /> // Display Preloader if loading
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home user={authUser.user} />} />
          <Route path="/events" element={<Events user={authUser.user} />} />
          <Route path="/merchandise" element={<Merchandise />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route
            path="/register"
            element={
              <ProtectedComponent
                authUser={authUser}
                checkingStatus={checkingStatus}
                isAdmin={false}
                children={<Register user={authUser} />}
              />
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedComponent
                authUser={authUser}
                checkingStatus={checkingStatus}
                isAdmin={false}
                children={
                  <UpdateProfile
                    updateProfile={updateAuthUserAttr}
                    user={authUser}
                  />
                }
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                user={authUser}
                logoutUser={handleLogout}
                updateAuthUserAttr={updateAuthUserAttr}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                user={authUser}
                logoutUser={handleLogout}
                updateAuthUserAttr={updateAuthUserAttr}
              />
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedComponent
                authUser={authUser}
                checkingStatus={checkingStatus}
                isAdmin={false}
                children={
                  <UserProfile user={authUser} logoutUser={handleLogout} />
                }
              />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedComponent
                authUser={authUser}
                checkingStatus={checkingStatus}
                isAdmin={true}
                children={<Admin user={authUser} />}
              />
            }
          />
        </Routes>
      )}
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
