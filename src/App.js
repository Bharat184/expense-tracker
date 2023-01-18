import './App.css';
import React from 'react';

import AuthForm from './Form/AuthForm'
import ExpenseForm from './Form/AddExpense';
import ExpenseBox from './Expenses/ExpenseBox';
import {ExpenseContext} from "./Context/Context";
import Alert from './Alert/Alert';
import Loading from './Alert/Loading';

function App() {
 
  return (
    <ExpenseContext>
      <div className='xyz'>
        <Alert />
        <Loading />
        <AuthForm />
        <ExpenseForm   />
        <ExpenseBox  />
      </div>
    </ExpenseContext>
  );

}

export default App;
