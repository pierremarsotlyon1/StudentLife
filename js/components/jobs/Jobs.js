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

import {loadJobs, loadMoreJobs} from '../../actions/jobs';

const nbJobs = 10;

class Jobs extends React.Component {
  static navigationOptions = () => ({
    title: 'Offres d\'emploi'
  });

  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      afficherBtnLoadMore: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.jobs.length !== nextProps.jobs.length && (nextProps.jobs.length - this.props.jobs.length) < nbJobs) {
      this.setState({
        afficherBtnLoadMore: false,
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(loadJobs(this.state.offset));
  }

  handleLoadMore = () => {
    this.setState({
      offset: this.state.offset + nbJobs,
    }, () => {
      this.props.dispatch(loadMoreJobs(this.state.offset));
    });
  };

  handleLoadRecentBonPlans = (e) => {
    if (e && e.nativeEvent && e.nativeEvent.contentOffset && e.nativeEvent.contentOffset.y < 0) {
      this.setState({
        offset: 0,
      }, () => {
        this.props.dispatch(loadJobs(this.state.offset));
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

  handleDetail = (job) => {
    this.props.navigation.navigate("DetailJob", {
      job: job,
    });
  };

  render() {
    const {jobs, loading} = this.props;
    const {afficherBtnLoadMore} = this.state;
    const jobsLocal = [];

    if (jobs.length > 0) {
      for (const job of jobs) {
        if (!job._source || !job._id) {
          continue;
        }

        let image, remuneration, typeContrat;

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

        jobsLocal.push(
          <Card key={job._id}>
            {
              image || job._source.nom_entreprise
                ?
                <CardItem header button onPress={() => this.handleDetail(job)}>
                  {image}
                  <Text>
                    {job._source.nom_entreprise}
                  </Text>
                </CardItem>
                :
                undefined
            }
            <CardItem button onPress={() => this.handleDetail(job)}>
              <Body>
              <Text
                style={{fontSize: 18}}
              >
                {job._source.titre}
              </Text>
              </Body>
            </CardItem>
            <CardItem footer button onPress={() => this.handleDetail(job)}>
              <Grid>
                <Row>
                  {remuneration}
                  {typeContrat}
                </Row>
              </Grid>
            </CardItem>
          </Card>
        );
      }
    }
    else {
      jobsLocal.push(
        <Text
          style={Object.assign({}, TextStyle.center, Margin.mt15)}
          key="empty_jobs_txt"
        >
          Aucune offre d'emploi pour le moment <Icon name="sad"/>
        </Text>
      )
    }

    if (jobsLocal.length > (nbJobs - 1) && afficherBtnLoadMore) {
      jobsLocal.push(
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
              jobsLocal
          }
        </Content>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs,
  };
}

export default connect(mapStateToProps)(Jobs);