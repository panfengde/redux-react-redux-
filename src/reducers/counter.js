export default (state = {count: 1}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + 1};
        case 'DECREMENT':
            return {count: state.count - 1};
        case 'INCREMENT_BY':
            return {count: state.count + action.payload};
        case 'SERVE_COUNT':
            console.log("SERVE_COUNT___", action);
            return {count: state.count + action.payload};
        default:
            return state
    }
}
