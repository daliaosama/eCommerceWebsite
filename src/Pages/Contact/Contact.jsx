import "./Contact.css";
import Location from "/assets/location.png";
import phone from "/assets/phone.png";
import hour from "/assets/hour.png";
import logo from "/assets/logo.png";
import { useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import * as yup from "yup"
function Contact() {
    function handlesubmit(event) {
     event.preventDefault();
     testValidation();
    
    }
    function handleChange(event){
      var value=event.target.value;
      const key=event.target.name;
      setFormData({
        ...formData,
        [key]:value
      })
      setErrors({ ...errors, [event.target.name]: '' });
    }
    const [formData,setFormData]=useState({
      name:"",
      email:"",
      subject:'',
      message:''
    })
    const [errors, setErrors] = useState({});
    const validationSchema = yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email address').required('Email is required'),
      subject: yup.string(),
      message: yup.string().required('Message is required'),
    });
    async function testValidation() {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        console.log("Validation passed");
        setErrors({});
        navigate('/');
      } catch (err) {
        const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
        
          setErrors(validationErrors);
      }
    }
    const navigate = useNavigate();
    const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div id="contactpage">
      <div id="contactheader">
      <img src={logo} />
      <h1>Contact</h1>
      <div className="link">
      <label>
            <Link to="/" className="lab1">Home</Link>
          </label>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <label key={to} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ margin: "0 10px" ,fontWeight:"bold"}}>
                  &gt;
                </span>
                <Link to={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              </label>
            );
          })} 
      </div>
      </div>
      <div id="contacthead">
      <h2 >Get In Touch With Us</h2>
      <p id="contact">
        For More Information About Our Product & Services. Please Feel Free To
        Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
        Hesitate!
      </p>
      <div id="contactus">
        <div id="contactinfo">
          <div id="address">
            <img src={Location} className="imgcontact" />
            <div className="contactdetails">
              <h4>Address</h4>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>
          <div id="phone">
            <img src={phone} className="imgcontact"/>
            <div className="contactdetails">
            <h4>Phone</h4>
            <label>Mobile: +(84) 546-6789
            </label>
            <label>Hotline: +(84) 456-6789</label>
            </div>
            

          </div>
          <div id="workingtime">
         <img src={hour}className="imgcontact"/>
         <div className="contactdetails">
            <h4>Working Time</h4>
            <label>Monday-Friday: 9:00 - 22:00
            </label>
            <label>Saturday-Sunday: 9:00 - 21:00</label>
         </div>
          </div>
        </div>
        <form  onSubmit={handlesubmit}>
           <div className="inputs">
            <label htmlFor="name" className="formlabels">Your name</label>
            <input type="text" value={formData.name} id="name" placeholder=" Abc" 
            onChange={handleChange} name="name" style={{
              borderColor: errors.name? 'red' : '#ccc',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}/>
            {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

            </div> 
            <div className="inputs">
                <label htmlFor="mail" className="formlabels">Email Address</label>
                <input type="email" name="email" id="mail" placeholder=" Abc@def.com" 
                onChange={handleChange} value={formData.email}  style={{
                  borderColor: errors.email ? 'red' : '#ccc',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}/>
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div className="inputs">
                <label htmlFor="subject" className="formlabels">Subject</label>
                <input type="text" name="subject" id="subject" placeholder=" This is an optional" value={formData.subject}
                onChange={handleChange} />
            </div>
            <div id="message">
                <label htmlFor="message" className="formlabels">Message</label>
                <textarea name="message" id="message" placeholder=" Hi! i’d like to ask about"
                 value={formData.message} 
                onChange={handleChange} style={{
                  borderColor: errors.message? 'red' : '#ccc',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}></textarea>
                {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
            </div>
            <input type="submit" value="Submit" />
        </form>
      </div>
      </div>
      
    </div>
  );
}
export default Contact;
