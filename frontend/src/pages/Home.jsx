import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 lg:pl-[80px] flex flex-col min-h-screen py-4 justify-center bg-zinc-700 from-[#f9e7e3] via-[#fde5d8] to-[#ffe6c9]">
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1
      className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl drop-shadow-lg"
    >
      WinThrough ClearBid
    </h1>

    <div className="flex gap-4 my-8">
      {!isAuthenticated && (
        <>
        
        </>
      )}
    </div>
  </motion.div>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="flex flex-col gap-6"
  >
    <h3 className="text-black text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
      How it works
    </h3>
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
      {howItWorks.map((element) => {
        return (
          <motion.div
            key={element.title}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-400 flex flex-col gap-2 p-4 rounded-md h-[96px] justify-center md:w-[48%] lg:w-[47%] 2xl:w-[24%] hover:shadow-lg transition-all duration-300 border border-[#e8d7cf]"
          >
            <h5 className="font-bold text-[#d6482b]">{element.title}</h5>
            <p className="text-[#5b4c3b]">{element.description}</p>
          </motion.div>
        );
      })}
    </div>
  </motion.div>

  <FeaturedAuctions />
  <Leaderboard />
</section>

    </>
  );
};

export default Home;