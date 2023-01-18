import { useState,useContext } from 'react';
import styles from './AddExpense.module.css';
import Context from '../Context/Context';

const AddExpense=(props)=>{
    const {addExpense,loggedIn,setMsg}=useContext(Context);
    const [inputData,setInputData]=useState({title:'',price:'',date:''});
    const [toggle,setToggle]=useState(false);

    function handleChange(e)
    {
        // setInputData({...inputData,[e.target.name]:e.target.value});
        setInputData((d)=>{
            return {...d,[e.target.name]:e.target.value};
        })
       
    }

    async function handleSubmit(e)
    {
        try{
            e.preventDefault();
        if(inputData.title && inputData.price && inputData.date)
        {
            await addExpense(inputData);
            let obj={title:'',price:'',date:''};
            setInputData(obj);
        }
        else
        {
           setMsg("Input field can't be empty");
        }
        }
        catch(err)
        {

        }
        
    }

    return (
        <div className={styles.formContainer}>
            {loggedIn?(<>     {toggle?(<form onSubmit={handleSubmit}>
            <div className={styles.formBox}>
                <label>Enter title</label>
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
        </form>):(<button className={styles.main_btn} onClick={()=>{setToggle((t)=>!t)}}>Add expense</button>)}</>):<h1>Login/signup to continue</h1>}
        </div>

    );
}
export default AddExpense;
