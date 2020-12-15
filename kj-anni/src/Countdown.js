import React from 'react';
import moment from 'moment';
import './Countdown.css';
import heart from './images/heart.png';

class Countdown extends React.Component {
    state = {
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
        display: null,
        done: false
    };
    
    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');

            this.setState({ hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        
        if (this.state.done) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { hours, minutes, seconds } = this.state;

        // Mapping the date values to radius values
        
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }
        if(seconds ==0 && minutes == 0 && hours == 0 || this.state.done == true){
            this.state.done = true;
            this.state.display = (
                <div>
                    <h1>Happy Anniversary!</h1>
                <p>Love you very much! I know its not much but I hope this was kinda cool. Can't wait to see you friday!</p>
                </div>
            )
        }
        else{
            console.log(this.state.done);
            this.state.display = (
                <div>
                <div className="title">
                <h1>Kyle and Jayda</h1>
                <h2>2 Year Countdown</h2>
                </div>
                <div className="countdown-wrapper">
                    {hours && (
                        <div className="countdown-item">
                            <SVGCircle radius={hoursRadius} />
                            {hours}
                            <span>hours</span>
                        </div>
                    )}
                    {minutes && (
                        <div className="countdown-item">
                            <SVGCircle radius={minutesRadius} />
                            {minutes}
                            <span>minutes</span>
                        </div>
                    )}
                    {seconds && (
                        <div className="countdown-item">
                            <SVGCircle radius={secondsRadius} />
                            {seconds}
                            <span>seconds</span>
                        </div>
                    )}
                </div>
                
                </div>
            
            )
        }

        return (
            <div>
                <div className="hearts"><img className="pic" alt="heart" src={heart}></img></div>
                
            {this.state.display}
            </div>
        );
    }
}

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            stroke-width="4"
            d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}
export default Countdown;