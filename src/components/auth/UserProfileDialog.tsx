import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Briefcase, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface UserProfileData {
  companyName: string;
  jobRole: string;
}

interface UserProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: UserProfileData) => void;
  loading?: boolean;
}

export function UserProfileDialog({ isOpen, onClose, onSave, loading = false }: UserProfileDialogProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim() || !jobRole.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    const profileData: UserProfileData = {
      companyName: companyName.trim(),
      jobRole: jobRole.trim()
    };

    try {
      onSave(profileData);
      toast.success("Profile information saved successfully!");
      resetForm();
    } catch (error) {
      setError("An error occurred while saving your profile. Please try again.");
    }
  };

  const resetForm = () => {
    setCompanyName("");
    setJobRole("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-white border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/f9f64043-c236-482e-acb2-d6a08e0612fc.png" 
              alt="CSA Logo" 
              className="h-20 w-20 object-contain"
            />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Complete Your Profile
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Please provide some additional information to complete your registration
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Job Role */}
            <div className="space-y-2">
              <Label htmlFor="jobRole" className="text-sm font-medium text-gray-700">
                Role <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  id="jobRole"
                  type="text"
                  placeholder="Enter your role"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="pl-10 h-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-lg transition-all duration-200 text-sm"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
