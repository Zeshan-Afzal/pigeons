import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../store/user/userSlice";

function GoogleOAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      try {
        const res = await fetch(
          "https://embland-sbb3.vercel.app/api/user/google-auth",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: result.user.displayName,
              email: result.user.email,
              photo: result.user.photoURL,
            }),
          }
        );
        const data = await res.json();

        dispatch(signInSuccess(data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("error in logging in with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className=" bg-red-500 p-3 text-white uppercase rounded-lg hover:opacity-95 "
    >
      continue with google
    </button>
  );
}

export default GoogleOAuth;
