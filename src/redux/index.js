const INIT = '@@redux/INIT_' + Math.random().toString(36).substring(7);

/*
getState：获取当前的state值
dispatch：触发reducer并执行listeners中的每一个方法
subscribe：将方法注册到listeners中，通过dispatch来触发
*/

function createStore(reducers, initialState, enhancer) {
    if (typeof initialState === 'function') {
        enhancer = initialState;
        initialState = undefined
    }

    let state = initialState;
    const listeners = [];
    const store = {
        getState() {
            return state
        },
        dispatch(action) {
            if (action && action.type) {
                state = reducers(state, action);
                listeners.forEach(listener => listener())
            }
        },
        subscribe(listener) {
            if (typeof listener === 'function') {
                listeners.push(listener)
            }
        }
    };

    /*if (typeof initialState === 'undefined') {
        store.dispatch({type: INIT})
    }*/

    //创建store的时候，就获取一下state;

    store.dispatch({type: INIT});
    if (typeof enhancer === 'function') {
        return enhancer(store)
    }

    return store
};

//函数的合成
function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function applyMiddleware(...middlewares) {
    return store => {
        const chains = middlewares.map(middleware => middleware(store));
        store.dispatch = compose(...chains)(store.dispatch);
        console.log(store.dispatch);
        return store
    }
}


//combineReucers将单个reducer塞到一个对象中，每个reducer对应一个唯一键值，
// 单个reducer状态改变时，对应键值的值也会改变，然后返回整个state。
function combineReducers(reducers) {
    const availableKeys = [];
    const availableReducers = {};

    Object.keys(reducers).forEach(key => {
        if (typeof reducers[key] === 'function') {
            availableKeys.push(key)
            availableReducers[key] = reducers[key]
        }
    });

    return (state = {}, action) => {
        const nextState = {};
        let hasChanged = false;

        availableKeys.forEach(key => {
            nextState[key] = availableReducers[key](state[key], action);

            if (!hasChanged) {
                hasChanged = state[key] !== nextState[key]
            }
        });

        return hasChanged ? nextState : state
    }
}


function bindActionCreator(actionCreator, dispatch) {
    return function () {
        dispatch(actionCreator.apply(this, arguments))
    }
}

//它返回一个方法集合，直接调用来触发dispatch。
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    }

    const boundActionCreators = {};

    Object.keys(actionCreators).forEach(key => {
        let actionCreator = actionCreators[key]

        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
        }
    });

    return boundActionCreators
}

export {
    createStore,
    applyMiddleware,
    combineReducers,
    bindActionCreators
}


