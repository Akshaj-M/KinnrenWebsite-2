import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Monitor, ArrowLeft, Palette, Bell, Shield, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import kinnrenLogo from "@assets/KinnrenLogo.png";

export default function Settings() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

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
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>

      <div className="container max-w-4xl py-8">
        <div className="space-y-8">
          {/* Profile Section */}
          {user && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Profile</CardTitle>
                </div>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  {user.profileImageUrl && (
                    <img 
                      src={user.profileImageUrl} 
                      alt="Profile" 
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">
                      {user.firstName || user.lastName 
                        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                        : 'User'
                      }
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how Kinnren looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex flex-col items-center space-y-2 h-auto py-4"
                  >
                    <Sun className="h-6 w-6" />
                    <span>Light</span>
                  </Button>
                  
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex flex-col items-center space-y-2 h-auto py-4"
                  >
                    <Moon className="h-6 w-6" />
                    <span>Dark</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    disabled
                    className="flex flex-col items-center space-y-2 h-auto py-4 opacity-50"
                  >
                    <Monitor className="h-6 w-6" />
                    <span>System</span>
                    <span className="text-xs">(Coming Soon)</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Color Scheme Preview */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Color Scheme Preview</Label>
                <div className="flex space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary"></div>
                  <div className="h-8 w-8 rounded-full bg-accent"></div>
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--kinnren-pink))]"></div>
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--kinnren-blue))]"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kinnren's signature family-friendly color palette
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Manage how you receive notifications from Kinnren
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Family Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when family members post updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Event Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders for upcoming family events
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Chat Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified for new messages in family chats
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Photo Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when someone comments on your photos
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>
                Control your privacy settings and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow family members to see your profile details
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activity Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show when you're active on Kinnren
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Photo Download</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow family members to download photos you share
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label className="text-base font-medium">Account Actions</Label>
                <div className="flex space-x-4">
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <Button variant="outline">
                    Download My Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sign Out</p>
                  <p className="text-sm text-muted-foreground">
                    Sign out of your Kinnren account
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <a href="/api/logout">Sign Out</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}