
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Users, Building, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Thank you! We'll get back to you within 24 hours.");
    
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
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
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          aria-describedby="name-help"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          aria-describedby="email-help"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type *</Label>
                        <Select value={formData.inquiryType} onValueChange={(value) => setFormData({...formData, inquiryType: value})}>
                          <SelectTrigger>
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
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        rows={6}
                        placeholder="Please provide details about your inquiry..."
                        aria-describedby="message-help"
                      />
                      <p id="message-help" className="text-sm text-gray-500 mt-1">
                        Include any relevant details that would help us respond to your inquiry.
                      </p>
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
              please call our events hotline at <span className="font-bold">+1 (415) 417 0991 </span> 
              during business hours (9 AM - 5 PM PST).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
