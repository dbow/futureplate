import React from 'react';


export default class Things extends React.Component {
  render() {
    return (
      <div className="things">
        {this.props.children}
      </div>
    );
  }
}

