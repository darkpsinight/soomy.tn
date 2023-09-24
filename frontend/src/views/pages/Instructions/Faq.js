import truck from "../../../assets/images/truck.png";
import card from "../../../assets/images/card.png";
import cardBancaire from "../../../assets/images/cardBancaire.png";
import cardEnchère from "../../../assets/images/cardEnchère.png";
import building from "../../../assets/images/building.png";
import React, { useState ,useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import { getUser } from "../../../redux/userSlice";
import {useDispatch} from "react-redux";
const Faq = () => {
  const [show, setshow] = useState(true);
  const [show1, setshow1] = useState(false);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [show4, setshow4] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser())

 }, []);
  return (
    <div className="moving-main">
      

      <main className="container faq-container px-lg-5 py-lg-3 d-flex">
        <div className="side-filter">
          <ul className="mb-0">
            <li
              onClick={() => {
                setshow(true);
                setshow1(false);
                setshow2(false);
                setshow3(false);
                setshow4(false);
              }}
            >
              FAQ
            </li>

            <li
              onClick={() => {
                setshow(false);
                setshow1(true);
                setshow2(false);
                setshow3(false);
                setshow4(false);
              }}
            >
              Inscription
            </li>

            <li
              onClick={() => {
                setshow(false);
                setshow1(false);
                setshow2(true);
                setshow3(false);
                setshow4(false);
              }}
            >
              Enchère
            </li>
            <li
              onClick={() => {
                setshow(false);
                setshow1(false);
                setshow2(false);
                setshow3(true);
                setshow4(false);
              }}
            >
              Paiement
            </li>
            <li
              onClick={() => {
                setshow(false);
                setshow1(false);
                setshow2(false);
                setshow3(false);
                setshow4(true);
              }}
            >
              Livraison
            </li>
          </ul>
        </div>
        <div className="main-faq py-lg-4 px-2">
          {show && (
            <>
              <h1 className="mx-auto mb-4">FAQ </h1>
              <div className="edge-shadow p-5">
              <b className="faq-titles">
                Soomy.tn met à votre disposition une FAQ pour répondre à vos
                questions et vous fournir les informations nécessaires.
              </b>
              <br />
              Souhaitiez-vous créer un compte, participer à une enchère, ou
              suivre nos actualités, vous trouverez ci-dessous les réponses aux
              questions les plus fréquemment posées. Si vous ne trouverez pas
              les réponses adéquates, n’hésitez pas à nous contacter, notre
              service client est à votre écoute via le formulaire de contact, le
              téléphone, le mail ou via les réseaux sociaux.
            </div>
            </>
          )}

          {show1 && (
            <>
              <h1 className="mx-auto">Inscription </h1>
             <div className="edge-shadow p-5">
              <ul>
                <li>
                  {" "}
                  <b className="faq-titles">Comment créer un nouveau compte ?</b>
                  <br />
                  Pour créer un compte sur Soomy.tn,{" "}
                  <b>
                    <Link style={{ color: "black" }} to="/signup">
                      cliquez ici{" "}
                    </Link>
                  </b>
                  et remplissez le formulaire d’inscription. Vous serez invité à
                  fournir votre numéro de téléphone, un code secret de 4
                  chiffres sera envoyé à votre téléphone. Entrez le code et
                  remplissez{" "}
                  <b>
                    <Link style={{ color: "black" }} to="/signup">
                      le formulaire d’inscription
                    </Link>{" "}
                  </b>{" "}
                  avec vos données pour terminer le processus. -Les champs avec*
                  sont obligatoires.
                </li>
                
                <li>
                  <b>Comment puis-je confirmer mon compte ?</b>
                  <br />
                  Après avoir terminé l’enregistrement du compte, vous recevrez
                  un email de confirmation à l’adresse e-mail que vous avez
                  fourni. Vous devez cliquer sur le lien pour confirmer et
                  compléter le processus d’inscription. Si vous ne recevez pas
                  cet e-mail, regardez dans vos spams. Si vous ne le trouvez
                  toujours pas, contactez-nous.
                </li>
                
                <li>
                  <b>J’ai oublié mon mot de passe, que dois-je faire ? </b>
                  <br />
                  Cliquez sur « Mot de passe oublié »et remplissez les détails
                  (adresse e-mail et votre nom d'utilisateur, votre numéro de
                  téléphone), vous recevrez un e-mail et un SMS avec votre nom
                  d'utilisateur et un nouveau mot de passe. Si vous n'avez pas
                  reçu l'e-mail ou le message, veuillez nous envoyer un e-mail à
                  ………………...
                </li>
              </ul>
              </div>
            </>
          )}
          {show2 && (
            <>
              {" "}
              <h1 className="mx-auto">Enchère </h1>
              <div className="edge-shadow p-5">
              <ul>
                <li>
                  <b className="faq-titles">Qui peut enchérir ? </b>
                  <br />
                  Toute personne majeure, responsable et solvable, peut
                  participer aux enchères. Cependant vous devez créer un compte
                  sur Soomy.tn et avoir un solde suffisant pour pouvoir jouer.
                </li>
                
                <li>
                  <b className="faq-titles">Comment participer à une enchère ?</b>
                  <br />
                  Pour enchérir sur un produit qui vous intéresse,cliquez iciou
                  consultez la rubrique « Étapes de participation ».
                </li>
                + vidéo EXPLICATIVE
                
                <li>
                  <b className="faq-titles">Comment puis-je suivre les enchères en cours ?</b>
                  <br />À partir de la page d’accueil, sélectionnez la page{" "}
                  <b>
                    <Link style={{ color: "black" }} to="/soomy">
                      « Enchères »
                    </Link>
                  </b>{" "}
                  , qui récapitule toutes les enchères actives, passées et
                  futures.
                </li>
                
                <li>
                  <b className="faq-titles">
                    Qui dois-je contacter pour des avoir plus d’informations sur
                    Soomy.tn
                  </b>
                  <br />
                  Si vous avez des questions ou des requêtes sur la
                  participation dans les enchères organisées sur Soomy.tn,
                  l’achat ou le fonctionnement de notre site, n’hésitez pas à
                  nous contacter ! Nous mettons à votre disposition un{" "}
                  <b> service client </b>, nos experts seront ravis de vous
                  fournir toutes les informations dont vous en avez besoin.
                </li>
                
                <li>
                  <b className="faq-titles">J'ai gagné un article ! Comment le récupérer ?</b>
                  <br />
                  Lorsque l’enchère est terminée, le gagnant sera le participant
                  qui a effectué la dernière opération, il remportera le produit
                  avec le dernier prix indiqué. Un onglet « Acheter » lui sera
                  affiché pour terminer la transaction. Votre gain sera confirmé
                  par e-mail envoyé à votre adresse.
                </li>
                
                <li>
                  <b className="faq-titles">
                    En cas de perte, est-ce que je risque de perdre mon solde ?
                  </b>
                  <br />
                  Pour assurer votre bonheur et vous offrir une expérience super
                  sympa, Soomy.tn vous donne l’opportunité de jouer de nouveau
                  dans les autres enchères disponibles pour une période de 20
                  jours !
                </li>
              </ul>
              </div>
            </>
          )}
          {show3 && (
            <>
              <h1 className="mx-auto">Paiement </h1>
              <div className="edge-shadow p-4">
              <ul>
                <li>
                  <b className="faq-titles">Quelles sont les modalités de paiement ?</b>
                  <br />
                  Afin de conclure votre achat sur Soomy.tn,vous pouvez choisir
                  l’une des modalités de paiement suivantes :
                  <div className="mb-5">
                    <div className="row p-3 my-5 mx-3">
                      <div
                        className={`col values-text m-lg-2 d-flex  flex-column align-items-center fade-in`}
                      >
                        <img src={cardBancaire} alt="cardBancaire" />
                        <h5>Carte bancaire</h5>
                      </div>
                      <div
                        className={`col values-text m-lg-2 d-flex flex-column align-items-center fade-in`}
                      >
                        <img src={card} alt="card" />
                        <h5>Carte de la poste</h5>
                      </div>
                      <div
                        className={`col values-text m-lg-2 d-flex flex-column align-items-center fade-in`}
                      >
                        <img src={cardEnchère} alt="cardEnchère" />

                        <h5>Carte Soomy</h5>
                      </div>

                      <div
                        className={`col values-text m-lg-2 d-flex flex-column align-items-center fade-in`}
                      >
                        <img src={building} alt="bank" />

                        <h5>Virement Bancaire</h5>
                      </div>
                      <div
                        className={`col values-text m-lg-2 d-flex flex-column align-items-center fade-in`}
                      >
                        <img src={truck} alt="truck" />
                        <h5> Espèce à la livraison</h5>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <b className="faq-titles">Comment recharger mon solde ?</b>
                  <br />
                  Afin de recharger votre solde,cliquer sur « Mon compte »,puis
                  « Recharger mon solde »,choisissez votre modalité (virement
                  bancaire, Carte bancaire, Carte de la poste, ou Carte Soomy).
                  Choisissez le montant souhaité, ensuite validé votre
                  transaction.
                </li>
              </ul>
              </div>
            </>
          )}
          {show4 && (
            <>
              {" "}
              <h1 className="mx-auto">Livraison </h1>
              <div className="edge-shadow p-5">
              <ul>
                <li>
                  <b className="faq-titles"> Combien dure le délai de livraison ?</b>
                  <br />
                  Généralement il faut compter 1 à 2 jours pour préparer
                  l’article. La société de livraison sera responsable de vous
                  livrer votre colis, il faudra compter quelques jours pour le
                  recevoir.
                </li>
                
                <li>
                  <b className="faq-titles"> Comment voir les prochaines enchères ?</b>
                  <br />
                  Pour rester informés des prochaines enchères, suivez notre
                  site Soomy.tn, visitez la page« Enchères prochaines », oubien
                  activez le bouton « Mes favoris ».
                </li>
                
                <li>
                  <b className="faq-titles"> Le site est-il sécurisé ?</b>
                  <br />
                  Vous pouvez naviguer et jouer sur notre site en toute
                  tranquillité et sécurité ! Il n'y a aucun risque à craindre.
                  Le paiement etles informations bancaires des participants sont
                  sécurisés.
                </li>
                
                <li>
                  <b className="faq-titles"> Comment vendre sur Sommy.tn ?</b>
                  <br />
                  Le service des enchères particulières n’est pas encore
                  disponible, suivez-nous sur notre site et nos réseaux sociaux
                  pour rester informés de toutes nos nouveautés.
                </li>
                
                <li>
                  {" "}
                  <b className="faq-titles">
                    Que se passe-t-il si je perds ma connexion Internet pendant
                    l'enchère ?
                  </b>
                  <br />
                  N'oubliez pas que pendant le processus d'enchère, la connexion
                  Internet ne doit pas s'éteindre ! Une fois inscrit dans une
                  enchère, le site n’est pas responsable sur tous mal fonction
                  ou coupure d’internet.
                </li>
             
              </ul>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
