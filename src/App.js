import React, { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import "./styles/index.scss";
import Alert from "./components/Alert";

import { auth } from "./config/config-dev";
// import { auth } from "./config/config-prod";
import { useAuthStatus } from "./hooks/hooks";
import AnimatedRoutes from "./pages/AnimatedRoutes";

function App() {
  const { checkingStatus, authUser, updateAuthUserAttr } = useAuthStatus();
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [loading, setLoading] = useState(true); // Track loading state

  // Stop loading after preloader is complete
  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  const handleLogout = (alertMsg, alertType) => {
    auth
      .signOut()
      .then(() => {
        if (alertMsg) {
          setAlertMsg(alertMsg, alertType);
        } else {
          setAlertMsg("Signed out!");
        }
      })
      .catch((err) => {
        setAlertMsg(err.message);
        setAlertSeverity("error");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setAlertMsg("");
      setAlertSeverity("info");
    }, 5000);
  }, [alertMsg]);

  return (
    <Layout
      user={authUser}
      onComplete={handlePreloaderComplete}
      loading={loading}
    >
      <Alert message={alertMsg} severity={alertSeverity} />
      <AnimatedRoutes
        authUser={authUser}
        handleLogout={handleLogout}
        updateAuthUserAttr={updateAuthUserAttr}
        checkingStatus={checkingStatus}
        loading={loading}
      />
    </Layout>
  );
}

export default App;
