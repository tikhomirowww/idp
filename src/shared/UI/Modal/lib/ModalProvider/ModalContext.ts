import { ReactNode, createContext } from "react";

export interface IModalContext {
  modalContent: ReactNode;
  open: (content: ReactNode) => void;
  close: () => void;
  isOpen: boolean;
}

export const ModalContext = createContext<IModalContext>({
  modalContent: null,
  close: () => undefined,
  open: () => undefined,
  isOpen: false,
});
