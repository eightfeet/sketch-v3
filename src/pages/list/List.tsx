import React, { useCallback, useRef, useState } from "react";
import "wc-waterfall";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { Button, FloatingBubble, InfiniteScroll, JumboTabs, NavBar } from "antd-mobile";
import s from "./List.module.scss";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { mock, pagesize } from "~/api";
import { Loading } from "~/compontents/Loading";
import ImageCard from "./ImageCard";
import SelectedList from "./SelectedList";
import { PlayOutline } from "antd-mobile-icons";
// import loading from '~/compontents/Loading';

interface Props {
  name?: string;
}

const List: React.FC<Props> = ({ name = "list" }) => {
  useDocumentTitle(name);
  const [popupVisible, setPopupVisible] = useState(false);
  const matches768 = useMediaQuery("(min-width: 768px)");
  const matches1024 = useMediaQuery("(min-width: 1024px)");
  const mainwf = { cols: 3, gap: 10 };
  const displaywf = { cols: 4, gap: 10 };
  if (matches768) {
    mainwf.cols = 6;
    displaywf.cols = 12;
  }
  if (matches1024) {
    mainwf.cols = 8;
    displaywf.cols = 14;
  }

  const hasMore = useRef(true);
  const queryList = useCallback(async ({ page }: { page: number }) => {
    return mock({ page, error: false }).catch((error) => {
      hasMore.current = false;
      throw error;
    });
  }, []);

  const { isLoading, data, fetchNextPage, isFetchedAfterMount, isError } =
    useInfiniteQuery({
      queryKey: ["InventoryInquiry"],
      queryFn: ({ pageParam }) => queryList(pageParam || { page: 1 }),
      // 暂时mock
      getNextPageParam: (lastPage, pages) => {
        const { total } = lastPage;
        const currentPage = pages.length;
        const currentSize = pages.length * pagesize;
        if (total > currentSize) {
          // 组织下一页参数
          return { page: currentPage + 1 };
        }
        hasMore.current = false;
        return undefined;
      },
      refetchOnWindowFocus: false,
    });

  // 数据解构
  const lists = data?.pages.flatMap((item) => item.data) || [];

  const [selected, setSelected] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const tags = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className={s.root}>
      {/* 数据为空 */}
      {!lists?.length && isFetchedAfterMount ? "暂无数据" : null}
      {/* 首次请求展示loading */}
      {isLoading && !isFetchedAfterMount ? <Loading /> : null}
      {/* 数据展示 */}
      <div className={s.nav}>
        <NavBar
          onBack={() => {}}
          right={
            <>
              <Button
                fill="none"
                size="mini"
                onClick={() => setPopupVisible(true)}
              >
                已选
              </Button>
            </>
          }
        >
          标题
        </NavBar>
        <JumboTabs className={s.subnav} defaultActiveKey="1">
          {tags.map((item) => (
            <JumboTabs.Tab title={null} description="描述文案" key={item} />
          ))}
        </JumboTabs>
      </div>

      <wc-waterfall {...mainwf}>
        {lists.map((item) => (
          <ImageCard
            key={item}
            toggleType={["block", "icon"]}
            selected={Math.random() > 0.5}
          />
        ))}
      </wc-waterfall>

      {/* 下一页 */}
      {!isError && lists?.length ? (
        <InfiniteScroll
          loadMore={fetchNextPage as any}
          hasMore={hasMore.current}
        />
      ) : null}
      <SelectedList
        data={selected}
        visible={popupVisible}
        onMaskClick={() => setPopupVisible(false)}
        onUpdate={(data) => setSelected(data)}
      />
      <FloatingBubble
        axis="xy"
        magnetic="x"
        className={s.play}
      >
        <PlayOutline fontSize={32} />
      </FloatingBubble>
    </div>
  );
};

export default List;
