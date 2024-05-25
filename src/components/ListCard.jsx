import React from "react";
import { FaBath, FaBed, FaParking } from "react-icons/fa";
import { FaChair, FaLocationDot } from "react-icons/fa6";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

function ListCard({ list, handleDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  console.log(list, "list");
  return (
    <div className=" flex bg-white rounded-lg w-[350px] overflow-hidden  flex-col ">
      <Link className=" relative" to={`/listing/${String(list.id)}`}>
        <img
          src={list.imageUrls}
          alt=""
          className=" object-cover  h-[250px] w-[350px] rounded-t-lg rounded-tr-lg hover:scale-105 transition-scale duration-300 "
        />

        <p className=" font-semibold text-[22px] ml-3 mt-2 line-clamp-1">
          {list.name}
        </p>
        {/* <div className=" flex items-center gap-2 my-4 ml-3">
          <FaLocationDot className=" text-green-700"></FaLocationDot>
          <p className=" text-gray-600 ">{list.address}</p>
        </div>
        <p className=" line-clamp-2 ml-3">{list.description}</p>

        <p className=" text-[20px] ml-3 text-gray-600 my-2">
          {list.type === "rent" && "/month"}
        </p>

        <div className=" flex gap-3 flex-wrap ml-3 mb-4">
          <div className=" flex gap-2 items-center">
            <FaBed className="text-lg"></FaBed>
            <span className=" font-semibold ">Beds {list.bedrooms}</span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaBath className="text-lg"></FaBath>
            <span className=" font-semibold ">Baths {list.bathrooms}</span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaParking className="text-lg"></FaParking>
            <span className=" font-semibold ">
              {list.parking ? "Parking •Yes" : "Parking •No"}
            </span>
          </div>
          <div className=" flex gap-2 items-center">
            <FaChair className="text-lg"></FaChair>
            <span className=" font-semibold ">
              {list.furnished ? "Furnished •Yes" : "Furnished •No"}
            </span>
          </div>
        </div> */}
      </Link>
    </div>
  );
}

export default ListCard;
