
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import NavBar from "./components/navBar";
import './App.css';
import SearchBar from "./components/searchbar";
import ToggleButton from "./components/button";
import DropDown from "./components/dropDown";
import CountryList from "./components/countriesList";
import CountryDetails from './components/countriesDetails';





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
      borders: string[];
      tld: string;
      languages: {
        [key: string]: string;
      };
      currencies: {
        [key: string]: {
          name: string;
        
        };
      };
      cca3: string;
      
      
     
    
}



function App () {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchCountry, setSearchCountry] = useState<string>('');
    const [countries, setCountries] = useState<Country[]>([]);
    
 

  

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
     
        setCountries(data);
      
    
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };

    fetchData();
  }, []);






 

    useEffect(() => {
      document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
    }, [isDarkMode]);

    const toggleTheme  = () => {
      setIsDarkMode(!isDarkMode);
    };

    const handleRegionSelect = (region: string | null) => {
      setSelectedRegion(region);
    };   


  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}> 
    <div className='header'>
    <div className="navigate"><NavBar/></div>
    <div className="click-button"><ToggleButton isDarkMode={isDarkMode} onToggle={toggleTheme}/></div> 
    </div>

    <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <div className="flex">
                <div>
                  <SearchBar isDarkMode={isDarkMode} onSearch={setSearchCountry} />
                </div>
                <div className="dropdown-flex">
                  <DropDown isDarkMode={isDarkMode} onRegionSelect={handleRegionSelect} />
                </div>
              </div>
            
              <CountryList isDarkMode={isDarkMode} selectedRegion={selectedRegion} searchCountry={searchCountry}  countries={countries}/>
              
            </div>
          } />
          <Route path='/country/:countryName' element={<CountryDetails isDarkMode={isDarkMode}  countries={countries}/> } />
        </Routes>
      </Router>
     </div>
     
    
   

  
   
  );
}


export default App;