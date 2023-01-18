import { useState, useContext } from 'react';
import styles from './AddExpense.module.css';
import Context from '../Context/Context';

const SignupForm = (props) => {

    const { setToggle } = props;
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const { handleSignup,setMsg } = useContext(Context);

    function handleChange(e) {
        setData((d) => {
            return { ...d, [e.target.name]: e.target.value };
        });
    }

    async function handleSubmit(e) {
       try{
        e.preventDefault();
        if(data.username.length===0 || data.password.length===0 || data.email.length===0)
        {
            setMsg("Empty input field");
        }
        else
        {
            await handleSignup(data);
            setData({ username: "", email: "", password: "" });
        }
       }
       catch(err)
       {

       }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formBox}>
                <label>Enter your username</label>
                <input type="text" name="username" value={data.username} onChange={handleChange} />
            </div>
            <div className={styles.formBox}>
                <label>Enter your email</label>
                <input type="email" name="email" value={data.email} onChange={handleChange} />
            </div>
            <div className={styles.formBox}>
                <label>Enter your password</label>
                <input type="password" name="password" value={data.password} onChange={handleChange} />
            </div>
            <div>
                <input type="submit" value="Signup" />
                <input type="button" value="Cancel" onClick={() => { setToggle("") }} />
            </div>
        </form>

    );
}
export default SignupForm;
