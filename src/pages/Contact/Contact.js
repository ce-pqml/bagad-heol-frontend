import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as exampleActions from '../../redux/example/actions';

export class Contact extends Component {
  static propTypes = {
    examples: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchRedditList();
  }

  render() {
    return (
      <Container className="contact bg-bagad-heol" fluid>
        <Container className="mb-5">
          <Row>
            <Col className="text-center">
              <h1>Contact</h1>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <p>Si vous souhaitez nous contacter afin de nous proposer des idées, faire une demande de participation ou bien encore une réclamation, vous pouvez remplir ce formulaire.</p>
            </Col>
          </Row>
        </Container>
        <Container className="block-bagad-heol">
          <Row className="mb-3">
            <Col>
              <h3>Formulaire de contact</h3>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Civilité</label>
              <select class="form-control form-control-sm" name="civ" required>
                <option value="">&nbsp;</option>
                <option value="M." selected="selected">M.</option>
                <option value="Mme">Mme</option>
                <option value="Mlle">Mlle</option>
              </select>
              {/* <input type="text" placeholder="" name="civ" className="w-100 form-control form-control-sm" required /> */}
            </Col>
            <Col>
              <label>Prénom</label>
              <input type="text" placeholder="" name="firstname"  className="w-100 form-control form-control-sm" required />
            </Col>
            <Col>
              <label>Nom</label>
              <input type="text" placeholder="" name="lastname"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Email</label>
              <input type="text" placeholder="" name="email"  className="w-100 form-control form-control-sm" required />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Sujet</label>
              {/* <input type="text" placeholder="" name="subject" className="w-100 form-control form-control-sm" required /> */}
              <select class="form-control form-control-sm" name="subject" required>
                <option value="Proposition de concept" selected="selected">Proposition de concept</option>
                <option value="Réclamation">Réclamation</option>
                <option value="Demande d'ouverture de compte">Demande d'ouverture de compte</option>
                <option value="Informations générales">Informations générales</option>
                <option value="Autres">Autres</option>
              </select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label>Message</label>
              {/* <input type="textarea" placeholder="" name="text"  className="w-100 form-control form-control-sm" required /> */}
              <textarea name="text" className="w-100 form-control form-control-sm text-area-bagad-heol" required></textarea>
            </Col>
          </Row>
          <Row className="d-flex align-items-center mb-3">
            <Col md={1}>
              <input type="checkbox" placeholder="" name="rgpd" className="form-control form-control-sm" required />
            </Col>
            <Col>
              <p className="m-0">En soumettant ce formulaire de contact, j'accepte que les informations saisies soient exploitées
                dans le cadre de ma demande d'information.
              </p>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col className="d-flex justify-content-end">
              <input type="submit" id='submit' value='Envoyer' className="btn-bagad-heol"/>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <p>Pour connaître et exercer vos droits, notamment de retrait de votre consentement à l'utilisation des données collectées par ce formulaire,
                veuillez consulter les conditions générales d'utilisation liées à la gestion des données personnelles.</p>
            </Col>
          </Row>
        </Container>
      </Container>
      // <div className="contact">
      //   <div className="screen-1">
      //     <div className="title">
      //       <h1>Contact</h1>
      //       <p>
      //         Si vous souhaitez nous contacter afin de nous proposer des idées, faire une demande de participation ou bien encore une réclamation, vous pouvez remplir ce formulaire.
      //       </p>
      //     </div>



      //     <div class="formulaire">
      //       <h2>Formulaire de contact</h2>

      //       <form method="post" action="/home" id="formpersonnalise" enctype="multipart/form-data">
      //         <fieldset>
      //           <small class="obligatory-field">* Champs obligatoires</small>
      //           <div class="clear"></div>
              
      //           <div class="block_row" id="divfield1">
      //             <label class="label" for="field1">Civilité*</label>
      //             <div class="field">
      //               <select class="form-control" name="field1" id="field1">
      //                 <option value="">&nbsp;</option>
      //                 <option value="M." selected="selected">M.</option>
      //                 <option value="Mme">Mme</option>
      //                 <option value="Mlle">Mlle</option>
      //               </select>
      //             </div>
      //           </div>
              
      //           <div class="block_row" id="divfield2">
      //             <label class="label" for="field2id">Prénom*</label>
      //             <div class="field">
      //               <input type="text" name="field2" id="field2id" class="form-control" />
      //             </div>
      //           </div>
                
      //           <div class="block_row" id="divfield3">
      //             <label class="label" for="field3id">Nom*</label>
      //             <div class="field"><input type="text" name="field10" id="field3id" class="form-control" /></div>
      //           </div>
                
      //           <div class="block_row" id="divfield4">
      //             <label class="label" for="field4id">Email*</label>
      //             <div class="field"><input type="text" name="field4" id="field4id" class="form-control" /></div>
      //           </div>
              
      //           <div class="block_row" id="divfield5">
      //             <label class="label" for="field5">Sujet*</label>
      //             <div class="field">
      //               <select class="form-control" name="field5" id="field5" >
      //                 <option value="">&nbsp;</option>
      //                 <option value="Proposition de concept" selected="selected">Proposition de concept</option>
      //                 <option value="Réclamation">Réclamation</option>
      //                 <option value="Demande d'ouverture de compte">Demande d'ouverture de compte</option>
      //                 <option value="Informations générales">Informations générales</option>
      //               </select>
      //             </div>
      //           </div>
                
      //           <div class="block_row" id="divfield6">
      //             <label class="label" for="field6">Message*</label>
      //             <div class="field">
      //               <textarea name="field6" id="field6" cols="32" rows="5" class="form-control"></textarea>
      //             </div>
      //           </div>
                
      //           <div class="block_row wrap-consentement" id="divfield7">
      //             <div class="field">
      //               <input type="checkbox" class="checkbox consentement" name="field7" id="field7" value="1" />
      //             </div>
      //             <label class="label" for="field7">En soumettant ce formulaire de contact, j'accepte que les informations saisies soient exploitées dans le cadre de ma demande d'information.*</label>
      //           </div>

      //           <div class="clear"></div>
      //         </fieldset>

      //         <div id="captcha" class="block_row">				
            
      //           <span>
      //             <span class="captchaLabel">
      //               <img src="/contactez-nous/captcha-generate-captcha9a5e5f179becb20e334c1806c1ac5f94" alt="captcha" id="idcaptchacaptcha9a5e5f179becb20e334c1806c1ac5f94" />
      //               <a href="javascript:void(0);" onclick="newCaptchacaptcha9a5e5f179becb20e334c1806c1ac5f94();" class="LinkIn newCaptcha" title="Si vous ne parvenez pas à lire l'image, vous pouvez en générer une autre en cliquant sur ce lien">Générer une autre image</a>
      //               <script type="text/javascript"></script>
      //             </span>
      //           </span>
      //         </div>

      //         <div class="block_row submit">
      //             <input type="submit" value="ENVOYER" class="submitid valid" name="submit" id="submitid" />
      //         </div>
      //         <div>
      //           <input type="hidden" id="form_submit" name="form_submit" value="form2" />
      //         </div>
      //         <div class="clear"></div>
      //       </form>
      //       <div class="form_creator_footer">
      //         <p>
      //           <i>Pour conna&icirc;tre et exercer vos droits, notamment de retrait de votre consentement &agrave; l&#39;utilisation des donn&eacute;es collect&eacute;es par ce formulaire, veuillez consulter les conditions g&eacute;n&eacute;rales d&#39;utilisation li&eacute;es &agrave; la </i>
      //           <a href="/" hreflang="fr" target="_blank" title="gestion des données personnelles. " class="LinkIn">gestion des donn&eacute;es personnelles.</a>
      //         </p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    examples: state.examples,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...exampleActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);

