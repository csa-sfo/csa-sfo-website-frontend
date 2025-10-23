
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Users, Building, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Validation functions
const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return "Full name is required";
  }
  if (name.trim().length < 2) {
    return "Full name must be at least 2 characters long";
  }
  // Only allow letters, spaces, hyphens, and apostrophes (for names like O'Connor, Jean-Pierre)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name.trim())) {
    return "Full name can only contain letters, spaces, hyphens, and apostrophes";
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

const validateSubject = (subject: string): string | null => {
  if (!subject.trim()) {
    return "Subject is required";
  }
  if (subject.trim().length < 5) {
    return "Subject must be at least 5 characters long";
  }
  return null;
};

const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return "Message is required";
  }
  if (message.trim().length < 10) {
    return "Message must be at least 10 characters long";
  }
  return null;
};

const validateInquiryType = (inquiryType: string): string | null => {
  if (!inquiryType) {
    return "Please select an inquiry type";
  }
  return null;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation helper function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const subjectError = validateSubject(formData.subject);
    if (subjectError) newErrors.subject = subjectError;
    
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    
    const inquiryTypeError = validateInquiryType(formData.inquiryType);
    if (inquiryTypeError) newErrors.inquiryType = inquiryTypeError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field changes with real-time validation
  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    
    // Real-time validation for touched fields
    if (touched[field]) {
      let error = "";
      switch (field) {
        case "name":
          error = validateName(value) || "";
          break;
        case "email":
          error = validateEmail(value) || "";
          break;
        case "subject":
          error = validateSubject(value) || "";
          break;
        case "message":
          error = validateMessage(value) || "";
          break;
        case "inquiryType":
          error = validateInquiryType(value) || "";
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
      case "name":
        error = validateName(formData[field]) || "";
        break;
      case "email":
        error = validateEmail(formData[field]) || "";
        break;
      case "subject":
        error = validateSubject(formData[field]) || "";
        break;
      case "message":
        error = validateMessage(formData[field]) || "";
        break;
      case "inquiryType":
        error = validateInquiryType(formData[field]) || "";
        break;
    }
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      inquiryType: true
    });
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form before submitting.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Thank you! We'll get back to you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        inquiryType: ""
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              Contact Us
            </h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              We'd love to hear from you. Whether you have questions about our events, 
              want to get involved, or are interested in partnership opportunities, 
              we're here to help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-csa-navy mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Choose the best way to reach us based on your inquiry type.
                </p>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-csa-blue mt-1" />
                      <div>
                        <h3 className="font-semibold text-csa-navy mb-2">General Inquiries</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Questions about events, membership, or general chapter information.
                        </p>
                        <a 
                          href="mailto:csasanfranciscochapter@gmail.com"
                          className="text-csa-blue hover:underline"
                        >
                          csasanfranciscochapter@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Building className="h-6 w-6 text-csa-blue mt-1" />
                      <div>
                        <h3 className="font-semibold text-csa-navy mb-2">Partnership & Sponsorship</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Interested in sponsoring events or partnering with our chapter.
                        </p>
                        <a 
                          href="mailto:csasanfranciscochapter@gmail.com"
                          className="text-csa-blue hover:underline"
                        >
                          csasanfranciscochapter@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Users className="h-6 w-6 text-csa-blue mt-1" />
                      <div>
                        <h3 className="font-semibold text-csa-navy mb-2">Volunteer Opportunities</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Join our team and help shape the future of cloud security.
                        </p>
                        <a 
                          href="mailto:csasanfranciscochapter@gmail.com"
                          className="text-csa-blue hover:underline"
                        >
                          csasanfranciscochapter@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-csa-blue mt-1" />
                      <div>
                        <h3 className="font-semibold text-csa-navy mb-2">Our Location</h3>
                        <p className="text-gray-600 text-sm">
                          San Francisco Bay Area, California<br />
                          Events hosted throughout the region
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-csa-navy">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleFieldChange("name", e.target.value)}
                          onBlur={() => handleFieldBlur("name")}
                          className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                          placeholder="Enter your full name"
                          aria-describedby={errors.name ? "name-error" : "name-help"}
                          aria-invalid={!!errors.name}
                        />
                        <ErrorMessage error={errors.name} />
                      </div>
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
                          aria-describedby={errors.email ? "email-error" : "email-help"}
                          aria-invalid={!!errors.email}
                        />
                        <ErrorMessage error={errors.email} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleFieldChange("company", e.target.value)}
                          placeholder="Your company or organization"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select 
                          value={formData.inquiryType} 
                          onValueChange={(value) => handleFieldChange("inquiryType", value)}
                        >
                          <SelectTrigger className={errors.inquiryType ? "border-red-500 focus:border-red-500" : ""}>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="membership">Membership</SelectItem>
                            <SelectItem value="events">Events</SelectItem>
                            <SelectItem value="partnership">Partnership/Sponsorship</SelectItem>
                            <SelectItem value="volunteer">Volunteer</SelectItem>
                            <SelectItem value="speaker">Speaking Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMessage error={errors.inquiryType} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleFieldChange("subject", e.target.value)}
                        onBlur={() => handleFieldBlur("subject")}
                        className={errors.subject ? "border-red-500 focus:border-red-500" : ""}
                        placeholder="Brief description of your inquiry"
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        aria-invalid={!!errors.subject}
                      />
                      <ErrorMessage error={errors.subject} />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleFieldChange("message", e.target.value)}
                        onBlur={() => handleFieldBlur("message")}
                        className={errors.message ? "border-red-500 focus:border-red-500" : ""}
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                        aria-describedby={errors.message ? "message-error" : "message-help"}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message ? (
                        <ErrorMessage error={errors.message} />
                      ) : (
                        <p id="message-help" className="text-sm text-gray-500 mt-1">
                          Include any relevant details that would help us respond to your inquiry.
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-csa-blue hover:bg-csa-blue/90" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    
                    <p className="text-xs text-gray-500 text-center">
                      * Required fields. All information will be kept confidential.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 section-light">
        <div className="container-site">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-csa-navy mb-6">
              Response Times & Support
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-bold text-csa-blue mb-2">24 Hours</div>
                <p className="text-gray-600">
                  Typical response time for general inquiries
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-csa-blue mb-2">48 Hours</div>
                <p className="text-gray-600">
                  Partnership and sponsorship inquiries
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-csa-blue mb-2">Same Day</div>
                <p className="text-gray-600">
                  Urgent event-related questions
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-8">
              For immediate assistance with event registration or urgent matters, 
              please call our events hotline at <span className="font-medium whitespace-nowrap">(415) 555-0123 </span> 
              during business hours (9 AM - 5 PM PST).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
