import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
            Lightbulb Rentals
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 max-w-3xl mx-auto">
            Camera, Lighting, and Production Supplies rental house that caters to
            Film, TV, Photo and Studio shoots in NYC, Philadelphia and Pittsburgh
            by teaching, building, and fostering community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="#"
              className="bg-teal text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-teal-hover transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/rental-inventory"
              className="bg-white border-2 border-teal text-teal px-8 py-4 rounded-md font-medium text-lg hover:bg-teal hover:text-white transition-colors"
            >
              View Inventory
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium">
              NYC
            </span>
            <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium">
              Philly
            </span>
            <span className="px-4 py-2 bg-gray-100 text-black rounded-full text-sm font-medium">
              Pittsburgh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

