import React, { Component } from 'react';
import flankerImg from '../incongruentleft.png';
import { CustomTextInput } from './customTextInput';

export default class Rt extends Component {
    constructor(props) {
        super(props);
        this.once = true
        this.first = true
        this.rtInput = null
        this.keyPressed = null
        this.rt = null
        this.gotKey = false
        this.results = <p>Initializing</p>

        // Initializing the state 
        this.state = {
            isStarted: true,
            isManual: true,
            currentCount: 10
        };

        // reference so we can dispatch to the element
        this.setRtInputRef = element => {
            this.rtInput = element;
        };

        // set the input field
        this.rtInputSetter = () => {
            // Focus the text input using the raw DOM API
            if (this.rtInput) {
                console.log("rtInputSetter")
                this.rtInput.value = "";
            } else {
                console.log("no rtInputSetter")
            }
        };
    }

    componentDidMount() {
        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
        setTimeout(() => {
            this.setState({ color: 'wheat' })
        }, 2000);

        this.intervalId = setInterval(this.timer.bind(this), 1000)
        this.rtInputSetter()
        this.rtInput.addEventListener('keypress', (event) => {// screen out spurios events
            console.log(event)
            if (this.first && this.timing) {
                this.rt = new Date() - this.rt
                this.first = false
                this.gotKey = true
                let res = "key down = " + event.key + "  |  rt = " + this.rt + " ms"
                console.log(res)
                this.results = <p>{res}</p>
                this.rtInput.value = "";
            }
        });
    }

    componentWillUnmount() {
        document.onkeydown = null
        clearInterval(this.intervalId)
    }

    startStop = () => {
        if (!this.state.isStarted) {
            this.intervalId = setInterval(this.timer.bind(this), 1000)
        } else {
            clearInterval(this.intervalId)
        }
    }


    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        console.log(this.state.currentCount)
        if (this.state.currentCount < 1) {
            // clearInterval(this.intervalId);
            this.setState({ currentCount: 10 })
            this.setState({
                currentCount: 10
            })
            console.log("reset")
        }
    }

    handler = (event) => {
        console.log('key hit')
        if (this.timing) {
            this.rt = new Date() - this.rt
            this.gotKey = true
            let res = "key down = " + event.key + "  |  rt = " + this.rt + " ms"
            console.log(res)
            this.results = <p>{res}</p>
        }
    };

    // This is simply an example that demonstrates
    // how you can dispatch an event on the element.
    triggerKeyPress() {
        this.first = true; // triggers 4 events. only want first
        this.rtInput.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }
        ))
    }

    render() {
        let val
        let flankerI
        let bText = this.state.isStarted ? "STOP" : "START"
        let keySourceText = this.state.isManual ? "MANUAL KEY ENTRY" : "AUTO KEY DISPATCH"
        let instructions1 = this.state.isManual ?
            "hit a key as soon as you see the image" :
            "Autoamtically dispatching a keypress after image rendered"
        let instructions2 = this.state.isManual ?
            "click MANUAL KEY ENTRY to enter AUTO DISPATCH MODE" :
            "click AUTO DISPATCH MODE to enter MANUAL KEY ENTRY "

        if (this.state.currentCount >= 4 && this.state.currentCount <= 7) {
            if (this.state.currentCount == 7 && this.once) {
                // start timer
                this.once = false
                this.timing = true
                this.key = false
                this.rt = new Date()
                if (!this.state.isManual) {
                    this.triggerKeyPress()
                } else {
                    this.first = true
                }
            }
            val = <p>{this.state.currentCount}</p>
            flankerI = <p><img src={flankerImg} /></p>
        } else if (this.state.currentCount > 7) {
            val = <p>preparing...</p>
            this.once = true
            this.timing = false
            this.results = <p></p>
        } else {
            if (this.timing) {

            }
            this.timing = false
            val = <p>timeout</p>
        }
        return (
            <React.Fragment>
                <div>
                    <div
                        style={{
                            textAlign: 'center',
                            paddingTop: 20,
                            width: 600,
                            height: 80,
                            margin: 'auto'
                        }}>
                        <h1>Realtime keydown event test</h1>
                        <p>{instructions1}<br></br><br></br>{instructions2}</p>
                        <p> debug info in chrome inspect console</p>
                        <button onClick={() => {
                            this.setState({ isStarted: !this.state.isStarted })
                            this.startStop()
                        }}>{bText}</button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <button onClick={() => {
                            this.setState({ isManual: !this.state.isManual })
                        }}>{keySourceText}</button>
                        <p></p>
                        <div>
                            {val}
                            {flankerI}
                        </div>
                        <input
                            ref={this.setRtInputRef}
                            id="rtInput"
                            contentEditable={true}
                            placeholder="hit a key when you see image"
                            data-reactid="137"
                        // onKeyPress={(e) => this.handler(e)} no need. handled in window
                        />
                        <div>{this.results}</div>
                        <p></p>
                        <p></p>
                        <a href="https://github.com/appliedrd/react_timing.git">github</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}