
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Calendar, Presentation, FileText, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";

// Validation functions
const validateName = (name: string, fieldName: string): string | null => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  // Only allow letters, spaces, hyphens, and apostrophes (for names like O'Connor, Jean-Pierre)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name.trim())) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email address is required";
  }
  // Comprehensive email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address (e.g., user@example.com)";
  }
  return null;
};

const validateInterests = (interests: string[]): string | null => {
  if (interests.length === 0) {
    return "Please select at least one volunteer role";
  }
  return null;
};

const validateExperience = (experience: string): string | null => {
  if (!experience.trim()) {
    return "Please select your cloud security experience level";
  }
  return null;
};

const validateAvailability = (availability: string): string | null => {
  if (!availability.trim()) {
    return "Please select your time availability";
  }
  return null;
};

const volunteerRoles = [
  {
    icon: Calendar,
    title: "Event Coordinator",
    description: "Help organize and manage chapter events, from logistics to speaker coordination.",
    commitment: "4-6 hours per month",
    skills: ["Event planning", "Communication", "Organization"]
  },
  {
    icon: Presentation,
    title: "Content & Marketing",
    description: "Create content for our website, social media, and marketing materials.",
    commitment: "3-5 hours per month", 
    skills: ["Writing", "Design", "Social media"]
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Build relationships with local organizations and help grow our membership.",
    commitment: "2-4 hours per month",
    skills: ["Networking", "Communication", "Relationship building"]
  },
  {
    icon: FileText,
    title: "Research Support",
    description: "Contribute to CSA research initiatives and white papers.",
    commitment: "5-8 hours per month",
    skills: ["Research", "Technical writing", "Cloud security expertise"]
  }
];

const benefits = [
  "Network with industry leaders and peers",
  "Contribute to the advancement of cloud security",
  "Gain leadership and organizational experience",
  "Access to exclusive events and content",
  "Professional development opportunities",
  "Recognition in CSA community"
];

export default function GetInvolved() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    title: "",
    experience: "",
    interests: [] as string[],
    skills: "",
    availability: "",
    motivation: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation helper function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const firstNameError = validateName(formData.firstName, "First name");
    if (firstNameError) newErrors.firstName = firstNameError;
    
    const lastNameError = validateName(formData.lastName, "Last name");
    if (lastNameError) newErrors.lastName = lastNameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const interestsError = validateInterests(formData.interests);
    if (interestsError) newErrors.interests = interestsError;
    
    const experienceError = validateExperience(formData.experience);
    if (experienceError) newErrors.experience = experienceError;
    
    const availabilityError = validateAvailability(formData.availability);
    if (availabilityError) newErrors.availability = availabilityError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field changes with real-time validation
  const handleFieldChange = (field: string, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    
      // Real-time validation for touched fields
    if (touched[field]) {
      let error = "";
      switch (field) {
        case "firstName":
          error = validateName(value as string, "First name") || "";
          break;
        case "lastName":
          error = validateName(value as string, "Last name") || "";
          break;
        case "email":
          error = validateEmail(value as string) || "";
          break;
        case "interests":
          error = validateInterests(value as string[]) || "";
          break;
        case "experience":
          error = validateExperience(value as string) || "";
          break;
        case "availability":
          error = validateAvailability(value as string) || "";
          break;
      }
      setErrors({ ...errors, [field]: error });
    }
  };

  // Handle field blur to mark as touched
  const handleFieldBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    
    // Validate field on blur
    let error = "";
    switch (field) {
      case "firstName":
        error = validateName(formData[field], "First name") || "";
        break;
      case "lastName":
        error = validateName(formData[field], "Last name") || "";
        break;
      case "email":
        error = validateEmail(formData[field]) || "";
        break;
      case "interests":
        error = validateInterests(formData[field]) || "";
        break;
      case "experience":
        error = validateExperience(formData[field]) || "";
        break;
      case "availability":
        error = validateAvailability(formData[field]) || "";
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      interests: true,
      experience: true,
      availability: true
    });
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
    
    setIsSubmitting(true);

    try {

      // Prepare the data to match the backend model
      const volunteerData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company || null,
        job_title: formData.title || null,
        experience_level: formData.experience || null,
        skills: formData.skills || null,
        volunteer_roles: formData.interests,
        availability: formData.availability || null,
        motivation: formData.motivation || null,
        img_url: null // Can be added later if needed
      };

      // Submit to backend
      const response = await fetch(API_ENDPOINTS.VOLUNTEER_SUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(volunteerData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit application');
      }

      const result = await response.json();
      
      toast.success("Thank you for your interest! We'll be in touch within 48 hours.");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        title: "",
        experience: "",
        interests: [],
        skills: "",
        availability: "",
        motivation: ""
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInterestChange = (role: string, checked: boolean) => {
    const newInterests = checked 
      ? [...formData.interests, role]
      : formData.interests.filter(i => i !== role);
    
    handleFieldChange("interests", newInterests);
  };

  // Error message component
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csa-blue to-csa-navy text-white py-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get Involved
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Join our mission to advance cloud security in the Bay Area. 
              Whether you're looking to volunteer, contribute to research, 
              or simply connect with like-minded professionals, there's a place for you.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Why Get Involved?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              When you volunteer with CSA San Francisco, you're not just giving back to the community—
              you're investing in your own professional growth and the future of cloud security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-csa-blue mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
              Volunteer Opportunities
            </h2>
            <p className="text-lg text-gray-600">
              Choose the role that best matches your interests and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {volunteerRoles.map((role, index) => (
              <Card key={role.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-csa-light rounded-lg">
                      <role.icon className="h-6 w-6 text-csa-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-csa-navy">{role.title}</CardTitle>
                      <CardDescription className="text-csa-blue font-medium">
                        {role.commitment}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{role.description}</p>
                  <div>
                    <h4 className="font-semibold text-csa-navy mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1 bg-csa-blue/10 text-csa-blue text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="py-16 bg-white">
        <div className="container-site">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-csa-navy mb-6">
                Volunteer Application
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about yourself and how you'd like to contribute to our mission.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-csa-navy">Join Our Team</CardTitle>
                <CardDescription>
                  Fill out the application below to get started as a volunteer.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-csa-navy border-b border-gray-200 pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleFieldChange("firstName", e.target.value)}
                          onBlur={() => handleFieldBlur("firstName")}
                          className={errors.firstName ? "border-red-500 focus:border-red-500" : ""}
                          placeholder="Enter your first name"
                          aria-describedby={errors.firstName ? "firstName-error" : undefined}
                          aria-invalid={!!errors.firstName}
                        />
                        <ErrorMessage error={errors.firstName} />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleFieldChange("lastName", e.target.value)}
                          onBlur={() => handleFieldBlur("lastName")}
                          className={errors.lastName ? "border-red-500 focus:border-red-500" : ""}
                          placeholder="Enter your last name"
                          aria-describedby={errors.lastName ? "lastName-error" : undefined}
                          aria-invalid={!!errors.lastName}
                        />
                        <ErrorMessage error={errors.lastName} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange("email", e.target.value)}
                          onBlur={() => handleFieldBlur("email")}
                          className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                          placeholder="user@example.com"
                          aria-describedby={errors.email ? "email-error" : undefined}
                          aria-invalid={!!errors.email}
                        />
                        <ErrorMessage error={errors.email} />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleFieldChange("company", e.target.value)}
                          placeholder="Your company or organization"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Job Title/Role</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                        placeholder="Your current job title or role"
                      />
                    </div>
                  </div>

                  {/* Experience & Background */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-csa-navy border-b border-gray-200 pb-2">
                      Experience & Background
                    </h3>

                    <div>
                      <Label htmlFor="experience">Cloud Security Experience *</Label>
                      <Select 
                        value={formData.experience} 
                        onValueChange={(value) => handleFieldChange("experience", value)}
                      >
                        <SelectTrigger 
                          className={errors.experience ? "border-red-500 focus:border-red-500" : ""}
                          onBlur={() => handleFieldBlur("experience")}
                        >
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                          <SelectItem value="expert">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage error={errors.experience} />
                    </div>

                    <div>
                      <Label htmlFor="skills">Relevant Skills & Expertise</Label>
                      <Textarea
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => handleFieldChange("skills", e.target.value)}
                        placeholder="Describe your technical skills, certifications, and areas of expertise..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Volunteer Interests */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-csa-navy border-b border-gray-200 pb-2">
                      Volunteer Interests
                    </h3>
                    
                    <div>
                      <Label>Which volunteer roles interest you? <span className="text-red-500">*</span> (Select all that apply)</Label>
                      <div className="space-y-3 mt-3">
                        {volunteerRoles.map(role => (
                          <div key={role.title} className="flex items-start space-x-3">
                            <Checkbox
                              id={role.title}
                              checked={formData.interests.includes(role.title)}
                              onCheckedChange={(checked) => handleInterestChange(role.title, !!checked)}
                            />
                            <div>
                              <Label htmlFor={role.title} className="font-medium cursor-pointer">
                                {role.title}
                              </Label>
                              <p className="text-sm text-gray-600">{role.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <ErrorMessage error={errors.interests} />
                    </div>

                    <div>
                      <Label htmlFor="availability">Time Availability *</Label>
                      <Select 
                        value={formData.availability} 
                        onValueChange={(value) => handleFieldChange("availability", value)}
                      >
                        <SelectTrigger 
                          className={errors.availability ? "border-red-500 focus:border-red-500" : ""}
                          onBlur={() => handleFieldBlur("availability")}
                        >
                          <SelectValue placeholder="How much time can you commit per month?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 hours per month</SelectItem>
                          <SelectItem value="3-5">3-5 hours per month</SelectItem>
                          <SelectItem value="6-10">6-10 hours per month</SelectItem>
                          <SelectItem value="10+">More than 10 hours per month</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage error={errors.availability} />
                    </div>

                    <div>
                      <Label htmlFor="motivation">Why do you want to volunteer with CSA San Francisco?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => handleFieldChange("motivation", e.target.value)}
                        placeholder="Tell us about your motivation and what you hope to achieve..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-csa-blue hover:bg-csa-blue/90" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting Application..." : "Submit Volunteer Application"}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    * Required fields. All information will be kept confidential and used only for volunteer coordination.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-csa-navy mb-6">
              What Happens Next?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-csa-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-csa-navy mb-2">Application Review</h3>
                <p className="text-gray-600">
                  We'll review your application and match you with opportunities that fit your interests and skills.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-csa-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-csa-navy mb-2">Welcome Call</h3>
                <p className="text-gray-600">
                  A team member will reach out to discuss your interests and answer any questions.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-csa-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-csa-navy mb-2">Get Started</h3>
                <p className="text-gray-600">
                  Join our team and start making an impact in the cloud security community!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
