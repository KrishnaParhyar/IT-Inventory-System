import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Assume email/phone is passed via state from ForgetPassword.jsx
  const userIdentifier = location.state?.email || location.state?.phone || "";

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      // Replace with your backend API call
      // Example:
      // const res = await fetch('/api/verify-otp', { method: 'POST', body: JSON.stringify({ otp, email: userIdentifier }) })
      // const data = await res.json();
      // if (data.success) { ... }
      if (otp === "123456") { // Dummy OTP for demo
        setSuccess("OTP verified! You can now reset your password.");
        setTimeout(() => {
          navigate("/reset-password", { state: { email: userIdentifier } });
        }, 1500);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  const handleResend = () => {
    setError("");
    setSuccess("OTP resent! Please check your email or phone.");
    // Call backend to resend OTP if needed
  };

  return (
    <div className="otp-container" style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>OTP Verification</h2>
      <p>Please enter the 6-digit OTP sent to your {userIdentifier ? `account (${userIdentifier})` : "email/phone"}.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={handleChange}
          maxLength={6}
          placeholder="Enter OTP"
          style={{ letterSpacing: 8, fontSize: 20, textAlign: "center", width: "100%", marginBottom: 12 }}
          required
        />
        <button type="submit" disabled={loading || otp.length !== 6} style={{ width: "100%", padding: 10, fontSize: 16 }}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      <button onClick={handleResend} disabled={loading} style={{ marginTop: 12, width: "100%", background: "none", color: "#007bff", border: "none", cursor: "pointer" }}>
        Resend OTP
      </button>
      {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      <button onClick={() => navigate("/forget-password")}
        style={{ marginTop: 20, width: "100%", background: "#f5f5f5", border: "1px solid #ccc", padding: 8, cursor: "pointer" }}>
        Back to Forgot Password
      </button>
    </div>
  );
};

export default OtpPage;
