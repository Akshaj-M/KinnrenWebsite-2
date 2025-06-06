import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, AlertTriangle, Lightbulb, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import kinnrenLogo from "@assets/KinnrenLogo.png";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    messageType: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, messageType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us! We'll get back to you soon.",
    });
    setFormData({
      fullName: "",
      email: "",
      messageType: "",
      subject: "",
      message: "",
    });
  };

  const handleShareSuggestion = () => {
    toast({
      title: "Suggestion Shared",
      description: "Your ideas help us improve Kinnren for all families!",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <img src={kinnrenLogo} alt="Kinnren" className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-[hsl(var(--kinnren-pink))] bg-clip-text text-transparent">
                Kinnren
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl py-8 lg:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Get in Touch Section */}
          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Privacy & Data Protection */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Privacy & Data Protection</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Questions about your data, privacy settings, or account security.
                    </p>
                    <p className="text-sm text-primary">privacy@kinnren.com</p>
                  </div>
                </div>

                {/* Support & Issues */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support & Issues</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Technical problems, bugs, or help with using Kinnren features.
                    </p>
                    <p className="text-sm text-primary">support@kinnren.com</p>
                  </div>
                </div>

                {/* General Inquiries */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <Lightbulb className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">General Inquiries</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Business partnerships, media requests, or other general questions.
                    </p>
                    <p className="text-sm text-primary">hello@kinnren.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggestion Box */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl">Suggestion Box</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Share your ideas to help us improve Kinnren
                </p>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleShareSuggestion}
                  variant="outline"
                  className="w-full"
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Share a Suggestion
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Message Type */}
                <div className="space-y-2">
                  <Label htmlFor="messageType">
                    Message Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={formData.messageType} onValueChange={handleSelectChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="privacy">Privacy & Data Protection</SelectItem>
                      <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      <SelectItem value="business">Business Inquiry</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Enter message subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full kinnren-gradient text-white border-0 py-6 text-lg font-semibold"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            We typically respond within 24 hours during business days. For urgent technical issues, 
            please include as much detail as possible about the problem you're experiencing.
          </p>
        </div>
      </div>
    </div>
  );
}