import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleOAuth from "../components/GoogleOAuth";

function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://embland-sbb3.vercel.app/api/user/sign-up",
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
        setLoading(false);
        setError(data.message);
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className=" mx-auto max-w-lg">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={onSubmit} className="  flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="p-3 border focus:outline-none rounded-lg "
          id="username"
          onChange={handleChange}
        />
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
          className=" p-3 uppercase bg-slate-600 text-white rounded-lg hover:opacity-95 "
        >
          {loading ? "Loading" : "Sign up"}
        </button>
        <GoogleOAuth></GoogleOAuth>
      </form>

      <div className="flex gap-4 mt-4">
        <p>already have a account?</p>
        <Link to="/sign-in">
          <span className=" text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
