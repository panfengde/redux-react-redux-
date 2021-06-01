import axios from "axios"
import {createAction} from "redux-actions"


export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');

export const asyncWait = createAction('SERVE_COUNT', async () => {
    const result1 = await axios.get("/api/value").then((res) => {
        return res.data
    });
    const result2 = await axios.get("/api/value2").then((res) => {
        return res.data
    });
    console.log(result1);
    console.log(result2);
    return result1.count + result2.count;
});
