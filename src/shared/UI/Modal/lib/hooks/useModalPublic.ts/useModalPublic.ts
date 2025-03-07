import { useModal } from "../../ModalProvider/useModal";
import { ReactNode } from "react";

export const useModalPublic = (content?: ReactNode) => {
  const { open, ...props } = useModal();

  return {
    open: () => open(content),
    ...props,
  };
};
