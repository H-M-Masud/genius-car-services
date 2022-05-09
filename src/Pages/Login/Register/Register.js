import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../Shared/Loading/Loading";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, error1] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  if (loading || updating) {
    return <Loading></Loading>;
  }

  if (user) {
    navigate("/home");
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("Updated profile");
    navigate("/home");
  };
  return (
    <div className="register-form">
      <h2 style={{ textAlign: "center" }}>Please Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="text" id="" placeholder="your name" />
        <br />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          required
        />
        <br />
        <input
          onClick={() => setAgree(!agree)}
          type="checkbox"
          name="terms"
          id="terms"
        />
        {/* <label className={agree ? "ps-2" : "ps-2 text-danger"} htmlFor="terms">
          Accept Genius Car Terms and Condition
        </label> */}
        <label className={`ps-2 ${agree ? "" : "text-danger"}`} htmlFor="terms">
          Accept Genius Car Terms and Condition
        </label>
        <input
          disabled={!agree}
          className="w-50 mx-auto btn btn-primary mt-2"
          type="submit"
          value="Register"
        />
      </form>
      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary cursor-pointer text-decoration-none"
          onClick={navigateLogin}
        >
          Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
