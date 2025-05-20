import React, { createContext } from 'react';

export interface FormIsOpenedContextValue {
    isOpened: boolean;
    toggleIsOpened: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export const FormIsOpenedContext = createContext<FormIsOpenedContextValue>(
    {isOpened: false, toggleIsOpened: null}
);