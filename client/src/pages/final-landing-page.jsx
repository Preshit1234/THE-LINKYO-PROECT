import LandingPageStyles from './css/finalLandingPage.module.css'
import Header from '../components/header.jsx';
import {importAll} from '../components/js/import-data.js';
import Signup from '../components/signup';

export default function LandingUserPage(){

    const svgs = importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|gif|svg)$/));

    return(
        <>
        <div className={ LandingPageStyles.headerClass }>
            <Header />
        </div>
        <div className={ LandingPageStyles.epicContainer }>
            <div className={ LandingPageStyles.slogunClass }>
                Join Forces with us and tap into dynamic network of top<br />
                Tech Partners & SaaS / Digital / Subscription based products.
            </div>
            <div className={ LandingPageStyles.signupModuleClass }>
                <Signup />
            </div>
            <div className={ LandingPageStyles.logoClass}>
                <div className={ LandingPageStyles.theLinkyoLogo }>Linkyo</div>
                <div className={ LandingPageStyles.theLinkyoQuote }>A next-gen digital affiliate marketing platform powered by AI</div>
            </div>
                <div className={ LandingPageStyles.tenXTextBackgroundClass}>
                    <img className={ LandingPageStyles.overlayCardOne } src={images["drop-grammarly.png"]} />
                    <img className={ LandingPageStyles.overlayCardTwo } src={images["drop-zywa.png"]} />
                    <div className={ LandingPageStyles.tenXText }>10X</div>
                    <div className={ LandingPageStyles.texXTextEngagement }>Engagement</div>
                </div>
            <div className={ LandingPageStyles.howItWorksClass }>
                <div className={ LandingPageStyles.howItWorksTitle }>How it Works?</div>
                    <div className={ LandingPageStyles.howItWorksCardClass }>
                        <div className={ LandingPageStyles.joinLinkyo}>
                            <img className={ LandingPageStyles.joinLinkyoLogo } src={svgs["user-check.svg"]} />
                            <div className={ LandingPageStyles.joinLinkyoTitle }>Join Linkyo</div>
                            <div className={ LandingPageStyles.joinLinkyoDesc }>
                            Sign up and create your profile. Whether you're a tech partner or a SaaS / digital product company, we have a place for you.
                            </div>
                        </div>
                        <div className={ LandingPageStyles.collaborate}>
                            <img className={ LandingPageStyles.collaborateLogo } src={svgs["share-2.svg"]} />
                            <div className={ LandingPageStyles.collaborateTitle }>Collaborate</div>
                            <div className={ LandingPageStyles.collaborateDesc }>
                            Find and connect with the best affiliates or digital product companies that match your goals.
                            </div>
                        </div>
                        <div className={ LandingPageStyles.launchAndTrack}>
                            <img className={ LandingPageStyles.launchAndTrackLogo } src={svgs["lightning-bolt.svg"]} />
                            <div className={ LandingPageStyles.launchAndTrackTitle }>Launch & Track</div>
                            <div className={ LandingPageStyles.launchAndTrackDesc }>
                            Launch your Partner marketing campaigns and track their success with our advanced analytics dashboard.                        </div>
                        </div>
                    </div>
                </div>
                <div className={ LandingPageStyles.signupModuleClass }>
                    <Signup />
                </div>
                <div className={ LandingPageStyles.sloganImgQuoteClass }>
                    <div className={ LandingPageStyles.creativeBoomSlogan }>
                    The greatest Creative boom of our generation is just getting started 
                    Witness the change, the no nonsense way.
                    </div>
                    <div className={ LandingPageStyles.imgQuoteClass }>
                        <img className={ LandingPageStyles.imgQuoteImage } src="" />
                        <div className={ LandingPageStyles.quoteTheQuoteClass }>
                            <div className={ LandingPageStyles.quoteBigQuote }>
                                60 Million new creators emerged in the previous ten years. 
                                They will increase by 50% during the following two years. And it hasn't ended yet; this is just the Inception.
                            </div>
                            <div className={ LandingPageStyles.quoteQuoter }>-Trendhero.io</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ LandingPageStyles.whyJoinLinkyoClass }>
                <div className={ LandingPageStyles.whyJoinLinkyoTitle }>Why Join Linkyo?</div>
                <div className={ LandingPageStyles.whyJoinLinkyoSubClass }>
                    <div className={ LandingPageStyles.firstToKnowCard }>
                        <div ClassName={ LandingPageStyles.firstToKnowTitle }>Be the First To know</div>
                        <div ClassName={ LandingPageStyles.firstToKnowDesc }>
                            Get exclusive updates and early access to new products
                        </div>
                    </div>
                    <div className={ LandingPageStyles.maximizeEarningCard }>
                        <div ClassName={ LandingPageStyles.maximizeEarningTitle }>Be the First To know</div>
                        <div ClassName={ LandingPageStyles.maximizeEarningDesc }>
                            Get exclusive updates and early access to new products
                        </div>
                    </div>
                    <div className={ LandingPageStyles.diversePortfolioCard }>
                        <div ClassName={ LandingPageStyles.diversePortfolioTitle }>Be the First To know</div>
                        <div ClassName={ LandingPageStyles.diversePortfolioDesc }>
                            Get exclusive updates and early access to new products
                        </div>
                    </div>
                </div>
            </div>
            <div className={ LandingPageStyles.FAQClass }>
                <div className={ LandingPageStyles.FAQTitle }>Learn More in FAQ</div>
                <div className={ LandingPageStyles.dropDownClass }>
                    <div className={ LandingPageStyles.FAQDropDown } id="FAQOne">1. How does Linkyo Work?</div><br />
                    <div className={ LandingPageStyles.FAQDropDown } id="FAQTwo">2. 2.What types of SaaS / digital products can I promote?</div><br />
                    <div className={ LandingPageStyles.FAQDropDown } id="FAQThree">3. How do I earn commissions?</div><br />
                    <div className={ LandingPageStyles.FAQDropDown } id="FAQFour">4. Is Partner marketing suitable for me?</div><br />
                    <div className={ LandingPageStyles.FAQDropDown } id="FAQFive">5. How do I track my affiliate earnings?</div><br />
                </div>
            </div>
            <div className={ LandingPageStyles.signupModuleClass }>
                <Signup />
            </div>
            <div className={ LandingPageStyles.footerClass }>
                <div className={ LandingPageStyles.footTitle }>Linkyo.io</div>
                <div className={ LandingPageStyles.footDesc }>All rights reserved 2024</div>
            </div>
        </>
    )
}