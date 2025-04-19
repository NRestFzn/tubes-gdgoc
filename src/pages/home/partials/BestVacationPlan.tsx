import VacationSlider from '@/components/VacationSlider';
import {useGetVacations} from '@/hooks/useGetVacations';
import {Spin} from 'antd';
import React from 'react';

const BestVacationPlan: React.FC = (): React.ReactElement => {
  const {data, isLoading, isError} = useGetVacations();

  return (
    <section
      id="destination"
      className="text-tw-primary-black font-tw-body w-full bg-[#FEFCFB] py-[120px]"
    >
      <div className="mx-auto max-w-[1170px]">
        <div className="relative mx-auto flex max-w-[521px] flex-col items-center">
          <h2 className="font-tw-display text-tw-h2 text-center font-bold">
            Best <span className="text-tw-primary-orange">vacation plan</span>
          </h2>
          <p className="text-tw-p2 text-tw-light-gray mx-auto mt-4 text-center leading-[32px]">
            Plan your perfect vacation with our travel agency. Choose among
            hundreds of all-inclusive offers!
          </p>
          <div className="absolute top-0 -right-16">
            <img src="/assets/coconut-tree-ornament.svg" alt="Plane" />
          </div>
        </div>

        {isError ? (
          'Error fetching data'
        ) : isLoading ? (
          <center className="mt-12">
            <Spin size="large" />
          </center>
        ) : (
          <div>
            {data ? <VacationSlider destinations={data} /> : 'Vacation Data'}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestVacationPlan;
