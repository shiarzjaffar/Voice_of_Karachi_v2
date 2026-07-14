import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export const useNGOSession = () => {
  const navigate = useNavigate();
  const alertShown = useRef(false); // prevent multiple alerts

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/ngo/check-session",
          { withCredentials: true }
        );

        if (!res.data.loggedIn) {
          if (!alertShown.current) {
            alertShown.current = true;

            await Swal.fire({
              icon: "warning",
              title: "Session Expired",
              text: "Please login again",
              background: "#001f1f",
              color: "#00ffcc",
              confirmButtonColor: "#00ffcc",
            });
          }

          navigate("/ngo-login");
        }
      } catch (error) {
        if (!alertShown.current) {
          alertShown.current = true;

          await Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "Unable to verify session",
            background: "#001f1f",
            color: "#00ffcc",
            confirmButtonColor: "#00ffcc",
          });
        }

        navigate("/ngo-login");
      }
    };

    checkSession();
  }, [navigate]);
};