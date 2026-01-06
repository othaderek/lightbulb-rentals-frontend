import Link from "next/link";

const navigationLinks = [
  { label: "Rental Inventory", href: "#" },
  { label: "Packages", href: "#" },
  { label: "Studios", href: "#" },
  { label: "Equipment Delivery", href: "#" },
  { label: "Rental Process", href: "#" },
];

const communityLinks = [
  { label: "Company", href: "#" },
  { label: "Instagram Feed", href: "#" },
  { label: "Podcasts & Reading Material", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "LGBT Artist Support", href: "#" },
];

const locations = [
  {
    city: "New York",
    phone: "(516) 515-1514",
    hours: "Mon-Fri 9 AM-5 PM",
  },
  {
    city: "Philadelphia",
    phone: "(215) 687-9394",
    hours: "Mon-Fri 9 AM-5 PM",
  },
  {
    city: "Pittsburgh",
    phone: "(412) 212-0822",
    hours: "Mon-Fri 9 AM-5 PM",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Lightbulb Rentals</h3>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">HOME</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold mb-4">OUR COMMUNITY</h4>
            <ul className="space-y-2">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTACT US</h4>
            <div className="space-y-4">
              {locations.map((location) => (
                <div key={location.city}>
                  <p className="font-medium">{location.phone}</p>
                  <p className="text-gray-400 text-sm">{location.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              ©2025 Lightbulb Grip and Electric Co, DBA Lightbulb Rentals. All
              Rights Reserved.
            </p>
            <p className="text-gray-400 text-sm">
              This site uses cookies for Google Analytics tracking.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

