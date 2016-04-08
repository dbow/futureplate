import React from 'react';
import {provideHooks} from 'redial';

import {getNumber, setNumber} from 'src/actions/index';

import FluxComponent from 'src/flux/component.jsx';
import Loading from 'src/components/loading/loading.jsx';
import Dashboard from './dashboard.jsx';
import Form from './form.jsx';


const dependencies = provideHooks({
  fetch: ({store}) => getNumber(store),
});

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };

    this.updateNumber = this.updateNumber.bind(this);
  }

  render() {
    const {store} = this.props;
    const number = store.stores.number.getState();
    if (!number) {
      return <Loading />;
    }
    const dashboardProps = {
      number: number.number,
    };
    const formProps = {
      handleSubmit: this.updateNumber,
      disabled: store.request.inProgress('number'),
      error: this.state.error,
    };
    return (
      <div>
        <Dashboard {...dashboardProps} />
        <Form {...formProps} />
      </div>
    );
  }

  updateNumber(number) {
    number = parseInt(number, 10);
    let error = '';
    if (isNaN(number) || typeof number !== 'number') {
      error = 'Hey that wasn\'t a number!';
    }
    this.setState({
      error,
    });
    if (error) {
      return;
    }
    setNumber(this.props.store, number);
  }
}


export default dependencies(FluxComponent(DashboardContainer));

