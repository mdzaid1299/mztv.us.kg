import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom'
import useTvShowInfo from '../customHooks/useTvShowInfo';
import TvShowInfoCard from './TvShowInfoCard';
import CastList from './CastList';
import Footer from './Footer';

const TvPage = () => {
    const {showId}=useParams();
    const {tvShow,casts}=useTvShowInfo(showId);
  return (
    <div className='bg-stone-900'>
        <Header/>
        <TvShowInfoCard tvShowInfo={tvShow}/>
        {/* <CastList title="Top Casts" casts={casts}/> */}
        <Footer/>
    </div>
  )
}

export default TvPage