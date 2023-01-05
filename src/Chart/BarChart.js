import styles from './BarChart.module.css';
import { useState } from 'react';
const BarChart=(props)=>{
    const {data}=props;
  
    const [toggle,setToggle]=useState(false);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let perctange=Array(12).fill(0);
    
   if(data.length>0)
   {
    data.forEach((e,i)=>{
        let index=new Date(e.date).getMonth();
        perctange[index]+=+e.price;
    })
   }
    let price=[...perctange];
    let max=Math.max(...perctange);
   
    
   if(max>0)
   {
    perctange=perctange.map((e,i)=>{
        let d=Math.ceil((e/max)*100);
        return d;
    })
   }
   
    
   

    return (
        <div className={`${styles.bar_box} ${styles.active}`}>
            <span className={styles["detail-btn"]} onClick={()=>{setToggle(!toggle)}}></span>
           {toggle && ( <div className={styles["detail-box"]}>
                {price.map((e,i)=>{
                    return (<div><b>{months[i]}</b>&nbsp;&nbsp;&nbsp; <p>&#8377;{e}</p></div>);
                })}
           </div>)}
           {perctange.map((e,i)=>{
            return (
                <div className={styles.bar} key={i}>
                <div className={styles.progress} style={{height:`${e}%`}}></div>
            <span>{months[i]}</span>
            </div>
           
            );
           })}
           
        </div>
    );
}

export default BarChart;