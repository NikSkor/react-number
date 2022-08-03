import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types'; // ES6

export class ClassComponent extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     result: 'Результат',
  //     userNumber: '',
  //     randomNumber:
  //       Math.floor(Math.random() * this.props.max - this.props.min) +
  //       this.props.min,
  //   };
  // }

  state = {
    result: 'Угадай число',
    userNumber: '',
    randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
    count: 0,
    label: 'Угадать',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.userNumber) {
      this.setState(state => ({
        count: state.count + 1,
        label: 'Угадать',
      }));
    }
    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }
      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
          userNumber: '',
        };
      }
      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
          userNumber: '',
        };
      }

      return {
        result: `Вы угадали, загаданое число ${state.userNumber},
          попыток ${state.count}!`,
        userNumber: '',
        label: `Сыграть ещё`,
        randomNumber:
          Math.floor(Math.random() * this.props.max - this.props.min) +
          this.props.min,
        count: 0,
      };
    });
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };


  render() {
    console.log(this.state);
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>
          <input className={style.input} type='number' id='user_number'
            onChange={this.handleChange} value={this.state.userNumber} />
          <button className={style.btn}>{this.state.label}</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
