import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import kinnrenLogo from "@assets/KinnrenLogo.png";

export default function TermsOfService() {
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
          <h1 className="text-lg font-semibold">Terms of Service</h1>
        </div>
      </header>

      <div className="container max-w-4xl py-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Terms of Service</CardTitle>
            <p className="text-center text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Service Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kinnren provides a private, secure social platform designed exclusively for families to connect, 
                  share memories, and strengthen relationships across generations. Our service includes photo sharing, 
                  messaging, event planning, family tree building, and other family-focused features.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. User Obligations</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>As a Kinnren user, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provide accurate and truthful information during registration</li>
                    <li>Use the platform exclusively for family connections and appropriate content sharing</li>
                    <li>Respect other family members' privacy and personal boundaries</li>
                    <li>Not share login credentials or allow unauthorized access to your account</li>
                    <li>Report any inappropriate content or behavior to our support team</li>
                    <li>Comply with all applicable laws and regulations in your jurisdiction</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to maintain 99.9% uptime, Kinnren services may occasionally be unavailable due to 
                  maintenance, updates, or unforeseen technical issues. We will provide advance notice of scheduled 
                  maintenance when possible and work to minimize any service disruptions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Platform Responsibilities</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Kinnren commits to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Maintaining the security and privacy of your family data</li>
                    <li>Providing reliable platform performance and regular feature updates</li>
                    <li>Offering customer support for technical issues and account management</li>
                    <li>Ensuring transparent communication about platform changes or policies</li>
                    <li>Protecting user data according to our Privacy Policy and applicable laws</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kinnren's liability is limited to the maximum extent permitted by law. We are not responsible for 
                  any indirect, incidental, or consequential damages arising from your use of the platform. Our total 
                  liability shall not exceed the amount paid by you for the service during the twelve months preceding 
                  the claim.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Intellectual Property Rights</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Content ownership and rights:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>You retain ownership of all content you upload to Kinnren</li>
                    <li>You grant Kinnren a license to store, display, and process your content for service delivery</li>
                    <li>Kinnren owns all platform technology, design, and proprietary features</li>
                    <li>You may not copy, modify, or distribute Kinnren's proprietary technology</li>
                    <li>All trademarks, logos, and brand elements remain property of Kinnren</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes arising from these Terms of Service will be resolved through binding arbitration in 
                  accordance with the rules of the relevant arbitration association. Both parties agree to attempt 
                  good faith negotiation before pursuing formal dispute resolution procedures.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">8. Account Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Either party may terminate the service relationship at any time. Users may delete their accounts 
                  through the settings page. Kinnren reserves the right to suspend or terminate accounts that violate 
                  these terms. Upon termination, your access to the platform will cease, though some data may be 
                  retained as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kinnren may update these Terms of Service periodically to reflect changes in our services or 
                  applicable laws. We will notify users of material changes through the platform or email. 
                  Continued use of the service after such changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us through our 
                  <Link href="/contact"> <span className="text-primary hover:underline">Contact page</span> </Link> 
                  or reach out to our legal team directly.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}