function getFormatTime () {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.getMilliseconds()
}

export default function logger ({ getState }) {
    return next => action => {
        /* eslint-disable no-console */
        console.log("------logger")
        console.group(`%caction %c${action.type} %c${getFormatTime()}`, 'color: gray; font-weight: lighter;', 'inherit', 'color: gray; font-weight: lighter;')
        // console.time('time')
        console.log(`%cprev state`, 'color: #9E9E9E; font-weight: bold;', getState());
        console.log(`%caction    `, 'color: #03A9F4; font-weight: bold;', action);
        next(action);
        console.log(`%cnext state`, 'color: #4CAF50; font-weight: bold;', getState());
        // console.timeEnd('time')
        console.groupEnd();
    }
}
