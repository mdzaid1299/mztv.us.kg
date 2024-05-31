import React from 'react'
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
            <div>
              <Bars
                height="80"
                width="80"
                color="#df0909"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
  )
}

export default Loader