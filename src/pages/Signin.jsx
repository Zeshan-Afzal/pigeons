import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sigInStart,
  signInSuccess,
  signInFailiure,
} from "../store/user/userSlice.js";
import GoogleOAuth from "../components/GoogleOAuth.jsx";
function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(sigInStart());
    try {
      const res = await fetch(
        "https://embland-sbb3.vercel.app/api/user/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailiure(data.message));

        return;
      }

      navigate("/");
      dispatch(signInSuccess(data));
    } catch (error) {
      signInFailiure(error.message);
    }
  };

  return (
    <div className=" mx-auto max-w-lg">
      <h1 className="font-semibold text-3xl text-center my-7">Sign In</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit} className="  flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="p-3 border focus:outline-none rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border focus:outline-none rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className=" uppercase p-3 bg-slate-600 text-white rounded-lg hover:opacity-95 "
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        <GoogleOAuth></GoogleOAuth>
      </form>

      <div className="flex gap-4 mt-4">
        <p>Dont have a account?</p>
        <Link to="/sign-up">
          <span className=" text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
