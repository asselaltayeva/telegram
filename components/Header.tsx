"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-background/90 backdrop-blur-lg border-b border-border/50' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            href={isDashboard ? "/dashboard" : "/"} 
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-blue-600">
              Telegram
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Authenticated>
              {!isDashboard && (
                <Link href="/dashboard">
                  <Button 
                    className="rounded-full bg-blue-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}
              <div className="relative">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12 border-2 border-blue-300/50 hover:border-blue-400/70 transition-colors duration-300",
                      userButtonPopoverCard: "bg-background/80 backdrop-blur-md",
                      userButtonTrigger: "flex items-center justify-center"
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </Authenticated>

            <Unauthenticated>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                signUpForceRedirectUrl="/dashboard"
              >
                <Button 
                  variant="outline" 
                  className="rounded-full border-border/90 hover:bg-muted/50 transition-all"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                signUpForceRedirectUrl="/dashboard"
              >
                <Button 
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Join Now
                </Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>
      </div>

      {/* Add custom CSS to override Clerk's styles */}
      <style jsx>{`
        :global(.cl-userButtonBox) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        :global(.cl-userButtonTrigger) {
          width: 38px !important;
          height: 38px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        :global(.cl-avatarBox) {
          width: 38px !important;
          height: 38px !important;
          border-radius: 50% !important;
          border: 2px solid rgba(96, 165, 250, 0.5) !important;
          transition: border-color 0.3s ease !important;
        }
        :global(.cl-avatarBox:hover) {
          border-color: rgba(96, 165, 250, 0.7) !important;
        }
        :global(.cl-userButtonPopoverCard) {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: blur(12px) !important;
        }
        @media (prefers-color-scheme: dark) {
          :global(.cl-userButtonPopoverCard) {
            background: rgba(0, 0, 0, 0.8) !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;