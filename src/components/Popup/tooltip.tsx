import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './tooltip.module.scss';

const Tooltip: FC<{
  children: ReactNode;
  classname?: string;
  contentClassname?: string;
  customStyle?: React.CSSProperties;
  clickableChild?: JSX.Element;
  activeClickableChild?: JSX.Element;
}> = ({ children, classname, contentClassname, customStyle, clickableChild, activeClickableChild }) => {
  const [show, setShow] = useState<boolean>(false);
  const wrapperRef: any = useRef(null);
  const buttonRef: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, setShow]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setShow(!show)}>
        {show && activeClickableChild ? activeClickableChild : clickableChild}
      </button>
      <section className={`${styles.popup} ${classname}`}>
        <div
          ref={wrapperRef}
          className={`${styles.popupContent} ${show ? styles.show : ''} ${contentClassname}`}
          style={customStyle}
        >
          {children}
        </div>
      </section>
    </>
  );
};

export default Tooltip;
