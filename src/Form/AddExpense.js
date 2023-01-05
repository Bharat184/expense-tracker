import { useState } from 'react';
import styles from './AddExpense.module.css';

const AddExpense=(props)=>{
    const {addExpense}=props;
    const [inputData,setInputData]=useState({title:'',price:'',date:''});
    const [toggle,setToggle]=useState(false);

    function handleChange(e)
    {
        // setInputData({...inputData,[e.target.name]:e.target.value});
        setInputData((d)=>{
            return {...d,[e.target.name]:e.target.value};
        })
       
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if(inputData.title && inputData.price && inputData.date)
        {
            addExpense(inputData);
            let obj={title:'',price:'',date:''};
            setInputData(obj);
        }
        else
        {
            alert("Input field can't be empty");
        }
        
    }

    return (
        <div className={styles.formContainer}>
            {toggle?(<form onSubmit={handleSubmit}>
            <div className={styles.formBox}>
                <label>Enter product name</label>
                <input type="text" name="title" onChange={handleChange} value={inputData.title} />
            </div>
            <div className={styles.formBox}>
                <label>Enter price</label>
                <input type="number" name="price" onChange={handleChange} value={inputData.price} />
            </div>
            <div className={styles.formBox}>
                <label>Select date</label>
                <input type="date" name="date" onChange={handleChange} value={inputData.date} />
            </div>
            <div>
            <input type="submit" value="Add expense" />
            <input type="button" value="Cancel" onClick={()=>{setToggle((t)=>!t)}}/>
            </div>
        </form>):(<button className={styles.main_btn} onClick={()=>{setToggle((t)=>!t)}}>Add expense</button>)}
        </div>

    );
}
export default AddExpense;
