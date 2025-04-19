import logo from '@/assets/mochi.jpg';

const PublicFooter: React.FC = (): React.ReactElement => {
  return (
    <footer className="bg-background-white w-full py-16">
      <div className="mx-auto grid max-w-[1170px] grid-cols-4 gap-8">
        <div>
          <div className="flex flex-row gap-1">
            <img className="h-[37px] w-[37px]" src={logo} alt="mochi-travel-logo" />
            <h3 className="text-h3 text-primary-black font-bold">Mochi Travel</h3>
          </div>
          <p className="text-light-gray mt-4">
            Book your trip in minute, get full control for much longer.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" className="bg-background-ash rounded-full p-2">
              <img
                src="/assets/facebook.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
            </a>
            <a href="#" className="bg-background-ash rounded-full p-2">
              <img
                src="/assets/instagram.svg"
                alt="Instagram"
                className="h-5 w-5"
              />
            </a>
            <a href="#" className="bg-background-ash rounded-full p-2">
              <img
                src="/assets/twitter.svg"
                alt="Twitter"
                className="h-5 w-5"
              />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-primary-black mb-6 font-bold">Company</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Mobile
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-primary-black mb-6 font-bold">Contact</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Help/FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Affiliates
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-primary-black mb-6 font-bold">More</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Airline Fees
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Airline
              </a>
            </li>
            <li>
              <a href="#" className="text-light-gray hover:text-primary-orange">
                Low Fare Tips
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-light-gray mx-auto mt-10 max-w-[1170px] border-t border-gray-200 pt-8 text-center">
        <p>© 2023 Trabook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default PublicFooter;
