import { useContext, useEffect } from "react";
import styles from "./Alert.module.css";
import Context from "../Context/Context";

function Alert() {
  const { msg, setMsg } = useContext(Context);
  useEffect(() => {
    let timer = setTimeout(() => {
      setMsg("");
    }, 18000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg,setMsg]);
  return (
    <>
      {msg.length>0?(<div className={styles.alert}>
      <strong>{msg}</strong>
      {/* <span className={styles.closebtn}></span> */}
    </div>):""}
    </>
  );
}

export default Alert;
