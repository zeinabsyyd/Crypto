import { useEffect, useState } from "react";
import { getCoin } from "../services/api";
import Loader from "./Loader";
import Coin from "./Coin"

function Landing() {
  const [coin, setCoin] = useState([]);
  const [search,setSearch]=useState("");
  useEffect(() => {
    const fetchApi = async () => {
      setCoin(await getCoin());
    };
    fetchApi();
  }, []);
  console.log(coin);

  const searchHandler=event=>{
        setSearch(event.target.value)
  }
  const searchedCion=coin.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()));
  return (
    
      <div className="flex flex-col items-center gap-8 py-4 relative">
        <h1 className="font-bold text-4xl text-slate-800 uppercase">coins market</h1>
        <input type="search" className="text-gray-700 outline-none p-2 rounded-md border-2 bg-slate-100 w-1/3 " value={search} placeholder="Search..." onChange={searchHandler} />
        {coin.length ? (
          <div className="border-2 divide-y-2 rounded-xl bg-slate-100">
            {searchedCion.map((coin) => (
             <Coin 
             key={coin.id}
             image={coin.image}
             name={coin.name}
             symbol={coin.symbol}
             price={coin.current_price}
             market_cap={coin.market_cap}
             price_change_percentage_24h={coin.price_change_percentage_24h}
             />
            ))}
          </div>
        ) : (
          <Loader />
        )}
        
        <div className="absolute top-full left-0 h-screen ">
            <a href="#" className="fixed animate-bounce bottom-0 left-0 m-4 p-2 w-12 text-center  bg-gray-500 hover:bg-gray-400 rounded-full text-white font-bold"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M10.94 7.94a1.5 1.5 0 0 1 2.12 0l5.658 5.656a1.5 1.5 0 1 1-2.122 2.121L12 11.121l-4.596 4.596a1.5 1.5 0 1 1-2.122-2.12l5.657-5.658Z"/></g></svg></a></div>
      </div>

  );
}

export default Landing;
