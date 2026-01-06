const locations = [
  {
    city: "New York",
    address: "1027 Grand Street – Unit #133",
    cityState: "Brooklyn, New York 11211",
    phone: "(516) 515-1514",
    description:
      "Lightbulb Rentals New York City is our flagship location for Lighting equipment, Grip, Rigging, Expendables, and Production supplies.",
  },
  {
    city: "Philadelphia",
    address: "4562 Worth Street",
    cityState: "Philadelphia, PA 19124",
    phone: "(215) 687-9394",
    description:
      "Lightbulb Rentals Philadelphia is a one-stop shop for Film Productions, TV shows, Commercials, and Studio shoots.",
  },
  {
    city: "Pittsburgh",
    address: "1917 Brownsville Road",
    cityState: "Pittsburgh, PA 15210",
    phone: "(412) 212-0822",
    description:
      "Lightbulb Rentals Pittsburgh services productions from large to small. They help Pittsburgh's Photographers, Cinematographers, and Directors access the camera and lighting tools they need.",
  },
];

export default function Locations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Explore our Locations
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location) => (
            <div
              key={location.city}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-2xl font-bold text-black mb-4">
                Lightbulb Rentals {location.city}
              </h3>
              <p className="text-gray-700 mb-4">{location.description}</p>
              <div className="space-y-2 text-gray-700">
                <p>{location.address}</p>
                <p>{location.cityState}</p>
                <p className="text-teal font-medium">{location.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

