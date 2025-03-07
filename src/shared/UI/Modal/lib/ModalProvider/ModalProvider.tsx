import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { ModalContext } from "./ModalContext";
import { Modal } from "../../Modal";

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const open = (content: ReactNode) => setModalContent(content);
  const close = () => setModalContent(null);

  return (
    <ModalContext.Provider
      value={{
        close,
        open,
        modalContent,
        isOpen: !!modalContent,
      }}
    >
      {children}
      <Modal isOpen={!!modalContent} close={close}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};
