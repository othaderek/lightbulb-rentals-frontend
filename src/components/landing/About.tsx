import Link from "next/link";

export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
            <span className="text-gray-500">About Image Placeholder</span>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Lightbulb Rentals is a Camera, Lighting, and Production Supplies
              rental house that caters to small-to-medium size shoots in NYC,
              Philadelphia, and Pittsburgh. We do this by teaching, building, and
              encouraging a community of independent filmmakers from diverse
              backgrounds.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              We're big supporters of offering equitable opportunities to women,
              LGBT, and marginalized community members, and helping get passion
              projects off the ground.
            </p>
            <Link
              href="#"
              className="text-teal hover:text-teal-hover font-medium"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}