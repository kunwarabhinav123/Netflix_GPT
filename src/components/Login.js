import React, { useState, useRef, use, useEffect } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  reload,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATAR } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [Errmsg, setErrmsg] = useState();
  const user = useSelector((store) => store.user);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/browse");
    }
  }, [user, navigate]);

  const toggleSignInForm = () => {
    setIsSignInForm(!IsSignInForm);
  };

  const validation = async () => {
    const msg = validateData(email.current.value, password.current.value);
    setErrmsg(msg);
    if (msg) return;

    try {
      if (!IsSignInForm) {
        // Sign Up
        const cred = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        await updateProfile(cred.user, {
          displayName: name.current.value,
          photoURL: AVATAR, // Fixed: removed curly braces
        });
        await reload(cred.user); // ensures cred.user has updated fields locally

        const { uid, email: em, displayName, photoURL } = cred.user;
        console.log("After updateProfile and reload:", {
          displayName,
          photoURL,
        });
        dispatch(addUser({ uid, email: em, displayName, photoURL }));
        navigate("/browse"); // Added navigation
      } else {
        // Sign In
        const cred = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const { uid, email: em, displayName, photoURL } = cred.user;
        console.log("Sign in user data:", { displayName, photoURL });
        dispatch(addUser({ uid, email: em, displayName, photoURL }));
        navigate("/browse"); // Added navigation
      }
    } catch (error) {
      setErrmsg(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="absolute">
        <img
          className="h-screen object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/IN-en-20250825-TRIFECTA-perspective_a3209894-0b01-4ddb-b57e-f32165e20a3f_small.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute m-4 p-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80"
      >
        <h1 className="py-4 font-bold text-3xl">
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-4 my-2 w-full bg-gray-700"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-2 w-full bg-gray-700"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700"
        ></input>
        <p className="text-red-500 font-bold text-lg">{Errmsg}</p>
        <button className="bg-red-700 w-full p-4 my-4" onClick={validation}>
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {IsSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered? Sign In Now"}
        </p>
      </form>
    </>
  );
};

export default Login;
