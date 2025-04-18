import React from "react";

type DealCardType = {
  imgSrc?: string;
  city: string;
  country: string;
  rating?: number;
  price: number;
  discount: number | 0;
};

const DealCard: React.FC<DealCardType> = ({
  imgSrc,
  city,
  country,
  rating,
  price,
  discount,
}): React.ReactElement => {
  return (
    <>
      <div className="border-light-gray/8 bg-background-white drop-shadow-feature flex h-[426px] w-[270px] flex-col rounded-[8px] border-[2px]">
        <img
          className="rounded-[8px] h-36"
          src={
            imgSrc
              ? imgSrc
              : "https://images.unsplash.com/photo-1551376347-075b0121a65b?q=80&w=1000"
          }
          alt={`${city}, ${country}`}
        />
        <div className="mt-4 flex flex-row px-2">
          <p className="text-title font-medium">{city}</p>
          <div className="ml-auto flex flex-row items-center justify-end gap-1">
            <img className="h-2" src="/assets/star.svg" alt="Rating Icon's" />
            <p>{rating}</p>
          </div>
        </div>
        <div className="flex flex-row px-2">
          <div className="flex flex-row items-center gap-1">
            <img
              className="h-2"
              src="/assets/location-icon.svg"
              alt="Location Icon's"
            />
            <p className="text-light-gray text-content">{country}</p>
          </div>
          <div className="ml-auto flex flex-row items-center justify-end gap-2">
            <p className="text-content font-medium text-[#999999] line-through">
              {price}
            </p>
            <p className="text-content text-primary-orange rounded-lg bg-[#FFE7DB] px-1 py-0.5 font-semibold">
              {price - (discount * price) / 100}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealCard;
