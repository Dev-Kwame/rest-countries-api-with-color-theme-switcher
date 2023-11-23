import React, {FC} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon as regularMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon as solidMoon } from '@fortawesome/free-solid-svg-icons';






interface ToggleButtonProps {
  onToggle: () => void;
  isDarkMode: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({ onToggle, isDarkMode }) => {

  const handleToggle = () => {
    // Call the onToggle function passed from App.js
    onToggle();
  };  

 const moonIcon = isDarkMode ? solidMoon : regularMoon;

    return(
        <div>
          <button className= {`ThemeButton ${isDarkMode ? 'dark' : 'light'}`} onClick={handleToggle}>
          <FontAwesomeIcon className='themeicon' icon = {moonIcon} size='lg'></FontAwesomeIcon>
            <span className={`theme-button-text ${isDarkMode ? 'dark' : 'light'}`}>Dark Mode</span>
         </button>
          </div> 
       
    )

}

export default ToggleButton;