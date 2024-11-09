import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";

const CreateAccount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential?.user?.email);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="pt-7">
      <h2 className="font-bold text-3xl text-center">Create Account Now</h2>
      <div className="hero pt-5">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleCreateAccount}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary font-bold">
                  Create Account
                </button>
              </div>
            </form>
            <p className="text-center">
              {errorMessage && (
                <small className="text-red-600 font-semibold">
                  {errorMessage}
                </small>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
