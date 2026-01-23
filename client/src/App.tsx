import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/Home";
import Notifications from "./pages/Notiication";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import HowNftsWorks from "./pages/HowNftsWorks";
import Goods from "./pages/Goods";
import NFTDetails from "./pages/NFTDetails";
import MintForm from "./components/MintForm";
import Profile from "./pages/Profile";
import ProfileGoods from "./pages/ProfileGoods";
import NFTOwnershipCheck from "./pages/NFTOwnershipCheck";
import CreateAuctionHouse from "./pages/CreateAuctionHouse";
import MyNFTsPage from "./pages/MyNFTsPage";


function App() {
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <Layout>
              <Notifications />
            </Layout>
          }
        />

        
        <Route
          path="/productdetails"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />

        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />

        
        <Route
          path="/auctionhouse"
          element={
            <Layout>
              <CreateAuctionHouse />
            </Layout>
          }
        />
       
        

        <Route
          path="/user"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
       
        <Route
          path="/hownftsworks"
          element={
            <Layout>
              <HowNftsWorks />
            </Layout>
          }
        />
        <Route
          path="/goods"
          element={
            <Layout>
              <Goods />
            </Layout>
          }
        />
        <Route path="/nft/:mintAddress" element={<NFTDetails />} />
        <Route
          path="/mygoods"
          element={
            <Layout>
              <ProfileGoods />
            </Layout>
          }
        />
        {/* <Route
          path="/create-auction-house"
          element={
            <Layout>
              <CreateAuctionHousePage />
            </Layout>
          }
        /> */}
        <Route
          path="/mint"
          element={
            <Layout>
              <MintForm />
            </Layout>
          }
        />
       
          <Route
          path="/mynfts"
          element={
            <Layout>
              <MyNFTsPage/>
            </Layout>
          } />
        <Route
          path="/checking"
          element={
            <Layout>
              <NFTOwnershipCheck />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
