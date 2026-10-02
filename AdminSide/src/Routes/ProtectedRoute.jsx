import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const checkSession = async () => {

            try {

                const res = await fetch(
                    "http://localhost:5000/api/admin/check-session",
                    {
                        credentials: "include",
                    }
                );

                const data = await res.json();

                if (res.ok && data.loggedIn) {

                    setAuthenticated(true);

                } else {

                    setAuthenticated(false);

                }

            } catch (err) {

                console.error(err);

                setAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };

        checkSession();

    }, []);

    if (loading) {

        return <div>Loading...</div>;

    }

    if (!authenticated) {

        return <Navigate to="/" replace />;

    }

    return children;

}