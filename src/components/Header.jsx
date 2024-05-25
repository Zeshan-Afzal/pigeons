import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigat = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);
    url.set("searchTerm", searchTerm);
    const query = url.toString();
    navigat(`/search?${query}`);
  };

  useEffect(() => {
    const getUrlParams = new URLSearchParams(location.search);
    const urlSearchTerm = getUrlParams.get("searchTerm");
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-slate-100  p-6 shadow-lg  relative w-full  ">
        <div className=" max-w-6xl mx-auto flex justify-between items-center ">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-2xl mr-2">
              <span className="text-red-500">My</span>
              <span className="text-blue-700">Pigeons</span>
            </h1>
          </Link>

          <form
            onSubmit={handleSearch}
            className=" bg-slate-200 p-2 rounded-lg flex items-center sm:w-96"
          >
            <input
              type="text"
              placeholder="Search here....."
              className="focus:outline-none ps-2 rounded-lg bg-transparent  w-11/12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className=" cursor-pointer ml-2 sm:text-xl"></FaSearch>
            </button>
          </form>

          <ul className=" flex gap-4  items-center ">
            <Link to="/">
              <li className="hidden sm:inline cursor-pointer hover:text-red-500 transition-all duration-200 hover:underline  font-semibold text-xl ">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className="hidden sm:inline cursor-pointer hover:text-red-500 transition-all hover:underline duration-200 font-semibold text-xl ">
                About
              </li>
            </Link>

            {/* <Link to="/profile">
              {currentUser ? (
                <img
                  className=" rounded-full w-7 h-7 object-cover "
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <li className=" cursor-pointer hover:bg-blue-400 hover:text-white transition-all duration-200 bg-blue-100 border border-blue-500 text-blue-500 md:p-2 w-20 p-1 mr-1 rounded-lg   md:w-36 text-center  ">
                  Sing In
                </li>
              )}
            </Link> */}
          </ul>
        </div>
        {/* <SideBar></SideBar> */}
      </header>
    </>
  );
}

export default Header;
