import React, { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
    const [focus, setFocus] = useState(false);
    const [reset, setReset] = useState(false);
    const [inputContent, setInputContent] = useState();
    const [inputRichContent, setInputRichContent] = useState();

    return (
        <InputContext.Provider value={{ focus, setFocus, inputContent, setInputContent, inputRichContent, setInputRichContent, reset, setReset }}>
            { children }
        </InputContext.Provider>
    );
}