import { AuthProvider, useAuth } from "./components/auth/useAuth.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/protectedRoute.jsx";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/views/Home.jsx";
import Modules from "./components/views/Modules.jsx";
import Staff from "./components/views/Staff.jsx";
import Login from "./components/views/Login.jsx";
import Duties from "./components/views/Duty.jsx";
import UserInformation from "./components/views/UserInformation.jsx";
import ModuleInformation from "./components/views/ModuleInformation.jsx";
import DutyInformation from "./components/views/DutyInformation.jsx";
import PageNotFound from "./components/views/404.jsx";

const Root = () => {
  const { loggedInUser } = useAuth();
  return loggedInUser ? <Navigate to="/home" /> : <Login />;
};

function App() {
  // Initialisation ----------------------------------------------
  // State -------------------------------------------------------
  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Root />} />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modules"
              element={
                <ProtectedRoute>
                  <Modules />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute>
                  <Staff />
                </ProtectedRoute>
              }
            />
            <Route
              path="/duties"
              element={
                <ProtectedRoute>
                  <Duties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserInformation/:userId"
              element={
                <ProtectedRoute>
                  <UserInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ModuleInformation/:moduleId"
              element={
                <ProtectedRoute>
                  <ModuleInformation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DutyInformation/:dutyID"
              element={
                <ProtectedRoute>
                  <DutyInformation />
                </ProtectedRoute>
              }
            />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
