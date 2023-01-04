import { CTooltip } from "@coreui/react";
import Image from "next/image";

const Info = ({ text }: { text: string }) => (
  <CTooltip content={text} placement="right">
    <a>
      <Image src="/icon-info.svg" width="30" height="30" alt="Help text" />
    </a>
  </CTooltip>
);

export default Info;
