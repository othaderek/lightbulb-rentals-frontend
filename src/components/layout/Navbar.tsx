"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close desktop dropdowns when toggling mobile menu
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const menuItems = [
    {
      label: "Rental Inventory",
      href: "/rental-inventory",
      dropdown: [
        "Cinema Cameras",
        "DSLR/ Mirrorless Camera Rentals",
        "Lighting Rentals",
        "Grip Rentals",
        "Photo Rentals",
        "Audio Rentals",
        "Production Supplies",
      ],
    },
    {
      label: "Services",
      href: "#",
      dropdown: [
        "New Equipment Sales",
        "Used Equipment Sales",
        "Shipping",
        "Equipment Delivery",
        "Vehicle Rental",
      ],
    },
    {
      label: "Studios",
      href: "#",
      dropdown: [
        "Explore Philly Studios",
        "Big Studio",
        "Express Studio",
        "Kitchen Film Studio",
      ],
    },
    {
      label: "Company",
      href: "#",
      dropdown: [
        "About Us",
        "How the Rental Process Works",
        "Insurance Coverage",
        "FAQs",
        "Instagram Feed",
        "Podcasts & Reading Material",
        "LGBT Artist Support",
      ],
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">Lightbulb Rentals</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <SearchBar />
            </div>
            
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative pb-2"
                onMouseEnter={() => !isMobileMenuOpen && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    className="text-black hover:text-teal transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                </div>
                {item.dropdown && openDropdown === item.label && !isMobileMenuOpen && (
                  <div
                    className="absolute top-full left-0 w-64 z-50 -mt-2 pt-2"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-100 visible translate-y-0 transition-all duration-200">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-black hover:bg-teal hover:text-white transition-colors"
                      >
                        {subItem}
                      </Link>
                    ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="#"
              className="bg-teal text-white px-6 py-2 rounded-md font-medium hover:bg-teal-hover transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white relative z-50">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search Bar */}
            <div className="pb-4 border-b border-gray-200">
              <SearchBar />
            </div>
            
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.dropdown && item.dropdown.length > 0 ? (
                  <>
                    <button
                      className="w-full text-left text-black font-medium py-2 flex items-center justify-between"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block w-full text-left text-black font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.dropdown && openDropdown === item.label && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem}
                        href="#"
                        className="block text-sm text-gray-700 hover:text-teal transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="#"
              className="block w-full bg-teal text-white px-6 py-3 rounded-md font-medium text-center hover:bg-teal-hover transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

