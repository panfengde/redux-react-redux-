import React from "react"

const ProviderContext = React.createContext({});


export function Provider1(props) {
    return <ProviderContext.Provider
        value={{
            ...props.store.getState(),
            dispatch: props.store.dispatch
        }}
    >
        {React.Children.only(props.children)}
    </ProviderContext.Provider>
}

export class Provider extends React.Component {
    componentDidMount() {
        const forceUpdate = () => {
            this.forceUpdate();
        };
        this.props.store.subscribe(forceUpdate.bind(this));
    }

    render() {
        return <ProviderContext.Provider
            value={{
                ...this.props.store.getState(),
                dispatch: this.props.store.dispatch
            }}
        >
            {React.Children.only(this.props.children)}
        </ProviderContext.Provider>
    }
}


export function connect(getStore, actionToProps) {

    return (WrappedComponent) => {

        let needStore = {};
        //return WrappedComponent;
        return class Temp extends React.Component {
            render() {
                return <ProviderContext.Consumer>
                    {(store) => {
                        needStore = {...getStore(store), ...actionToProps(store.dispatch)};
                        console.log("-------------------", needStore, store);
                        return <WrappedComponent {...needStore}/>
                    }
                    }
                </ProviderContext.Consumer>
            }
        }
    }
}

