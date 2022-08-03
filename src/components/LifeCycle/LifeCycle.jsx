import React from 'react';
import style from './LifeCycle.module.css';

export class LifeCycle extends React.Component {
  /**
   * !render
   * constructor
   * getDerivedStateFromProps
   * render
   * -
   * !commit
   * обновляется DOM
   * componentDidMount
   * componentWillUnmount
   */

  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      field: 0,
      hasError: false,
    };

    // this.handler = this.handler.bind(this);
    // используется если хандлер выглядит так:
    // handler() {
    //   this.setState(state => ({ field: state.field + 1 }));
    // }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return state;
    // return {
    //   field: 10,
    // };
    // компонент может обновить своё внутреннее
    // состояние в результате изменения пропсов
  }

  componentDidMount() {
    console.log('componentDidMount');
    // для сайд эффектов

    // setTimeout(() => {
    //   console.log('timer');
    // }, 3000);

    // setInterval(() => {
    //   this.setState((state) => ({
    //     field: state.field + 1,
    //   }));
    // }, 3000);

    // document.addEventListener('scroll', () => {
    //   console.log('scroll');
    // });

    // document.addEventListener('scroll', this.handler);

    // eslint-disable-next-line react/prop-types
    document.title = this.props.prop;
  }

  /**
   * !render
   * getDerivedStateFromProps
   * shouldComponentUpdate
   * render
   * -
   * !pre-commit
   * getSnapshotBeforeUpdate
   * Обновление Dom
   * !commit
   * componentDidUpdate
   */
  componentWillUnmount() {
    // для убирания всех листенеров
    // вызывается перед демонтажём компонента
    console.log('componentWillUnmount');
    document.removeEventListener('scroll', this.handler);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // принимает новые пропсы, состояние и контекст
    // решает нужно ли обновлять данные на странице
    // не надо использовать на pureComponent
    // возвращает только буль
    console.log('shouldComponentUpdate');
    // return true;
    return this.state !== nextState || this.props !== nextProps;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // принимает предыдущие пропс и стэйт
    // возвращает любое значение
    // после уже рендер
    console.log('getSnapshotBeforeUpdate');
    // return null;
    return window.pageYOffset;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // принимает значения от SnapShot
    // работает после рендера
    // можно вызвать setState но нужно условие
    // иначе бесконечный вызов
    console.log('componentDidUpdate');
    window.scrollBy(0, -snapshot);
  }

  /**
   * Методы ошибок
   * !error
   * getDerivedStateFromError
   * componentDidCatch
   */


  static getDerivedStateFromError() {
    // принимает ошибку и возвращает новый state
  }

  componentDidCatch(error, errorInfo) {
    // для сайд эффектов
    // например для отправки ошибки на сервер
    // sendLog(errorInfo.componentStack);
    // стэйт не вызывают в нём
  }

  handler = () => {
    this.setState(state => ({field: state.field + 1}));
  };

  render() { // обязательный метод жизненного цикла
    console.log('render');
    if (this.state.hasError) {
      return <h1 className={style.title}>Ошибка</h1>;
    } else {
      return (
        <div>
          <h1 className={style.title}>Жизненный цикл</h1>

          <div className={style.container}>
            <div>
              <h2 className={style.title}>Типы</h2>
              <ul className={style.list}>
                <li>Монтирование</li>
                <li>Обновление</li>
                <li>Размонтирование</li>
                <li>Ошибки</li>
              </ul>
            </div>

            <div className='stage'>
              <h2 className={style.title}>Этапы</h2>
              <ul className={style.list}>
                <li>Render</li>
                <li>Pre-commit</li>
                <li>Commit</li>
              </ul>
            </div>
          </div>
          <button className={style.btn}
            onClick={this.handler}>
            Клик {this.state.field}</button>
        </div>
      );
    }
  }
}
