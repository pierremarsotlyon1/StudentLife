/**
 * Created by pierremarsot on 10/07/2017.
 */
import React, {PropTypes} from 'react';
import {Icon} from 'native-base';

class CustomIcon extends React.Component {
  render(){
    return (
      <Icon name={this.props.icon} />
    )
  }
}

CustomIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default CustomIcon;