import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/landing-page';
import FaqAccordion from './components/faq-accordion';
// import { gsap } from 'gsap';
import Header from './components/header';
import Test from './components/test';
import BrowseDrops from './pages/browse-drops';
import CreateDrop from './pages/create-drop';
import LoginPage from './pages/login-page';
import CheckEmail from './pages/check-yo-email';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateAffiliateLink from './prototype/create-affiliate-link';
import FakeProduct from './prototype/fake-product';
import { HelmetProvider } from 'react-helmet-async';
import SignupPage from './pages/signup-page';
import Finalise from './pages/final-form';
import EmailConfirmation from './components/email-confirmation';
import UserCard from './components/usercards'
import UserList from './components/userlist'
import EditUser from './pages/edit-user'
import FundAndEarn from './components/funds-and-earnings';
import OrderAnalytics from './components/recent-orders';
import OrdersPaidOrPending from './components/recent-orders-paid';
import ViewDrop from './pages/view-drop';
import GraphSet1 from './components/graph-set-1';
import LandingUserPage from './pages/final-landing-page';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/welcome",
    element: <h1>Welcome to Linkyo</h1>
  },
  {
    path: "/",
    element: <LandingPage title="Linkyo | 10x growth for SaaS" />,
  },
  {
    path: "/accordion",
    element: <FaqAccordion />
  },
  {
    path: "/header",
    element: <Header type="login" />
  },
  {
    path: "/browse/drops",
    element: <BrowseDrops />
  },
  {
    path: "/create/drop",
    element: <CreateDrop />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/test",
    element: <Test />
  },
  {
    path : "/confirmemail",
    element : <CheckEmail />
  },
  {
    path: "/prototype/affiliateLink",
    element: <CreateAffiliateLink />
  },
  {
    path: "/prototype/fakeURL/fakeProduct",
    element: <FakeProduct />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path : "/welcomepage",
    element : <Finalise />
  },
  {
    //This is component, I'm using this only for testing purpose
    path : "/emailcomponent",
    element : <EmailConfirmation />
  },
  {
    //This is component, I'm using this only for testing purpose
    path : "/usercardtest",
    element : <UserCard />
  },
  {
    path: "/view/drop",
    element: <ViewDrop />
  },
  {
    path: "/graphset1",
    element: <GraphSet1 />
  },
  {
    path : "/landinghomepage",
    element : <LandingUserPage />
  },
  {
    path : "/edituserpage",
    element : <EditUser />
  }
]);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
