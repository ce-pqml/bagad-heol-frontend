import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as podcastActions from '../../redux/podcast/actions';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo_bagad_heol.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';

export class Cgu extends Component{
    static propTypes = {
        podcast: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
      };

      componentWillMount() {
        // this.props.actions.fetchRedditList();
      }

      render(){
          return(
              <Container className="home bg-bagad-heol" fluid>
                <Container className="screen screen-2">
                    <Row>
                        <Col className="text-center">
                            <h1>Conditions Générales d'Utilisations</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center-cgu">
                            <h2>Présentation du site </h2>
                            <p>
                            En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site bagad-heol.fr l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi : 

                            Le présent site est édité par : Bagad Heol Entreprise, SAS ayant pour numéro de SIRET Numéro de SIRET et qui est domiciliée au Rue Pierre de Maupertuis, 35170 Bruz 
                            
                            Responsable de la publication : Charles Elie Piquemal, joignable par téléphone au 0601010101 et par email cep@gmail.com 
                            
                            Webmaster du site: Agence, joignable par téléphone au 0601010101 
                            
                            Hébergeur du site: OVH, qui est domicilié 2 rue Kellermann – BP 80157 59053 ROUBAIX CEDEX 1 et joignable par téléphone au 0601010101 
                            </p>
                            <h2>Propriété intellectuelle et contrefaçons</h2>
                            <p>
                            L’entreprise Bagad Heol est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment : les textes, les images, les graphismes, le logo, les icônes, … 

                            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l’entreprise Bagad Heol. 

                            Toute exploitation non autorisée du site ou d’un quelconque élément qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle. 
                            </p>
                            <h2>Cookies et traceurs</h2>
                            <p>
                             Le site internet www.bagad-heol.fr possède un système de mesure d’audience, ainsi qu’une fonction de partage sur les réseaux sociaux. 

                            En application de la directive européenne dite « paquet télécom », les internautes doivent être informés et donner leur consentement préalablement à l’insertion de traceurs (plus couramment appelés « cookies »). Les internautes doivent disposer d’une possibilité de choisir de ne pas être tracés lorsqu’ils visitent un site ou utilisent une application. Les éditeurs de sites internet ont donc l’obligation de solliciter au préalable le consentement des utilisateurs. 

                            Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’internaute peut toutefois configurer son navigateur internet pour refuser l’installation des cookies. 

                            Mesure d’audience 

                            Les cookies de mesure d’audience sont de petits fichiers qui permettent de connaitre et d’analyser les statistiques de trafic sur le site internet : les pages visitées, le nombre de visites, le taux de rebond, la provenance des visites, … Les cookies de mesure d’audience sont totalement anonymes. 

                            Sur ce site, c’est la solution Google Analytics qui est utilisée pour mesurer l’audience. 

                            Réseaux sociaux 

                            Les cookies liés aux réseaux sociaux sont associés aux boutons qui facilitent le partage des pages et articles sur les réseaux sociaux. 
                            </p>
                            <h2>Formulaire de contact et commentaires</h2>
                            <p>
                             Vous pouvez être amené à nous indiquer votre adresse e-mail lorsque vous remplissez notre formulaire de contact ou déposez un commentaire sur l’un des articles du site www.bagad-heol.fr. 

                            En aucun cas, votre adresse e-mail ne sera cédée à des tiers. 
                            </p>
                            <h2>Modération des commentaires</h2>
                            <p>
                            Le choix de validation d’un commentaire sur le site www.bagad-heol.fr est laissé à l’entière appréciation du responsable de publication. Les commentaires peuvent être supprimés, modifiés et corrigés pour une meilleure compréhension des visiteurs (notamment pour l’orthographe). 

                            L’internaute peut signer son commentaire de son nom ou pseudo ou nom de son entreprise. Il peut également renseigner une URL dans le champ « site web ». Ce lien peut ne pas apparaitre s'il a été jugé que le commentaire n’apportait pas réellement de plus-value à l’article. Ceci, même si le commentaire est publié. 

                            Voici des exemples de cas ou un commentaire peut être modéré ou supprimé : 

                            - Il a été supprimé par l’anti-spam 

                            - Il n’apporte pas réellement de plus-value et n’est pas utile pour les internautes 

                            - Il est truffé de fautes d’orthographe ou incompréhensible 

                            - Il semble être déposé uniquement dans un but auto-promotionnel 

                            - Le mail indiqué est visiblement faux 

                            - Il est jugé diffamatoire pour un tiers 
                            </p>
                            <h2>Newsletter</h2>
                            <p>
                             Vous pouvez vous abonner à la newsletter du site. Vous recevez alors automatiquement et gratuitement des newsletters traitants les sujets du site www.bagad-heol.fr. 

                            Vous pouvez vous désinscrire à tout moment de la newsletter en cliquant sur le lien de désabonnement présent en bas de chaque newsletter. 

                            En aucun cas, votre adresse e-mail ne sera cédée à des tiers. 
                            </p>
                            <h2>Liens hypertextes</h2>
                            <p>
                             Ce site internet contient un certain nombre de liens hypertextes vers d’autres sites. Cependant, www.bagad-heol.fr n’a pas la possibilité de suivre et vérifier le contenu de ces sites, et n’assumera en conséquence aucune responsabilité de ce fait. 
                            </p>
                            <h2>Flux RSS</h2>
                            <p>
                             Les flux RSS sont exclusivement destinés aux visiteurs du site pour une utilisation personnelle et ne sauraient en aucun cas servir à alimenter d’autres sites, sauf autorisation écrite préalable de www.bagad-heol.fr. 
                            </p>
                        </Col>
                    </Row>
                </Container>
              </Container>
          );
      }
}

function mapStateToProps(state) {
    return {
      podcast: state.podcast,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...podcastActions }, dispatch)
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cgu);