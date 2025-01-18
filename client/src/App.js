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
import VerifyEmailToken from "./components/verify-email-token";
// import UserList from "./components/userlist";
// import FundAndEarn from "./components/funds-and-earnings";
// import OrderAnalytics from "./components/recent-orders";
// import OrdersPaidOrPending from "./components/recent-orders-paid";
import LoginPageX from "./pages/loginpage";
import DropperSignup from "./pages/dropper-signup";
import DropperDashboard from "./pages/dropper/dashboard/view";
import DropperProductsPage from "./pages/dropper/product/view";
import ProductRegistrationPage from "./pages/dropper/product/register";
import DropperOffersPage from "./pages/dropper/offer/view";
import OfferRegistrationPage from "./pages/dropper/offer/register";
import DropperCampaignPage from "./pages/dropper/campaign/view";
import DropperCampaignRegistrationPage from "./pages/dropper/campaign/register";
import DropperDropsPage from "./pages/dropper/drop/view";
import DropRegistrationPage from "./pages/dropper/drop/register";
import DropperUsersPage from "./pages/dropper/user/view";
import DropperUserRegistrationPage from "./pages/dropper/user/register";
import DropperRolesPage from "./pages/dropper/role/view";
import DropperRoleRegistrationPage from "./pages/dropper/role/register";
import DropperDeveloperConsolePage from "./pages/dropper/developer/view";
import DropperCredentialsPage from "./pages/dropper/developer/credentials/view";
import DropperCredentialRegistrationPage from "./pages/dropper/developer/credentials/register";

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
        path: "/signinpage",
        element: <LoginPageX />,
    },
    {
        path: "/verify/email/token/:token",
        element: <VerifyEmailToken />,
    },
    {
        path: "/signup/dropper",
        element: <DropperSignup />,
    },
    {
        path: "/dropper/dashboard",
        element: <DropperDashboard />,
    },
    {
        path: "/dropper/products",
        element: <DropperProductsPage />,
    },
    {
        path: "/dropper/product/register",
        element: <ProductRegistrationPage />,
    },
    {
        path: "/dropper/offers",
        element: <DropperOffersPage />,
    },
    {
        path: "/dropper/offer/register",
        element: <OfferRegistrationPage />,
    },
    {
        path: "/dropper/campaigns",
        element: <DropperCampaignPage />,
    },
    {
        path: "/dropper/campaign/register",
        element: <DropperCampaignRegistrationPage />,
    },
    {
        path: "/dropper/drops",
        element: <DropperDropsPage />,
    },
    {
        path: "/dropper/drop/register",
        element: <DropRegistrationPage />,
    },
    {
        path: "/dropper/users",
        element: <DropperUsersPage />,
    },
    {
        path: "/dropper/user/register",
        element: <DropperUserRegistrationPage />,
    },
    {
        path: "/dropper/roles",
        element: <DropperRolesPage />,
    },
    {
        path: "/dropper/role/register",
        element: <DropperRoleRegistrationPage />,
    },
    {
        path: "/dropper/developer/console",
        element: <DropperDeveloperConsolePage />,
    },
    {
        path: "/dropper/developer/credentials",
        element: <DropperCredentialsPage />,
    },
    {
        path: "/dropper/developer/credential/register",
        element: <DropperCredentialRegistrationPage />,
    },
]);

export default function App() {
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
