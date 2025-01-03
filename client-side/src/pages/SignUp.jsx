import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Form, Link } from "react-router-dom";

export default function SignUp() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Enter your name" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
              ></TextInput>
            </div>
            <div>
              <Label value="Enter your email" />
              <TextInput
                type="mail"
                placeholder="name@company.com"
                id="mail"
              ></TextInput>
            </div>
            <div>
              <Label value="Enter your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
              ></TextInput>
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-1 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
