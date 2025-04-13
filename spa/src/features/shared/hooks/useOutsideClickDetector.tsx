import { useRef, useEffect, ReactNode } from "react";

function useOutsideClickDetector(ref: React.RefObject<any>, toggler: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggler(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, toggler]);
}

export default function OutsideCickDetector(
  { children, toggler }: 
  {children: ReactNode, toggler: React.Dispatch<React.SetStateAction<boolean>>}
) {
  const wrapperRef = useRef(null);
  useOutsideClickDetector(wrapperRef, toggler);
  return <div ref={wrapperRef}>{children}</div>;
}