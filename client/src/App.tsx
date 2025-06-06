import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Contact from "@/pages/Contact";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Settings from "@/pages/Settings";
import Home from "@/pages/Home";
import Photos from "@/pages/Photos";
import Events from "@/pages/Events";
import Chat from "@/pages/Chat";
import FamilyTree from "@/pages/FamilyTree";
import FamilyOutings from "@/pages/FamilyOutings";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Public routes - always accessible */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/contact" component={Contact} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/privacy" component={PrivacyPolicy} />
      
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          {/* Authenticated routes */}
          <Route path="/" component={Home} />
          <Route path="/photos" component={Photos} />
          <Route path="/events" component={Events} />
          <Route path="/chat" component={Chat} />
          <Route path="/family-tree" component={FamilyTree} />
          <Route path="/family-outings" component={FamilyOutings} />
          <Route path="/settings" component={Settings} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
