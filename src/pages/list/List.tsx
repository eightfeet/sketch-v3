import React from "react";
import "wc-waterfall";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { Image } from "antd-mobile";
import { CheckCircleFill } from "antd-mobile-icons";
import s from "./List.module.scss";
// import loading from '~/compontents/Loading';

interface Props {
  name?: string;
}

const List: React.FC<Props> = ({ name = "list" }) => {
  useDocumentTitle(name);
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20];
  // loading.show()
  return (
    <div>
      <wc-waterfall gap={10} cols={3}>
        {data.map((item) => (
          <div key={item} className={s.img_box}>
            <div className={s.content}>
              <Image
                className={s.imgcove}
                src=""
                fit="fill"
                style={{
                  background: "#eee",
                  minHeight: Math.floor(Math.random() * (300 - 100) + 100),
                }}
              />
              <CheckCircleFill className={s.icon} color="var(--adm-color-primary)" />
            </div>
          </div>
        ))}
      </wc-waterfall>
    </div>
  );
};

export default List;
