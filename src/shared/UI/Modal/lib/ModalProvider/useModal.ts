import { useContext } from "react";
import { IModalContext, ModalContext } from "./ModalContext";

export const useModal = () => useContext<IModalContext>(ModalContext);
