"use client";
import { useState } from "react";
import { Menu, X, Images, Users, Phone, TicketCheck , House } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: House, label: "Home", href: "/" },
    // { icon: TicketCheck , label: "Book Now", href: "#booking" },
    { icon: Images, label: "Gallery", href: "/gallery" },
    { icon: Phone, label: "Contact", href: "/contact" },
    { icon: Users, label: "Login", href: "/login" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-soft bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-black">
              TurfBook
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-14">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  className="transition-smooth flex items-center font-medium"
                  href={item.href}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="transition-bounce"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-medium flex flex-col md:flex-row gap-4 md:gap-0">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  variant="ghost"
                  size="sm"
                  href={item.href}
                  className="w-full justify-start transition-smooth hover:bg-primary/10 flex items-center cursor-pointer font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2 " />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;