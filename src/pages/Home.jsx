import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListCard from "../components/ListCard";
import Footer from "../components/Footer";
import data from "../data/data";

function Home() {
  const [listingsWithOffer, setListingsWithOffer] = useState([]);
  const [listingsOnRent, setListingsOnRent] = useState([]);
  const [listingsForSale, setListingsForSale] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    setListingsForSale(data);
  }, []);

  return (
    <div>
      <div
        className=" h-[400px] sm:h-[550px]   bg-cover bg-center"
        style={{
          backgroundImage: `url(./img6.jpg)`,
        }}
      >
        <div className=" p-10 md:p-24 flex flex-col gap-9 ">
          <h1 className=" font-bold text-white text-xl md:text-5xl flex flex-col ml-8 self-center">
            <div className="">
              <span className=" text-red-500">MY</span>
              <span className=" text-blue-500">Pigeons</span>
            </div>
            Lorem ipsum dolor sit amet consectetur.
            <p className="text-white font-semibold md:text-2xl mt-3 md:ml-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing.
            </p>
          </h1>
          <div className=" self-center">
            <button className=" p-1 ml-8 md:ml-12 md:p-3 bg-red-500 text-white font-semibold rounded-lg w-52 hover:opacity-85 transition-opacity duration-300">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div className=" max-w-6xl mx-auto p-8">
        <div className=" flex flex-col gap-3 ">
          <h1 className=" font-semibold text-xl md:text-3xl ">All Pigeons</h1>
        </div>
        <div className=" flex flex-wrap justify-center md:justify-normal gap-3 mt-4  ">
          {listingsForSale &&
            listingsForSale.length > 0 &&
            listingsForSale.map((list) => (
              <ListCard key={list._id} list={list}></ListCard>
            ))}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Home;
