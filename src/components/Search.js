import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import '../App.css';

function Search() {
    const [state, toggle] = useState(false)
    const props = useSpring({ width: state ? 500 : 250, height: state? 500: 100, fontSize: 40, padding: state ? 30:15, overflow: 'auto', padding: state ? 30:15, from: { width: 200, height: 60, padding: 15 } })
    return (
        <div className="center-box">
            <div>
                <animated.textarea type="text" className="input" placeholder="Search..." style={props} onFocus={() => toggle(!state)} onBlur = {() => toggle(!state)}/>
            </div>
        </div>
    );
}

export default Search;