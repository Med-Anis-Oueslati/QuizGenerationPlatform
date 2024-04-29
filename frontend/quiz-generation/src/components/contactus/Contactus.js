import "./Contactus.css";

import { GrClose } from "react-icons/gr";
import { GrMail } from "react-icons/gr";
import { RiFindReplaceLine } from "react-icons/ri";
import { BiPhone } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { BsFillPinMapFill } from "react-icons/bs";

function Contactus() {
  return (
    <div className="contactus">
      <body>
        <div className="container22">
          <div className="content1">
            <div className="left-side">
              <div className="address details">
                <BsFillPinMapFill />
                <div className="topic">Address</div>
                <div className="text-one">Mannouba , Tunis </div>
              </div>
              <div className="phone details">
                <BiPhone />
                <div className="topic">Phone</div>
                <div className="text-one">+216 78 888 888 </div>
                <div className="text-two">+216 79 999 999 </div>
              </div>
              <div className="email details">
                <GrMail />
                <div className="topic">Email</div>
                <div className="text-one">mohamedanis.oueslati@ensi-uma.tn</div>
                <div className="text-two">mohamedkarim.jegham@ensi-uma.tn</div>
              </div>
            </div>
            <div className="right-side">
              <div className="topic-text">Send us a message</div>
              <p>
                If you have any work from me or any types of quries related to
                my tutorial, you can send me message from here. It's my pleasure
                to help you.
              </p>
              <form action="#">
                <div className="input-box">
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Enter your email" />
                </div>
                <div className="input-box message-box">
                  <input type="message" placeholder="Enter your message" />
                </div>
                <div className="buttonnn">
                  <input type="button" value="Send Now" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d696.952766410419!2d10.063220938223957!3d36.81375387333327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd2d96d4a9d6c9%3A0xbbe38a2694938acf!2sNational%2School%20of%20Computer%20Science!5e1!3m2!1sen!2stn!4v1680646482312!5m2!1sen!2stn"
            width={340}
            height={466}
            style={{
              border: 0,
              borderTopRightRadius: "3%",
              borderBottomRightRadius: "3%",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </body>
    </div>
  );
}

export default Contactus;
