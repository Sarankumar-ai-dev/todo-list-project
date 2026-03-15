import { useState } from 'react'
import Navbar from '../components/navbar/Navbar.jsx';
import Search from "../components/search/Search.jsx";
import Content from "../components/content/Content.jsx";
import Fotter from "../components/fotter/Fotter.jsx";
function Home() {
  
      const [search,setSearch]=useState("");
  return (
    <>
      <Navbar />
      <Search search={search} setSearch={setSearch}/>
      <Content search={search}/>
      <Fotter />
    </>
  )
}

export default Home
