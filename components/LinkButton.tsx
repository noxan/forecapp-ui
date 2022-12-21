import { CButton } from "@coreui/react";
import Link from "next/link";

const LinkButtonInternal = ({ children, ...props }: any) => (
  <CButton {...props}>{children}</CButton>
);

const LinkButton = ({ href, disabled, ...props }: any) =>
  disabled ? (
    <LinkButtonInternal disabled={disabled} {...props} />
  ) : (
    <Link href={href}>
      <LinkButtonInternal {...props} />
    </Link>
  );

export default LinkButton;
