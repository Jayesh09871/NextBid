import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="lg:hidden fixed right-5 top-5 bg-[#D6482B] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e]" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
  
      <nav className="bg-[#f6f4f0] p-4 fixed top-0 left-0 w-full z-10 border-b-[1px] border-b-stone-500">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="text-2xl font-semibold">
            Bid<span className="text-[#D6482b]">Hub</span>
          </Link>
          
          <div className="lg:flex items-center space-x-6 hidden">
            <ul className="flex space-x-6">
              <li>
                <Link to={"/auctions"} className="text-xl font-semibold hover:text-[#D6482b]">Auctions</Link>
              </li>
              <li>
                <Link to={"/leaderboard"} className="text-xl font-semibold hover:text-[#D6482b]">Leaderboard</Link>
              </li>
              {isAuthenticated && user && user.role === "Auctioneer" && (
                <>
                  <li>
                    <Link to={"/submit-commission"} className="text-xl font-semibold hover:text-[#D6482b]">Submit Commission</Link>
                  </li>
                  <li>
                    <Link to={"/create-auction"} className="text-xl font-semibold hover:text-[#D6482b]">Create Auction</Link>
                  </li>
                  <li>
                    <Link to={"/view-my-auctions"} className="text-xl font-semibold hover:text-[#D6482b]">View My Auctions</Link>
                  </li>
                </>
              )}
              {isAuthenticated && user && user.role === "Super Admin" && (
                <li>
                  <Link to={"/dashboard"} className="text-xl font-semibold hover:text-[#D6482b]">Dashboard</Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link to={"/me"} className="text-xl font-semibold hover:text-[#D6482b]">Profile</Link>
                </li>
              )}
              <li>
                <Link to={"/how-it-works-info"} className="text-xl font-semibold hover:text-[#D6482b]">How it works</Link>
              </li>
              <li>
                <Link to={"/about"} className="text-xl font-semibold hover:text-[#D6482b]">About Us</Link>
              </li>
            </ul>
            
            <div className="flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to={"/sign-up"} className="bg-[#D6482B] font-semibold text-white text-xl py-1 px-4 rounded-md">Sign Up</Link>
                  <Link to={"/login"} className="text-[#DECCBE] bg-transparent border-[#DECCBE] border-2 text-xl py-1 px-4 rounded-md">Login</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="bg-[#D6482B] font-semibold text-white text-xl py-1 px-4 rounded-md">Logout</button>
              )}
            </div>
          </div>
        </div>
      </nav>
  
      {/* Mobile View Navbar */}
      <div className={`w-[100%] sm:w-[300px] bg-[#f6f4f0] h-full fixed top-0 ${show ? "left-0" : "left-[-100%]"} transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-r-stone-500 lg:hidden`}>
        <div className="relative">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to={"/auctions"} className="text-xl font-semibold hover:text-[#D6482b]">Auctions</Link>
            </li>
            <li>
              <Link to={"/leaderboard"} className="text-xl font-semibold hover:text-[#D6482b]">Leaderboard</Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link to={"/submit-commission"} className="text-xl font-semibold hover:text-[#D6482b]">Submit Commission</Link>
                </li>
                <li>
                  <Link to={"/create-auction"} className="text-xl font-semibold hover:text-[#D6482b]">Create Auction</Link>
                </li>
                <li>
                  <Link to={"/view-my-auctions"} className="text-xl font-semibold hover:text-[#D6482b]">View My Auctions</Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link to={"/dashboard"} className="text-xl font-semibold hover:text-[#D6482b]">Dashboard</Link>
              </li>
            )}
          </ul>
  
          {!isAuthenticated ? (
            <>
              <div className="my-4 flex gap-2">
                <Link to={"/sign-up"} className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white">Sign Up</Link>
                <Link to={"/login"} className="text-[#DECCBE] bg-transparent border-[#DECCBE] border-2 hover:bg-[#fffefd] text-xl py-1 px-4 rounded-md">Login</Link>
              </div>
            </>
          ) : (
            <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
              <button className="bg-[#D6482B] font-semibold hover:bg-[#b8381e] text-xl py-1 px-4 rounded-md text-white">Logout</button>
            </div>
          )}
  
          <hr className="mb-4 border-t-[#d6482b]" />
          
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <Link to={"/me"} className="text-xl font-semibold hover:text-[#D6482b]">Profile</Link>
              </li>
            )}
            <li>
              <Link to={"/how-it-works-info"} className="text-xl font-semibold hover:text-[#D6482b]">How it works</Link>
            </li>
            <li>
              <Link to={"/about"} className="text-xl font-semibold hover:text-[#D6482b]">About Us</Link>
            </li>
          </ul>
          
          <IoMdCloseCircleOutline onClick={() => setShow(!show)} className="absolute top-0 right-4 text-[28px]" />
        </div>
      </div>
    </>
  );
  
};

export default SideDrawer;