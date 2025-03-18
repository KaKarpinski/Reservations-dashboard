import { MouseEvent } from 'react';

import "./Modal.css"

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  onConfirm: () => void;
}

const Modal:React.FC<ModalProps> = ({ isOpen, close, onConfirm }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Czy na pewno chcesz usunąć?</h2>
        <div className="modal-actions">
          <button className="cancel-button" onClick={close}>Anuluj</button>
          <button className="ok-button" onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;