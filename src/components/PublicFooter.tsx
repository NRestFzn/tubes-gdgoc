import logo from '@/assets/mochi.jpg';

const PublicFooter: React.FC = (): React.ReactElement => {
  return (
    <footer className="bg-background-white w-full py-3 pt-[100px]">
      <div className="mx-auto grid max-w-[1170px] grid-cols-4 gap-8">
        {/* Logo block */}
        <div>
          <div className="flex flex-row gap-1">
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="cursor-pointer flex flex-row gap-1 items-center"
            >
              <img className="h-[37px] w-[37px]" src={logo} alt="mochi-travel-logo" />
              <h3 className="text-h3 text-primary-black font-bold">Mochi Travel</h3>
            </button>
          </div>
          <p className="text-light-gray mt-4">
            Book your trip in minute, get full control for much longer.
          </p>
          <div className="mt-6 flex gap-4">
            <button type="button" className="cursor-pointer bg-background-ash rounded-full p-2">
              <img src="/assets/facebook.svg" alt="Facebook" className="h-5 w-5" />
            </button>
            <button type="button" className="cursor-pointer bg-background-ash rounded-full p-2">
              <img src="/assets/instagram.svg" alt="Instagram" className="h-5 w-5" />
            </button>
            <button type="button" className="cursor-pointer bg-background-ash rounded-full p-2">
              <img src="/assets/twitter.svg" alt="Twitter" className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Company links */}
        <div>
          <h4 className="text-primary-black mb-6 font-bold">Company</h4>
          <ul className="space-y-4">
            {['About', 'Careers', 'Mobile'].map((text) => (
              <li key={text}>
                <button
                  type="button"
                  className="cursor-pointer text-light-gray hover:text-primary-orange"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact links */}
        <div>
          <h4 className="text-primary-black mb-6 font-bold">Contact</h4>
          <ul className="space-y-4">
            {['Help/FAQ', 'Press', 'Affiliates'].map((text) => (
              <li key={text}>
                <button
                  type="button"
                  className="cursor-pointer text-light-gray hover:text-primary-orange"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* More links */}
        <div>
          <h4 className="text-primary-black mb-6 font-bold">More</h4>
          <ul className="space-y-4">
            {['Airline Fees', 'Airline', 'Low Fare Tips'].map((text) => (
              <li key={text}>
                <button
                  type="button"
                  className="cursor-pointer text-light-gray hover:text-primary-orange"
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-light-gray mx-auto mt-10 max-w-[1170px] border-t border-gray-200 pt-8 text-center">
        <p>© 2025 Mochi Travel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;