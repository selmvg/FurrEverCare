"use client"

import { useState } from "react"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import AuthService from "../config/AuthService"

// Modal component for success
const SuccessModal = ({ open, onContinue }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#042C3C] mb-2 text-center">You're All Signed Up!</h2>
        <p className="text-[#8A973F] text-center mb-6 font-medium">Log in your credentials to get started.</p>
        <button
          className="px-6 py-2 rounded-full font-bold text-white text-sm bg-[#EA6C7B] hover:bg-[#EA6C7B]/90 transition"
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const SignUpPage = () => {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }
    
    try {
      setIsLoading(true)
      setError("")
      
      await AuthService.register(fullName, phone, email, password)
      
      setShowSuccessModal(true)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleContinue = () => {
    setShowSuccessModal(false);
    navigate("/about-us");
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-['Baloo']">
      {/* Left Panel - Logo */}
      <div
        className="w-full md:w-1/2 p-10 flex flex-col items-center justify-center"
        style={{ backgroundColor: "#FFF7EC" }}
      >
        <img src={logo || "/placeholder.svg"} className="w-[300px] h-[300px]" alt="Logo" />
        <h1 className="text-3xl font-bold mt-6 text-center text-[#042C3C]">FurrEverCare</h1>
        <p className="text-center mt-4 text-[#042C3C]/80 max-w-md">
          Join our community of pet lovers and get access to expert advice, resources, and tools for your furry friends.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center" style={{ backgroundColor: "#F0B542" }}>
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#042C3C]">Join Our Community!</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#042C3C] mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-2xl text-sm outline-none font-semibold"
                style={{ backgroundColor: "#FFF7EC", color: "#8A973F", border: "none" }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-[#042C3C] mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-2xl text-sm outline-none font-semibold"
                style={{ backgroundColor: "#FFF7EC", color: "#8A973F", border: "none" }}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-[#042C3C] mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-2xl text-sm outline-none font-semibold"
                style={{ backgroundColor: "#FFF7EC", color: "#8A973F", border: "none" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-[#042C3C] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-2xl text-sm outline-none font-semibold"
                style={{ backgroundColor: "#FFF7EC", color: "#8A973F", border: "none" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#042C3C] mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 rounded-2xl text-sm outline-none font-semibold"
                style={{ backgroundColor: "#FFF7EC", color: "#8A973F", border: "none" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 border-none rounded-3xl text-sm font-bold cursor-pointer transition-colors hover:bg-[#EA6C7B]/90"
              style={{ backgroundColor: "#EA6C7B", color: "white" }}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-[#042C3C]">
                Already have an account?{" "}  
                <a
                  href="/about-us"
                  className="font-bold hover:underline"
                  style={{
                    color: "#FFF7EC",
                    textShadow: "0 1px 2px rgba(60,40,10,0.12)"
                  }}
                >
                  Log in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* Success Modal */}
      <SuccessModal open={showSuccessModal} onContinue={handleContinue} />
    </div>
  )
}

export default SignUpPage