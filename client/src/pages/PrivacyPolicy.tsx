import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import kinnrenLogo from "@assets/KinnrenLogo.png";

export default function PrivacyPolicy() {
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
          <h1 className="text-lg font-semibold">Privacy Policy</h1>
        </div>
      </header>

      <div className="container max-w-4xl py-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Privacy Policy</CardTitle>
            <p className="text-center text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>We collect information to provide better services to our family community:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, profile photo, and family relationships</li>
                    <li><strong>Content:</strong> Photos, messages, posts, and other content you share within your family circle</li>
                    <li><strong>Usage Data:</strong> How you interact with our platform, feature usage patterns, and session information</li>
                    <li><strong>Device Information:</strong> Device type, operating system, and browser information for optimal service delivery</li>
                    <li><strong>Communication:</strong> Messages you send to us for support or feedback</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>Your personal information is used exclusively for:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Facilitating connections and communication within your family network</li>
                    <li>Personalizing your family experience and suggesting relevant features</li>
                    <li>Ensuring platform security and preventing unauthorized access</li>
                    <li>Providing customer support and responding to your inquiries</li>
                    <li>Improving our services through anonymized usage analytics</li>
                    <li>Sending important updates about your account or our services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>We never sell your personal information.</strong> Information sharing is limited to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Family Members:</strong> Content you choose to share within your family circle</li>
                    <li><strong>Service Providers:</strong> Trusted partners who help us operate the platform under strict confidentiality agreements</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect safety and security</li>
                    <li><strong>Business Transfers:</strong> In the unlikely event of a merger or acquisition, with continued privacy protection</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures including encryption in transit and at rest, 
                  secure data centers, regular security audits, and strict access controls. While no system is 
                  100% secure, we continuously monitor and update our security practices to protect your family's 
                  digital memories and personal information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>We retain your information for as long as:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Your account remains active and you continue using our services</li>
                    <li>Required to fulfill the purposes outlined in this privacy policy</li>
                    <li>Necessary to comply with legal obligations or resolve disputes</li>
                    <li>You may request account deletion at any time through your settings</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Your Privacy Rights</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Correct:</strong> Update or correct inaccurate personal information</li>
                    <li><strong>Delete:</strong> Request deletion of your personal information</li>
                    <li><strong>Port:</strong> Receive your data in a portable format</li>
                    <li><strong>Restrict:</strong> Limit how we process your personal information</li>
                    <li><strong>Withdraw Consent:</strong> Opt out of certain data processing activities</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you access Kinnren from outside our primary operating region, your information may be 
                  transferred to and processed in countries with different privacy laws. We ensure appropriate 
                  safeguards are in place through standard contractual clauses and adequacy decisions to 
                  protect your privacy rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kinnren is designed for family use and may include minor family members. We require parental 
                  consent for users under 13 and take additional measures to protect children's privacy. Parents 
                  can review, edit, or delete their child's information at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">9. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use essential cookies for authentication and platform functionality. Analytics cookies help 
                  us understand how families use our platform to improve the experience. You can control cookie 
                  preferences through your browser settings, though some features may be limited.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy to reflect changes in our practices or applicable laws. 
                  We will notify you of material changes through the platform or email and provide the 
                  opportunity to review the updated policy before it takes effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about this Privacy Policy or to exercise your privacy rights, please contact us 
                  through our <Link href="/contact"><span className="text-primary hover:underline">Contact page</span></Link> 
                  or reach out to our privacy team directly at privacy@kinnren.com.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}