
import {BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import React, {useState, useEffect} from "react";
import NavBar from "./components/navBar";
import './App.css';
import SearchBar from "./components/searchbar";
import ToggleButton from "./components/button";
import DropDown from "./components/dropDown";
import CountryList from "./components/countriesList";
import CountryDetails from "./components/countriesDetails";





function App () {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchCountry, setSearchCountry] = useState<string>('');

    

 

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
              <CountryList isDarkMode={isDarkMode} selectedRegion={selectedRegion} searchCountry={searchCountry} />
            </div>
          } />
          <Route path='/country/:countryName' element={<CountryDetails isDarkmode />} />
        </Routes>
      </Router>
     </div>
     
    
   

  
   
  );
}

export default App;
