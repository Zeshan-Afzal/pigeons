import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListCard from "../components/ListCard";
import data from "../data/data";
function Search() {
  const [filterData, setFilterData] = useState({
    searchTerm: "",
    offer: false,
    type: "all",
    furnished: false,
    parking: false,
    sort: "createdAt",
    order: "desc",
  });
  const navigat = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    if (urlSearchTerm) {
      data.map((item) => {
        if (item.id === urlSearchTerm) {
          setSearchResults(item);
          console.log(typeof searchResults);

          console.log(item);
        }
      });
    } else {
      setSearchResults(data);
    }

    // const urlType = urlParams.get("type");
    // const urlParking = urlParams.get("parking");
    // const urlFurnished = urlParams.get("furnished");
    // const urlOffer = urlParams.get("offer");
    // const urlSort = urlParams.get("sort");
    // const urlOrder = urlParams.get("order");

    // if (
    //   urlSearchTerm ||
    //   urlFurnished ||
    //   urlOffer ||
    //   urlOrder ||
    //   urlParking ||
    //   urlSort ||
    //   urlType
    // ) {
    //   setFilterData({
    //     searchTerm: String(urlSearchTerm) || "",
    //     type: urlType || "all",
    //     parking: urlParking === "true" || false,
    //     furnished: urlFurnished === "true" || false,
    //     offer: urlOffer === "true" || false,
    //     sort: urlSort || "createdAt",
    //     order: urlOrder || "desc",
    //   });
    // }

    // const getSearchResults = async () => {
    //   try {
    //     setLoading(true);
    //     let query = urlParams.toString();
    //     const res = await fetch(
    //       `https://embland-sbb3.vercel.app/api/listing/get?${query}`
    //     );
    //     const data = await res.json();
    //     setLoading(false);
    //     if (data.length > 8) {
    //       setShowMoreBtn(true);
    //     } else {
    //       setShowMoreBtn(false);
    //     }
    //     setSearchResults(data);
    //   } catch (error) {
    //     setLoading(false);
    //     console.log(error.message);
    //   }
    // };
    // getSearchResults();
  }, [location.search]);

  // const handleOnChange = (e) => {
  //   if (
  //     e.target.id === "all" ||
  //     e.target.id === "rent" ||
  //     e.target.id === "sale"
  //   ) {
  //     setFilterData({ ...filterData, type: e.target.id });
  //   }
  //   if (e.target.id === "searchTerm") {
  //     setFilterData({ ...filterData, searchTerm: e.target.value });
  //   }
  //   if (
  //     e.target.id === "parking" ||
  //     e.target.id === "offer" ||
  //     e.target.id === "furnished"
  //   ) {
  //     setFilterData({
  //       ...filterData,
  //       [e.target.id]:
  //         e.target.checked || e.target.checked === "true" ? true : false,
  //     });
  //   }
  //   if (e.target.id === "sort_order") {
  //     const sort = e.target.value.split("_")[0];
  //     const order = e.target.value.split("_")[1];
  //     setFilterData({ ...filterData, sort, order });
  //   }
  // };

  // const handleSubmitFilter = async (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams();
  //   urlParams.set("searchTerm", filterData.searchTerm);
  //   urlParams.set("offer", filterData.offer);
  //   urlParams.set("type", filterData.type);
  //   urlParams.set("furnished", filterData.furnished);
  //   urlParams.set("parking", filterData.parking);
  //   urlParams.set("order", filterData.order);
  //   urlParams.set("sort", filterData.sort);
  //   const query = urlParams.toString();
  //   navigat(`/search?${query}`);
  // };

  // const handleShowMoreBtn = async () => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const startIndex = searchResults.length;
  //   const query = urlParams.toString();
  //   const res = await fetch(
  //     `https://embland-sbb3.vercel.app/api/listing/get?${query}&startingIndex=${startIndex}`
  //   );
  //   const data = await res.json();
  //   if (data.length > 8) {
  //     setShowMoreBtn(true);
  //   } else {
  //     setShowMoreBtn(false);
  //   }
  //   setSearchResults((pre) => [...pre, ...data]);
  // };
  return (
    <div className=" flex flex-wrap md:flex-row">
      {/* <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmitFilter} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleOnChange}
              value={filterData.searchTerm}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleOnChange}
                checked={
                  filterData.type === "all" || filterData.type === undefined
                }
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleOnChange}
                checked={filterData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleOnChange}
                checked={filterData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleOnChange}
                checked={filterData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleOnChange}
                checked={filterData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleOnChange}
                checked={filterData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleOnChange}
              defaultValue="created_at_desc"
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Submit
          </button>
        </form>
      </div> */}
      <div className=" p-4 flex-1 flex flex-col ">
        <h1 className=" font-bold text-3xl ">Search Results:</h1>

        {loading && (
          <h1 className=" font-semibold mt-9 text-2xl text-center">
            Loading...
          </h1>
        )}
        {searchResults.length === 0 && (
          <h1 className=" font-semibold mt-9 text-2xl text-center ">
            No results Found
          </h1>
        )}

        <div className="flex gap-4 flex-wrap mt-5 justify-center md:justify-normal">
          <ListCard list={searchResults}></ListCard>
        </div>
      </div>
    </div>
  );
}

export default Search;
