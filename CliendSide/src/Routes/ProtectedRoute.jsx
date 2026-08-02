import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {

    const { loggedIn, loading } = useAuth();


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;

}