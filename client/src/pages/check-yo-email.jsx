import './css/check-yo-email.css';
import {importAll} from '../components/js/import-data.js';


export default function checkEmail(){
    const svgs = importAll(require.context('../assets/svgs/', false, /\.(png|jpe?g|svg)$/));
    return(
        <>
        <div id="check-yo-email-container">
            <img id="email-img" src={svgs["email-open-svgrepo-com.svg"]} />
            <h3>Check Your Email</h3>
            <h4 id="text-content">We've sent an email to pratic007@gmail.com. It is important to verify your email address to guarantee the best email and calender deliverability from Linkyo.io</h4>
            <h3 id="do-underline">Resend Email</h3>
        </div>
        </>
    );
}