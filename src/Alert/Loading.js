import { useContext } from "react";
import styles from "./Loading.module.css";
import Context from "../Context/Context";
import img from "../Images/loading.gif";

function Loading() {
  const { loading } = useContext(Context);
  return (
    <>
        {loading?(<div className={styles.loading}>
      <div className={styles.loadingImg}>
        <img src={img} alt="Loading..." />
      </div>
    </div>):""}
    </>
  );
}

export default Loading;
