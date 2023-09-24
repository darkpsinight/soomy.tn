import React from 'react';
import { ReactComponent as YourSvg } from '../../assets/images/Asset 5soomy.svg';
import logo from "../../assets/images/Asset 4soomy.png";
import monetique from "../../assets/images/logo-tunisie-monetique.png";
import clickToPay from "../../assets/images/click-to-pay.png";
import {Link} from "react-router-dom"
const Footer = () => {
    return (
        <div>
             <footer className="navbar-fixed-bottom">
  <section className="pink-footer d-flex  align-items-center justify-content-between p-lg-5 p-3">
  <div className="d-flex flex-column align-items-start w-pink-footer-title px-lg-5"> <h2>Restez</h2> <h2>branchés</h2></div> 
    <p className="w-pink-footer mb-0 p-5">Inscrivez-vous à notre Newsletter pour ne pas manquer
les nouveautés et offres promotionnelles</p>
    
<div className="input-group Newsletter-input w-pink-footer-input pt-3 pb-1 px-lg-0">
<input type="text" className="form-control" placeholder="Votre adresse mail" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
<span className="input-group-text" id="basic-addon2" style={{zIndex:"999"}}><i className="fi fi-rr-paper-plane"></i></span>
</div>
  </section>
  <section className="black-footer d-flex justify-content-between align-items-start">

    <img src={logo} alt={"..."} className='d-none d-lg-block'/>

    <div className="useful-links">
      <h5>Contact</h5>
      <ul>
        <li><i className="fi fi-rr-marker me-1"></i> khzema Ouest, Sousse</li>
        <li><i className="fi fi-rr-circle-phone-flip me-1"></i> 50100140</li>
        <li> <i className="fi fi-rr-envelope me-1"></i> contact@soomytn</li>
        <li className="d-flex justify-content-start my-4">
          <i className="fi fi-brands-facebook me-3"></i>
          <i className="fi fi-brands-instagram me-3"></i> 
          <i className="fi fi-brands-whatsapp me-3"></i>
          <i className="fi fi-brands-linkedin me-3"></i>
          <i className="fi fi-brands-twitter me-3"></i>
        </li>
      </ul>
    </div>
    <div className="useful-links">
      <h5>Moyens de paiement</h5>
      <ul>
        <li>Assurés par :</li>
          <li><img className="my-1" src={monetique}/></li>
        <li><img className="my-1" src={clickToPay}/></li>
      
        
      </ul>
    </div>
    <div className="useful-links info-links">
      <h5>Infos</h5>
      <ul>
        <li><Link to={"/instructions"}><i className="fi fi-rr-angle-right"></i> Comment ça marche</Link></li>
        <li><i className="fi fi-rr-angle-right"></i> Revendeurs</li>
        <li><i className="fi fi-rr-angle-right"></i> Paiement sécurisé</li>
        <li><Link to={"/conditions"}><i className="fi fi-rr-angle-right"></i> Conditions générales de ventes</Link></li>
        <li><Link to={"/mentions"}><i className="fi fi-rr-angle-right"></i> Mentions légales</Link></li>
    
      </ul>
    </div>
  
  </section>
  <section className="copyright-footer d-flex align-items-center">
    <p className="mb-0 ms-2"><i className="fi fi-rr-copyright me-1"></i>2022 all rights reserved Soomy</p>
   
  </section>
</footer>
        </div>
    );
};

export default Footer;