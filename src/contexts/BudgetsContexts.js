import React, {useContext, useState} from "react";
import {v4 as uuid4} from 'uuid';

const BudgetContext = React.createContext();

export function useBudgets() {
    return useContext(BudgetContext);
}

export const BudgetProvider = ({children}) => {
    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([]);

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuid4(), description, amount, budgetId}]
        });
    }

    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuid4(), name, max}]
        });
    }

    function deleteBudget({id}) {
        //TODO: Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        });
    }

    function deleteExpense({id}) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        });
    }

    return (
        <BudgetContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addBudget,
            addExpense,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetContext.Provider>
    );
}