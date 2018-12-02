import React, { Component } from 'react';

// Define Dropdown class
export default class Dropdown extends Component {
    // constructor accepts props and initialises state
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            options: this.props.options,
            selected: this.props.selected
        };
        this.toggle = this.toggle.bind(this);
    }

    // redner method
    render() {
        const myStyle = <style jsx>{`
            .list {
                list-style-type: none;
                width: 35%;
                border: none;
                background-color: black;
                color: white;
                
            }
            .link {
                border: none;
                text-align: center;
                font-size: 20px;
                padding: 0.3em;
            }
            .link:hover {
                background-color: gray;
            }
            #head:hover {
                background: gray;
            }
            #head {
                border: none;
                background-color: #bb1919;
                color: #FFFFFF;
            }
        `}</style>
        const head = (<li id="head" class="link" onClick={this.toggle} key={this.state.options.link}>{this.state.options[this.state.selected].display}</li>);
        const body = (this.state.options.map((option) => <li class="link" onClick={() => this.props.setNewsSource(option.link)}>{option.display}</li>));
        if(!this.state.visible)
            return (<div class="list">{head}{myStyle}</div>);
        else {
            return (<div class="list">{head}{body}{myStyle}</div>);
        }
    }

    toggle() {
        console.log("wah");
        this.setState({
            visible: this.state.visible = !this.state.visible,
            options: this.state.options,
            numOptions: this.state.numOptions
        })
    }

    addLink(link, display) {
        console.log(this);
        this.setState({
            visible: this.visible,
            options: this.state.options.push({"link": link, "display": display}),
            numOptions: this.state.numOptions
        })
    }
}
