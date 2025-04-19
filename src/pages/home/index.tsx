import * as React from "react";
import BestVacationPlan from "./partials/BestVacationPlan";
import ExclusiveDeals from "./partials/ExclusiveDeals";
import Testimonial from "./partials/Testimonial";
import Newsletter from "./partials/Newsletter";
import HowToBook from "./partials/howToBook";
import HeroBanner from "./partials/HeroBanner";

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <>
      <HeroBanner id="home" onScroll={() => {
        document.querySelector("#subscribe")?.scrollIntoView({ behavior: "smooth" });
      }}/>

      <HowToBook/>
      
      <ExclusiveDeals />

      <BestVacationPlan />

      <Testimonial />

      <Newsletter id="subscribe"/>
    </>
  );
};

export default HomePage;
