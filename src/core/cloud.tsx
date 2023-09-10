import queryString from "query-string";
import loadScript from "./loadScript";
import { user } from "~/store";
import { snapshot } from "valtio";

export enum CloudKeys {
  /** username、license */
  解码 = "decodeSn",
  /** member_id */
  查询会员 = "getMemberById",
  /** member_id、username, email*/
  更新会员 = "updateMemberById",
  /** member_id */
  查询序列号 = "getSerialCodeByMemberId",
  /**  id, name, project_id, */
  查询邀请活动 = "QInviteTasks",
  /** username、license */
  序列号登陆 = "SNLogin",
  /** username, code, email, member_id */
  邀请码激活 = "activationCodeToSN",
  /** username, code, email, member_id */
  获取微信 = "getWxUser",
  /** project_id:[1], member_id */
  检查并更新任务达成 = "taskStatistics",
  /** member_id, task_id, username */
  任务转换为序列号 = "taskToSN",
  获取模特列表 = "sketch/getPosesCatalog",
  获取模特标签 = "sketch/getPosesTags",
  获取模特 = "sketch/getPoses",
}

let cloud: { callFunction: (arg0: { name: string; data: { key: CloudKeys; token: string, member_id: string }; success: (res: any) => void; fail: (err /** username、license */: any) => void; }) => void; } | undefined = undefined

export const init = async () => {
  if (cloud) return cloud;
  await loadScript("https://res.wx.qq.com/open/js/jweixin-1.6.0.js");
  await loadScript(
    "https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.4.0/cloud.js"
  );
  const { e=import.meta.env.VITE_APP_MINIENV, appid=import.meta.env.VITE_APP_MINIID } = queryString.parse(window.location.search);
  if (!e || !appid) {
    throw new Error('云函数初始化失败，缺少参数');
  }
  const c = new (window as any).cloud.Cloud({
    identityless: true, // 表示是未登录模式
    resourceAppid: appid,
    resourceEnv: e,
  });
  await c.init();
  return c;
}

/**
 * 原函数调用
 * @param key 云函数名
 * @param data 参数
 * @returns 调用结果
 */
export const cloudFunction = async (key: CloudKeys, data: { [key: string]: any, }) => {

  cloud = await init();
  
  return await new Promise<{ code: number; data: { [key: string]: any }; msg?: string, status?: number | string }>(
    (resolve, reject) => {
      if (!cloud) {
        reject("云函数未定义");
      }
      const userR = snapshot(user);
      cloud!.callFunction({
        name: "dwxV2",
        data: {
          key,
          token: userR.token || '',
          member_id: userR.info?.member_id || '',
          ...data,
        },
        success: (res: any) => {
          if (import.meta.env.DEV) {
            console.log(key, data, res.result || {})
          }
          resolve(res.result || {});
        },
        fail: (err: any) => {
          if (import.meta.env.DEV) {
            console.error(key, data, err)
          }
          reject(err);
        },
      });
    }
  );
};

