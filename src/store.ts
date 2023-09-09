import { proxy, subscribe } from "valtio";
import dayjs from 'dayjs'
import { ImageItem } from "./api";
import { CloudKeys, cloudFunction } from "./core/cloud";


interface RunningTime {
    selected?: ImageItem[];
    duration: number;
    formatTime?: string;
}

export const runningTime = proxy<RunningTime>({
    duration: 300
})


interface PainterData {
    showPanter: boolean;
    lineColor?: string;
    lineWidth?: number;
    panterBgColor?: string;
    bgAlph?: number;
    eraserAlph?: number;
    eraserWidth?: number;
    lineAlph?: number;
}

export const painter = proxy<PainterData>({
    showPanter: false,
})




export interface TaskItem {
    task_id: string;
    achieve_at: number;
    exchange: boolean;
    exchange_at: number;
    name: string;
    describes: string;
    target: number;
    start_at: number;
    end_at: number;
    reward_days: number;
    achieved?: number;
  }
  
  export interface UserInfo {
    member_id?: string;
    openid?: string;
    unionid?: string;
    username?: string;
    role?: number[];
    email?: string;
    phone?: string;
    province_id?: string;
    city_id?: string;
    district_id?: string;
    address?: string;
    // avatar_url: string;
    created_at?: number;
    update_at?: number;
    login_at?: number;
  }
  
  type Tasks = {
    oldAchieved?: TaskItem[];
    achieving?: TaskItem[];
    newAchieved?: TaskItem[];
  };
  
  type SerialCode = {
    created_at: number;
    end_at: number;
    license: string;
    member_id: string;
    update_at: number;
    username: string;
  };
  
  export const user = proxy<{
    token?: string;
    member_id?: string;
    tasks?: Tasks;
    info?: UserInfo;
    serialCode?: SerialCode;
    auth?: boolean;
    unexchangede?: number;
  }>({});
  
  try {
    const userSession = sessionStorage.getItem("dwx_user");
    if (userSession) {
      const { token, member_id, tasks, info, serialCode, auth, unexchangede} = JSON.parse(userSession);
      user.token = token;
      user.member_id = member_id;
      user.tasks = tasks;
      user.info = info;
      user.serialCode = serialCode;
      user.auth = auth;
      user.unexchangede = unexchangede;
    }
  } catch (error) {
    console.error(error)
  }
  
  subscribe(user, () => {
    sessionStorage.setItem("dwx_user", JSON.stringify(user));
  })
  
  /**
   * 用户id与token登录
   * 获取当前用户信息
   */
  export const getUserInfo = async ({
    member_id,
    token,
  }: {
    member_id: string;
    token: string;
  }) => {
    if (!member_id) {
      return;
    }
    const { code, data, msg } = await cloudFunction(CloudKeys.查询会员, {
      member_id,
      token,
    });
  
    if (code === 200) {
      user.info = data;
      user.token = token;
      user.member_id = member_id;
    } else {
      console.error(msg);
      throw msg;
    }
  
    await getSerialCode(member_id);
    await queryTask({member_id});
  };
  
  /**
   * 用户名与序列号登陆
   * 
   */
  export const loginBySN = async ({ username, license }: { username: string, license: string }) => {
    const {
      code: snLoginCode,
      data: snLoginData,
      msg: snLoginMsg,
    } = await cloudFunction(CloudKeys.序列号登陆, {
      username,
      license,
    });

    if (snLoginCode === 200) {
      if (snLoginData.role.includes(1)) {
        throw "您的序列号与当前应用不匹配"
      }
      user.serialCode = snLoginData as SerialCode
      user.member_id = snLoginData.member_id;
      user.token = snLoginData.token;
    } else {
      console.error(snLoginMsg);
      throw snLoginMsg;
    }
    await getUserInfo({ member_id: snLoginData.member_id, token: snLoginData.token });
  };
  
  /**
   * 更新序列号信息
   * @param data 序列号信息
   */
  export const updateSN = (data: SerialCode) => {
    user.serialCode = data;
    window.sessionStorage.setItem("serialCode", JSON.stringify(data));
    const days = dayjs(user.serialCode?.end_at).diff(dayjs(), "day");
    if (days >= 0) {
      user.auth = true;
    }
  };
  
  /**
   * 获取序列号信息
   * 根据序列号或member_id获取序列号信息
   */
  export const getSerialCode = async (member_id: string) => {
    user.member_id = member_id;
    const { code, data, msg } = await cloudFunction(CloudKeys.查询序列号, {
      member_id,
      role: [2],
    });
  
    if (code !== 200) {
      console.error("找不到激活信息", msg);
      throw `不是当前应用序列号, ${msg}`
      return;
    }
    if (code === 200) {
      user.serialCode = data as any;
      updateSN(data as any);
      return data;
    }
  };
  
  
  /**
   * 查询任务列表
   */
  export const queryTask = async ({ member_id }: { member_id: string }) => {
    const { code, data } = await cloudFunction(CloudKeys.检查并更新任务达成, {
      member_id,
      project_id: [2],
    });
    if (code === 200) {
      user.tasks = data;
      console.log("taskdata", data);
      
      const { newAchieved = [], oldAchieved = [] } = user.tasks || {};
      const unExchanged = [...newAchieved, ...oldAchieved].filter(
        (item) => item.exchange !== true
      );
      user.unexchangede = unExchanged.length;
    }
  };