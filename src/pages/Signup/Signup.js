import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './Signup.scss';
import { validateForm } from '../../services/Validation';
import { Button } from "react-bootstrap";
import { registerUser } from '../../services/sign-up-users/sign-up-services';
import ToastMessage from '../../component/Toast/Toast';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({ error: 'No value' });
  const [alert, setAlert] = useState(false);
  const [color, setColor] = useState();
  const [header, setHeader] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    let updateValues = { ...values, [name]: value }
    setValues(updateValues);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(values));
    if (!Object.values(validateForm(values)).some(v => v)) {
      const result = await registerUser(values);
      if (!result) {
        setAlert(true);
        setColor("danger");
        setHeader("Error");
        setContent("User failed to register");

      } else {
        setAlert(true);
        setColor("success");
        setHeader("Success");
        setContent("User registered successfully");
        navigate('/');
      }

    }
  }
  console.log('This is alert', alert)
  return <div className="Form container-fluid">
    <section className="row form-row justify-content-center ">
      <section className=" col-12 form-main-page px-4 py-5 px-sm-4 py-sm-5">
        <div className="internal-div">
          <ToastMessage color={color} show={alert} header={header} message={content} onClose={() => {
            setAlert(false)
          }} />
          <h1 className="text-center form-header"> Bookit</h1>
          <form className="form-container " onSubmit={handleSubmit}>
            <h3 className="signup-text">Sign up</h3>
            <label className="label-text mt-3">Name</label>
            <input type="text" className="form-control input-form" name="name" onChange={handleChange} />
            {errors.name && <span className="mt-1 mb-2 text-danger">{errors.name}</span>}<br />
            <label className="label-text">Email</label>
            <input type="text" className="form-control input-form" name="email" onChange={handleChange} />
            {errors.email && <span className="mt-1 mb-2 text-danger">{errors.email}</span>}<br />
            <label className="label-text" >Password</label>
            <input type="password" className="form-control input-form" name="password" onChange={handleChange} />
            {errors.password && <span className=" mt-1 mb-2 text-danger">{errors.password}</span>}<br />
            <section className="d-grid gap-2">
              <Button type="submit" className="btn btn-color">Sign up</Button>
            </section>
            <section>
              <p className="text-center mt-3 p-area">By signing up you agree to our Terms & Condition</p>
            </section>
          </form>
        </div>
      </section>
    </section>
  </div>
};

Signup.propTypes = {};

Signup.defaultProps = {};

export default Signup;
