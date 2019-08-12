import React, { useState } from 'react';
import Helmet from 'react-helmet';
import useForm from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import 'bulma';
import './App.css';
import axios from 'axios';
import {useSpring, animated, interpolate} from 'react-spring';
import intelIcon from './intel-xxl.png';

function App() {

    //Data value in textarea
    const [textAreaVal, setVal] = useState('');

    const handleChange = (event) => {
      console.log(event.target.textAreaVal)
      setVal(event.target.textAreaVal);
    };
  
    //Data used in form
    const { register, handleSubmit, errors, formState, reset } = useForm({
      mode: 'onBlur'
    });
    let username = "{enter username}";
    let password = "{enter password}";
    const onSubmit = data => { 
      let itemIDs = data.products.split("\n")
      let i;
      for(i = 0; i< itemIDs.length; i++){
        itemIDs[i] = itemIDs[i].trim();
      }
      axios.get('https://e2esm-sandbox.intel.com/api/intrp/aim/searchByDevices/PSMDEV001 ', {
        auth: {
          username: username,
          password: password
        },
      })
      .then(function(response){
        console.log(response)
      })
      .catch(function(response){
        console.error("Error! Request is bad")
        console.log(response)
      })
     };


  //Determines animation for search bar
  const [state1, toggle1] = useState(false);
  const [state2, toggle2] = useState(false);
  const searchStyle = useSpring({ height: 500, fontSize: 40, overflow: 'auto', padding: state2 ? 40:30});
  const errStyle = useSpring({x: errors ? 1 : 0})
  const wwidStyle = useSpring({
    padding: state1 ? 50:30,
    transform: errStyle.x
      .interpolate({
        range: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        output: [0, 100, -100, 100, -100, 100, -100, 100, -100, 0]
      })
      .interpolate(
        x => `transformX(${x})`
      )
  });
  const navStyle = { backgroundColor: '#0071C5' }

  return (
    <div>
      <nav className="navbar" style={navStyle}>
        <div className="navbar-brand">
          <img className="navbar-item" src={intelIcon} style={{ maxWidth: 90, height: 'auto' }} />
        </div>
        <div className="navbar-start">
          <div className="navbar-item">
            <span style={{ color: 'white', fontSize: 30 }}>Lab Librarian</span>
          </div>
        </div>
      </nav>
      <div className="container">
        <Helmet>
          <style>{'html { background-color:#cce9ff}'}</style>
        </Helmet>
        <div className="section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label">
                WWID:
            </label>
              <div className="control has-icons-right">
                <animated.input
                  className={"input is-large effect-8 " + (!errors.WWID ? "is-primary" : "is-danger")}
                  placeholder="Scan WWID"
                  name="WWID"
                  style={wwidStyle}
                  ref={register({
                    required: true,
                    validate: (value) => value.length === 8
                  })}
                  onChange={handleChange}
                  onFocus={() => toggle1(true)}
                  onBlur={() => {
                    toggle1(false)
                    console.log(errors)
                  }}
                  autoComplete = "off"
                />
                <span className="focus-border">
                  <i></i>
                </span>
                {errors.WWID &&
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon={faExclamation} color="red" />
                  </span>
                }
                <strong className="help is-danger">{errors.WWID && "WWID is invalid!"}</strong>
              </div>

            </div>
            <div className="field">
              <label className="label">Search:</label>
              <div className="control">
                <animated.textarea
                  type="text"
                  className="input"
                  name="products"
                  placeholder="Search..."
                  ref={register}
                  value={textAreaVal}
                  style={searchStyle}
                  rows="10"
                  onChange={handleChange}
                  disabled={errors.WWID || !formState.dirty}
                  onFocus={() => toggle2(true)}
                  onBlur={() => toggle2(false)}
                />
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
            <div>
              <input type="submit" className="button is-link" value="Submit" disabled={errors.WWID || !formState.dirty} style={{margin: 5}}/>
              <input type="reset" onClick={reset} className="button is-danger" value="Reset" disabled={errors.WWID || !formState.dirty} style={{margin: 5}}/>
            </div>
          </form>
          <h1>{textAreaVal}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
