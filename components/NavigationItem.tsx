import { CNavItem, CNavLink } from "@coreui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavigationItem = ({ href, label }: { href: string; label: string }) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const active = currentRoute === href;
  return (
    <CNavItem>
      <CNavLink component={Link} href={href} active={active}>
        {label}
      </CNavLink>
    </CNavItem>
  );
};

export default NavigationItem;
