import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (res) => {
    try {
      const API_URL =
        import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

      const response = await fetch(
        `${API_URL}/api/accounts/auth/google/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: res.credential,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw data;

      // ✅ Store tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect
      data.user?.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/user/dashboard");

    } catch (err) {
      console.error("Google login error:", err);
      alert(`Login Failed: ${err?.detail || "Unknown error"}`);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => alert("Google Login Failed")}
    />
  );
}

export default GoogleLoginButton;
