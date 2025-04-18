import DealCard from "@/components/DealCard";
import { useGetDestinations } from "@/hooks/useGetDestinations";
import { Destination as DestinationType } from "@/utils/types";
import React from "react";

const ExclusiveDeals: React.FC = (): React.ReactElement => {
  const { data, isLoading, isError } = useGetDestinations();

  return (
    <section className="bg-background-white text-primary-black font-body h-[960px] w-full">
      <h2 className="font-display text-h2 pt-[120px] text-center font-bold">
        Exclusive <span className="text-primary-orange">deals & discounts</span>
      </h2>
      <p className="text-p2 text-light-gray mx-auto mt-4 w-[433px] text-center leading-[32px]">
        Discover our fantastic early booking discounts & start planning your
        journey.
      </p>
      <div className="mx-auto mt-8 grid w-[1170px] grid-cols-4">
        {data?.map((item: DestinationType, index) => (
          <DealCard key={index} {...item} />
        ))}
      </div>
      <div className="mt-[71px] flex flex-row items-center justify-center gap-3">
        <button className="bg-background-white h-[40px] w-[40px] rounded-full border-[1px] border-[#999999]/50">
          <img
            className="mx-auto my-auto"
            src="/assets/arrow-gray.svg"
            alt="Arrow Left"
          />
        </button>
        <button className="bg-primary-orange h-[40px] w-[40px] rounded-full">
          <img
            className="mx-auto my-auto"
            src="/assets/arrow-white.svg"
            alt="Arrow Right"
          />
        </button>
      </div>
    </section>
  );
};

export default ExclusiveDeals;
