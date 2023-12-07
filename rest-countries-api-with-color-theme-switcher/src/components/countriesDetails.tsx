import React  from 'react';
import { useParams } from 'react-router-dom';
import { Country } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';














interface CountryDetailsprops{ 
  isDarkMode: boolean;
  countries: Country[];

 

}


const CountryDetails: React.FC<CountryDetailsprops> = ({isDarkMode, countries}) => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();
 

  


   // Find the selected country based on 'countryName'
   const decodedCountryName = decodeURIComponent(countryName || ''); // Default to an empty string if countryName is undefined
 

   const selectedCountry = countries.find((country) => country.name.common === decodedCountryName);
  

   if (selectedCountry) {
   } else {
     console.error('Country not found');
   }
   if (!selectedCountry) {
     return <div>Country not found</div>;
   }
  
  

const getFullNameByCode = (code: string, countries: Country[]) => {
  const country = countries.find((c) => c.cca3 === code);
  return country ? country.name.common : code;
};

const handleBorderClick = (borderCode: string) => {
  const borderCountry = countries.find((country) => country.cca3 === borderCode);

  if (borderCountry) {
    navigate(`/country/${encodeURIComponent(borderCountry.name.common)}`);
  } else {
    console.error('Border country not found');
  }
};


  return(
    <div>
<div>
  <button className={`back-button ${isDarkMode ? 'dark' : 'light'}`} onClick={() => navigate(-1)} ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }}/>Back</button>
  </div>
<div className='center'>  
<article className='country-details'>
   <div><img id ='flag' src={selectedCountry.flags.svg} alt='Flag'/></div>
    <div >
      <h2 id='details-header'>{selectedCountry.name.common}</h2>
      <div className='country-details-wrapper'>
    <div className='country-details-1'>
    <p><span>Native Name:</span> {selectedCountry?.name?.nativeName
    ? selectedCountry.name.nativeName[Object.keys(selectedCountry.name.nativeName)[0]].common
    : ''
  }</p>
  <p><span>Population:</span> {selectedCountry?.population?.toLocaleString() || ''}</p>
  <p><span>Region:</span> {selectedCountry?.region || ''}</p>
  <p><span>Sub Region:</span> {selectedCountry?.subregion || ''}</p>
  <p><span>Capital:</span> {selectedCountry?.capital || ''}</p>
  </div>
<div className='country-details-2'>
<p><span>Top Level Domain:</span> {selectedCountry?.tld
    ? Array.isArray(selectedCountry.tld) && selectedCountry.tld.length > 0
      ? selectedCountry.tld[0]
      : ''
    : ''
  }</p>
  <p><span>Currencies:</span> {selectedCountry?.currencies
    ? Array.isArray(selectedCountry.currencies)
      ? selectedCountry.currencies.map((currency) => currency.name).join(', ')
      : Object.values(selectedCountry.currencies as { [key: string]: { name: string; symbol: string; }; })
          .map((currency) => currency.name)
          .join(', ')
    : ''
  }</p>
  <p><span>Languages:</span> {selectedCountry?.languages
    ? Object.values(selectedCountry.languages).join(', ')
    : ''
  }</p>      </div>
      </div>

    
      <p id='border'>  
      <span>Border Countries: </span>
  {selectedCountry?.borders?.length > 0 ? (
    selectedCountry.borders.map((borderCode, index) => (
    
        <button key={index} className='border-button' onClick={() => handleBorderClick(borderCode)}>
        {getFullNameByCode(borderCode, countries)}
        </button>
     
    ))
  ) : (
    <em>{selectedCountry.name.common} has no border countries</em>
  )}
</p>
      </div>

   </article>

    </div>



    </div>
  )
 
    

};

export default CountryDetails;