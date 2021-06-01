import axios from "axios"


export function increment() {
    return {
        type: 'INCREMENT'
    }
}

export function decrement() {
    return {
        type: 'DECREMENT'
    }
}

export function asyncWait(num = 5) {
    return dispatch => {
        axios.get("/api/value").then((res) => {
            dispatch({
                type: 'SERVE_COUNT',
                payload:res.data.count
            })
        })
    }
}
