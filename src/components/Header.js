import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleGPTSearchbtn } from "../utils/gptSlice";
import { removeUser } from "../utils/userSlice";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const dispatch=useDispatch();

  console.log("Header - Redux user:", user);
  const logout = () => {
    signOut(auth)
      .then(() => {
        // // Sign-out successful
        // dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGPTSearch=()=>{
    dispatch(toggleGPTSearchbtn());
  }

  return (
    <>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img
          className="w-44 mx-auto md:mx-0"
          src={LOGO}
          alt="logo"
        />
        {user && (
        <div className="flex p-2 justify-between">
          <button className="mx-4 my-2 p-2 bg-purple-800 text-white rounded-lg" onClick={handleGPTSearch}>GPT Search</button>
          <img   
            alt="logo"
            className="hidden md:block w-12 h-12"
            src={user.photoURL}
          />
          <button onClick={logout} className="font-bold text-white">
            (Sign Out)
          </button>
        </div>
        )}
      </div>
    </>
  );
};

export default Header;
