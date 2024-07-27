import React, { useState } from "react";
import axios from "axios";

export default function Test () {
    // const [count, setCount] = useState(1);

    // function incrementCount () {
    //     setCount(count + 1);
    // }

    // return (
    //     <>
    //         {count}
    //         <br />
    //         <button onClick={incrementCount}>+</button>
    //     </>
    // );

    const [testApiResponse, setTestApiResponse] = useState();

    axios.get(process.env.REACT_APP_BACKEND_URL + "/api/test")
        .then((response) => {
            console.log(response.data.success);
            setTestApiResponse(response.data.success);
        })
        .catch((err) => console.log(err))
        .finally(() => console.log("Backend API Test"));

    
    return (
        <>
            <p>{testApiResponse}</p>
        </>
    );
}