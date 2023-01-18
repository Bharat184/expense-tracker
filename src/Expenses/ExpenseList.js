import styles from './ExpenseList.module.css';
const ExpenseList = (props) => {
    const {deleteExpense}=props;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date=new Date(props.data.date);

    return (
        <div className={styles.expense_list}>
            <span className={styles.delete_btn} onClick={()=>{deleteExpense(props.data._id)}}></span>
            <div className={styles.left_side}>
            <div className={styles.date_time}>
                <p>{months[date.getMonth()]}</p>
                <p>{date.getFullYear()}</p>
                <p>{date.getDate()}</p>
            </div>
           
            <p>{props.data.title}</p>
           
            </div>
            <div className={styles.info}>
                
                <p>&#8377; {props.data.price}</p>
            </div>
        </div>
    );
}
export default ExpenseList;