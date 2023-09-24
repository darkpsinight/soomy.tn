import React, { useEffect } from "react";
import Footer from '../../../components/footer/Footer';
import { ReactComponent as YourSvg } from '../../../assets/images/hammer.svg';
import logo from '../../../assets/images/Asset 1soomy.png';
import { getUser } from "../../../redux/userSlice";
import {useDispatch} from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css"
const Instructions = () => {
    useEffect(() => {
        dispatch(getUser())
    
     }, []);
     useEffect(()=>{
        Aos.init({})
         },[])
     const dispatch = useDispatch();
    return (
        <div>
            
            
          <main className="info-container pt-4 pb-4">
           
           <h1 className="text-center mb-5 my-lg-5 mx-auto">Comment ça marche ? </h1>
           <div className="card-etapes">
             <button>
             <img src={logo} alt={"logo"}/>
             </button>
             <p>Comment ça marche?</p>
             <h2>Vidéo explicative animée</h2>
           
                       </div>
 <div className="body-content full-container">
 <div className="container">
   <div className="d-flex etapes-h2 justify-content-center align-items-start px-lg-5"> <h2>Les enchères en <span>5 étapes</span></h2></div> 
 <div className="row">
   <div className="col-md-12">
       <div className="main-timeline position-relative">
           <div className="timeline">
               <div className="timeline-icon" data-aos="fade-left" data-aos-once={true} data-aos-duration="2000"   ><i className="fi fi-rr-user-add"></i></div>
               <div className="timeline-content"  data-aos="fade-right" data-aos-once={true} data-aos-duration="2000" >
                   <h3 className="title"><span>1.</span> Créez votre compte / connectez-vous </h3>
                   <p className="description">Avant de pouvoir faire des affaires sur Soomy, l’utilisateur doit s’inscrire (gratuitement), c’est un processus simple et rapide qui prend moins d’une minute!</p>
               </div>
           </div>
           <div className="timeline">
               <div className="timeline-icon" data-aos="fade-left" data-aos-once={true} data-aos-duration="2000" ><i className="fi fi-rr-users-alt"></i></div>
               <div className="timeline-content" data-aos="fade-right" data-aos-once={true} data-aos-duration="2000" >
                   <h3 className="title"> <span>2.</span>Inscrivez-vous dans la salle d'enchère de votre choix  </h3>
                   <p className="description">A chaque nouvelle inscription, vous profitez <b> de 50 dinars</b> de solde pour enchérir)
 (Les frais d'inscription dans les salles d’enchère diffèrent selon le type de l’enchère <ol type="a" className="d-flex">
 <li className="mx-3">	Gold (20 DT) </li>
 <li className="mx-3">	Silver (17 DT) </li>
 <li className="mx-3">	Bronze (12 DT) </li>
 </ol></p>
               </div>
           </div>
           <div  className="timeline">
               <div className="timeline-icon" data-aos="fade-left" data-aos-once={true} data-aos-duration="2000" ><i className="fi fi-rr-credit-card"></i></div>
               <div className="timeline-content" data-aos="fade-right" data-aos-once={true} data-aos-duration="2000" >
                   <h3 className="title"><span>3.</span> votre compte </h3>
                   <p className="description">   alimentez votre solde via votre carte bancaire, carte postale, carte E-dinar ou les cartes Soomy(bientôt).</p>
               </div>
           </div>
           <div  className="timeline">
               <div className="timeline-icon" data-aos="fade-left" data-aos-once={true} data-aos-duration="2000" >
               <YourSvg/>
                 </div>
               <div className="timeline-content" data-aos="fade-right" data-aos-once={true} data-aos-duration="2000" >
                   <h3 className="title"><span>4.</span>Participez aux enchères :</h3>
                   <p className="description">Les enchères seront lancées lorsque la capacité de la salle atteint les 100% (le taux de remplissage des salles est toujours affiché sur le site).</p>
               </div>
           </div>
           <div  className="timeline">
               <div className="timeline-icon" data-aos="fade-left" data-aos-once={true} data-aos-duration="2000" ><i className="fi fi-rr-bullseye-pointer"></i></div>
               <div className="timeline-content" data-aos="fade-right" data-aos-once={true} data-aos-duration="2000" >
                   <h3 className="title"><span>5.</span>Misez</h3>
              
                   <ul className="description" >
 <li className='text-justify'>	<b>À la fin des 10 minutes </b>et en arrivant aux <b>10 dernières secondes</b>, le compte à rebours sera relancé de nouveau avec <b>chaque nouvelle surenchère.</b> </li>
 <li className='text-justify'>	Si un autre enchérisseur prend la main pendant cette durée, le compte à rebours se relancera de nouveau.</li>
 
 </ul>
 
 <br/>
 
 
               </div>
           </div>
        
       </div>
   </div>
 </div>
 
 </div>
</div>
<div class="container">
 <h4 className="info-sub-titles mx-lg-5 mx-3 my-3">Informations générales : </h4>
 <ul className="mx-lg-5 mx-2 my-2" >
 <li className='text-justify'> <i className="fi fi-rr-angle-right"></i> 	Soomy.tn est une plateforme de vente aux enchères en ligne. </li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i>  Elle fonctionne au clic, à chaque fois un participant surenchérit en cliquant sur le bouton<b>"j'enchéris"</b> , 0.500 dinar s’ajoute à la mise <b> (prix initial =1 dinar).</b> </li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i>  <b>Pour remporter l’enchère</b>, il faut que personne ne surenchérit pendant <b>10 secondes</b>. </li>
 <li className='text-justify'> <i className="fi fi-rr-angle-right"></i> 	Les enchères commencent à des <b>dates</b> bien précises et à des <b> horaires </b>spécifiques <b>indiqués sur le site</b>.</li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i> Tous les participants recevront des alertes avant le démarrage de l'enchère (par mail/ ou SMS).</li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i> Si le participant ne remporte pas l'enchère, il garde le solde de son compte pour une période de <b>20 jours</b>. Durant cette période, il o la chance de profiter de son solde et participer à d’autres enchères. </li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i>  <b>Durée de l’enchère </b>: elle dépond <b>du comportement des participants</b>.
 <br/>
 Nous avons fixé pour chaque enchère un niveau de prix <b>« plafond »</b> quisera toujours <b>indiqué sur le site</b>,si le prix atteint le niveau fixé, l’enchère s’achève et le dernier enrichisseur remporte la partie.</li>
 <li>	<i className="fi fi-rr-angle-right"></i>  <b>Recharge du compte </b>: le participant peut facilement recharger son compte dans un onglet spécifique avec sa carte bancaire, sa carte E-dinar, ou les cartes Soomy.</li>
 <li className='text-justify'> <i className="fi fi-rr-angle-right"></i> Le participant a la capacité de consulter le solde de son compte à tout moment de l’enchère : <b>le solde restera affiché sur son écran.</b></li>
 <li className='text-justify'> <i className="fi fi-rr-angle-right"></i> Gardez vos articles préférés dans « vos favoris »en cliquant sur le cœur,pour être averti lorsque la date de l’enchère est proche : la capacitéde la sale se rapproche <b>des 100%.</b></li>
 <li className='text-justify'>	<i className="fi fi-rr-angle-right"></i>  <b>Pour les enchères Premium – option achat immédiat </b>
 <p>Lorsque le prix du produit atteint <b>un niveau donné</b>, le participant pourra procéder <b>à l'achat immédiat</b> avec le prix indiqué et qui est inférieur du prix plafond. Une <b>bannière </b>apparaitra et la première personne qui clique sur cette bannière pourra profiter de l’offre.</p>
 </li>
 </ul>
 </div>
           </main>
           <Footer/>
        </div>
    );
};

export default Instructions;