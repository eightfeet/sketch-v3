export const sleep = (time: number = 1000) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(undefined);
      clearTimeout(timer);
    }, time);
  })
}


export enum Environment {
  Wechat,
  MiniProgram,
  H5,
  PC
}


export async function environment(): Promise<Environment> {
  return new Promise((resolve) => {
    const ua = navigator.userAgent.toLowerCase();
    // 判断是否在钉钉、微信、微信小程序、浏览器内
    if (/MicroMessenger/i.test(ua)) {
      window.wx?.miniProgram.getEnv((res: any) => {
        if (res.miniprogram) {
          resolve(Environment.MiniProgram);
        } else {
          resolve(Environment.Wechat);
        }
      });
      resolve(Environment.Wechat);
    } else if (
      /Mobi|Android|iPhone/i.test(navigator.userAgent)
    ) {
      resolve(Environment.H5);
    } else {
      resolve(Environment.PC);
    }
  });
}