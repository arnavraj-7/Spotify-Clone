import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react'
import { LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import SignInOAuthButton from './SignInOAuthButton'

const topbar = () => {
    const isAdmin=false
  return (
<nav className="sticky w-full h-15 backdrop-blur-md text-white flex justify-between items-center px-4 bg-zinc-900/75">
  <div>
   Logo<span> Spotify</span>
  </div>
  <div>
    {isAdmin && <>
    <Link to="/admin">
    Admin Dashboard
    <LayoutDashboard className='size-4 mr-2'/>
    </Link></>}
        <SignedOut>
            <SignInOAuthButton/>
        </SignedOut>
         <SignedIn>
        <SignOutButton/>
      </SignedIn>
  </div>
</nav>
  )
}

export default topbar