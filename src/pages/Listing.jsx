import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { FaChair } from "react-icons/fa";
import ContactOwner from "../components/ContactOwner";
import data from "../data/data";
SwiperCore.use([Navigation]);
function Listing() {
  const [listing, setListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const listId = params.listingId;
    console.log(listId);

    data.map((item) => {
      if (item.id === listId) {
        setListing(item);
        console.log(item);
      }
    });
  }, [params.listingId]);

  return (
    <main>
      {listing && (
        <>
          <div>
            <Swiper navigation>
              <SwiperSlide>
                <div
                  className="h-[550px]   bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${listing.imageUrls}')`,
                  }}
                ></div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="max-w-4xl mx-auto p-5 gap-4 flex-col flex ">
            <div className="">
              <h1 className=" text-3xl font-bold my-4">
                {listing.name} -{" "}
                {listing.type === "rent" && <span>/month</span>}
              </h1>

              <div className=" flex gap-2 items-center">
                <FaLocationDot className=" text-green-700"></FaLocationDot>
                <span className=" text-gray-600 ">{listing.address}</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              <button className="capitalize p-2 bg-red-600  rounded-lg text-white w-44  ">
                tag: {listing.id}
              </button>
              {listing.offer && (
                <button className=" capitalize p-2  bg-green-600  rounded-lg text-white  w-44 ">
                  ${listing.discountPrice} discounted
                </button>
              )}
            </div>

            <div className=" ">
              <span className=" font-bold text-xl">Description- </span>
              <span className=" text-gray-600 text-lg">
                {listing.description}
              </span>
            </div>

            {/* <div className=" flex gap-5 flex-wrap">
              <div className=" flex gap-3 items-center">
                <FaBed className="text-2xl"></FaBed>
                <span className=" font-semibold ">Beds {listing.bedrooms}</span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaBath className="text-2xl"></FaBath>
                <span className=" font-semibold ">
                  Baths {listing.bathrooms}
                </span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaParking className="text-2xl"></FaParking>
                <span className=" font-semibold ">
                  {listing.parking ? "Parking •Yes" : "Parking •No"}
                </span>
              </div>
              <div className=" flex gap-3 items-center">
                <FaChair className="text-2xl"></FaChair>
                <span className=" font-semibold ">
                  {listing.furnished ? "Furnished •Yes" : "Furnished •No"}
                </span>
              </div>
            </div> */}
          </div>
        </>
      )}
    </main>
  );
}

export default Listing;
