function RenderVerificationEmail(username, backendURI, accessToken) {
    return `"
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .parent-division{
                    display : block;
                    background-color: #ffffff;
                    color : black;
                    width: 600px;
                    padding-top : 40px;
                    padding-left : 20px;
                    padding-bottom : 40px;
                    padding-right: 20px;
                    border: 2px solid #E5E7EB;
                    border-radius: 10px;
                }

                #label-title {
                    font-weight: 700;
                    font-size: 32px;
                }

                .greet-class{
                    display : block;
                    padding-top: 10px;
                }

                #verify-button{
                    background-color: white;
                    display: block;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }

                #verify-button-id{
                    background-color: rgb(35, 35, 35);
                    color: white;
                    display: inline-block;
                    padding : 15px;
                    font-weight : 400;
                    font-size: 18px;
                    border-radius: 6px;
                }

                #greet-out{
                    display: block;
                }

                #the-last-tagline{
                    color: rgb(27, 34, 58);
                    text-decoration: 0.5px underline;
                    text-underline-offset: 2px;
                }

                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    background-color: #F3F4F6;
                    padding-top: 40px;
                    padding-bottom: 40px;
                }
            </style>
        </head>
        <body>
            <div class='parent-division'>
                <h1 id='label-title'>Verify your E-mail Address</h1>
                <div class='greet-class'>
                    <h2>Hi ${username}!</h2>
                    <p>Please verify your email address by clicking the button below. This will expire in 4 minutes.</p>
                </div>
                <div id='verify-button'>
                    <a href="${backendURI}/api/auth/verify/email?token=${accessToken}" id="verify-button-id"> Verify Email </button>
                </div>
                <div id='greet-out'>
                    <p id='the-last-rite'>Happy Scheduling, </p>
                    <p id='the-last-tagline'>The Linkyo.io team.</p>
                </div>
            </div>
        </body>
        </html>
    "`;
}

module.exports = RenderVerificationEmail;
