import React, { useCallback, useEffect, useState } from "react";
import s from "./Tasks.module.scss";
import { Button, Card, Space, Tabs, Toast, FloatingBubble, Badge, Mask } from "antd-mobile";
import { useSnapshot } from "valtio";
import { register } from "~/compontents/Register";
import { CloudKeys, cloudFunction } from "~/core/cloud";
import { getSerialCode, queryTask, user } from "~/store";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import share from './share.png'
import loading from "~/compontents/Loading";
import useDocumentTitle from "~/hooks/useDocumentTitle";

export interface TaskItem {
  task_id: string;
  "achieve_at": number,
  "exchange": boolean,
  "exchange_at": number,
  "name": string,
  "describes": string,
  "target": number,
  "start_at": number,
  "end_at": number,
  "reward_days": number,
}

enum TaskType {
  已达成 = "achieved",
  进行中 = "process",
  任务 = "all"
}

interface Props {
  name?: string;
}

const Tasks: React.FC<Props> = ({ name = "任务中心"}) => {
  const navigator = useNavigate()
  useDocumentTitle(name);

  const {
    tasks, info = {},
    member_id,
  } = useSnapshot(user);
  const { achieving, oldAchieved = [], newAchieved = [] } = tasks || {};
  const [keyType, setKeyType] = useState<TaskType>(TaskType.任务);

  const [showMask, setShowMask] = useState(false)

  const achievedTask = [...newAchieved, ...oldAchieved];

  useEffect(() => {
    if (!member_id) {
      navigator("/")
    }
  }, [member_id, navigator])


  const onChangeTabs = useCallback(async (key: string) => {
    // store
    loading.show();
    try {
      await queryTask({ member_id: member_id! });
      setKeyType(key as TaskType);
      loading.hide();
    } catch (error: any) {
      loading.hide();
      try {
        Toast.show(error.meg)
      } catch (error) {
        console.error(error)
      }
    }

  }, [member_id]);

  const taskToSn = useCallback(
    async ({ member_id, task_id, username, email }: {
      member_id?: string, task_id?: string, username?: string, email?: string
    }) => {
      loading.show();
      const { code: taskResultCode, msg: taskResultMsg } = await cloudFunction(CloudKeys.任务转换为序列号, {
        member_id, task_id, username, email
      });
      await queryTask({ member_id: member_id! })
      loading.hide();
      if (taskResultCode !== 200) {
        Toast.show(taskResultMsg || '领取任务失败')
      }
      await getSerialCode(member_id as string);
    },
    [],
  )


  const getTask = useCallback(
    (task: TaskItem) => async () => {
      const { member_id, username, email, openid } = info;
      if (!email || !username) {
        register({
          username, email, member_id, openid, onSuccess: (data) => {
            taskToSn({
              member_id, username: data.username, email: data.email, task_id: task.task_id
            })
          }
        });
        return;
      }

      taskToSn({
        member_id, username, email, task_id: task.task_id
      })

    },
    [info, taskToSn]
  );

  return (
    <div className={s.root}>
      <Tabs className={s.tab} activeKey={keyType} onChange={onChangeTabs}>
        <Tabs.Tab title="任务" key={TaskType.任务} />
        <Tabs.Tab title="已达成" key={TaskType.已达成} />
        <Tabs.Tab title={<Badge color="#ff9800" content={keyType === TaskType.进行中 ? null : (achieving?.length || null)}>进行中</Badge>} key={TaskType.进行中} />
      </Tabs>
      <div className={s.wrap}>
        {
          keyType === TaskType.任务 ? <Space block direction="vertical" justify="around">
            {[...achievedTask].map((item, index) => (
              <Card
                key={index}
                title={item.name}
                extra={
                  item.exchange ? (
                    <Button size="mini" disabled color="primary">
                      已领取
                    </Button>
                  ) : (
                    <Button size="mini" color="primary" onClick={getTask(item)}>
                      领取
                    </Button>
                  )
                }
              >
                {item.describes}
                {item.end_at ? <p style={{ color: "var(--adm-color-primary)" }}>活动截止日期：{dayjs(item.end_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
                {item.exchange ? <p>领取时间：{dayjs(item.exchange_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
              </Card>
            ))}

            {achieving?.map((item, index) => (
              <Card
                key={`b_${index}`}
                title={item.name}
                extra={
                  <span className={s.progress}>
                    <Badge content={`${(item.achieved || 0)} / ${item.target}`}>
                      <Button size="mini" color="success" onClick={() => setShowMask(true)}>
                        去完成
                      </Button>
                    </Badge>
                  </span>
                }
              >
                {item.describes}
                {item.end_at ? <p style={{ color: "var(--adm-color-primary)" }}>活动截止日期：{dayjs(item.end_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
              </Card>
            ))}
            {!achievedTask?.length && !achieving?.length ? <div className={s.nodata}>暂无活动</div> : null}
          </Space> : null
        }
        {keyType === TaskType.已达成 ? (
          <Space block direction="vertical" justify="around">
            {achievedTask.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                extra={
                  item.exchange ? (
                    <Button size="mini" disabled color="primary">
                      已领取
                    </Button>
                  ) : (
                    <Button size="mini" color="primary" onClick={getTask(item)}>
                      领取
                    </Button>
                  )
                }
              >
                {item.describes}
                {item.end_at ? <p style={{ color: "var(--adm-color-primary)" }}>活动截止日期：{dayjs(item.end_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
                {item.exchange ? <p>领取时间：{dayjs(item.exchange_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
              </Card>
            ))}
            {!achievedTask?.length ? <div className={s.nodata}>暂无活动</div> : null}
          </Space>
        ) : null}
        {keyType === TaskType.进行中 ? (
          <Space block direction="vertical" justify="around">
            {achieving?.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                extra={
                  <span className={s.progress}>
                    <Badge content={`${(item.achieved || 0)} / ${item.target}`}>
                      <Button size="mini" color="success" onClick={() => setShowMask(true)}>
                        去完成
                      </Button>
                    </Badge>
                  </span>
                }
              >
                {item.describes}
                {item.end_at ? <p style={{ color: "var(--adm-color-primary)" }}>活动截止日期：{dayjs(item.end_at).format("YYYY-MM-DD HH:ss:mm")}</p> : null}
              </Card>
            ))}
            {!achieving?.length ? <div className={s.nodata}>暂无活动</div> : null}
          </Space>
        ) : null}
      </div>
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          '--edge-distance': '24px',
        }}
        onClick={() => navigator("/")}
      >
        首页
      </FloatingBubble>
      <Mask visible={showMask} opacity={0.8} onMaskClick={() => setShowMask(false)}>
        <div className={s.sharebox}>
          <img src={share} alt="分享" onClick={() => setShowMask(false)} />
        </div>
      </Mask>
    </div>
  );
};

export default Tasks;
