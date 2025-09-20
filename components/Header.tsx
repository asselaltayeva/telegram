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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-background/80 backdrop-blur-md border-b border-border/50' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            href={isDashboard ? "/dashboard" : "/"} 
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all">
              Telegram
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Authenticated>
              {!isDashboard && (
                <Link href="/dashboard">
                  <Button 
                    className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  >
                    Dashboard
                  </Button>
                </Link>
              )}
              <div className="border-l border-border/40 h-6 mx-2"></div>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-border/30",
                    userButtonPopoverCard: "bg-background/80 backdrop-blur-md"
                  }
                }}
              />
            </Authenticated>

            <Unauthenticated>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/dashboard"
                signUpForceRedirectUrl="/dashboard"
              >
                <Button 
                  variant="outline" 
                  className="rounded-full border-border/60 hover:bg-muted/50 transition-all"
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
    </header>
  );
}

export default Header;