import { useState,useContext } from 'react';
import Context from '../Context/Context';
import styles from './AddExpense.module.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm'

const AddExpense=(props)=>{
    const {loggedIn,setLoggedIn,setToken,setData}=useContext(Context);
    const [toggle,setToggle]=useState("");
    
    function handleLogout()
    {
        setLoggedIn(false);
        setData([]);
        setToken("");
        localStorage.removeItem('auth-token');
    }

    return (
        <div className={styles.formContainer} style={{marginTop:"0px"}}>
            
           {loggedIn?(<button className={styles.main_btn} onClick={handleLogout}>Logout</button>):("")}
           {!loggedIn && !toggle?(<div className={styles.btn_box}><button className={styles.main_btn} onClick={()=>{setToggle("login")}}>Login</button><button className={styles.main_btn} onClick={()=>{setToggle("signup")}}>Signup</button></div>):(<></>)}
            {!loggedIn && toggle==="login"?(<><LoginForm setToggle={setToggle} /></>):(<></>)}
            {!loggedIn && toggle==="signup"?(<><SignupForm setToggle={setToggle} /></>):(<></>)}
        </div>

    );
}
export default AddExpense;
