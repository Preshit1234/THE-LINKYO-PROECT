import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
// import { gsap } from 'gsap';
import BrowseDrops from "./pages/browse-drops";
import CreateDrop from "./pages/create-drop";
// import LoginPage from "./pages/login-page";
import CheckEmail from "./pages/check-yo-email";
import CreateAffiliateLink from "./prototype/create-affiliate-link";
import FakeProduct from "./prototype/fake-product";
import SignupPage from "./pages/signup-page";
import Finalise from "./pages/final-form";
import EmailConfirmation from "./components/email-confirmation";
import UserCard from "./components/usercards";
import ViewDrop from "./pages/view-drop";
import GraphSet1 from "./components/graph-set-1";
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
        <Routes>
            <Route
                index
                element={<LandingPage title="Linkyo | 10x growth for SaaS" />}
            />
            <Route path="signup" element={<SignupPage />} />
            <Route path="emailcomponent" element={<EmailConfirmation />} />
            <Route path="usercardtest" element={<UserCard />} />
            <Route path="signin" element={<LoginPageX />} />
            <Route
                path="verify/email/token/:token"
                element={<VerifyEmailToken />}
            />

            <Route path="user">
                <Route path="welcome" element={<Finalise />} /> 
                <Route path="home" element={<BrowseDrops />} />

                {/* //For future Development */}
                <Route exact path="homedrop">
                    <Route index element={<BrowseDrops />} />
                    <Route path="paiddrops" element={<BrowseDrops typePaid="paid" />} />
                    <Route path="freedrops" element={<BrowseDrops typePaid="free" />} />
                </Route>

                <Route path="drops">
                    <Route path=":drop" element={<ViewDrop />} />
                    <Route path="create" element={<CreateDrop />} />
                </Route>

                <Route path="confirmemail" element={<CheckEmail />} />
                <Route path="graphset1" element={<GraphSet1 />} />
                <Route path="edit/user" element={<EditUser />} />
                <Route path="landinghomepage" element={<LandingUserPage />} />
            </Route>

            <Route path="prototype">
                <Route path="affiliateLink" element={<CreateAffiliateLink />} />
                <Route path="fakeURL/fakeProduct" element={<FakeProduct />} />
            </Route>

            <Route path="dropper">
                <Route path="signup" element={<DropperSignup />} />
                <Route path="dashboard" element={<DropperDashboard />} />

                <Route path="products">
                    <Route index element={<DropperProductsPage />} />
                    <Route
                        path="register"
                        element={<ProductRegistrationPage />}
                    />
                </Route>

                <Route path="offers">
                    <Route index element={<DropperOffersPage />} />
                    <Route
                        path="register"
                        element={<OfferRegistrationPage />}
                    />
                </Route>

                <Route path="campaigns">
                    <Route index element={<DropperCampaignPage />} />
                    <Route
                        path="register"
                        element={<DropperCampaignRegistrationPage />}
                    />
                </Route>

                <Route path="drops">
                    <Route index element={<DropperDropsPage />} />
                    <Route path="register" element={<DropRegistrationPage />} />
                </Route>

                <Route path="users">
                    <Route index element={<DropperUsersPage />} />
                    <Route
                        path="register"
                        element={<DropperUserRegistrationPage />}
                    />
                </Route>

                <Route path="roles">
                    <Route index element={<DropperRolesPage />} />
                    <Route
                        path="register"
                        element={<DropperRoleRegistrationPage />}
                    />
                </Route>

                <Route path="drop">
                    <Route path="register" element={<DropRegistrationPage />} />
                </Route>

                <Route path="developer">
                    <Route
                        path="console"
                        element={<DropperDeveloperConsolePage />}
                    />

                    <Route path="credentials">
                        <Route index element={<DropperCredentialsPage />} />
                        <Route
                            path="register"
                            element={<DropperCredentialRegistrationPage />}
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}
