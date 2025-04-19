import React from 'react';

type FeatureCardType = {
  iconSrc: string;
  imgBackground: string;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardType> = ({
  iconSrc,
  imgBackground,
  title,
  description,
}): React.ReactElement => {
  return (
    <>
      <div
        className={`bg-tw-background-white drop-shadow-feature border-tw-light-gray/8 flex h-[278px] w-[370px] flex-col rounded-[8px] border-[2px] p-5`}
        style={{
          backgroundImage: imgBackground ? `url(${imgBackground})` : 'none',
        }}
      >
        <img src={iconSrc} alt={title} className="mr-auto h-[48px]" />
        <h3 className="text-tw-h3 font-tw-body text-tw-primary-black mt-6 font-semibold">
          {title}
        </h3>
        <p className="text-tw-content text-tw-light-gray mt-2">{description}</p>
      </div>
    </>
  );
};

export default FeatureCard;
