import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userRedux/userSlice";
import app from "../firebase"; // Ensure you have initialized Firebase
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAuthLogin = async () => {
    dispatch(signInStart());
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const response = await fetch("/api/userDetails/googleLogin", {
        // Ensure this URL matches your server's URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleName: resultsFromGoogle.user.displayName,
          googleEmail: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return dispatch(
          signInFailure(errorData.message || "Something went wrong")
        );
      }

      const data = await response.json();
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="purpleToBlue"
      className="w-full h-10"
      onClick={handleOAuthLogin}
    >
      <AiFillGoogleCircle className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
