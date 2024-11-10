import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase.init";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRef } from "react";

const LogIn = () => {
  const emailRef = useRef();
  const handleSignPage = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (!userCredential.user.emailVerified) {
          toast.error("Please verify your email first");
          return;
        }
        console.log(userCredential);
        toast.success("login success");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("valid email and password");
      });
  };
  const handleForgetPassword = () => {
    console.log("forget password", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email");
      return;
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
        toast.success("Password reset email sent successfully");
      });
    }
  };
  return (
    <div className="hero mt-12">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSignPage}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label" onClick={handleForgetPassword}>
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="font-semibold text-center pb-4">
            New to this Website? please{" "}
            <span>
              {" "}
              <Link to="/createAccount" className="text-green-600 underline">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
