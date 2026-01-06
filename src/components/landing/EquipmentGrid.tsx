import Link from "next/link";

const equipmentCategories = [
  {
    name: "Cinema Cameras",
    description: "Professional cinema camera bodies and lenses",
    href: "#",
  },
  {
    name: "Lighting",
    description: "Lamps, modifiers, and electric equipment",
    href: "#",
  },
  {
    name: "Grip",
    description: "Stands, dollies, and rigging equipment",
    href: "#",
  },
  {
    name: "Audio",
    description: "Recorders, microphones, and audio accessories",
    href: "#",
  },
  {
    name: "Photo",
    description: "DSLR cameras and photo lighting",
    href: "#",
  },
  {
    name: "Production Supplies",
    description: "Expendables and production equipment",
    href: "#",
  },
];

export default function EquipmentGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Camera Rental Equipment
          </h2>
          <Link
            href="/rental-inventory"
            className="text-teal hover:text-teal-hover font-medium"
          >
            View All Camera Departments →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentCategories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-teal hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-teal transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-700">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

