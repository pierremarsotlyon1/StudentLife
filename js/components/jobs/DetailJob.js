/**
 * Created by pierremarsot on 12/07/2017.
 */
import React from 'react';
import {Image, Linking} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Badge,
  Header,
  Left,
  Title,
  Right,
  Spinner,
  Button,
  Row,
  Col,
  Grid,
} from 'native-base';
import Margin from '../../styles/Margin';
import TextStyle from '../../styles/Text';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

const nbJobs = 10;

class DetailJob extends React.Component {
  static navigationOptions = () => ({
    title: 'Detail de l\'offre'
  });

  constructor(props) {
    super(props);

    if (!this.props.navigation.state.params.job) {
      this.props.navigation.goBack();
    }

    this.state = {
      job: this.props.navigation.state.params.job
    };
  }

  handleOpenUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  render() {
    const {job} = this.state;

    let titre, description, profil, image, remuneration, typeContrat, header, blockContact;
    let contacts = [];

    if (job._source.titre) {
      titre =
        <Text
          style={{fontSize: 18}}
        >
          {job._source.titre}
        </Text>;
    }

    if (job._source.description) {
      description =
        <Text
          style={{fontSize: 11}}
        >
          {job._source.description}
        </Text>;
    }

    if (job._source.profil) {
      profil =
        <Text
          style={{fontSize: 11}}
        >
          {job._source.profil}
        </Text>;
    }

    if (job._source.logo_entreprise) {
      image =
        <Image
          style={{width: 34, height: 34, marginRight: 20}}
          source={{uri: job._source.logo_entreprise}}
        />;
    }

    if (job._source.remuneration) {
      remuneration =
        <Col>
          <Text>
            {job._source.remuneration} euros
          </Text>
        </Col>
    }

    if (job._source.type_contrat) {
      typeContrat =
        <Col>
          <Text>
            {job._source.type_contrat}
          </Text>
        </Col>
    }

    if (image || job._source.nom_entreprise) {
      let blockNomEntreprise;

      if (job._source.nom_entreprise) {
        blockNomEntreprise =
          <Text>
            {job._source.nom_entreprise}
          </Text>;
      }

      header =
        <CardItem header>
          {image}
          {blockNomEntreprise}
        </CardItem>
    }

    if (job._source.email_contact) {
      contacts.push(
        <Col key="email_contact">
          <Text style={{fontSize: 12}}>
            {job._source.email_contact}
          </Text>
        </Col>
      );
    }

    if (job._source.telephone_contact) {
      contacts.push(
        <Col key="telephone_contact">
          <Text style={{fontSize: 12}}>
            {job._source.telephone_contact}
          </Text>
        </Col>
      );
    }

    if (contacts.length > 0) {
      blockContact =
        <Row
          style={{marginTop: 15}}
        >
          <Row>
            <Col>
              <Text style={{fontSize: 12}}>
                Contact :
              </Text>
            </Col>
          </Row>
          <Row>
            {contacts}
          </Row>
        </Row>
    }

    return (
      <Container>
        <Content>
          <Card key={job._id}>
            {header}
            <CardItem>
              <Body>
              {titre}
              {description}
              {profil}
              </Body>
            </CardItem>
            <CardItem footer>
              <Grid>
                <Row>
                  {remuneration}
                  {typeContrat}
                </Row>
                {blockContact}
              </Grid>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default DetailJob;