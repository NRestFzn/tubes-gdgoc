import React from "react";
import TestimonialsList from "@/constants/TestimonialList";
import TestimonialCard from "@/components/TestimonialCard";

const Testimonial: React.FC = (): React.ReactElement => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextTestimonial = () => {
    setActiveIndex(prev =>
      prev === TestimonialsList.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveIndex(prev =>
      prev === 0 ? TestimonialsList.length - 1 : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const next =
      activeIndex === TestimonialsList.length - 1 ? 0 : activeIndex + 1;
    return [
      { ...TestimonialsList[activeIndex], position: "top" },
      { ...TestimonialsList[next], position: "bottom" },
    ];
  };

  return (
    <section className="w-full bg-[#F7F8FC] py-16">
      <div className="mx-auto flex max-w-[1170px]">
        <div className="relative mx-auto flex max-w-[521px] flex-col items-start">
          <h2 className="text-h2 font-display text-left font-bold">
            What People Say{" "}
            <span className="text-primary-orange">About Us</span>
          </h2>
          <p className="text-light-gray text-p2 mx-auto mt-4 text-left">
            Our clients send us bunch of smilies with our services and we love
            them.
          </p>

          <div className="items-left mt-4 flex h-max justify-start gap-3">
            <button
              onClick={prevTestimonial}
              className="bg-background-white flex h-5 w-5 items-center justify-center rounded-full border border-[#999999]/50 transition hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <img
                className="h-2 w-2"
                src="/assets/arrow-gray.svg"
                alt="Arrow Left"
              />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-primary-orange flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-orange-600"
              aria-label="Next testimonial"
            >
              <img
                className="h-2 w-2"
                src="/assets/arrow-white.svg"
                alt="Arrow Right"
              />
            </button>
          </div>
        </div>

        <div className="relative mt-4 ml-[20px] flex justify-center">
          <div className="absolute -top-12 -right-16">
            <img src="assets\planes-ornament.svg" alt="Plane" />
          </div>
          <div className="mx-auto mb-8 max-w-md">
            {getVisibleTestimonials().map((data, index) => {
              return (
                <div
                  key={`${data.id}-${index}`}
                  className={`transform transition duration-300 ${
                    data.position === "top"
                      ? "relative z-20"
                      : "absolute -right-[50px] -bottom-[35px] z-10 opacity-50"
                  }`}
                >
                  <TestimonialCard {...data} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
