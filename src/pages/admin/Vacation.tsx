import React from 'react';
import CountryCity from '../../lib/countries-cities.json';

const Countries: string[] = [];

for (let key in CountryCity['countries']) {
  Countries.push(key);
}

console.log(CountryCity['countries']['Indonesia']);

const Vacation = () => {
  return (
    <div>
      <h1>Yes</h1>
    </div>
  );
};

export default Vacation;
