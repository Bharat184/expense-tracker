import { createContext, useState, useEffect } from "react";

const context = createContext();
const host = process.env.REACT_APP_HOST;

function ExpenseContext(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [msg, setMsg] = useState("");

  //send request utility function
  async function sendRequest(url, obj = {}, method = "GET", authToken = "") {
    setLoading(true);
    let object = { method };
    if (method !== "GET") {
      object = { ...object, body: JSON.stringify(obj) };
    }
    object = {
      ...object,
      headers: {
        "content-type": "application/json",
        "auth-token": authToken,
      },
    };

    let data = await fetch(url, object);

    let json = await data.json();
    if (!data.ok) {
      setLoading(false);
      throw new Error(json.status);
    } else {
      setLoading(false);
      return json;
    }
  }

  //handlelogin function
  async function handleLogin(obj) {
    try {
      let url = `${host}/api/auth/login`;
      let json = await sendRequest(url, obj, "POST");
      setMsg(json.status);

      localStorage.setItem("auth-token", json["auth-token"]);
      setLoggedIn(true);
      setToken(json["auth-token"]);
      return json;

    } catch (err) {
      setMsg(err.message);
      throw new Error(err.message);
    }
  }

  //handle signup function
  async function handleSignup(obj) {
    try {
      let url = `${host}/api/auth/signup`;
      let json = await sendRequest(url, obj, "POST");
      // window.confirm(json.status);
      setMsg(json.status);

      localStorage.setItem("auth-token", json["auth-token"]);
      setToken(json["auth-token"]);
      setLoggedIn(true);
      return json;
    } catch (err) {
      setMsg(err.message);
      throw new Error(err.message);
    }
  }

  //expense related

  //add your expense
  async function addExpense(obj) {
    try {
      let url = host + "/api/expense/add";
      let response = await sendRequest(url, obj, "POST", token);
      let object = { ...response.data };
      delete object.userId;
      setData((d) => {
        return [...d, object];
      });
      setMsg(response.status);
      return response;
    } catch (err) {
      // alert(err);
      setMsg(err.message);
      throw new Error(err.message);
    }
  }

  //Delete your expense
  async function deleteExpense(id) {
    let flag = window.confirm("Are you sure you want to remove?");
    if (flag) {
      try {
        let url = host + "/api/expense/remove";
        let object = { id };
        let response = await sendRequest(url, object, "POST", token);
        let d = data.filter((e) => e._id.toString() !== id.toString());
        setData([...d]);
        // alert(response.status);
        setMsg(response.status);
      } catch (err) {
        // alert(err);
        setMsg(err.message);
      }

      // let arr = data;
      // arr = arr.filter((e) => e.id !== id);
      // localStorage.setItem("item", JSON.stringify(arr));
      // setData([...arr]);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      let url = host + "/api/expense/fetch";
      sendRequest(url, {}, "GET", token)
        .then((json) => {
          setData([...json.data]);
        })
        .catch((err) => {
          // alert(err);
          setMsg(err.message);

          setToken("");
          setData([]);
          setLoggedIn(false);
          localStorage.removeItem("auth-token");
        });
    }

    let authToken = localStorage.getItem("auth-token");
    if (authToken) {
      setLoggedIn(true);
      setToken(authToken);
    }
  }, [loggedIn, token]);
  return (
    <context.Provider
      value={{
        handleLogin,
        handleSignup,
        loggedIn,
        setLoggedIn,
        loading,
        data,
        setData,
        addExpense,
        deleteExpense,
        setToken,
        msg,
        setMsg,
      }}
    >
      {props.children}
    </context.Provider>
  );
}

export { context as default, ExpenseContext };
