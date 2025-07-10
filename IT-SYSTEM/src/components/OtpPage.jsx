import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from ForgetPassword.jsx
  const userIdentifier = location.state?.email || "";

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
      // const res = await fetch('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ otp, email: userIdentifier }), headers: { 'Content-Type': 'application/json' } })
      // const data = await res.json();
      // if (data.status === 'success') { ... }
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
    setSuccess("");
    setResendMsg("OTP resent! Please check your email.");
    setTimeout(() => setResendMsg(""), 2000);
    // Call backend to resend OTP if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">OTP Verification</h2>
          <p className="text-gray-900">Enter the 6-digit OTP sent to your email</p>
          <p className="text-gray-600 mb-4">{userIdentifier && <span>({userIdentifier})</span>}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={handleChange}
                className={`w-full px-6 py-3 border rounded-lg text-center tracking-widest text-2xl font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="------"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center">Verify OTP</div>
              )}
            </button>
            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={loading}
                className="text-blue-600 hover:underline text-sm font-medium bg-transparent border-none p-0"
              >
                Resend OTP
              </button>
              <button
                type="button"
                onClick={() => navigate('/forget-password')}
                className="text-gray-500 hover:text-blue-600 text-sm font-medium bg-transparent border-none p-0"
              >
                Back to Forgot Password
              </button>
            </div>
            {error && <div className="mt-2 text-center text-sm text-red-600">{error}</div>}
            {success && <div className="mt-2 text-center text-sm text-green-600">{success}</div>}
            {resendMsg && <div className="mt-2 text-center text-sm text-blue-600">{resendMsg}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
