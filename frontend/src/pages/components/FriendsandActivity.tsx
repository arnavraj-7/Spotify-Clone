import { Users2Icon } from 'lucide-react'
import  {  useEffect } from 'react'
import UserCard from '../cards/UserCard'
import useChatStore from '@/stores/ChatStore';
import { useAuth } from '@clerk/clerk-react';

const FriendsandActivity = () => {
    const {getToken}=useAuth();
    const {users,fetchUsers,}=useChatStore();
    useEffect(()=>{
        async function fetchData(){
           
            const token = await getToken();
            if(token===null) return
            fetchUsers(token);
        }
        fetchData();
    },[getToken])
  return (
    <div className='bg-zinc-900 rounded-md h-[calc(100vh-114px)]'>
        <div className='font-bold flex gap-x-2 items-center mb-3'>
            <Users2Icon size={30}/>
            What they're listening to?
        </div>
        <hr className='mb-3'/>
        <div className='flex flex-col gap-y-4'>
           { users.map((user)=>{
                return( <UserCard user={user} key={user._id}/>)
            })}
        </div>
    </div>
  )
}

export default FriendsandActivity