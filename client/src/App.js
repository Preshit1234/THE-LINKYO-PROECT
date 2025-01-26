import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
    return (
        <UserProvider>
            <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
                <HelmetProvider>
                    <BrowserRouter
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true,
                        }}
                    >
                        <Routes>
                            <Route
                                path="/welcome"
                                element={<h1>Welcome to Linkyo</h1>}
                            />
                            <Route
                                path="/"
                                element={
                                    <LandingPage title="Linkyo | 10x growth for SaaS" />
                                }
                            />
                            <Route
                                path="/accordion"
                                element={<FaqAccordion />}
                            />
                            <Route
                                path="/header"
                                element={<Header type="login" />}
                            />
                            <Route
                                path="/browse/drops"
                                element={<BrowseDrops />}
                            />
                            <Route
                                path="/create/drop"
                                element={<CreateDrop />}
                            />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/test" element={<Test />} />
                            <Route
                                path="/confirmemail"
                                element={<CheckEmail />}
                            />
                            <Route
                                path="/prototype/affiliateLink"
                                element={<CreateAffiliateLink />}
                            />
                            <Route
                                path="/prototype/fakeURL/fakeProduct"
                                element={<FakeProduct />}
                            />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/welcomepage" element={<Finalise />} />
                            <Route
                                path="/emailcomponent"
                                element={<EmailConfirmation />}
                            />
                            <Route
                                path="/usercardtest"
                                element={<UserCard />}
                            />
                            <Route path="/view/drop" element={<ViewDrop />} />
                            <Route path="/graphset1" element={<GraphSet1 />} />
                            <Route path="/edit/user" element={<EditUser />} />
                            <Route
                                path="/landinghomepage"
                                element={<LandingUserPage />}
                            />
                            <Route
                                path="/signinpage"
                                element={<LoginPageX />}
                            />
                            <Route
                                path="/verify/email/token/:token"
                                element={<VerifyEmailToken />}
                            />
                            <Route
                                path="/signup/dropper"
                                element={<DropperSignup />}
                            />
                            <Route
                                path="/dropper/dashboard"
                                element={<DropperDashboard />}
                            />
                            <Route
                                path="/dropper/products"
                                element={<DropperProductsPage />}
                            />
                            <Route
                                path="/dropper/product/register"
                                element={<ProductRegistrationPage />}
                            />
                            <Route
                                path="/dropper/offers"
                                element={<DropperOffersPage />}
                            />
                            <Route
                                path="/dropper/offer/register"
                                element={<OfferRegistrationPage />}
                            />
                            <Route
                                path="/dropper/campaigns"
                                element={<DropperCampaignPage />}
                            />
                            <Route
                                path="/dropper/campaign/register"
                                element={<DropperCampaignRegistrationPage />}
                            />
                            <Route
                                path="/dropper/drops"
                                element={<DropperDropsPage />}
                            />
                            <Route
                                path="/dropper/drop/register"
                                element={<DropRegistrationPage />}
                            />
                            <Route
                                path="/dropper/users"
                                element={<DropperUsersPage />}
                            />
                            <Route
                                path="/dropper/user/register"
                                element={<DropperUserRegistrationPage />}
                            />
                            <Route
                                path="/dropper/roles"
                                element={<DropperRolesPage />}
                            />
                            <Route
                                path="/dropper/role/register"
                                element={<DropperRoleRegistrationPage />}
                            />
                            <Route
                                path="/dropper/developer/console"
                                element={<DropperDeveloperConsolePage />}
                            />
                            <Route
                                path="/dropper/developer/credentials"
                                element={<DropperCredentialsPage />}
                            />
                            <Route
                                path="/dropper/developer/credential/register"
                                element={<DropperCredentialRegistrationPage />}
                            />
                        </Routes>
                    </BrowserRouter>
                </HelmetProvider>
            </GoogleOAuthProvider>
        </UserProvider>
    );
}
