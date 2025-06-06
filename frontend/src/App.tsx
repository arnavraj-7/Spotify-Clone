// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Route, Routes } from "react-router-dom";
import { AuthCallbackPage } from "./pages/AuthCallbackPage.tsx";
import HomePage from "./pages/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout.tsx";
import { ChatPage } from "./pages/ChatPage.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";
import MadeForYou from "./pages/MadeForYou.tsx";
import Trending from "./pages/TrendingPage.tsx";
import Topbar from "./components/ui/Topbar.tsx";
import FullPlayer from "./pages/FullPlayer.tsx";
import LocationProvider from "./provider/LocationProvider.tsx";
import AdminPage from "./pages/Admin/AdminPage.tsx";
import Albums from "./pages/Admin/Albums.tsx";
import Songs from "./pages/Admin/Songs.tsx";
import RequestBackend from "./pages/RequestBackend.tsx";

function App() {
    return (
      <Routes>
        <Route path="/sso-callback" 
        element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>} />
        <Route element={<><LocationProvider><MainLayout/></LocationProvider></>}>
          <Route path="/" element={<HomePage/>} />          
          <Route path="/chat" element={<ChatPage/>} />          
          <Route path="/album/:id" element={<AlbumPage/>} />          
          <Route path="/made-for-you" element={<><Topbar/><MadeForYou/></>} />          
          <Route path="/trending" element={<><Topbar/><Trending/></>} />        
          <Route path="song-player" element={<FullPlayer/>} />        
        </Route>
        <Route path="/req" element={<RequestBackend/>}/>
          <Route path="admin/dashboard" element={<AdminPage/>} >
          <Route index element={<Songs/>}/>
          <Route path="albums" element={<Albums/>}/>
          </Route>        
      </Routes>
  );
}

export default App
