import { AlertCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup, socialLogin, loading } = useAuth();
  const { login, signup, socialLogin, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    if (mode === "signup" && !name) {
      setError("Please enter your full name");
      return;
    }

    try {
      let success = false;
      if (mode === "login") {
        success = await login(email, password);
        if (success) {
          toast.success(`Welcome back! You've been signed in successfully.`);
        }
      } else {
        success = await signup(name, email, password);
        if (success) {
          toast.success(`Account created. Complete your profile to finish sign up.`);
        }
      }

      if (success) {
        setEmail("");
        setPassword("");
        setName("");
        onClose();
      } else {
        setError(mode === "login" ? "Invalid email or password. Please try again." : "Sign up failed. Please try again.");
      }
    } catch (error) {
      setError(mode === "login" ? "An error occurred during sign in. Please try again." : "An error occurred during sign up. Please try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeChange = (newMode: "login" | "signup") => {
    setError("");
    onModeChange(newMode);
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    setError("");
    try {
      const success = await socialLogin(provider);
      if (success) {
        toast.success(`Welcome! You've been signed in with ${provider === 'google' ? 'Google' : 'LinkedIn'}.`);
        resetForm();
        onClose();
      } else {
        setError(`Failed to sign in with ${provider === 'google' ? 'Google' : 'LinkedIn'}. Please try again.`);
      }
    } catch (error) {
      setError(`An error occurred during ${provider === 'google' ? 'Google' : 'LinkedIn'} sign in. Please try again.`);
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

        <div className="space-y-3">
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

          {/* Social Login Buttons */}
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-blue-600 font-bold text-xs">G</span>
              </div>
              <span className="font-medium">Continue with Google</span>
            </Button>

            {/* LinkedIn button commented out
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('linkedin')}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 h-10 bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900 border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center shadow-sm">
                <span className="text-blue-700 font-bold text-xs">in</span>
              </div>
              <span className="font-medium">Continue with LinkedIn</span>
            </Button>
            */}
          </div>

          <div className="relative">
            <Separator className="my-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-xs text-gray-500 font-medium">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
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

            <div className="space-y-1">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
