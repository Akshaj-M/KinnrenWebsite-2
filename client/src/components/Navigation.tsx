import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Heart, 
  Home, 
  Images, 
  Calendar, 
  MessageCircle, 
  Users, 
  MapPin,
  Bell,
  Menu,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/photos", label: "Photos", icon: Images },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/family-tree", label: "Family Tree", icon: Users },
    { href: "/family-outings", label: "Family Outings", icon: MapPin },
  ];

  const NavLink = ({ href, label, icon: Icon, mobile = false }: {
    href: string;
    label: string;
    icon: any;
    mobile?: boolean;
  }) => {
    const isActive = location === href;
    
    return (
      <Link 
        href={href} 
        onClick={() => mobile && setMobileMenuOpen(false)}
        className={cn(
          "flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-lg",
          isActive && "text-primary bg-primary/10",
          mobile && "w-full justify-start"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className={cn("font-medium", !mobile && "hidden lg:inline")}>{label}</span>
        {mobile && isActive && <Badge variant="secondary" className="ml-auto">Current</Badge>}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">FamilyConnect</span>
            </Link>
            
            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative p-2">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="notification-dot"></span>
                </Button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImageUrl || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hidden lg:flex text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Trigger */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center space-x-3 pb-6 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.profileImageUrl || ""} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>

                    {/* Mobile Navigation Items */}
                    <div className="flex-1 py-6 space-y-2">
                      {navigationItems.map((item) => (
                        <NavLink key={item.href} {...item} mobile />
                      ))}
                    </div>

                    {/* Mobile Footer */}
                    <div className="border-t pt-4">
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex justify-around">
          {navigationItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors",
                  isActive ? "text-primary" : "text-gray-400"
                )}
              >
                <div className="relative">
                  <item.icon className="h-5 w-5" />
                  {item.href === "/chat" && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-secondary rounded-full"></span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom padding for mobile */}
      <div className="md:hidden h-20"></div>
    </>
  );
}
