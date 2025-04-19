type HeroBannerProps = {
  id?: string;
  onScroll?: () => void
};

export default function HeroBanner( {id, onScroll}: HeroBannerProps ) {
  return (
    <section
        id={id}
        className="bg-background-white text-primary-black h-[999px] w-full"
      >
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col justify-center items-center w-[760px] mt-auto">
            <h1 className="text-h1 font-display text-primary-black leading-[70px] font-bold w-[570px] pl-[33px]">
              Get started your exciting{" "}
              <span className="text-primary-orange">journey</span> with us.
            </h1>
            <p className="text-p1 text-light-gray font-body mt-[37px] w-[497px] leading-[40px]">
              A Team of experienced tourism professionals will provide you with
              the best advice and tips for your desire place.
            </p>
            <div className="flex w-[500px] justify-flex-start">
              <button 
                onClick={onScroll}
                className="cursor-pointer text-p2 border-primary-orange text-primary-orange hover:bg-primary-orange hover:text-background-white mt-[59px] h-[60px] w-[178px] rounded-[5px] border-1 font-medium transition-all duration-300 hover:border-none"
              >
                Discover Now
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-[760px]">
            <img src="/assets/jumbotron.svg" alt="Jumbotron" />
          </div>
        </div>
      </section>
  )
}