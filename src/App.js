import './App.css';
import {useState,useEffect} from 'react';

import ExpenseForm from './Form/AddExpense';
import ExpenseBox from './Expenses/ExpenseBox';
function App() {

  


 

 
  const [data,setData]=useState([]);

  
 

 function addExpense(obj)
 {
  obj={id:Math.random().toString(),...obj};
  let arr=data;
  arr=[...arr,obj];
  setData([...arr]);
  localStorage.setItem('item',JSON.stringify(arr));
 }

 function deleteExpense(id)
 {
  let flag=window.confirm("Are you sure you want to remove?");
  if(flag)
  {
    let arr=data;
    arr=arr.filter((e)=>e.id!==id);
    localStorage.setItem('item',JSON.stringify(arr));
    setData([...arr]);
  }
 }

  useEffect(()=>{
    let item=localStorage.getItem('item');
   
    if(item!==null)
    {
      item=JSON.parse(item);
      setData([...item]);
    }
  
  },[])
  return (
    <>
      <div className='xyz'>
        <ExpenseForm  addExpense={addExpense} />
        <ExpenseBox dataArr={data}  deleteExpense={deleteExpense} />
      </div>
    </>
  );

}

export default App;
