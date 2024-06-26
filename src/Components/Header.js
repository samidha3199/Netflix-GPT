import React from 'react'
import {  signOut } from "firebase/auth"
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO } from '../utils/constants'

const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector((store) => store.user);

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
        }).catch((error) => {
            // An error happened.
            navigate("/error")
        });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL } = user.uid;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
                navigate("/browse")
            } else {
                // User is signed out
                dispatch(removeUser())
                navigate("/")
            }
        });
        return () => unsubscribe();
    },[])


    return (
        <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between'>
            <img className='w-44' src={ LOGO } alt='logo' />
            {user && (
                <div className='flex items-center'>
                    <img className='w-12 h-12 sm:w-10 sm:h-10' 
                    src={user?.photoURL} alt='avatar' />
                    <button onClick={handleSignOut} className='ml-2 text-white font-semibold'>Sign Out</button>
                </div>
            )}
        </div>
    );
}

export default Header;
