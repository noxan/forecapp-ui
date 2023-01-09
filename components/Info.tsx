import { CTooltip } from "@coreui/react";
import Image from "next/image";
import { ReactNode } from "react";

const Info = ({
  children,
  placement,
}: {
  children?: ReactNode;
  placement?: "right" | "auto" | "top" | "bottom" | "left" | undefined;
}) => (
  <CTooltip content={children} placement={placement || "right"}>
    <a>
      <Image src="/icon-info.svg" width="30" height="30" alt="Help text" />
    </a>
  </CTooltip>
);

export default Info;
