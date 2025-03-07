import React, { ReactNode } from "react";
import "./Modal.scss";

type ModalWrapperProps = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, close, children }: ModalWrapperProps) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
