import React from 'react'

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }

    componentDidMount() {
        this.setState({ val: this.state.val + 1 });
        console.log('第 1 次 log', this.state.val);

        this.setState({ val: this.state.val + 1 });
        console.log('第 2 次 log', this.state.val);

        setTimeout(() => {
            this.setState({ val: this.state.val + 1 });
            console.log('第 3 次 log', this.state.val);

            this.setState({ val: this.state.val + 1 });
            console.log('第 4 次 log', this.state.val);
        }, 0);
    }

    render() {
        return <h1>example setState</h1>;
    }
};

export default Example;