
import React, { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';
import { Country} from './countriesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


interface CountryDetailsprops{
  isDarkMode: boolean;
  

}



const CountryDetails: React.FC<CountryDetailsprops> = ({isDarkMode, }) => {
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState<Country | null>(null);
  const [borderCountriesDetails, setBorderCountriesDetails] = useState<Country[]>([]);

  const navigate = useNavigate();
  
  //Fetching country details from RESTFUL API
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [data] = await response.json();
        setCountryDetails(data);
        
        // Fetch details of border countries
      if (Array.isArray(data.borders) && data.borders.length > 0) {
        await fetchBorderCountries(data.borders);
      }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     
    fetchData();
  }, [countryName]);

 //Fetching border country details from API
  const fetchBorderCountries = async (borderCountryCodes: string[]) => {
    try {
      const borderCountriesDetails = await Promise.all(
        borderCountryCodes.map(async (borderCode) => {
          const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
          const borderData = await borderResponse.json();
          return borderData[0];
        })
      );
  
      setBorderCountriesDetails(borderCountriesDetails);
    } catch (error) {
      console.error('Error fetching border countries:', error);
    }
  };

  

  


  if (!countryDetails) {
    return <p>Loading...</p>;
  }

 


  return (
    <div>
    <div>
      <button className={`back-button ${isDarkMode ? 'dark' : 'light'}`} onClick={() => navigate(-1)} ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }}/>Back</button>
      </div>
    <div className='center'>  
    <article className='country-details'>
       <div><img id ='flag' src={countryDetails.flags.svg} alt='Flag'/></div>
        <div >
          <h2 id='details-header'>{countryDetails.name.common}</h2>
          <div className='country-details-wrapper'>
        <div className='country-details-1'>
        
      <p><span>Native Name: </span> 
        {countryDetails.name.nativeName ? (countryDetails.name.nativeName[Object.keys(countryDetails.name.nativeName)[0]] && countryDetails.name.nativeName[Object.keys(countryDetails.name.nativeName)[0]].common) || ""
    : " "}</p>
      <p><span>Population:</span> {countryDetails.population.toLocaleString()}</p>
      <p><span>Region:</span> {countryDetails.region}</p>
      <p><span>Sub Region:</span> {countryDetails.subregion}</p>
      <p><span>Capital:</span> {countryDetails.capital}</p> 
      </div>
    <div className='country-details-2'>
    <p><span>Top Level Domain:</span>  {Array.isArray(countryDetails.tld) && countryDetails.tld.length > 0
    ? countryDetails.tld[0]
    : ''
  }
</p>
         <p><span>Currencies:</span>  {countryDetails.currencies?.[Object.keys(countryDetails.currencies)[0]]?.name || ''}</p>
          <p><span>Languages:</span> {Object.values(countryDetails.languages || {}).join(', ')}</p> 
          </div>
          </div>
          
          <p id='border'>
  <span>Border Countries: </span>
  {Array.isArray(borderCountriesDetails) && borderCountriesDetails.length > 0 ? (
  borderCountriesDetails
    .filter((borderCountry) => typeof borderCountry !== 'string' && borderCountry.name?.common) // Filter out strings and entries without full names
    .map((borderCountry) => (
    <Link key={borderCountry.name.common} to={`/country/${borderCountry.name.common}`}>
      <button
        key={borderCountry.cca3}
        className={`border-button ${isDarkMode ? 'dark' : 'light'}`}
      >
        {typeof borderCountry !== 'string' ? borderCountry.name.common : 'Country Name Unavailable'}
      </button>
      </Link>
    ))
) : (
  <em>{countryDetails.name.common} has no border countries</em>
)}

</p>

 
   
          </div>
       
       </article>
        </div>
        
    </div>
  );
};

export default CountryDetails;