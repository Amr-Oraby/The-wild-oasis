import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openId, setOpenId] = useState(null);
  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <ModalContext.Provider
      value={{
        openId,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, id }) {
  const { open } = useContext(ModalContext);
  return (
    <span>{React.cloneElement(children, { onClick: () => open(id) })}</span>
  );
}

function Window({ children, id }) {
  const { close, openId } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  return (
    <>
      {openId === id &&
        createPortal(
          <Overlay>
            <StyledModal ref={ref}>
              <StyledButton onClick={close}>
                <HiXMark />
              </StyledButton>
              <div>{React.cloneElement(children, { close })}</div>
            </StyledModal>
          </Overlay>,
          document.body,
        )}
    </>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
