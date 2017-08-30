import React from 'react';

class Button extends React.Component {
   render() {
      return (
        <button
          type="button"
          className={this.props.classname}
          onClick={this.props.onClick}
          name={this.props.name}
          value={this.props.value}
          >{this.props.value}</button>
      );
   }
}

export default Button;
