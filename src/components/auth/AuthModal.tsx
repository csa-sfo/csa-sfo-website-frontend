import { AlertCircle, Mail, User, Building, Clock, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/otp-input";
import { sendOTP, verifyOTP, updateUserMetadata, supabase } from "@/lib/supabase";
import { API_ENDPOINTS } from "@/config/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { loginWithOtp, signupWithOtp, loading } = useAuth();

  // OTP Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const sendOtpToEmail = async (email: string, signupData?: { name: string; organization: string }) => {
    try {
      // Pass user data to Supabase for signup to store in user_metadata
      const result = await sendOTP(email, signupData);
      
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setError(""); // Clear any previous errors

    try {
      const result = await verifyOTP(email, otp);
      
      if (result?.user) {
        const user = result.user;
        
        if (mode === "signup") {
          
          // For signup, ensure user metadata is properly set
          if (!user.user_metadata?.name && (name || organization)) {
            try {
              await updateUserMetadata({ name, organization });
              // Get updated user session
              const { data: sessionData } = await supabase.auth.getSession();
              if (sessionData.session?.user) {
                Object.assign(user, sessionData.session.user);
              }
            } catch (updateError) {
              console.error('Failed to update user metadata:', updateError);
            }
          }
          
          const success = await signupWithOtp(user);
          console.log("Signup result:", success);
          
          if (success) {
            toast.success("Account created successfully!");
            resetForm();
            onClose();
          } else {
            setError("Failed to create account. Please try again.");
          }
        } else {
          const success = await loginWithOtp(user);
          
          if (success) {
            toast.success("Welcome back! You've been signed in successfully.");
            resetForm();
            onClose();
          } else {
            setError("Failed to sign in. Please try again.");
          }
        }
      } else {
        console.error("No user returned from OTP verification");
        setError("Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError(`Invalid or expired OTP. Please try again.`);
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      const signupData = mode === "signup" ? { name, organization } : undefined;
      const success = await sendOtpToEmail(email, signupData);
      if (success) {
        setOtpTimer(60); // 1 minute
        setCanResend(false);
        toast.success("OTP resent successfully!");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    }
  };

  const goBackToForm = () => {
    setIsOtpSent(false);
    setOtp("");
    setError("");
    setOtpTimer(0);
    setCanResend(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (mode === "signup" && !name) {
      setError("Please enter your full name");
      return;
    }

    if (mode === "signup" && !organization) {
      setError("Please enter your organization");
      return;
    }

    try {
      // Check if email exists before sending OTP
      const checkResponse = await fetch(`${API_ENDPOINTS.CHECK_EMAIL}/${encodeURIComponent(email)}`);
      const checkData = await checkResponse.json();
      
      if (mode === "login") {
        // For login, email must exist
        if (!checkData.exists) {
          setError("Email not registered. Please sign up first.");
          toast.error("Email not registered. Please sign up first.");
          return;
        }
      } else if (mode === "signup") {
        // For signup, email must NOT exist
        if (checkData.exists) {
          setError("Email already registered. Please login instead.");
          toast.error("Email already registered. Please login instead.");
          return;
        }
      }

      // Send OTP to email
      const success = await sendOtpToEmail(email, mode === "signup" ? { name, organization } : undefined);
      if (success) {
        setIsOtpSent(true);
        setOtpTimer(60); // 1 minute
        setCanResend(false);
        toast.success(`OTP sent to ${email}. Please check your email.`);
      } else {
        setError("Failed to send OTP. Please try after few minutes.");
      }
    } catch (error) {
      setError("An error occurred while sending OTP. Please try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setOrganization("");
    setOtp("");
    setError("");
    setIsOtpSent(false);
    setOtpTimer(0);
    setCanResend(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeChange = (newMode: "login" | "signup") => {
    resetForm();
    onModeChange(newMode);
  };

  const handleLinkedInLogin = async () => {
    try {
      // Use Supabase client for LinkedIn OAuth (simpler and matches Google pattern)
      const { signInWithLinkedIn } = await import('@/lib/supabase');
      await signInWithLinkedIn();
    } catch (error) {
      console.error('LinkedIn login error:', error);
      toast.error('Failed to initiate LinkedIn login');
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-sm mx-auto bg-white border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-2 pb-1">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
              alt="CSA Logo" 
              className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
            />
          </div>
          <DialogTitle className="sr-only">
            {mode === "login" ? "Sign in" : "Sign up"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 relative min-h-[300px]">
          {/* Tab Navigation */}
          <div className="flex bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => handleModeChange("login")}
              className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => handleModeChange("signup")}
              className={`flex-1 py-2 px-2 text-sm font-medium rounded-md transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}


          <div className={`transition-all duration-300 ${isOtpSent ? 'opacity-0 translate-x-[-20px] pointer-events-none absolute' : 'opacity-100 translate-x-0'}`}>
            {!isOtpSent && (
              /* Initial Form */
              <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "signup" && (
                <>
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <div className="relative group">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
                      Organization
                    </Label>
                    <div className="relative group">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <Input
                        id="organization"
                        type="text"
                        placeholder="Enter your organization"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* LinkedIn Login Button */}
              <Button
                type="button"
                onClick={handleLinkedInLogin}
                className="w-full h-10 bg-[#0077B5] hover:bg-[#005885] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>Continue with LinkedIn</span>
              </Button>
              </form>
            )}
          </div>

          <div className={`transition-all duration-300 ${!isOtpSent ? 'opacity-0 translate-x-[20px] pointer-events-none absolute' : 'opacity-100 translate-x-0'}`}>
            {isOtpSent && (
              /* OTP Verification Form */
              <div className="space-y-4">
              <div className="text-center space-y-2 relative">
                <Button
                  variant="ghost"
                  onClick={goBackToForm}
                  className="absolute left-0 top-0 p-2 h-auto text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold text-gray-900">Verify Your Email</h3>
                <p className="text-sm text-gray-600">
                  We've sent a 6-digit verification code to<br />
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {otpTimer > 0 && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Code expires in {formatTime(otpTimer)}</span>
                  </div>
                )}

                <Button
                  onClick={handleOtpVerification}
                  disabled={loading || otp.length !== 6}
                  className="w-full h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={!canResend || loading}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {canResend ? "Resend OTP" : `Resend in ${formatTime(otpTimer)}`}
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* LinkedIn Login Button */}
                <Button
                  type="button"
                  onClick={handleLinkedInLogin}
                  className="w-full h-10 bg-[#0077B5] hover:bg-[#005885] text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>Continue with LinkedIn</span>
                </Button>
              </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
