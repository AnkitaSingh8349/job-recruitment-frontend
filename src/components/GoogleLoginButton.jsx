import { GoogleLogin } from "@react-oauth/google";

function GoogleLoginButton() {

  const handleGoogleSuccess = async (res) => {
    console.log("✅ GOOGLE ID TOKEN:", res.credential);

   try {
  const response = await fetch(
    "http://127.0.0.1:8000/api/accounts/auth/google/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: res.credential, // ✅ SEND REAL ID TOKEN
      }),
    }
  );

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      // ✅ SAVE TOKENS FROM DJANGO
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      alert("Google login successful");
    } catch (err) {
      console.error("Google login error:", err);
      alert(err?.detail || "Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={() => {
        console.log("❌ Google Login Failed");
      }}
    />
  );
}

export default GoogleLoginButton;
