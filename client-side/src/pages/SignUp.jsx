import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); //display error if any of the form field is empty
  const [loading, setLoading] = useState(false); //to display loading effect while submitting a form
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
    if (!formData.userName || !formData.userMail || !formData.userPassword) {
      return setErrorMessage("Please fill out all fields..!");
    }
    try {
      setLoading(true); // while submitting a form display a loading effect
      setErrorMessage(null); // to clean any existing error messages
      const res = await fetch("/api/userDetails/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false); //if everything is ok while submitting a form
      res.ok ? navigate("/signin") : "";
    } catch (error) {
      //it's a client side error if user faces errors like internet issues
      setErrorMessage(error.message);
      setLoading(false); //if everything is ok while submitting a formsetLoading
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
            Hi this is the demo paragraph for my page where you can check how
            its working
          </p>
        </div>
        {/* right div */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Enter your name" />
              <TextInput
                type="text"
                placeholder="UserName"
                id="userName"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Enter your userMail" />
              <TextInput
                type="userMail"
                placeholder="name@company.com"
                id="userMail"
                onChange={handleChange}
              ></TextInput>
            </div>
            <div>
              <Label value="Enter your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="userPassword"
                onChange={handleChange}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
