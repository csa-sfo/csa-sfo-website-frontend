
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, Calendar, Presentation, FileText, Heart, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thank you for your interest! We'll be in touch within 48 hours.");
    
    setIsSubmitting(false);
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
  };

  const handleInterestChange = (role: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, interests: [...formData.interests, role]});
    } else {
      setFormData({...formData, interests: formData.interests.filter(i => i !== role)});
    }
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
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="title">Job Title/Role</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Experience & Background */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-csa-navy border-b border-gray-200 pb-2">
                      Experience & Background
                    </h3>

                    <div>
                      <Label htmlFor="experience">Cloud Security Experience</Label>
                      <Select value={formData.experience} onValueChange={(value) => setFormData({...formData, experience: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                          <SelectItem value="expert">Expert (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skills">Relevant Skills & Expertise</Label>
                      <Textarea
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
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
                      <Label>Which volunteer roles interest you? (Select all that apply)</Label>
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
                    </div>

                    <div>
                      <Label htmlFor="availability">Time Availability</Label>
                      <Select value={formData.availability} onValueChange={(value) => setFormData({...formData, availability: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="How much time can you commit per month?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 hours per month</SelectItem>
                          <SelectItem value="3-5">3-5 hours per month</SelectItem>
                          <SelectItem value="6-10">6-10 hours per month</SelectItem>
                          <SelectItem value="10+">More than 10 hours per month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="motivation">Why do you want to volunteer with CSA San Francisco?</Label>
                      <Textarea
                        id="motivation"
                        value={formData.motivation}
                        onChange={(e) => setFormData({...formData, motivation: e.target.value})}
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
