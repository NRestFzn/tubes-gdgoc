import styles from '@/styles/HeroBanner.module.css';
import classNames from 'classnames';

type HeroBannerProps = {
  id?: string;
  onScroll?: () => void;
};

export default function HeroBanner({id, onScroll}: HeroBannerProps) {
  return (
    <section
      id={id}
      className={classNames(
        'flex items-start justify-center bg-tw-background-white text-tw-primary-black h-[800px] w-full',
        styles.root
      )}
    >
      <div
        className={classNames(
          'flex items-center justify-center w-[1600px]',
          styles.heroContainer
        )}
      >
        <div className="w-[760px] mt-[50px]">
          <h1 className="text-[55px] font-tw-display text-tw-primary-black leading-[70px] font-bold w-[570px]">
            Get started your exciting{' '}
            <span className="text-tw-primary-orange">journey</span> with us.
          </h1>
          <p className="text-tw-p1 text-tw-light-gray font-body mt-[37px] w-[497px] leading-[40px]">
            A Team of experienced tourism professionals will provide you with
            the best advice and tips for your desire place.
          </p>
          <div
            className={classNames(
              'flex w-[500px] justify-flex-start',
              styles.buttonContainer
            )}
          >
            <button
              onClick={onScroll}
              className="cursor-pointer text-tw-p2 border-tw-primary-orange text-tw-primary-orange hover:bg-tw-primary-orange hover:text-tw-background-white mt-[59px] h-[60px] w-[178px] rounded-[5px] border-1 font-medium transition-all duration-300 hover:border-none"
            >
              Discover Now
            </button>
          </div>
        </div>
        <div
          className={classNames(
            'flex items-center justify-center w-[760px]',
            styles.heroImageContainer
          )}
        >
          <img src="/assets/jumbotron.svg" alt="Jumbotron" />
        </div>
      </div>
    </section>
  );
}
