/**
 * Created by pierremarsot on 22/07/2017.
 */
import React from 'react';
import {Container, Content, Text, Item, Input, Button} from 'native-base';
import TextStyle from '../../styles/Text';
import Margin from '../../styles/Margin';
import {addSuggestion} from '../../actions/suggestion';

class Suggestion extends React.Component {
  static navigationOptions = () => ({
    title: 'Suggestion'
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

  handleSubmitSuggestion = () => {
    addSuggestion(this.state.message);
  };

  render(){
    return (
      <Container>
        <Content>
          <Item>
            <Input
              placeholder="Votre suggestion"
              multiline={true}
              numberOfLines = {8}
              onChangeText={this.handleMessage}
              style={Object.assign({height: 200, backgroundColor: 'white'}, Margin.m15)}
            />
          </Item>
          <Button
            full
            onPress={() => this.handleSubmitSuggestion()}
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

export default Suggestion;