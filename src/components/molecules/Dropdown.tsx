import { PropsWithChildren } from "react";

type DropdownPropsType = {
  label: string;
};
const Dropdown = ({
  label,
  children,
}: PropsWithChildren<DropdownPropsType>) => {
  return (
    <div>
      <p>{label}</p>
      <div>{children}</div>
    </div>
  );
};

export default Dropdown;
