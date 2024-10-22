import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Content = ({ children }: Props) => {
  return (
    <div className="flex-grow">
      <div className="container p-4">{children}</div>
    </div>
  );
};

export default Content;
