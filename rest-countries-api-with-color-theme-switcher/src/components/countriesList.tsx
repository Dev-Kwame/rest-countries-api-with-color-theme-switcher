import React from 'react';
import { Link } from 'react-router-dom';
import { Country } from '../App';







       


      interface CountryListProps {
        isDarkMode: boolean;
        selectedRegion: string | null;
        searchCountry: string;
        countries: Country[];
      
      }
  


      
      
     
      
  const CountryList: React.FC<CountryListProps> = ({isDarkMode, selectedRegion,searchCountry, countries}) => {
    
 
  
  const filteredCountries = countries.filter((country) => {
    const matchesRegion = selectedRegion && selectedRegion !== 'all'
      ? country.region === selectedRegion
      : true;

    const matchesSearchCountry = country.name.common.toLowerCase().includes(searchCountry.toLowerCase());

    return matchesRegion && matchesSearchCountry;
  });


 
  


  return (
    
        <div className='country-card'>
          
      <ul className='country-grid'>
     
            {filteredCountries.map((country) =>(
            <Link className='text' key={country.name.common} to={`/country/${encodeURIComponent(country.name.common)}` } 
       > 
              <div key={country.name.common }className={`countryItem ${isDarkMode ? 'dark' : 'light'}`}  >
            <img src={country.flags.png} alt="Flag" className='countryImg'/>
             <li id='country-name'>{country.name.common}</li>
              <li><span>Population: </span>{country.population.toLocaleString()}</li>
              <li><span>Region:</span> {country.region}</li>
              <li><span>Capital: </span>{country.capital}</li>  

            
              
            </div> 
           </Link>
        ))}
      </ul>
    
      </div>
   
  );
};

export default CountryList;
