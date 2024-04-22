import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home"; // Import your Home component
import Auth from "./components/auth/Auth";
import RegistrationForm from "./components/auth/RegistrationForm";
import Dashboard from "./components/auth/Dashboard";
import Error from "./components/auth/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ServicePage from "./components/services/ServicePage";
import About from "./components/about/About";
import TeacherHome from "./components/teacher/TeacherHome";
import TeacherRegister from "./components/teacher/TeacherRegister";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner/Spinner";
import PublicRoute from "./components/publicRoute/PublicRoute";
import ProtectedRoute from "./components/protectRouter/ProtectRouter";
import ApplyTeacher from "./components/teacher/ApplyTeacher";
import ListTeacher from "./components/teacher/ListTeacher";
import ListStudent from "./components/teacher/ListStudent";
import Contactus from "./components/contactus/Contactus";
import RegisterStudent from "./components/auth/RegisterStudent";
import TeacherRegistration from "./components/auth/TeacherRegistration";
import LoginCard from "./components/auth/LoginCard";
import LoginTeacher from "./components/auth/LoginTeacher";
import LoginStudent from "./components/auth/LoginStudent";
function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Set the exact path for Home as the default route */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/LoginCard" element={<LoginCard />} />
          <Route exact path="/studentauth" element={<LoginStudent />} />
          <Route exact path="/registerr" element={<RegisterStudent />} />
          <Route exact path="/dash/registerp" element={<RegistrationForm />} />
          <Route exact path="/dash/patients" element={<ListStudent />} />
          <Route exact path="/dash/Teacher" element={<ListTeacher />} />
          <Route exact path="/services" element={<ServicePage />} />
          <Route exact path="/contactus" element={<Contactus />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/teacherauth" element={<TeacherRegistration />} />
          <Route exact path="/Teacherapp" element={<TeacherHome />} />
          <Route exact path="/LoginCard" element={<LoginCard />} />
          <Route exact path="/LoginTeacher" element={<LoginTeacher />} />
          <Route exact path="/LoginStudent" element={<LoginStudent />} />
          <Route
            exact
            path="/Teacherapp/applyTeacher"
            element={<ApplyTeacher />}
          />
          <Route exact path="/Teacherapp/patients" element={<ListStudent />} />

          <Route exact path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
