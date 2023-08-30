import { useEffect } from "react";

const setTitle = (title: string) => {
  document.title = title;
};

export default function useDocumentTitle(title: string) {
  useEffect(() => {
    const originalTitle = document.title;
    setTitle(title)
    // antm bug;
    document.body.classList.remove("adm-overflow-hidden");
    return () => {
      setTitle(originalTitle)
    };
  }, [title]);
}
