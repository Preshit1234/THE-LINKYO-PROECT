import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import FaqAccordion from "./components/faq-accordion";
// import { gsap } from 'gsap';
import Header from "./components/header";
import Test from "./components/test";
import BrowseDrops from "./pages/browse-drops";
import CreateDrop from "./pages/create-drop";
import LoginPage from "./pages/login-page";
import CheckEmail from "./pages/check-yo-email";
import CreateAffiliateLink from "./prototype/create-affiliate-link";
import FakeProduct from "./prototype/fake-product";
import { HelmetProvider } from "react-helmet-async";
import SignupPage from "./pages/signup-page";
import Finalise from "./pages/final-form";
import EmailConfirmation from "./components/email-confirmation";
import UserCard from "./components/usercards";
import ViewDrop from "./pages/view-drop";
import GraphSet1 from "./components/graph-set-1";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProvider from "./contexts/UserContext";
import EditUser from "./pages/edit-user";
import LandingUserPage from "./pages/final-landing-page";
// import UserList from "./components/userlist";
// import FundAndEarn from "./components/funds-and-earnings";
// import OrderAnalytics from "./components/recent-orders";
// import OrdersPaidOrPending from "./components/recent-orders-paid";
import LoginPageX from "./pages/loginpage";

const router = createBrowserRouter([
    {
        path: "/welcome",
        element: <h1>Welcome to Linkyo</h1>,
    },
    {
        path: "/",
        element: <LandingPage title="Linkyo | 10x growth for SaaS" />,
    },
    {
        path: "/accordion",
        element: <FaqAccordion />,
    },
    {
        path: "/header",
        element: <Header type="login" />,
    },
    {
        path: "/browse/drops",
        element: <BrowseDrops />,
    },
    {
        path: "/create/drop",
        element: <CreateDrop />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/confirmemail",
        element: <CheckEmail />,
    },
    {
        path: "/prototype/affiliateLink",
        element: <CreateAffiliateLink />,
    },
    {
        path: "/prototype/fakeURL/fakeProduct",
        element: <FakeProduct />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/welcomepage",
        element: <Finalise />,
    },
    {
        //This is component, I'm using this only for testing purpose
        path: "/emailcomponent",
        element: <EmailConfirmation />,
    },
    {
        //This is component, I'm using this only for testing purpose
        path: "/usercardtest",
        element: <UserCard />,
    },
    {
        path: "/view/drop",
        element: <ViewDrop />,
    },
    {
        path: "/graphset1",
        element: <GraphSet1 />,
    },
    {
        path: "/edit/user",
        element: <EditUser />,
    },
    {
        path: "/landinghomepage",
        element: <LandingUserPage />,
    },
    {
        path : "/signinpage",
        element : <LoginPageX />
    }
]);

export default function App() {
    // const [user, setUser] = useState(null);

    // async function getUser() {
    //     try {
    //         const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
    //         const { data } = await axios.get(url, { withCredentials: true });
    //         setUser(data.user._json);
    // 		console.log(data.user._json);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // useEffect(() => {
    //     getUser();
    // }, []);

    return (
        <UserProvider>
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
                <HelmetProvider>
                    <RouterProvider router={router} />
                </HelmetProvider>
            </GoogleOAuthProvider>
        </UserProvider>
    );
}
