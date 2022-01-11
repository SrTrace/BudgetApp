import React from "react";

const BudgetContext = React.createContext();

export function useBudgets() {

}

export const BudgetProvider = ({children}) => {
    return children;
}