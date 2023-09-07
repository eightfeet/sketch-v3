export const pagesize = 5;

export const mockImg = [
  // "https://www.eightfeet.cn/md1/assets/models/037-x&840&696.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/011-y&410&716.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/025-y&468&701.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/177-y&832&961.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/196-y&729&1096.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/401-y&898&1420.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/2216-y&980&1470.jpg",
  // "https://www.eightfeet.cn/md5/small/md269/10-y&734&1000.png",
  // "https://www.eightfeet.cn/md5/small/md312/9-y&3004&4243.JPG",
  // "https://www.eightfeet.cn/md5/small/md270/10-y&800&1097.png"
]

export interface ImageItem {
  src: string;
  name: string;
  tag: string[];
  _id: string;
}

export const mock = ({
  page,
  size = pagesize,
  error,
}: {
  page: number;
  size?: number;
  error?: boolean;
}) => {
  return new Promise<{ data: ImageItem[]; total: number }>((resolve, reject) => {
    if (error) {
      reject();
      return;
    }

    setTimeout(() => {
      const data = [];
      const offset = page * size;
      for (let index = offset - size; index < offset; index++) {
        data.push({
          src: mockImg[Math.floor(Math.random()*10)],
          name: "string",
          tag: ["1","2","3","4","5","6"],
          _id: `${Date.now()}_${page}_${index}`
        });
      }
      const res = { data, total: 100 };
      console.log(res);
      resolve(res);
    }, 1000);
  });
};
