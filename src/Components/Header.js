import React from 'react'
import {  signOut } from "firebase/auth"
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const handleSignOut = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/")
          }).catch((error) => {
            // An error happened.
            navigate("/error")
          });
    }

    return (
        <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex items-center justify-between'>
            <img className='w-44' src='https://w7.pngwing.com/pngs/26/116/png-transparent-netflix-logo-netflix-television-show-streaming-media-film-netflix-logo-television-text-trademark-thumbnail.png' alt='logo' />
            <div className='flex items-center'>
                <img className='w-12 h-12 sm:w-10 sm:h-10' src='https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e' alt='avatar' />
                <button onClick={handleSignOut} className='ml-2 text-white font-semibold'>Sign Out</button>
            </div>
        </div>
    );
}

export default Header;
