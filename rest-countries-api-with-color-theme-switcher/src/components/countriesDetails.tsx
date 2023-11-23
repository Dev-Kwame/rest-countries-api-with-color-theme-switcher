
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Country} from './countriesList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface CountryDetailsprops{
  isDarkmode: boolean
}



const CountryDetails: React.FC<CountryDetailsprops> = (isDarkMode) => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState<Country | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [data] = await response.json();
        setCountryDetails(data);

    

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryName]);

  


  if (!countryDetails) {
    return <p>Loading...</p>;
  }



  return (
    <div>
    <div><button className={`back-button ${isDarkMode ? 'dark' : 'light'}`} ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }}/>Back</button></div>

    <article className='country-details'>
       <div><img id ='flag' src={countryDetails.flags.svg} alt='Flag'/></div>
        <div >
          <h2 id='details-header'>{countryDetails.name.common}</h2>
          <div className='country-details-wrapper'>
        <div className='country-details-1'>
      <p><span>Native Name:</span> {countryDetails.name.nativeName[Object.keys(countryDetails.name.nativeName)[0]].common}</p>
      <p><span>Population:</span>{countryDetails.population}</p>
      <p><span>Region:</span> {countryDetails.region}</p>
      <p><span>Sub Region:</span> {countryDetails.subregion}</p>
      <p><span>Capital:</span> {countryDetails.capital}</p> 
      </div>
    <div className='country-details-2'>
    <p><span>Top Level Domain:</span> {countryDetails.tld[0]}</p>
    <p><span>Currencies:</span> {Array.isArray(countryDetails.currencies) ? (
            countryDetails.currencies.map((currency) => currency.name).join(', ')
          ) : (
            // If 'currencies' is an object, you might want to extract its values
            Object.values(countryDetails.currencies as { [key: string]: { name: string; symbol: string; }; })
              .map((currency) => currency.name)
              .join(', ')
          )}</p>
          <p><span>Languages:</span> {Object.values(countryDetails.languages || {}).join(', ')}</p> 
          </div>
          </div>
          
          <p id='border'> <span>Border Countries:</span> {countryDetails.borders}</p> 
   
          </div>
       
       </article>
        
        
    </div>
  );
};

export default CountryDetails;