import DealCard from '@/components/DealCard';
import { useGetDestinations } from '@/hooks/useGetDestinations';
import { Destination as DestinationType } from '@/utils/types';
import React from 'react';

type ExclusiveDealsProps = {
  id?: string;
};

const ExclusiveDeals: React.FC<ExclusiveDealsProps> = ({
  id,
}): React.ReactElement => {
  const { data } = useGetDestinations();

  return (
    <section
      id={id}
      className="bg-tw-background-white text-tw-primary-black font-tw-body min-h-[960px] w-full"
    >
      <h2 className="font-tw-display text-tw-h2 pt-[120px] text-center font-bold">
        Exclusive{' '}
        <span className="text-tw-primary-orange">deals & discounts</span>
      </h2>
      <p className="text-tw-p2 text-tw-light-gray mx-auto mt-4 w-[433px] text-center leading-[32px]">
        Discover our fantastic early booking discounts & start planning your
        journey.
      </p>
      <div className="mx-auto mt-8 flex flex-wrap justify-center gap-6">
        {data?.map((item: DestinationType, index) => (
          <DealCard key={index} {...item} />
        ))}
      </div>
      <div className="mt-[71px] flex flex-row items-center justify-center gap-3">
        <button className="bg-tw-background-white h-[40px] w-[40px] rounded-full border-[1px] border-[#999999]/50">
          <img
            className="mx-auto my-auto"
            src="/assets/arrow-gray.svg"
            alt="Arrow Left"
          />
        </button>
        <button className="bg-tw-primary-orange h-[40px] w-[40px] rounded-full">
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
