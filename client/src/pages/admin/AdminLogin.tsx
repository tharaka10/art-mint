import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseconfig";
import { IoArrowBack } from "react-icons/io5";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (error) {
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 flex items-center gap-2
          bg-black/50 backdrop-blur-md border border-white/10
          rounded-lg px-3 py-2 text-sm font-medium text-gray-300
          hover:bg-white/10 hover:border-green-500 hover:text-white
          transition-all duration-200 shadow-md"
      >
        <IoArrowBack className="text-lg" />
        Back
      </button>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 
                   p-12 rounded-2xl shadow-2xl w-full max-w-md 
                   hover:border-green-500/50 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Admin Login
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-4 mb-6 bg-black/30 border border-white  rounded-xl 
                     placeholder-gray-500 text-white
                     focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20
                     transition-all duration-300"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-5 py-4 mb-10 bg-white/10 border border-white/20 rounded-xl 
                     placeholder-gray-500 text-white
                     focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/20
                     transition-all duration-300"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold text-black bg-green-500 
                     hover:bg-green-400 active:scale-98 shadow-lg shadow-green-500/30
                     disabled:opacity-70 disabled:cursor-not-allowed
                     transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Optional subtle footer text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Secured admin access only
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;