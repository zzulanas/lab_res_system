import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Helmet from 'react-helmet';
import useForm from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import 'bulma';
import './App.css'
import intelIcon from './intel-xxl.png'

function App() {
  //Determines animation for search bar
  const searchStyle = useSpring({ height: 500, fontSize: 40, overflow: 'auto', padding: 30 })
  const navStyle = { backgroundColor: '#0071C5' }

  //Data value in textarea
  const [textAreaVal, setVal] = useState('');

  const handleChange = (event) => {
    console.log(event.target.textAreaVal)
    setVal(event.target.textAreaVal);
  };

  //Data used in form
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const onSubmit = data => { console.log(data) };

  return (
    <div>
      <nav className="navbar" style={navStyle}>
        <div className="navbar-brand">
          <img className="navbar-item" src={intelIcon} style={{ maxWidth: 90, height: 'auto' }} />
        </div>
        <div className="navbar-start">
          <div className="navbar-item">
            <span style={{ color: 'white', fontSize: 30 }}>LabResSystem</span>
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
                <input
                  className={"input is-large effect-8 " + (!errors.WWID ? "is-primary" : "is-danger")}
                  placeholder="Scan WWID"
                  name="WWID"
                  ref={register({
                    required: true,
                    validate: (value) => value.length === 8
                  })}
                  onChange={handleChange}
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
                  className="input effect-8"
                  name="products"
                  placeholder="Search..."
                  ref={register}
                  value={textAreaVal}
                  style={searchStyle}
                  rows="10"
                  onChange={handleChange}
                  disabled={errors.WWID || !formState.dirty}
                />
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
            <div>
              <input type="submit" className="button is-link" value="Submit" disabled={errors.WWID || !formState.dirty} style={{margin: 5}}/>
              <input type="submit" className="button is-danger" value="Reset" disabled={errors.WWID || !formState.dirty} style={{margin: 5}}/>
            </div>
          </form>
          <h1>{textAreaVal}</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
