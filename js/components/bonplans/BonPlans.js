/**
 * Created by pierremarsot on 12/07/2017.
 */
import React from 'react';
import {Image, Linking} from 'react-native';
import {connect} from 'react-redux';
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

import {loadBonPlans, loadMoreBonPlans, loadRecentBonPlans} from '../../actions/bonplans';

const nbBonPlans = 10;

class BonPlans extends React.Component {
  static navigationOptions = () => ({
    title: 'Bons plans'
  });

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      afficherBtnLoadMore: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.bonPlans.length !== nextProps.bonPlans.length && (nextProps.bonPlans.length - this.props.bonPlans.length) < nbBonPlans) {
      this.setState({
        afficherBtnLoadMore: false,
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(loadBonPlans(this.state.offset));
  }

  handleLoadMore = () => {
    this.setState({
      offset: this.state.offset + nbBonPlans,
    }, () => {
      this.props.dispatch(loadMoreBonPlans(this.state.offset));
    });
  };

  handleLoadRecentBonPlans = (e) => {
    if (e && e.nativeEvent && e.nativeEvent.contentOffset && e.nativeEvent.contentOffset.y < 0) {
      this.setState({
        offset: 0,
      }, () => {
        this.props.dispatch(loadBonPlans(this.state.offset));
      });
    }
  };

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
    const {bonPlans, loading} = this.props;
    const {afficherBtnLoadMore} = this.state;
    const bonPlansLocal = [];

    if (bonPlans.length > 0) {
      for (const bonPlan of bonPlans) {
        if (!bonPlan._source || !bonPlan._id) {
          continue;
        }

        let codePromo, reduction, dateFin, url, image;

        if (bonPlan._source.code_promo && bonPlan._source.code_promo.length > 0) {
          codePromo =
            <Text>
              Code promo : {bonPlan._source.code_promo}
            </Text>
        }

        if (bonPlan._source.reduction) {
          reduction =
            <Col>
              <Right>
                <Badge success>
                  <Text>
                    -{bonPlan._source.reduction}%
                  </Text>
                </Badge>
              </Right>
            </Col>
        }

        if (bonPlan._source.date_fin) {
          dateFin =
            <Col>
              <Text>Jusqu'au {moment(bonPlan._source.date_fin).format('DD MMMM')}</Text>
            </Col>
        }

        if (bonPlan._source.url) {
          url =
            <Col>
              <Button
                primary
                small
                full
                onPress={() => this.handleOpenUrl(bonPlan._source.url)}
              >
                <Text>
                  En savoir plus
                </Text>
              </Button>
            </Col>
        }

        if (bonPlan._source.logo_entreprise){
          image =
            <Image
              style={{width: 34, height: 34, marginRight: 20}}
              source={{uri: bonPlan._source.logo_entreprise}}
            />;
        }

        bonPlansLocal.push(
          <Card key={bonPlan._id}>
            <CardItem header>
              {image}
              <Text>
                {bonPlan._source.nom_entreprise}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
              <Text
                style={{fontSize: 18}}
              >
                {bonPlan._source.title}
              </Text>
              <Text
                style={{fontSize: 11}}
              >
                {bonPlan._source.description}
              </Text>
              {codePromo}
              </Body>
            </CardItem>
            <CardItem footer>
              <Grid>
                <Row>
                  {dateFin}
                  {reduction}
                </Row>
                <Row
                  style={Margin.mt15}
                >
                  {url}
                </Row>
              </Grid>
            </CardItem>
          </Card>
        );
      }
    }
    else {
      bonPlansLocal.push(
        <Text
          style={Object.assign({}, TextStyle.center, Margin.mt15)}
          key="empty_bons_plan_txt"
        >
          Aucun bon plan pour le moment <Icon name="md-sad"/>
        </Text>
      )
    }

    if (bonPlansLocal.length > (nbBonPlans - 1) && afficherBtnLoadMore) {
      bonPlansLocal.push(
        <Button
          block
          onPress={() => this.handleLoadMore()}
          style={Margin.m15}
          key="buttonLoadMoreBonPlans"
        >
          <Text>En charger plus</Text>
        </Button>
      );
    }

    return (
      <Container>
        <Content onScroll={this.handleLoadRecentBonPlans}>
          {
            loading ?
              <Spinner color='blue'/>
              :
              bonPlansLocal
          }
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    bonPlans: state.bonPlans.bonPlans,
    loading: state.bonPlans.loading,
  };
}

export default connect(mapStateToProps)(BonPlans);