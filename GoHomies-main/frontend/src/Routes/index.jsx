import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import LandingPage from "../Pages/LandingPage";
import SignIn from "../sign-in/SignIn";
import SignUp from '../sign-up/SignUp';
import UserProfile from "../Pages/UserProfilePage/UserProfile";
import AboutUs from "../Pages/AboutUsPage/AboutUs";
import ContactUs from "../Pages/ContactUsPage/ContactUs";
import Posts from "../Pages/PostsPage/Posts";
import Vlogs from "../Pages/VlogsPage/Vlogs";
import Booking from "../Pages/BookingPage/Booking";

const Routers = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<LandingPage/>
            },
            {
                path:'/posts',
                element:<Posts/>
            },
            {
                path:'/vlogs',
                element:<Vlogs/>
            },
            {
                path:'/booking',
                element:<Booking/>
            },
            {
                path: '/about_us',
                element: <AboutUs/>
            },
            {
                path: '/contact_us',
                element: <ContactUs/>
            },
            {
                path:'/userprofile',
                element:<UserProfile/>
            }
        ]
    },
    {
        path:'/signin',
        element:<SignIn/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    }
])

export default Routers