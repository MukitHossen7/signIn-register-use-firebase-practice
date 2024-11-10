import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase.init";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateAccount = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordLength, setPasswordLength] = useState("");
  const [eyes, setEyes] = useState(false);
  const [termsError, setTermsError] = useState("");
  const handleCreateAccount = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const term = e.target.terms.checked;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    setErrorMessage("");
    setPasswordLength("");
    setTermsError("");
    console.log(name, photoUrl);
    const uppercaseLetter = /(?=.*[A-Z])/;
    const lowercaseLetter = /(?=.*[a-z])/;
    const digitLetter = /(?=.*[0-9])/;
    const specialLetter = /(?=.*[\W])/;

    if (!term) {
      setTermsError("Please agree to the terms and conditions");
      return;
    }
    const validatePassword = (password) => {
      if (password.length < 6) {
        return "Password should be at least 6 characters long";
      }
      if (!uppercaseLetter.test(password)) {
        return "Uppercase letter must be added to the password";
      }
      if (!lowercaseLetter.test(password)) {
        return "Lowercase letter must be added to the password";
      }
      if (!digitLetter.test(password)) {
        return "One number must be added to the password";
      }
      if (!specialLetter.test(password)) {
        return "Special character must be added to the password";
      }
      return "";
    };

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordLength(passwordError);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password, name, photoUrl).then(
      (userCredential) => {
        console.log(userCredential);
        toast.success("create account successfully");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("verification successful");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        }).then(() => {});
      }
    );
  };
  return (
    <div className="pt-7">
      <h2 className="font-bold text-3xl text-center">Create Account Now</h2>
      <div className="hero pt-5  lg:max-w-4xl mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 shrink-0 shadow-2xl">
            <form className="card-body px-20" onSubmit={handleCreateAccount}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  required
                />
              </div>
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
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input
                  type={eyes ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <button
                  type="button"
                  onClick={() => setEyes(!eyes)}
                  className="absolute right-2 top-14"
                >
                  {eyes ? <FaEyeSlash /> : <IoEyeSharp />}
                </button>
                <label
                  className={`label flex flex-col items-start ${
                    passwordLength ? "" : "hidden"
                  }`}
                >
                  {passwordLength && (
                    <span className="text-xs text-red-600 font-bold">
                      {passwordLength}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label className="label justify-start gap-2 cursor-pointer">
                  <input type="checkbox" name="terms" className="checkbox" />
                  <span className="label-text">
                    check our{" "}
                    <span className="underline text-sky-600">
                      terms and condition
                    </span>
                  </span>
                </label>
              </div>
              {termsError && (
                <span className="text-xs text-red-600 font-bold">
                  {termsError}
                </span>
              )}
              <div className="form-control mt-1">
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
            <p className="font-semibold text-center pb-4">
              Already have an account? Please{" "}
              <span>
                {" "}
                <Link to="/login" className="text-green-600 underline">
                  LogIn
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
