import { useState } from "react";
import { createRandomString } from "../helper";
import { Link } from "react-router-dom";

// Product collection mockup data
const fakeProductData = {
    id: 1,
    name: "fakeProduct",
    productURL: "/prototype/fakeURL/fakeProduct"
};

// User collection mockup data
const fakeUserData = [
    {
        id: 1,
        name: "fakeUser1"
    },
    {
        id: 2,
        name: "fakeUser2"
    }
];

export default function CreateAffiliateLink () {
    // Fake database will store id, productId, userId, productURL, affiliateLink
    const [fakeDatabase, setFakeDatabase] = useState([]);
    const [message, setMessage] = useState();

    const cpyFakeDatabase = [...fakeDatabase];
    const productId = fakeProductData.id;
    const productURL = fakeProductData.productURL;

    // Main Functions
    function generateAffiliateLink(userId) {
        setMessage("");
        // Get user data
        let user = getUser(userId);

        // Check if user has already generated an affiliate link for the product
        if (isAffiliateLinkGenerated(productId, user.id)) {
            setMessage("User has already generated affiliated link of this product");
            return ;
        }

        // Create a random link with the length of 15 characters
        let affiliateLink = createRandomString(15);

        // Check if the link already exists in the database
        if (doesAffiliateLinkExist(affiliateLink)) {
            affiliateLink = regenerateAffiliateLink(user.id);
            return ;
        }

        saveAffiliateLink(productId, user.id, productURL, affiliateLink);
    }

    // // Other functions
    function getUser(userId) {
        if(fakeUserData.length !== 0) return fakeUserData.find(user => user.id === userId);
    }

    function isAffiliateLinkGenerated(productId, userId) {
        return cpyFakeDatabase.find(data => data.productId === productId && data.userId === userId) ? true : false;
    }

    function doesAffiliateLinkExist(affiliateLink) {
        return cpyFakeDatabase.find(data => data.affiliateLink === affiliateLink) ? true : false;
    }

    function regenerateAffiliateLink() {
        let affiliateLink = createRandomString(15);
        if (doesAffiliateLinkExist(affiliateLink)) {
            regenerateAffiliateLink();
        } else {
            return affiliateLink;
        }
    }

    function saveAffiliateLink(productID, userId, productUrl, affiliateLink) {
        const newLink = {
            productId: productID,
            userId: userId,
            productURL: productUrl,
            affiliateLink: affiliateLink
        }

        // Save affiliate link in the fake database
        cpyFakeDatabase.push(newLink);
        setFakeDatabase(cpyFakeDatabase);
    }

    return (
        <>
            <form action="">
                <button onClick={(e) => {e.preventDefault(); generateAffiliateLink(1)}}>Generate Link for User1</button>
                <button onClick={(e) => {e.preventDefault(); generateAffiliateLink(2)}}>Generate Link for User2</button>
            </form>
            <span>{message}</span><br />
            <span>Database:</span>
            <table>
                <thead>
                    <tr>
                        <th>productId</th>
                        <th>userId</th>
                        <th>productUrl</th>
                        <th>affiliateLink</th>
                    </tr>
                </thead>
                <tbody>
                    {cpyFakeDatabase.map((data) => (
                            <tr>
                                <td>{ data.productId }</td>
                                <td>{ data.userId }</td>
                                <td><Link to={ data.productURL /* localhost:3000/prototype/fakeURL/fakeProduct */ }> { "localhost:3000" + data.productURL } </Link></td>
                                <td><Link to={ "/prototype/partner/redirect/" + data.affiliateLink }> localhost:3000/prototype/partner/redirect/{ data.affiliateLink } </Link></td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </>
    );
}