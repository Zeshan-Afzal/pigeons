import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { FaListAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdCreate } from "react-icons/io";
import { TiUserDelete } from "react-icons/ti";
import { LiaSignOutAltSolid } from "react-icons/lia";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { Link } from "react-router-dom";
import ListCard from "../components/ListCard";

import {
  updateingStart,
  updateSuccess,
  updateFailiure,
  deleteStart,
  deleteFailiure,
  deleteSuccess,
  signOutStart,
  signOutSuccess,
  signOutFailiure,
} from "../store/user/userSlice";
function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef();
  let style;
  const [file, setFile] = useState(null);
  const [fireBaseError, setFireBaseError] = useState(false);
  const [tabOpen, setTabOpen] = useState("profile");
  const [uploadPercentage, seUploadPercentage] = useState(0);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleUploadeFile(file);
    }
  }, [file]);

  const handleUploadeFile = (file) => {
    const storage = getStorage(app);
    const fileName = Date.now() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadeFile = uploadBytesResumable(storageRef, file);

    uploadeFile.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        seUploadPercentage(Math.round(progress));
      },
      (fireBaseError) => {
        setFireBaseError(true);
      },

      () => {
        getDownloadURL(uploadeFile.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateingStart());
    try {
      const res = await fetch(
        `https://embland-sbb3.vercel.app/api/user-upd/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === "false") {
        dispatch(updateFailiure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
    } catch (error) {
      dispatch(updateFailiure(error.message));
    }
  };

  const hanldeClick = async () => {
    try {
      dispatch(deleteStart);

      const res = await fetch(
        `https://embland-sbb3.vercel.app/api/user-upd/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === "false") {
        dispatch(deleteFailiure(data.message));
        return;
      }

      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailiure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart);
      const res = await fetch(
        "https://embland-sbb3.vercel.app/api/user/sign-out"
      );

      const data = await res.json();
      if (data.success === "false") {
        dispatch(signOutFailiure(data.message));
        return;
      }

      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailiure(error.message));
    }
  };

  const handleShowUserListings = async () => {
    try {
      setTabOpen("listing");
      const res = await fetch(
        `https://embland-sbb3.vercel.app/api/user-upd/user-listings/${currentUser._id}`
      );

      const data = await res.json();
      setUserListings(data);

      //ADD SOME MORE DETAIL
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteListing = async (id) => {
    console.log(id);
    try {
      const res = await fetch(
        `https://embland-sbb3.vercel.app/api/user-upd/delete-listing/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      setUserListings((prev) => prev.filter((list) => list._id !== id));

      //ADD SOME MORE DETAIL
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex pt-2 md:p-2 gap-3">
      <div className="  flex flex-col w-16 md:w-56 border  border-gray-300 rounded-lg gap-0 shadow-lg">
        <div
          onClick={() => setTabOpen("profile")}
          className=" flex items-center  gap-1  md:justify-normal justify-center  mt-8 hover:bg-slate-200 p-2 rounded-lg transition-all duration-200  cursor-pointer"
        >
          <CgProfile className=" text-2xl font-bold text-blue-600"></CgProfile>
          <p className=" text-xl font-semibold md:inline hidden text-blue-600">
            Profle
          </p>
        </div>
        <div
          onClick={handleShowUserListings}
          className="  md:justify-normal justify-center flex items-center  gap-1 mt-8 hover:bg-slate-200 p-2 rounded-lg transition-all duration-200  cursor-pointer"
        >
          <FaListAlt className=" text-2xl font-bold text-blue-600"></FaListAlt>
          <p className=" text-xl font-semibold md:inline hidden text-blue-600">
            Listings
          </p>
        </div>

        <Link
          className=" md:justify-normal justify-center flex items-center  gap-1  mt-8 hover:bg-slate-200 p-2 rounded-lg transition-all duration-200  cursor-pointer"
          to="/create-listing"
        >
          <IoMdCreate className=" text-2xl font-bold text-blue-600"></IoMdCreate>
          <p className=" text-xl font-semibold md:inline hidden text-blue-600">
            Create
          </p>
        </Link>

        <div
          onClick={hanldeClick}
          className=" md:justify-normal justify-center flex items-center  gap-1  mt-8 hover:bg-slate-200 p-2 rounded-lg transition-all duration-200  cursor-pointer"
        >
          <TiUserDelete className=" text-2xl font-bold text-red-600"></TiUserDelete>
          <p className=" text-xl font-semibold md:inline hidden text-red-600">
            Delete Acc{" "}
          </p>
        </div>
        <div
          onClick={handleSignOut}
          className=" md:justify-normal justify-center flex items-center  gap-1  mt-8 hover:bg-slate-200 p-2 rounded-lg transition-all duration-200  cursor-pointer"
        >
          <LiaSignOutAltSolid className=" text-2xl font-bold text-blue-600"></LiaSignOutAltSolid>
          <p className=" text-xl font-semibold md:inline hidden text-blue-600">
            Signout{" "}
          </p>
        </div>
      </div>

      <div className=" w-full ">
        <h1 className=" font-semibold text-center text-3xl  my-7 ">
          {tabOpen === "profile" ? "Profile" : "Listings"}
        </h1>
        {tabOpen === "profile" && (
          <form
            onSubmit={handleSubmit}
            className=" flex md:w-2/3 mx-auto flex-col  gap-4"
          >
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name=""
              id=""
              hidden
              ref={fileRef}
            />

            <img
              src={formData?.avatar || currentUser.avatar}
              alt="profile"
              className=" cursor-pointer w-28 h-28 object-cover rounded-full self-center hover:opacity-70"
              onClick={() => console.log(fileRef.current.click())}
            />

            {fireBaseError ? (
              <p className=" text-red-700 text-center ">
                fireBaseError uploading image(imgae must be less than 2mb)
              </p>
            ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
              <p className=" text-center text-blue-400">{`file uploading ${uploadPercentage}% done`}</p>
            ) : uploadPercentage === 100 ? (
              <p
                className={`text-green-700 text-center ${
                  formData.avatar ? "hidden" : "inline"
                } `}
              >
                {" "}
                uploaded successfully
              </p>
            ) : (
              ""
            )}

            <input
              type="text"
              placeholder="username"
              className=" p-3 rounded-lg focus:outline-none "
              id="username"
              onChange={handleChange}
              defaultValue={currentUser.username}
            />
            <input
              type="email"
              placeholder="email"
              className=" p-3 rounded-lg focus:outline-none "
              id="email"
              onChange={handleChange}
              defaultValue={currentUser.email}
            />
            <input
              type="password "
              placeholder="password"
              className=" p-3 rounded-lg focus:outline-none "
              id="password"
              onChange={handleChange}
            />
            <button className=" uppercase text-white p-3 rounded-lg bg-slate-700 hover:opacity-95">
              {loading ? "loading" : "update"}
            </button>
          </form>
        )}

        {error ? <p className="text-red-700 ">{error}</p> : ""}

        <div className=" flex flex-wrap gap-3">
          {tabOpen === "listing" &&
            userListings &&
            userListings.length > 0 &&
            userListings?.map((list) => (
              <ListCard
                key={list._id}
                list={list}
                handleDelete={handleDeleteListing}
              ></ListCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
