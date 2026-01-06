const features = [
  {
    title: "Deep Values",
    description:
      "Our team is committed to supporting passion projects, encouraging young crew members, and creating space for women, LGBTQIA+, and minority filmmakers. Because of that, we build community by offering free classes, discount deals, and professional connections to grow careers.",
  },
  {
    title: "Meticulous Equipment",
    description:
      "Our rental and warehouse teams are paperless, digitized, and optimized to offer the easiest rental experience possible, and zero headaches. Many of our customers are repeat-renters because of our high-quality service.",
  },
  {
    title: "Enthusiastic Service",
    description:
      "Lightbulb is here for you. First, we answer our phones 24/7. Second, we dig up thorough answers for customer gear questions. Third, our vans deliver equipment across four states. We provide top-quality crew that's as diverse as the communities we serve.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Why Choose Us
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

