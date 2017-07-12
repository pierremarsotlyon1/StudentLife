/**
 * Created by pierremarsot on 12/07/2017.
 */
import React from 'react';
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
} from 'native-base';
import Margin from '../../styles/Margin';

import {loadBonPlans, loadMoreBonPlans} from '../../actions/bonplans';

class BonPlans extends React.Component {
  static navigationOptions = {
    title: 'Bon plans',
    tabBarIcon: ({tintColor}) => (
      <Icon
        name="md-thumbs-up"
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };
  }

  componentDidMount() {
    if (this.props.bonPlans.length === 0) {
      this.props.dispatch(loadBonPlans(this.state.offset));
    }
  }

  handleLoadMore = () => {
    this.setState({
      offset: this.state.offset + 10,
    }, () => {
      this.props.dispatch(loadMoreBonPlans(this.state.offset));
    });
  };

  render() {
    const {bonPlans, loading} = this.props;
    const bonPlansLocal = [];

    for (const bonPlan of bonPlans) {
      if (!bonPlan._source || !bonPlan._id) {
        continue;
      }

      let codePromo, reduction;

      if (bonPlan._source.code_promo && bonPlan._source.code_promo.length > 0) {
        codePromo = <Text>
          Code promo : {bonPlan._source.code_promo}
        </Text>
      }

      if (bonPlan._source.reduction) {
        reduction = <Right>
          <Badge success>
            <Text>-{bonPlan._source.reduction}%</Text>
          </Badge>
        </Right>
      }

      bonPlansLocal.push(
        <Card key={bonPlan._id}>
          <CardItem header>
            <Text>
              {bonPlan._source.title}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
            <Text>
              {bonPlan._source.description}
            </Text>
            {codePromo}
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Du {bonPlan._source.date_debut} au {bonPlan._source.date_fin}</Text>
            {reduction}
          </CardItem>
        </Card>
      );
    }

    if (bonPlansLocal.length > 0) {
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
        <Header>
          <Body>
          <Title>Bon plans</Title>
          </Body>
        </Header>
        <Content>
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