import React, {Component} from 'react'
//import PropTypes from 'prop-types'
import {bindActionCreators} from '../redux/index'
import {counterCreator} from '../actions'
import {connect} from "../react-redux";


class Counter extends Component {
    render() {
        const {data} = this.props;
        return (
            <div>
                <p>{Math.random() * 1000}</p>
                <p>
                    Counter:{this.props.counter.count} times
                    <button onClick={() => {
                        this.props.increment()
                    }}>
                        +
                    </button>
                    <button onClick={() => {
                        this.props.decrement()
                    }}>
                        -
                    </button>
                    <button onClick={() => {
                        this.props.asyncWait()
                    }}>
                        asyncWait
                    </button>
                </p>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...counterCreator
    }, dispatch);
};

//export default Counter;
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
