import React, { Component } from 'react';
import { flushSync } from 'react-dom';
import flankerImg from '../incongruentleft.png';

export default class Rt extends Component {
    constructor(props) {
        super(props);

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
            allowedKeys: [37, 39]
        };
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
        this.animate()
        this.intervalId = setInterval(this.timer.bind(this), 1000)
    }

    componentWillUnmount() {
        document.onkeydown = null
        clearInterval(this.intervalId)
    }


    animate = () => {
        const duration = this.props.duration || 1175
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
            this.state.currentCount = 10
            this.setState({
                currentCount: 10
            })
            console.log("reset")
        }
    }

    handler = (event) => {
        if (this.timing) {
            this.rt = new Date() - this.rt
            this.gotKey = true
            let res = "key down = " + event.key + " rt = " + this.rt
            console.log(res)
            this.results = <p>Results:{res}</p>
        }
    };


    render() {
        let val
        let flankerI

        if (this.state.currentCount >= 4 && this.state.currentCount <= 7) {
            if (this.state.currentCount == 7) {
                // start timer
                this.timing = true
                this.rt = new Date()
                this.key = false
            }
            val = <p>{this.state.currentCount}</p>
            flankerI = <p><img src={flankerImg} /></p>
        } else if (this.state.currentCount > 7) {
            val = <p>preparing...</p>
            this.timing = false
            this.results = <p>Results: Waiting for key press</p>
        } else {
            if (this.timing) {

            }
            this.timing = false
            val = <p>timeout</p>
        }
        return (
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
                    <div>
                        {val}
                        {flankerI}
                    </div>
                    <input type="text" onKeyPress={(e) => this.handler(e)} />
                    <div>{this.results}</div>
                </div>
            </div>
        );
    }
}