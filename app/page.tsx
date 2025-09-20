import FeatureCard from "@/components/FeatureCard";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import {
  MessageCircle,
  Video,
  Shield,
  Zap,
  Users,
  Feather,
  Lock,
  Sparkles,
  Globe,
  Smartphone,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <main className="flex-1 flex flex-col items-center mt-16">

      <section className="w-full pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24 relative">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left space-y-8">
                <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium backdrop-blur-md bg-white/10 mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Join 50K+ users worldwide</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-800 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                    TG Messaging
                  </span>
                  <br />
                  <span className="text-foreground">Reimagined</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl">
                  Telegram is a cloud-based mobile and desktop messaging app
                  with a focus on security and speed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <SignedOut>
                    <SignInButton>
                      <Button
                        size="lg"
                        className="text-base px-8 py-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Get Started Free
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6 rounded-full"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Download App
                  </Button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10 rounded-2xl p-8 backdrop-blur-md border border-border/50 shadow-xl">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            A
                          </span>
                        </div>
                        <div className="bg-muted rounded-lg rounded-tl-none px-4 py-2 max-w-xs">
                          <p className="text-sm">Hey there! How is it going?</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            2:34 PM
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-blue-600 text-white rounded-lg rounded-tr-none px-4 py-2 max-w-xs">
                          <p className="text-sm">
                            All good! Just testing this new secure app 🔒
                          </p>
                          <p className="text-xs text-blue-200 mt-1">
                            2:35 PM • Read
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">
                            Y
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
                        <MessageCircle className="w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="bg-transparent border-none focus:outline-none text-sm w-full"
                        />
                        <Button size="sm" className="rounded-full h-8 w-8 p-0">
                          →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full pt-12 md:pt-16 pb-20 md:pb-24">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Telegram
                </span>{" "}
                Stands Out
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Powerful features designed to keep your conversations private,
                secure, and simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={Lock}
                title="End-to-End Encryption"
                description="Your messages are secured with military-grade encryption that only you and your recipient can access."
              />
              <FeatureCard
                icon={Zap}
                title="Lightning Fast"
                description="Experience the fastest message delivery with our distributed server infrastructure across continents."
              />
              <FeatureCard
                icon={Globe}
                title="Sync Across Devices"
                description="Access your messages from multiple devices simultaneously with seamless cloud synchronization."
              />
              <FeatureCard
                icon={Video}
                title="HD Video Calls"
                description="Crystal clear voice and video calls with background noise suppression and adaptive quality."
              />
              <FeatureCard
                icon={Users}
                title="Massive Groups"
                description="Create communities with up to 200,000 members with advanced admin tools and permissions."
              />
              <FeatureCard
                icon={Feather}
                title="Lightweight"
                description="Optimized to use minimal data and battery while delivering all the powerful features you need."
              />
            </div>
          </div>
        </section>

        {/* Security Spotlight Section */}
        <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-background rounded-2xl p-8 border border-border/50 shadow-lg">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Security First
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your privacy is our priority
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                          <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Secret Chats</h4>
                          <p className="text-sm text-muted-foreground">
                            Self-destructing messages with no trace
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Two-Factor Auth</h4>
                          <p className="text-sm text-muted-foreground">
                            Extra layer of security for your account
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Globe className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">No Data Sharing</h4>
                          <p className="text-sm text-muted-foreground">
                            We never share your data with third parties
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Your Privacy{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Protected
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We built Telegram with a simple promise: your personal
                  conversations stay private. Our encryption ensures that only
                  you and the people you&aposre talking to can read what you
                  send.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>End-to-end encryption for all messages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>No ads and no tracking</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Open-source code for transparency</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span>Self-destructing messages option</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/20 py-12 backdrop-blur-sm">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-xl font-bold">Telegram</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                A new era of secure messaging. Fast, reliable, and private.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Feedback
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.38-3.87-1.38-.53-1.36-1.3-1.72-1.3-1.72-1.07-.74.08-.73.08-.73 1.18.08 1.8 1.22 1.8 1.22 1.05 1.79 2.75 1.27 3.42.97.11-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.09-.12-.3-.52-1.49.11-3.11 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.62.23 2.81.11 3.11.75.8 1.2 1.83 1.2 3.09 0 4.45-2.69 5.43-5.25 5.71.42.36.8 1.09.8 2.2v3.26c0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-6 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              This is a clone app of the cloud-based Telegram, created for
              educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
