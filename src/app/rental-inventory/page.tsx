import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DEPARTMENTS } from "@/lib/data/departments";

export default function RentalInventoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Rental Inventory
            </h1>
            <p className="text-gray-700">
              Browse our equipment by department
            </p>
          </div>

          {/* Department Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((department) => (
              <Link
                key={department.id}
                href={`/rental-inventory/${department.slug}`}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal transition-all duration-200 h-full">
                  <h2 className="text-xl font-bold text-black mb-2 group-hover:text-teal transition-colors">
                    {department.name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {department.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


