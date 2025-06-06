import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, MessageCircle, Calendar, Users, Heart, Shield, Star, Moon, Sun, Menu, Download, ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import kinnrenLogo from "@assets/KinnrenLogo.png";

export default function Landing() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Early access signup:", email);
      setEmail("");
      setShowThankYou(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={kinnrenLogo} alt="Kinnren" className="h-10 w-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-[hsl(var(--kinnren-pink))] bg-clip-text text-transparent">
              Kinnren
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#story" className="text-muted-foreground hover:text-foreground transition-colors">Our Story</a>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="kinnren-gradient text-white border-0" asChild>
              <a href="/signup">Sign Up</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="container py-4 space-y-2">
              <a href="#features" className="block py-2 text-muted-foreground hover:text-foreground">Features</a>
              <a href="#how-it-works" className="block py-2 text-muted-foreground hover:text-foreground">How It Works</a>
              <a href="#about" className="block py-2 text-muted-foreground hover:text-foreground">About</a>
              <a href="#story" className="block py-2 text-muted-foreground hover:text-foreground">Our Story</a>
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="sm" asChild className="flex-1">
                  <a href="/login">Login</a>
                </Button>
                <Button className="kinnren-gradient text-white border-0 flex-1" asChild>
                  <a href="/signup">Sign Up</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Reuniting the Moments with{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-[hsl(var(--kinnren-pink))] bg-clip-text text-transparent">
              Kinnren
            </span>
          </h1>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A private, secure, and emotionally intelligent social platform made just for 
            families. Stay connected, share memories, and strengthen generational bonds 
            — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="kinnren-gradient text-white border-0 px-8 py-6 text-lg kinnren-shadow">
              <Download className="mr-2 h-5 w-5" />
              Download the App
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Create Your Family Circle
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything your family needs to stay connected, organized, and close-knit.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Private Photo Sharing</CardTitle>
                <CardDescription className="text-base">
                  Share life's beautiful moments — safely and only with family.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Family Chat Rooms</CardTitle>
                <CardDescription className="text-base">
                  Organize chats for different family groups: cousins, siblings, elders — no distractions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/20 dark:to-pink-800/20">
                  <Calendar className="h-8 w-8 text-[hsl(var(--kinnren-pink))]" />
                </div>
                <CardTitle className="text-xl">Collaborative Family Calendar</CardTitle>
                <CardDescription className="text-base">
                  Plan birthdays, reunions, and events — and ensure everyone's on the same page.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Family Tree Builder</CardTitle>
                <CardDescription className="text-base">
                  Track and build your genealogy with interactive and easy-to-navigate trees.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Event Planning Tools</CardTitle>
                <CardDescription className="text-base">
                  Simplify organizing family get-togethers — virtual or physical.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20">
                  <Shield className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl">End-to-End Privacy</CardTitle>
                <CardDescription className="text-base">
                  No ads. No data selling. Your family's digital life stays protected.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with Kinnren is simple and takes just a few minutes.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Download Kinnren</h3>
              <p className="text-muted-foreground">
                Available soon on iOS and Android.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Family Circle</h3>
              <p className="text-muted-foreground">
                Invite your loved ones and organize your family tree.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Sharing & Connecting</h3>
              <p className="text-muted-foreground">
                Post updates, celebrate milestones, and enjoy private, real-time connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Families Say</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from families who've strengthened their bonds with Kinnren.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "Kinnren helped our family reconnect after years of being apart. My kids now 
                  talk to their grandparents every week!"
                </CardDescription>
                <div className="pt-4">
                  <p className="font-semibold">Anita D.</p>
                  <p className="text-sm text-muted-foreground">Mumbai</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "I love the privacy and ease. It's like a digital home for our family."
                </CardDescription>
                <div className="pt-4">
                  <p className="font-semibold">Rajeev N.</p>
                  <p className="text-sm text-muted-foreground">Bangalore</p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "The genealogy feature helped my daughter learn about her great-grandparents!"
                </CardDescription>
                <div className="pt-4">
                  <p className="font-semibold">Sunita M.</p>
                  <p className="text-sm text-muted-foreground">Pune</p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Kinnren Section */}
      <section id="about" className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About Kinnren</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that family is the foundation of a meaningful life. Kinnren was 
              created to help families stay connected, share precious moments, and build 
              lasting memories in a safe, private environment.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
            
            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
              <p>
                Kinnren was born from a simple observation: while technology has made it easier to connect with 
                anyone, anywhere in the world, it has also made it harder to maintain deep, meaningful connections with 
                the people who matter most - our families.
              </p>
              
              <p>
                In today's fast-paced world, families are often scattered across different cities, countries, and time 
                zones. Children grow up quickly, grandparents age, and precious moments slip by unshared. Traditional 
                social media platforms, designed for mass connection, often fall short when it comes to intimate family 
                sharing.
              </p>
              
              <p>
                That's why we created Kinnren - a private, secure, and family-focused platform where multiple 
                generations can come together to share, celebrate, and stay connected. Our name comes from "Kin" 
                (family) and "Ren" (a philosophical concept emphasizing human relationships and benevolence).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Early Access</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Be among the first families to experience Kinnren. Sign up for early access 
              and get notified when we launch.
            </p>
            
            <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="kinnren-gradient text-white border-0">
                Join Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Thank You!</DialogTitle>
            <DialogDescription className="text-center">
              We've received your request for early access to Kinnren. We'll notify you as soon as we launch!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowThankYou(false)} className="kinnren-gradient text-white border-0">
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8 lg:py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={kinnrenLogo} alt="Kinnren" className="h-8 w-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-[hsl(var(--kinnren-pink))] bg-clip-text text-transparent">
                  Kinnren
                </span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Reuniting families through meaningful connections, shared memories, and 
                strengthened bonds across generations.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#story" className="hover:text-foreground transition-colors">Our Story</a></li>
                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 lg:mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Kinnren. Made with <Heart className="inline h-4 w-4 text-red-500" /> for families everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}