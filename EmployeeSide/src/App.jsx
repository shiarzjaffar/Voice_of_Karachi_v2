import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import PendingComplaints from "./Pages/PendingComplaints";
import AssignedComplaints from "./Pages/AssignedComplaints";
import CompletedComplaints from "./Pages/CompletedComplaints";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import ProtectedRoute from "./Routes/ProtectedRoute";
import EmployeeLayout from "./Layout/EmployeeLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pending" element={<PendingComplaints />} />
          <Route path="/assigned" element={<AssignedComplaints />} />
          <Route path="/completed" element={<CompletedComplaints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;