
import { Header, PostCreationSection, PostFeedSection, TopPackages } from '../Components'

import Footer from '../Components/Footer/Footer'



const LandingPage = () => {




  return (
    <div className='flex flex-col'>
      
        <Header/>
        <TopPackages/>
        <PostCreationSection/>
        <PostFeedSection/>  
        <Footer/>
    </div>
  )
}

export default LandingPage