import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import EquipmentGrid from "@/components/landing/EquipmentGrid";
import Studios from "@/components/landing/Studios";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import About from "@/components/landing/About";
import Testimonials from "@/components/landing/Testimonials";
import Locations from "@/components/landing/Locations";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <EquipmentGrid />
        <Studios />
        <WhyChooseUs />
        <About />
        <Testimonials />
        <Locations />
      </main>
      <Footer />
    </div>
  );
}
