"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Chris Lind",
    quote:
      "Lightbulb is an excellent rental house. I am a freelance DP and Gaffer. The staff there is always very easy to work with and accommodating. I've shot several features using their equipment and everything is always very well maintained and clean in working condition.",
  },
  {
    name: "Greg Starr",
    quote:
      "Superb customer service. They worked with us and our tight budget to make a package that would work for our needs. Highly recommend!",
  },
  {
    name: "Evan Williams",
    quote:
      "The personal attention and great selection means I couldn't recommend Lightbulb highly enough. Great team, great gear, and a great experience overall. I'd recommend them to anyone.",
  },
  {
    name: "Dustin Ward",
    quote:
      "Lightbulb Grip focuses on the customer experience, making themselves available for any questions if you run into a snag on set. They also provide free education to local filmmakers. Definitely recommend!",
  },
  {
    name: "Brandon Ripley",
    quote:
      "Adam and his crew at Lightbulb are professional and courteous. They have always been super helpful and reliable in terms of service and the quality of gear they rent.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What our clients have to say
          </h2>
          <p className="text-gray-700">It's all 5-star reviews, on every review site.</p>
        </div>
        <div className="relative">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-teal"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-6">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="font-bold text-black">— {testimonials[currentIndex].name}</p>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-white border-2 border-teal text-teal w-12 h-12 rounded-full flex items-center justify-center hover:bg-teal hover:text-white transition-colors"
              aria-label="Previous testimonial"
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
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white border-2 border-teal text-teal w-12 h-12 rounded-full flex items-center justify-center hover:bg-teal hover:text-white transition-colors"
              aria-label="Next testimonial"
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
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-teal" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

