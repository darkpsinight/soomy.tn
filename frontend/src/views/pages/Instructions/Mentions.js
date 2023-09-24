import React from 'react';
import Footer from '../../../components/footer/Footer';
import Accordion from "react-bootstrap/Accordion";
const MentionLegal = () => {
    return (
        <div className="moving-main">
            
            <main className="info-container pt-4 pb-4 container">
            <h1 className="mx-auto mt-4 mb-5">Mention Légale </h1>
            <Accordion defaultActiveKey="0">
  <Accordion.Item eventKey="0">
    <Accordion.Header>
  <h4 className="info-sub-titles"> 1. Présentation du site</h4>
    </Accordion.Header>
      <Accordion.Body>
      * Editeur
Soomy.tn est édité par la société --------, SA au capital de ---------- dinars, dont le siège social est situé à-------------, immatriculée au registre du commerce sous le numéro--------.
Mail :
* Hébergement :
Soomy.tn est hébergé à -------------------------

      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>
   <h4 className="info-sub-titles"> 2. Conditions générales d’utilisation du Site </h4>
    </Accordion.Header>
      <Accordion.Body>
      Le site Soomy.tn est confidentiel et la propriété de la société ---------. Tous les accès et utilisations du site et de ses fonctionnalités sont régis par les conditions d'utilisation. 
Ces conditions s'appliquent à toutes les personnes qui utilisent, visitent ou naviguent sur Soomy.tn.
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header>
     <h4 className="info-sub-titles"> 3. Propriété intellectuelle et contrefaçons.</h4>
    </Accordion.Header>
      <Accordion.Body>
      Soomy.tn est le propriétaire des droits de propriété intellectuelle du contenu du site, lui seul détient les droits d’usage sur tous les éléments accessibles sur le Site, notamment les textes, les images, les animations, les vidéos,les logos, les icônes, les graphismes, les sons, ainsi que leur mise en forme, à l’exception des marques, logos ou contenus correspondant et appartenant aux partenaires.
Toute reproduction, représentation, publication,adaptation, modification, de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : Soomy.tn.
Toute exploitation non autorisée du site ou de l’un de ses éléments sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles ------- et suivants du Code de Propriété Intellectuelle.
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header>
 <h4 className="info-sub-titles">4. Protection des données personnelles </h4> 
    </Accordion.Header>
      <Accordion.Body>
      Aucune information personnelle des utilisateurs du site Soomy.tn n’est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. 
Seule l'hypothèse du rachat de la société ------- et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l'utilisateur du Site.
Les bases de données sont protégées par les dispositions de la loi--------- relative à la protection juridique des bases de données.
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header>
      <h4 className="info-sub-titles"> 5. Liens vers des sites externes </h4>
    </Accordion.Header>
      <Accordion.Body>
      Notre site peut contenir des liens hypertextes, orientant la navigation vers d’autres sites. Soomy.tn ne prend aucun engagement sur tout site sur lequel les utilisateurs pourraient être orientés. De même, nous ne saurions en aucune façon être responsables du contenu, du fonctionnement et de l’accès à ces sites.
      </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header>
      <h4 className="info-sub-titles"> 6. Utilisation des cookies </h4>
    </Accordion.Header>
      <Accordion.Body>
     

      </Accordion.Body>
  </Accordion.Item>
</Accordion>

</main>
<Footer/>
        </div>
    );
};

export default MentionLegal;