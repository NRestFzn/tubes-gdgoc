import React from "react";

type DestinationCardType = {
  imgSrc?: string;
  city: string;
  country: string;
  price: number;
  dayTrip: number;
  rating?: number;
  description?: string | "";
};

const DestinationCard: React.FC<DestinationCardType> = ({
  imgSrc,
  city,
  country,
  price,
  dayTrip,
  rating,
  description = "",
}): React.ReactElement => {
  return (
    <div className="rounded-[20px] border border-[#66666608] bg-white transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={
            imgSrc
              ? imgSrc
              : "https://images.unsplash.com/photo-1551376347-075b0121a65b?q=80&w=1000"
          }
          alt={`${country}, ${city}`}
          className="h-[232px] w-full rounded-lg object-cover"
        />
      </div>

      <div className="p-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#2D3134]">{`${country}, ${city}`}</h3>
          <p className="text-background-orange text-[16px] font-semibold">
            ${price}
          </p>
        </div>
        {description && (
          <p className="mt-2 mb-4 line-clamp-2 text-[14px] text-[#546179]">
            {description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/assets/navigation.svg" alt="Nav" className="h-2 w-2" />
            <span className="text-[14px] text-[#546179]">{dayTrip}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src="/assets/star.svg" alt="Star" className="h-2 w-2" />
            <span className="text-xs font-medium text-[#4A4A4A]">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
