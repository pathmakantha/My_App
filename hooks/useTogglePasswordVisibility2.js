import React, {useState} from "react";

export const useTogglePasswordVisibility2 = () => {
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [rightIcon2, setRightIcon] = useState('eye');

  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility2(!passwordVisibility2);
    } else if (rightIcon2 === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility2(!passwordVisibility2);
    }
  };
  

  return {
    passwordVisibility2,
    rightIcon2,
    handlePasswordVisibility2
  };
};