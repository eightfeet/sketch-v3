import React from "react";
import useDocumentTitle from "~/hooks/useDocumentTitle";

interface Props {
  name?: string;
}

const View: React.FC<Props> = ({ name = "view" }) => {
  useDocumentTitle(name);
  return <div>view</div>;
};

export default View;
