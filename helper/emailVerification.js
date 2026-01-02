const nodemailer = require("nodemailer");
var jwt = require('jsonwebtoken');


let emailVerification=async(email,otp)=>{

var emailDecoded = jwt.verify(email, 'arnob');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arnob4all@gmail.com",
    pass: "yabsholxybizgase",
  },
});
  const info = await transporter.sendMail({
    from: '"Mahadi" <arnob4all@gmail.com>',
    to: emailDecoded,
    subject: "Email Verification",
    text: "Email Verification Send", 
    html: ` <div style=" border-radius: 10px;
        margin: auto;
        background: rgb(243, 243, 255);
        width: 30%;
        text-align: center;
        padding: 50px 50px">
        <div >
            <h1 style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Verify your email.</h1>
            <hr/>
            <p style="padding-top: 20px;">${emailDecoded}</p>
            <p style="font-size: 17px; padding-top: 50px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', 
            sans-serif;"> Please confirm This email is your, then Click in the verification button
            to create your new account. </p>
           
            <a href="https://e-commerce-dashboard-multivandor-zm.vercel.app/otp/${email}/${otp}" style="border: thin; margin-top: 30px; background: rgb(17, 144, 255); 
            color: rgb(255, 255, 255); padding: 10px 25px; border-radius: 10px; 
            font-size: 30px; font-weight: 700; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
            Verify</a>

            <div style="text-align:center; margin-top: 20px;">
                <img style="width: 30px;" src="https://i.ibb.co.com/ycGQxcxC/Facebook-logo-square.png" alt="Facebook-logo-square">
               <img style="width: 30px;"  src="https://i.ibb.co.com/yMNG5jh/png-clipart-social-media-computer-icons-tulane-university-facebook-drawing-twitter-twitter-logo-blue.png" alt="png-clipart-social-media-computer-icons-tulane-university-facebook-drawing-twitter-twitter-logo-blue">
             <img style="width: 30px;" src="https://i.ibb.co.com/rG1w3by3/Linked-In-icon-svg.png" alt="Linked-In-icon-svg" >
              <img style="width: 30px;" src="https://i.ibb.co.com/JP5xNDt/Instagram-icon.png" alt="Instagram-icon" >
            <div style="padding-top: 50px ; margin-bottom: 50px;">copy right 2011</div>
        </div>
    </div>
    </div>`,
  });
}

module.exports=emailVerification
