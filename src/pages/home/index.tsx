import * as React from "react";
import FeatureCard from "@/components/FeatureCard";
import TodoList from "@/constants/TodoList";
import BestVacationPlan from "./partials/BestVacationPlan";
import ExclusiveDeals from "./partials/ExclusiveDeals";
import Testimonial from "./partials/Testimonial";
import Newsletter from "./partials/NewsLetter";

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <>
      <section
        id="home"
        className="bg-background-white text-primary-black h-[999px] w-full"
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-[521px] mt-auto ml-[120px]">
            <h1 className="text-h1 font-display text-primary-black leading-[70px] font-bold">
              Get started your exciting{" "}
              <span className="text-primary-orange">journey</span> with us.
            </h1>
            <p className="text-p1 text-light-gray font-body mt-[37px] w-[497px] leading-[40px]">
              A Team of experienced tourism professionals will provide you with
              the best advice and tips for your desire place.
            </p>
            <button className="text-p2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-background-white mt-[59px] h-[60px] w-[178px] rounded-[5px] border-1 font-medium transition-all duration-300 hover:border-none">
              Discover Now
            </button>
          </div>
          <div className="col-span-[785px]">
            <img src="/assets/jumbotron.svg" alt="Jumbotron" />
          </div>
        </div>
      </section>
      <section className="bg-background-ash text-primary-black font-body h-[724px] w-full">
        <div className="grid grid-cols-3 gap-7 pt-[120px]">
          <div className="col-start-2 flex flex-col gap-3">
            <h2 className="font-display text-h2 text-center font-bold">
              Things you need <span className="text-primary-orange">to do</span>
            </h2>
            <p className="text-p2 text-light-gray mx-auto w-[482px] text-center leading-[32px]">
              We ensure that you'll embark on a perfectly planned, safe vacation
              at a price you can afford.
            </p>
          </div>
          <img className="my-auto" src="/assets/plane.svg" alt="Plane" />
        </div>
        <div className="mx-auto grid max-w-[1170px] grid-cols-3 gap-[30px] pt-8">
          {TodoList.map((item, index) => (
            <FeatureCard key={index} {...item} />
          ))}
        </div>
      </section>
      <ExclusiveDeals />

      <BestVacationPlan />

      <Testimonial />

      <Newsletter />
    </>
  );
};

export default HomePage;
