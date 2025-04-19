import FeatureCard from '@/components/FeatureCard';
import TodoList from '@/constants/TodoList';
import styles from '@/styles/HowToBook.module.css';
import classNames from 'classnames';

type HowToBookProps = {
  id?: string;
};

export default function HowToBook({ id }: HowToBookProps): React.ReactElement {
  return (
    <section
      id={id}
      className={classNames(
        'bg-tw-background-ash text-tw-primary-black font-tw-body min-h-[724px] w-full',
        styles.root
      )}
    >
      <div className="grid grid-cols-3 gap-7 pt-[120px]">
        <div>
          <div className="col-start-2 flex flex-col gap-3">
            <h2 className="font-tw-display text-tw-h2 text-center font-bold">
              Things you need{' '}
              <span className="text-tw-primary-orange">to do</span>
            </h2>
            <p className="text-tw-p2 text-tw-light-gray mx-auto w-[482px] text-center leading-[32px]">
              We ensure that you'll embark on a perfectly planned, safe vacation
              at a price you can afford.
            </p>
          </div>
          <img className="my-auto" src="/assets/plane.svg" alt="Plane" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 lg:px-6 @xl/main:grid-cols-2 flex-wrap @5xl/main:grid-cols-4">
        {TodoList.map((item, index) => (
          <FeatureCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
