import { Routes,Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Dashboard from "./private/Dashboard";
import Profile from "./private/Profile";
import User from "./private/User";
import "./assets/css/App.css";
import PageNotFound from "./private/404";
import ForgetPassword from "./ForgetPassword";
import Notification from "./private/Notification";
import "./assets/vendor/fontawesome-free/css/all.min.css"
import "./assets/css/sb-admin-2.min.css"
import "./assets/css/sketeleton.css"
import "./assets/css/login.css"

function App() {
  const { currentUser, token } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    const isAuthenticated = currentUser && token;  
    return isAuthenticated ? children : <Navigate to="/" />;
  };
  
  return (
    <>
      <Routes>
        <Route path="/Dashboard" element={<RequireAuth><Dashboard/></RequireAuth>} />
        <Route path="/Notifications" element={<Notification/>} /> 
        <Route path="/All-Users" element={<RequireAuth><User/></RequireAuth>} />
        <Route path="/Profile" element={<RequireAuth><Profile/></RequireAuth>} />
        <Route path="/Sign-In" element={<SignIn/>} />
        <Route path="/Forget-Password" element={<ForgetPassword/>} />
        <Route path="/" element={<SignIn/>} />

        <Route path="/PageNotFound" element={<RequireAuth><PageNotFound/></RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;
