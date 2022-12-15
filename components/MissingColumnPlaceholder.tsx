import { CBadge } from "@coreui/react";
import Link from "next/link";

export default function MissingColumnPlaceholder() {
  return (
    <>
      <CBadge color="danger">
        You have to select time and target columns first
      </CBadge>
      <div>
        <Link href="/dataset">Go to dataset</Link>
      </div>
    </>
  );
}
