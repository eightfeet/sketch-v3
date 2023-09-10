import React, { useCallback, useRef, useState } from "react";
import "wc-waterfall";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { Badge, FloatingBubble, InfiniteScroll, NavBar, Space } from "antd-mobile";
import s from "./List.module.scss";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loading } from "~/compontents/Loading";
import ImageCard from "~/compontents/ImageCard";
import SelectedList from "~/compontents/SelectedList";
import { useSnapshot } from 'valtio';
import { runningTime } from "~/store";
import { useNavigate } from "react-router-dom";
import PlayIcon from "~/compontents/PlayIcon/PlayIcon";
import { FilterOutline, PicturesOutline } from "antd-mobile-icons";
import Filter from "~/compontents/Filter";
import classNames from 'classnames'
import { CloudKeys, cloudFunction } from "~/core/cloud";
// import loading from '~/compontents/Loading';

export interface ImageItem {
  url: string;
  poses_name: string;
  categroy: string;
  gender: string;
  poses_id: string;
  sub: string[];
  _id: string;
}

interface Props {
  name?: string;
}

const size = 10;

const List: React.FC<Props> = ({ name = "list" }) => {
  useDocumentTitle(name);
  const { selected } = useSnapshot(runningTime);
  const navigator = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [filterPopupVisible, setFilterPopupVisible] = useState(false);
  const [fliterData, setFliterData] = useState<{ [key: string]: string[] }>({
  });

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
    return cloudFunction(CloudKeys.获取模特, {...fliterData, page, size}).catch((error) => {
      hasMore.current = false;
      throw error;
    });
  }, [fliterData]);

  const { isLoading, data, fetchNextPage, isFetchedAfterMount, isError } =
    useInfiniteQuery({
      queryKey: [fliterData],
      queryFn: ({ pageParam }) => queryList(pageParam || { page: 1 }),
      // 暂时mock
      getNextPageParam: (lastPage, pages) => {
        const { total } = lastPage as any;
        const currentPage = pages.length;
        const currentSize = pages.length * size;
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
  const lists = data?.pages.flatMap((item) => {
    if(item.data?.list) return item.data?.list;
    return []
  }) || [];

  const onToggleSelect = useCallback(
    (state: boolean, item: ImageItem) => {
      if (!state) {
        runningTime.selected = (runningTime.selected || []).concat(item)
      }
      if (state) {
        runningTime.selected = runningTime.selected?.filter(el => el._id !== item._id)
      }
    },
    [],
  )

  const onClear = useCallback(
    () => {
      setPopupVisible(false);
    },
    [],
  );

  const onPlay = useCallback(
    () => {
      navigator("/view");
    },
    [navigator],
  );

  const onFilter = useCallback(
    (data: { [key: string]: string[] }) => {
      setFilterPopupVisible(false)
      setFliterData(data);
    },
    [],
  );
    
    
  return (
    <div className={s.root}>
      {/* 数据为空 */}
      {!lists?.length && isFetchedAfterMount ? <Space justify="center" block style={{paddingTop: "30Px"}}>暂无数据</Space> : null}
      {/* 首次请求展示loading */}
      {isLoading && !isFetchedAfterMount ? <Loading /> : null}
      {/* 数据展示 */}
      <div className={s.nav}>
        <NavBar
          onBack={() => navigator("/")}
          right={
            <Space>
              <Badge content={selected?.length || null}>
                <PicturesOutline fontSize={24} onClick={() => setPopupVisible(true)} />
              </Badge>
              <span>&nbsp;</span>
              <FilterOutline fontSize={24} onClick={() => setFilterPopupVisible(true)} />
            </Space>
          }
        >
          选择图片
        </NavBar>
      </div>

      <wc-waterfall {...mainwf}>
        {lists.map((item, index) => {
          const isSelected = selected?.some(selectItem => item._id === selectItem._id);
          return (
            <ImageCard
              key={index}
              src={item?.url}
              toggleType={isSelected ? ["icon"] : ["block", "icon"]}
              selected={isSelected}
              onToggle={(state: boolean) => onToggleSelect(state, item)}
            />
          )
        })}
      </wc-waterfall>

      {/* 下一页 */}
      {!isError && lists?.length ? (
        <InfiniteScroll
          loadMore={fetchNextPage as any}
          hasMore={hasMore.current}
        />
      ) : null}
      <SelectedList
        visible={popupVisible}
        onMaskClick={() => setPopupVisible(false)}
        onClear={onClear}
      />
      <FloatingBubble
        axis="xy"
        magnetic="x"
        className={classNames(s.play, { [s.disablePlay]: !selected?.length })}

      >
        <PlayIcon fontSize={32} onClick={() => selected?.length && onPlay()} />
      </FloatingBubble>
      <Filter
        visible={filterPopupVisible}
        onMaskClick={() => setFilterPopupVisible(false)}
        defaultValues={fliterData}
        onFilter={onFilter}
        onChange={data => console.log("change", data)}
      />
    </div>
  );
};

export default List;
