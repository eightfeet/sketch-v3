export const sleep = (time:number=1000) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        resolve(undefined);
        clearTimeout(timer);
      }, time);
    })
  }