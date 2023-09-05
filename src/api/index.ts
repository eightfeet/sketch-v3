export const pagesize = 5;

export const mockImg = [
  // "https://www.eightfeet.cn/md1/assets/models/037-x&840&696.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/038-x&902&568.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/044-y&420&647.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/041-y&518&698.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/035-y&491&654.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/043-x&919&530.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/039-y&700&707.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/042-x&769&688.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/036-y&628&642.jpg",
  // "https://www.eightfeet.cn/md1/assets/models/040-x&895&621.jpg"
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
