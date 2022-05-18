import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TopicPage from "./pages/Topic/TopicPage";
import LoginPage from "./pages/Login/LoginPage";
import AboutPage from "./pages/About/AboutPage";
import PrivateRoute from "./utils/PrivateRoute";
import AboutPage from "./pages/About/AboutPage";
import SignupPage from "./pages/Signup/Signup";
import React from "react";

//nav content exist for all pages
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<TopicPage />} />
            </Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="*" element={<ErrorPage />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
