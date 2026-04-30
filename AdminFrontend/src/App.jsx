import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import FormPage from "./pages/FormPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/form/:id" element={<FormPage/>} />
      </Routes>
    </Router>
  );
}

export default App;