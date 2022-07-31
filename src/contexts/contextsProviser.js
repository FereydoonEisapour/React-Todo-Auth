import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
    theme: false
};

export const ContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);
 

    const setMode = (e) => {
        setTheme(e.target.value);
        localStorage.setItem('theme', e.target.value);
    };



   // const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider value={{   initialState,  setTheme, setMode, theme}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
