// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Route, Routes } from "react-router-dom";
import { AuthCallbackPage } from "./pages/AuthCallbackPage.tsx";
import HomePage from "./pages/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout.tsx";
import { ChatPage } from "./pages/ChatPage.tsx";

function App() {
    return (
      <Routes>
        <Route path="/sso-callback" 
        element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>} />
        <Route path="/auth-callback" element={<AuthCallbackPage/>} />
        <Route element={<MainLayout/>}>
          <Route path="/" element={<HomePage/>} />          
          <Route path="/chat" element={<ChatPage/>} />          
        </Route>
      </Routes>
  );
}

export default App
