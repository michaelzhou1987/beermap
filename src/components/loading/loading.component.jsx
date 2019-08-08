import React, { Component } from "react";
import style from './loading.module.scss'

class LoadingComponent extends Component {
  render () {
    return (
      <div className={style['loading-wrapper']}>
        <strong className={style['loading-text']}>Loading...</strong>
        <div className="spinner-border" role="status" aria-hidden="true" />
      </div>
    );
  }
}

export default LoadingComponent