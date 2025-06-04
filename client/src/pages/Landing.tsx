import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Home, Images, Calendar, MessageCircle, Users, Shield, Smartphone, Star, CheckCircle, Lock, MonitorSmartphone } from "lucide-react";

export default function Landing() {
  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  const handleDemo = () => {
    // For now, just scroll to features
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">FamilyConnect</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Features</span>
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Testimonials</span>
              </a>
            </div>

            <Button onClick={handleGetStarted} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-amber-50/30 to-emerald-50/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Keep Your Family 
                  <span className="text-primary"> Connected</span> 
                  & Close
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Share memories, plan gatherings, and stay in touch with family across generations. 
                  A private, secure space just for your loved ones.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleGetStarted} size="lg" className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all">
                  <Users className="h-4 w-4 mr-2" />
                  Get Started Free
                </Button>
                <Button onClick={handleDemo} variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Images className="h-4 w-4 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone className="h-4 w-4 text-emerald-600" />
                  <span>Mobile Friendly</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Multi-generational family" 
                  className="rounded-2xl shadow-xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Grandparents with grandchildren" 
                  className="rounded-2xl shadow-xl mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Family celebration" 
                  className="rounded-2xl shadow-xl -mt-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Family outdoors" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything Your Family Needs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple tools designed to bring your family closer together, with privacy and security at the heart of everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Images className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Photo Sharing</h3>
                <p className="text-gray-600 mb-4">
                  Share special moments instantly with family albums. Create memories that last a lifetime with easy photo organization.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Unlimited photo storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Auto-organize by date/event</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Event Planning</h3>
                <p className="text-gray-600 mb-4">
                  Plan family gatherings, birthdays, and holidays. Send invitations and track RSVPs all in one place.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Shared family calendar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>RSVP management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Chat</h3>
                <p className="text-gray-600 mb-4">
                  Stay connected with secure family group chats. Share updates, coordinate plans, and keep everyone in the loop.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Private group messaging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Photo & video sharing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Family Tree</h3>
                <p className="text-gray-600 mb-4">
                  Build and explore your family history. Connect generations and preserve your family's story for future generations.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Interactive family tree</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Relationship mapping</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
                <p className="text-gray-600 mb-4">
                  Complete control over who sees what. Set privacy levels for different family members and content types.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Granular privacy settings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Secure invitation system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <MonitorSmartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Ready</h3>
                <p className="text-gray-600 mb-4">
                  Access your family network anywhere. Optimized for all devices with easy-to-use interfaces for every generation.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Mobile-first design</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Offline photo viewing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Families Everywhere</h2>
            <p className="text-lg text-gray-600">See how FamilyConnect is bringing families closer together</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-amber-50/30 to-primary/10">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-800 mb-6 italic">
                  "FamilyConnect has made it so easy to stay in touch with our extended family. My grandchildren love sharing their school photos, and I love being able to see them grow up!"
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48" 
                    alt="Margaret testimonial" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Margaret Thompson</h4>
                    <p className="text-sm text-gray-600">Grandmother of 5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50/10 to-amber-50/10">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-800 mb-6 italic">
                  "Planning family events used to be a nightmare with all the calls and texts. Now everything is organized in one place, and everyone stays updated automatically."
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48" 
                    alt="Lisa testimonial" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">Lisa Rodriguez</h4>
                    <p className="text-sm text-gray-600">Mom & Event Planner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-amber-50/30">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-800 mb-6 italic">
                  "The privacy features give me peace of mind. I know our family photos and conversations are completely secure and only shared with people we choose."
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48" 
                    alt="David testimonial" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">David Chen</h4>
                    <p className="text-sm text-gray-600">Father of 3</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Bring Your Family Together?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who are already staying connected, sharing memories, and planning gatherings with FamilyConnect.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button onClick={handleGetStarted} className="bg-white text-primary hover:bg-gray-50 transform hover:scale-105 transition-all" size="lg">
              <Users className="h-4 w-4 mr-2" />
              Start Your Family Network
            </Button>
            <Button onClick={handleDemo} variant="outline" className="border-white text-white hover:bg-white hover:text-primary" size="lg">
              <Images className="h-4 w-4 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-primary-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free for families up to 10 members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>100% private & secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Works on all devices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-white">FamilyConnect</span>
              </div>
              <p className="text-gray-400">
                Bringing families together through secure, private digital spaces designed for all generations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Photo Sharing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Event Planning</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Family Chat</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Family Tree</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Controls</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Guide</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Our Mission</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 FamilyConnect. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-emerald-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
