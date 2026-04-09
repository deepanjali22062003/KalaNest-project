import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, User, X, Menu } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { totalItems } = useCart();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(36,100%,97%)" }}>
      {/* Announcement Bar */}
      <div
        className="text-center py-2 px-4 text-sm font-medium"
        style={{
          background: "linear-gradient(to right, #ff9a9e, #fda085)",
          color: "#4a2c2a",
        }}
      >
        Proudly supporting the skilled artisans of Banjara Community 🌸
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b"
        style={{ borderColor: "hsl(30,30%,85%)", boxShadow: "0 2px 12px rgba(180,95,6,0.08)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div
              className="flex items-center gap-1"
              style={{ color: "#b45f06" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C10.477 4 6 8.477 6 14c0 3.5 1.8 6.6 4.5 8.5L16 28l5.5-5.5C24.2 20.6 26 17.5 26 14c0-5.523-4.477-10-10-10z" fill="#b45f06" opacity="0.15"/>
                <path d="M16 8c-3.314 0-6 2.686-6 6 0 2.1 1.08 3.96 2.7 5.1L16 22l3.3-2.9C20.92 17.96 22 16.1 22 14c0-3.314-2.686-6-6-6z" fill="#b45f06" opacity="0.5"/>
                <circle cx="16" cy="14" r="3" fill="#b45f06"/>
              </svg>
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                KalaNest
              </span>
            </div>
          </Link>

          {/* Nav - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[#b45f06] relative group"
                style={{ color: location === link.href ? "#b45f06" : "#555" }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-200"
                  style={{
                    background: "#b45f06",
                    width: location === link.href ? "100%" : "0%",
                  }}
                />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium hover:text-[#b45f06]"
              style={{ color: "#555" }}
              onClick={() => setLoginOpen(true)}
            >
              <User className="w-4 h-4" />
              Login
            </Button>

            <Link href="/cart" className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-[#b45f06] hover:bg-orange-50"
                style={{ color: "#555" }}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    style={{ background: "#b45f06", fontSize: "10px" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3" style={{ borderColor: "hsl(30,30%,85%)" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium py-1 transition-colors hover:text-[#b45f06]"
                style={{ color: location === link.href ? "#b45f06" : "#555" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="justify-start p-0 text-sm font-medium hover:text-[#b45f06]"
              style={{ color: "#555" }}
              onClick={() => { setLoginOpen(true); setMobileMenuOpen(false); }}
            >
              <User className="w-4 h-4 mr-1.5" />
              Login
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer style={{ background: "#2f2f2f", color: "white" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold" style={{ color: "#fda085" }}>KalaNest</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Handcrafted ceramic and home decor items, sourced directly from local artisans of the Banjara Community.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-[#fda085] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <p>kalanest.0@gmail.com</p>
              <p>+91 8306399276</p>
              <p className="mt-2 text-gray-500">Banjara Market, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
          © 2026 KalaNest | Handmade • Sustainable • Local
        </div>
      </footer>

      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold" style={{ color: "#b45f06" }}>
              Welcome Back
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
            </div>
            <Button
              className="w-full font-semibold text-white"
              style={{ background: "#b45f06" }}
              onClick={() => setLoginOpen(false)}
            >
              Login
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Don't have an account?{" "}
              <span className="cursor-pointer hover:underline" style={{ color: "#b45f06" }}>Sign up</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
