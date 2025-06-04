import { Users2Icon } from 'lucide-react'
import React, { use, useEffect } from 'react'
import UserCard from '../cards/UserCard'
import useChatStore from '@/stores/ChatStore';

const FriendsandActivity = () => {
    const {users,fetchUsers,isLoading,error}=useChatStore();
    useEffect(()=>{
        fetchUsers();
    },[])
  return (
    <div className='bg-zinc-900 rounded-md h-[calc(100vh-25px)]'>
        <div className='font-bold flex gap-x-2 items-center mb-3'>
            <Users2Icon size={30}/>
            What they're listening to?
        </div>
        <hr className='mb-3'/>
        <div className='flex flex-col gap-y-4'>
           { users.map((user)=>{
                return( <UserCard user={user}/>)
            })}
                <UserCard user={{name:"Guest User",isOnline:true}}/>

        </div>
    </div>
  )
}

export default FriendsandActivity