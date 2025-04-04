import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = <T>(
  initialItems: T[],
  fetchItems: (offset: number) => Promise<T[]>,
) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const targetRef = useRef<HTMLDivElement | null>(null);

  // 追加データ取得関数
  const getMoreItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const additionalItems = await fetchItems(items.length);
    if (additionalItems.length > 0) {
      setItems((prev) => [...prev, ...additionalItems]);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  // IntersectionObserver API のセットアップ
  useEffect(() => {
    const target = targetRef.current;
    if (target) {
      const scrollObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          getMoreItems();
        }
      });
      scrollObserver.observe(target);
      return () => {
        scrollObserver.disconnect();
      };
    }
  }, [items]);

  return { items, loading, hasMore, targetRef };
};
