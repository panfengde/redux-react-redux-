export default function thunk ({ getState }) {
    return next => action => {
        console.log("------thunk")
        if (typeof action === 'function') {
            action(next, getState)
        } else {
            next(action)
        }
    }
}
