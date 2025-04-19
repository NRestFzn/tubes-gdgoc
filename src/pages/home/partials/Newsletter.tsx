type NewsletterProps = {
  id?: string;
};

const Newsletter: React.FC<NewsletterProps> = ( {id} ): React.ReactElement => {
  return (
    <section className="w-full bg-[#F7F8FC] py-[120px]" id={id}>
      <div className="bg-primary-orange relative mx-auto max-w-[1170px] rounded-xl p-12 text-center">
        <div className="absolute top-2 right-0">
          <img
            src="assets\white-coconut-tree-ornament.svg"
            alt="coconut tree"
          />
        </div>
        <div className="absolute bottom-0 left-0">
          <img src="assets\news-background-ornament.svg" alt="coconut tree" />
        </div>
        <h2 className="font-display text-h2 text-background-white mx-auto max-w-[650px] font-bold">
          Subscribe and get exclusive deals & offers
        </h2>
        <div className="mt-10 flex justify-center">
          <div className="relative w-[650px]">
            <img
              src="assets/email-icon.svg"
              className="absolute top-1/2 left-4 h-3 w-3 -translate-y-1/2 transform"
              alt="Email icon"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="text-content w-full rounded-lg bg-white px-6 py-4 pl-8"
            />
            <button 
              onClick={() => window.location.reload()} // or submit it to somewhere else
              className="cursor-pointer bg-primary-orange text-background-white absolute top-1/2 right-2 -translate-y-1/2 transform rounded-lg px-5 py-2 font-medium"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
