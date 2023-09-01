export const pagesize = 5;

export const mock = ({
  page,
  size = pagesize,
  error,
}: {
  page: number;
  size?: number;
  error?: boolean;
}) => {
  return new Promise<{ data: number[]; total: number }>((resolve, reject) => {
    if (error) {
      reject();
      return;
    }

    setTimeout(() => {
      const data = [];
      const offset = page * size;
      for (let index = offset - size; index < offset; index++) {
        data.push(index);
      }
      const res = { data, total: 100 };
      console.log(res);
      resolve(res);
    }, 1000);
  });
};
