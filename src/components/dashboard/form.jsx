import css from './form.css';

import React from 'react';


class DashboardForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const {value} = event.target;
    this.setState({
      value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    const {value} = this.state;
    const {disabled, error} = this.props;
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label>
          <div className={css.instructions}>Enter a new number!:</div>
          <input type="text" value={value} onChange={this.handleChange} />
          { error &&
            <span className={css.error} aria-live="polite">{error}</span>
          }
        </label>
        <input type="submit" value="submit" disabled={disabled} />
      </form>
    );
  }
}

DashboardForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  error: React.PropTypes.string,
};

export default DashboardForm;

