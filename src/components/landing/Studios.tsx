import Link from "next/link";

export default function Studios() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Explore Our Film Studios
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you're doing a music video, commercial, or photo shoot, we
              have studio spaces and equipment available that will fit your budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#"
                className="bg-teal text-white px-6 py-3 rounded-md font-medium hover:bg-teal-hover transition-colors text-center"
              >
                Get a Quote
              </Link>
              <Link
                href="#"
                className="bg-white border-2 border-teal text-teal px-6 py-3 rounded-md font-medium hover:bg-teal hover:text-white transition-colors text-center"
              >
                View Studios
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-500">Studio Image Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
}

