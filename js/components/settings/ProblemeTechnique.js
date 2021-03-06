/**
 * Created by pierremarsot on 22/07/2017.
 */
import React from 'react';
import {Container, Content, Text, Item, Input, Button} from 'native-base';
import TextStyle from '../../styles/Text';
import Margin from '../../styles/Margin';
import {addProblemeTechnique} from '../../actions/problemeTechnique';

class ProblemeTechnique extends React.Component {
  static navigationOptions = () => ({
    title: 'Problème technique'
  });

  constructor(props){
    super(props);

    this.state = {
      message: '',
    };
  }

  handleMessage = (message) => {
    this.setState({
      message: message,
    });
  };

  handleSubmitProblemeTechnique = () => {
    const that = this;
    addProblemeTechnique(this.state.message)
      .then(() => {
        that.props.navigation.goBack();
      })
      .catch(() => {

      });
  };

  render(){
    return (
      <Container>
        <Content>
          <Item>
            <Input
              placeholder="Votre problème technique"
              multiline={true}
              numberOfLines = {8}
              onChangeText={this.handleMessage}
              style={Object.assign({height: 200, backgroundColor: 'white'}, Margin.m15)}
            />
          </Item>
          <Button
            full
            onPress={() => this.handleSubmitProblemeTechnique()}
          >
            <Text
              style={TextStyle.center}
            >
              Envoyer
            </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default ProblemeTechnique;