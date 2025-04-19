import DealSlider from '@/components/DealSlider';
import { useGetDestinations } from '@/hooks/useGetDestinations';
import { Spin } from 'antd';
import React from 'react';

type ExclusiveDealsProps = {
  id?: string;
};

const ExclusiveDeals: React.FC<ExclusiveDealsProps> = ({
  id,
}): React.ReactElement => {
  const { data, isLoading, isError } = useGetDestinations();

  return (
    <section
      id={id}
      className="bg-tw-background-white text-tw-primary-black font-tw-body w-full"
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
        {isError ? (
          'Error fetching data'
        ) : isLoading ? (
          <center className="mt-12">
            <Spin size="large" />
          </center>
        ) : (
          <div>
            {data ? <DealSlider deals={data} /> : 'Vacation Data'}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExclusiveDeals;
