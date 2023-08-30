/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 * modify 23/07/10 by ef
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './Loading';


function valuePassThrought(fn: () => any, isThrow?: boolean) {
  return (value: any) => {
    try {
      fn();
    } catch {
      // nothing to do
    }

    if (isThrow) {
      throw value;
    } else {
      return value;
    }
  };
}

class Wrapper {
  private refCount = 0;

  private container?: HTMLDivElement;
  private root?: ReactDOM.Root;

  public show = () => {
    this.refCount += 1;

    if (this.refCount === 1) {
      this.create();
    }
  };

  public hide = () => {
    this.refCount -= 1;

    if (this.refCount === 0) {
      this.destroy();
    } else if (this.refCount < 0) {
      console.warn(`Instance refCount: ${this.refCount}`);
      this.refCount = 0;
    }
  };

  public using = (fn: () => any) => {
    return Promise.resolve()
      .then(valuePassThrought(this.show))
      .then(fn)
      .then(valuePassThrought(this.hide), valuePassThrought(this.hide, true));
  };

  public reset() {
    this.refCount = 0;
    this.destroy();
  }

  private create() {
    if (!this.container) {
      this.container = document.createElement('div');
      const root = ReactDOM.createRoot(this.container); 
      root.render(React.createElement(Loading));
      document.body.appendChild(this.container);
    }
  }

  private destroy() {
    if (this.container) {
      this.root?.unmount();
      document.body.removeChild(this.container);
      this.container = undefined;
    }
  }
}

export default Wrapper;
