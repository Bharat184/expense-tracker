import { useState, useContext } from 'react';
import context from '../Context/Context';
import styles from './AddExpense.module.css';


const LoginForm = (props) => {
    const { setToggle } = props;
    const { handleLogin, setMsg } = useContext(context);
    const [data, setData] = useState({ email: "", password: "" });

    function handleChange(e) {
        setData((d) => {
            return { ...d, [e.target.name]: e.target.value };
        });
    }
    async function handleSubmit(e) {
        try{
            e.preventDefault();
            if (data.password.length === 0 || data.email.length === 0) {
                setMsg("Empty input field");
            }
            else {
    
               await handleLogin(data);
                setData({ email: "", password: "" });
            }
        }
        catch(err)
        {

        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formBox}>
                <label>Enter your email</label>
                <input type="email" name="email" value={data.email} onChange={handleChange} />
            </div>
            <div className={styles.formBox}>
                <label>Enter your password</label>
                <input type="password" name="password" value={data.password} onChange={handleChange} />
            </div>
            <div>
                <div className={styles.img_box}><input type="submit" value="Login" style={{ width: "90%" }}  /></div>
                <input type="button" value="Go back" onClick={() => { setToggle("") }} />
            </div>
        </form>

    );
}
export default LoginForm;
