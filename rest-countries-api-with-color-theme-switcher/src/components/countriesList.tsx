import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



 export interface Country {
    name: {
    common: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
   
  };

        flags: {
            svg: string;
            png: string;
          };
       
        population: number;
        region: string;
        capital: string;
        subregion: string;
        borders: string;
        tld: string;
        languages: {
          [key: string]: string;
        };
        currencies: {
          [key: string]: {
            name: string;
          
          };
        }[];
       
      
        }
        

   

      interface CountryListProps {
        isDarkMode: boolean;
        selectedRegion: string | null;
        searchCountry: string;
      
        
      
      }
      
     
      
  const CountryList: React.FC<CountryListProps> = ({isDarkMode, selectedRegion,searchCountry}) => {
    const [countries, setCountries] = useState<Country[]>([]);
   
  
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log('Data from API:', data);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
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
              <Link className='text' key={country.name.common} to={`/country/${encodeURIComponent(country.name.common)} `} >
              <div key={country.name.common }className={`countryItem ${isDarkMode ? 'dark' : 'light'}`}>
            <img src={country.flags.png} alt="Flag" className='countryImg'/>
             <li id='country-name'>{country.name.common}</li>
              <li><span>Population: </span>{country.population}</li>
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
