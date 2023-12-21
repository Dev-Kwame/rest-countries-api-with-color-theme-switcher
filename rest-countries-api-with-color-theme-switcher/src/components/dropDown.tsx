import React, {FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';


interface DropDownProps{
    isDarkMode: boolean
    onRegionSelect: (region: string | null) => void;
    
    
}

const DropDown: FC<DropDownProps> = ({isDarkMode, onRegionSelect}) => {
   const[open, setOpen] = useState<boolean>(false)
   const handleOpen = () => {
    setOpen(!open);
   }

   const handleRegionSelect = (region: string) => {
    setOpen(false);
    onRegionSelect(region);
   
  };


    return (
        <div className='dropdown-container'>
            <div className={`dropdown ${isDarkMode ? 'dark' : 'light'}`}>
                <div className='drop'>
            <button className='dropdown-button' onClick={handleOpen}>
                Filter By Region
                <div><FontAwesomeIcon  icon = {faAngleDown}/></div>
            </button></div>
            {open ? (<ul className='continent-list'>
                <li className='continent'>
                    <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('')}>All</button>
                </li>
                <li className='continent'>
                    <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('Africa')}>Africa</button>
                </li>
                <li className='continent'>
                    <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('Americas')}>America</button>
                </li>
                <li className='continent'>
                    <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('Asia')}>Asia</button>
                </li>
                <li className='continent'>
                <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('Europe')}>Europe</button>
                </li>
                <li className='continent'>
                    <button className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}  onClick={() => handleRegionSelect('Oceania')}>Oceania</button>
                </li>
            </ul>) : null}
            
            </div>
        </div>
    )

}

export default DropDown;