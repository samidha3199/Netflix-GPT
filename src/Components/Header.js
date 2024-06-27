import React from 'react'
import {  signOut } from "firebase/auth"
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from "../utils/userSlice"
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants'
import { toggleGptSearchView } from "../utils/gptSlice"
import { changeLanguage } from "../utils/configSlice"

const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = useSelector((store) => store.user);

    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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


    const handleGptSearchClick = () => {
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };


    return (
        <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between'>
            <img className='w-44' src={ LOGO } alt='logo' />
            {user && (
                <div className='flex items-center py-2 px-4 gap-4'>

                    {
                        showGptSearch && (
                            <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
                                {
                                    SUPPORTED_LANGUAGES.map((lang)=>{
                                        return(
                                            <option key={lang.identifier} value="en">{lang.name}</option>
                                        )
                                    })
                                }
                            </select>
                        )
                    }
                    
                    <button onClick={handleGptSearchClick} className='text-white border border-white rounded py-2 px-4 bg-transparent hover:bg-white hover:text-black'>
                        {showGptSearch ? "Homepage" : "GPT Search"}
                    </button>
                    <img className='w-12 h-12 sm:w-10 sm:h-10' 
                    src={user?.photoURL} alt='avatar' />
                    <button onClick={handleSignOut} className='text-white font-semibold'>Sign Out</button>
                </div>
            )}
        </div>
    );
}

export default Header;
