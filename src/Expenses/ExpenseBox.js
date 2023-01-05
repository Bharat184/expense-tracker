import styles from "./ExpenseBox.module.css";
import { useState, useEffect, useRef } from "react";
import ExpenseList from "./ExpenseList";
import BarChart from "../Chart/BarChart";

const ExpenseBox = (props) => {
  
    const yearRef=useRef();
    const {dataArr,deleteExpense}=props;
   
    const [year,setYear]=useState("all");
    const [filterArr,setFilterArr]=useState([]);
    const [yearArr,setYearArr]=useState([]);
    
   

    useEffect(()=>{
      
      
      if(year!=="all")
      {
        let filterItem=dataArr.filter((e)=>{
          return new Date(e.date).getFullYear().toString()===year;
        });
        setFilterArr([...filterItem]);
      }
      else
      {
        setFilterArr([...dataArr]);
      }
      let i=dataArr.map((e)=>{
        return new Date(e.date).getFullYear();
      })
      i=[...new Set(i)];
      setYearArr([...i]);
     

    },[year,dataArr]);

   function handleYear(i)
   {
    setYear(i);
   }

  return (
    <>
    
    <div className={styles["expense_box"]}>
      <div className={styles["filter_date"]}>
        <p>Filter by year </p>
        <select ref={yearRef} onChange={()=>{handleYear(yearRef.current.value)}}>
          {/* {yearArr.length===0 && <option>{new Date().getFullYear()}    </option>} */}
          <option>{year}</option>
          {year!=="all" && <option>all</option>}
          {yearArr.length>0 && yearArr.map((e,i)=>{
            if(e.toString()!==year)
            {
              
              return <option key={i}>{e}</option>;
            }
            return '';
           
          })}
        </select>
      </div>
        <BarChart data={filterArr}  />
        {filterArr.length===0 && <h1>No expense added.</h1>}
        {
          
          filterArr.length>0 && filterArr.map((e,i)=>{
            return <ExpenseList data={e} key={i} deleteExpense={deleteExpense} />;
          })
        }
      
    
      
    </div>
    </>
  );
};
export default ExpenseBox;
