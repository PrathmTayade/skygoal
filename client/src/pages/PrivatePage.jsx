import  { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const PrivatePage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // check if logged in
    async function checkAuth() {
      try {
        const { data } = await axios.get(
          import.meta.env.VITE_SERVER + "/protected",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }

    checkAuth();
  }, [data]);

  // Logout
  const handleLogout = async () => {
    await axios.get(import.meta.env.VITE_SERVER + "/logout", {
      withCredentials: true,
    });

    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
  };

  return (
    <>
      <div>
        <Toaster toastOptions={{ duration: 1500 }} />
      </div>
      {loading ? (
        <>
          {isAuthenticated ? (
            <div>
              <h1>Authenticated</h1>
              <h3> Your user id: {data.userId}</h3>
              <h3> Your email: {data.email}</h3>
              <button type="button" onClick={handleLogout}>
                logout
              </button>
            </div>
          ) : (
            <div>
              <h3>Login first to view the page</h3>
              <button type="button" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )}
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};
