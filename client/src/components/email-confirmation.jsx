import './css/email-confirmation.css'

export default function emailConfirmation() {
    return (
        <>
        <div className = {' parent-division '}>
            <label id ='label-title'>Verify your E-mail Address</label>
            <div className = {' greet-class '}>
                <div>Hi vsvs-7676!</div>
                <div>Please verify your email address by clicking the button below</div>
            </div>
            <div id = 'verify-button'>
                <button type = "button" id = "verify-button-id" onClick = ""> Verify Email </button>
            </div>
            <div id = 'greet-out'>
                <label id = {' the-last-rite '}>Happy Scheduling, </label>
                <label id = 'the-last-tagline'>The Linkyo.io team.</label>
            </div>
        </div>
        </>
    )
}