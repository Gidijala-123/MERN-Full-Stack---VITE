import React, { useState } from "react";
import { useNavigate, Link, data } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userRedux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    }); /* To keep the input values of the form first we'll get previous data and then add new data */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields..!"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/userDetails/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (
          res.status === 401 &&
          data.message === "Invalid email or password"
        ) {
          return dispatch(
            signInFailure(
              data.message || "Invalid email or password. Please try again."
            )
          );
        } else {
          return dispatch(
            signInFailure(data.message || "Something went wrong")
          );
        }
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left div */}
        <div className="flex-1">
          {/* To make left and right div with equal width we use flex-1 */}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 text-white bg-gradient-to-r from-indigo-900 via-purple-500 to-pink-300 rounded-md">
              Bhargava's
            </span>
            Media
          </Link>
          <p className="text-sm mt-5">
            Hi Please signin by entering your email and password
          </p>
        </div>
        {/* right div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter your email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter your password" />
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign In"}
            </Button>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
}
