import { CButton } from "@coreui/react";
import Link from "next/link";

const LinkButton = ({
  className,
  href,
  disabled,
  color,
  variant,
  children,
}: any) => (
  <CButton
    className={className}
    color={color}
    variant={variant}
    disabled={disabled}
    component={Link}
    href={href}
  >
    {children}
  </CButton>
);

export default LinkButton;
