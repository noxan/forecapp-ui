import { CToast, CToastBody, CToastClose } from "@coreui/react";

export const errorToastWithMessage = (message: string) => {
  return (
    <CToast
      autohide={true}
      color="danger"
      animation={true}
      className="text-white align-items-center"
    >
      <div className="d-flex">
        <CToastBody>{message}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );
};
