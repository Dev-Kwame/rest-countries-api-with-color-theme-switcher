import React, {FC,ChangeEvent } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';




interface SearchBarProps{
    isDarkMode: boolean
    onSearch: (searchCountry: string) => void;
   
   
}

const SearchBar: FC<SearchBarProps> = ({isDarkMode, onSearch}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchCountry = event.target.value;
        onSearch(searchCountry);
    
    }



    return (
        <div className={` ${isDarkMode ? 'dark' : 'light'}`}>
        <div className='input-container' >
            <input type="text" className="countrySearch" placeholder="Search for a country..."  onChange={handleInputChange}/>
<br/>
           <div className='icon-container'>
            <FontAwesomeIcon className='searchicon' icon = {faMagnifyingGlass} size='xs'></FontAwesomeIcon>
            </div>
          
        </div>
        </div>
                     
      
        


        
)

}
export default SearchBar;