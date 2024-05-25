import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ContactOwner({ listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const getListing = async () => {
      try {
        const res = await fetch(
          `https://embland-sbb3.vercel.app/api/user-upd/get/${listing.userRef}`
        );
        const data = await res.json();

        setOwner(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getListing();
  }, [listing.userRef]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    owner && (
      <div className=" flex flex-col gap-3  ">
        <div className=" flex gap-3 ">
          <span className=" font-bold text-2xl ">Contact:</span>
          <span className=" font-semibold text-2xl">{owner.username}</span>
        </div>
        <div className="flex gap-3 ">
          <span className=" font-bold text-2xl ">For:</span>
          <span className=" font-semibold text-2xl">{listing.name}</span>
        </div>

        <textarea
          onChange={handleChange}
          value={message}
          name="message"
          className=" w-full rounded-lg p-3"
          placeholder=" Enter your message here..."
          id=""
        ></textarea>

        <Link
          to={`mailTo:${owner.email}?subject=Regarding${listing.name}&body=${message} `}
        >
          <button className=" bg-blue-950 p-3 rounded-lg  w-44 text-white mt-5 uppercase block hover:opacity-85 text-[16px]">
            Send
          </button>
        </Link>
      </div>
    )
  );
}

export default ContactOwner;
