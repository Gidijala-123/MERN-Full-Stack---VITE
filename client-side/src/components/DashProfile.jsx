import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const currentUser = useSelector((state) => state.user?.currentUser);

  if (!currentUser) {
    return <div>Loading...</div>; // or handle the case where currentUser is not available
  }

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.userProfilePic}
            alt="user"
            className="rounded-full w-full h-full border-6 object-cover border-lightgrey"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="enter name"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="enter email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update Profile
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Signout</span>
      </div>
    </div>
  );
}
