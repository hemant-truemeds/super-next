import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface PortalProps {
  children: ReactNode;
}

const Modal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#modalPortal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className={styles.overlay}>{props.children}</div>,
        ref.current
      )
    : null;
};

export default Modal;
