import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <div className='bg-zinc-900 shadow-inner text-xs pb-4 sm:text-base text-white w-full flex flex-col items-center'>
            <div className='w-auto flex flex-col sm:flex-row justify-between items-center py-2'>
                <p className='text-gray-300 px-4'>
                    © {date} No-Copyright
                </p>
                <p className='text-gray-300 px-4'>
                    info@mdzaid.us.kg
                </p>
            </div>
            <div className='w-auto text-center px-4'>
                <p className='text-gray-300'>
                MZ Tv is the premier platform for watching free movies online, but please note you may encounter ads & please disable Ad-Blocker
                </p>
            </div>
        </div>
    )
}

export default Footer;
