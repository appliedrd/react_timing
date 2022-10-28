import React, { Component } from 'react';
import flankerImg from '../incongruentleft.png';
import {CustomTextInput} from './customTextInput';

export default class Rt extends Component {
    constructor(props) {
        super(props);
        this.rtInput = null;

        this.setRtInputRef = element => {
            this.rtInput = element;
        };

        this.rtInputSetter = () => {
            // Focus the text input using the raw DOM API
            if (this.rtInput) {
                console.log("rtInputSetter")
                this.rtInput.value = "hello";
            } else {
                console.log("no rtInputSetter")
            }
        };

        // Initializing the state 
        this.state = {
            color: 'lightgreen',
            currentStimulus: 0,
            currentCount: 10,
            show: true,
            animate: true,
            cross: true,
            firstLoop: true,
            expectedKeys: {
                il: 37,
                ir: 39,
                cl: 37,
                cr: 39
            },
            data: [],
            allowedKeys: [37, 39],
            isStarted: true
        };
        this.buttonText = "Stop"
        this.keyPressed = null
        this.rt = null
        this.gotKey = false
        this.results = <p>Initializing</p>
    }
    componentDidMount() {
        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
        setTimeout(() => {
            this.setState({ color: 'wheat' })
        }, 2000);
        // this.animate()
        this.intervalId = setInterval(this.timer.bind(this), 1000)
        this.rtInputSetter()
        this.rtInput.addEventListener('keypress', (event) => {
            console.log("window keypress")
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


    animate = () => {
        console.log('animate')

        document.onkeydown = (e) => {
            document.onkeydown = null
            console.log("key down")
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
        this.rtInput.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }
        ))
    }


    render() {
        let val
        let flankerI
        let bText = this.state.isStarted ? "STOP" : "START";

        if (this.state.currentCount >= 4 && this.state.currentCount <= 7) {
            if (this.state.currentCount == 7) {
                // start timer
                this.timing = true
                this.rt = new Date()
                this.key = false

            }
            val = <p>{this.state.currentCount}</p>
            flankerI = <p><img src={flankerImg} /></p>
            // this.divRef.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }));
            // this.triggerKeyPress()
        } else if (this.state.currentCount == 2) {
            console.log("2")
            this.triggerKeyPress()
        } else if (this.state.currentCount > 7) {
            //this.clearInput()
            val = <p>preparing...</p>
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
                        <h1> Realtime keydown event test</h1>
                        <p> hit a key as soon as you see the image</p>
                        <p> debug info in chrome inspect console</p>
                        <button onClick={() => {
                            this.setState({ isStarted: !this.state.isStarted })
                            this.startStop()
                        }}>{bText}</button>
                        <div>
                            {val}
                            {flankerI}
                        </div>
                        <input
                            ref={this.setRtInputRef}
                            id="rtInput"
                            contentEditable={true}
                            placeholder="type a message"
                            data-reactid="137"
                            onKeyPress={(e) => this.handler(e)}
                        />
                        <CustomTextInput
                            inputRef={el => this.inputElement = el}
                        />
                        <div>{this.results}</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}