import { useState, useEffect, useRef, useCallback } from "react";

const Stylebars = ({ children, className, ...props }) => {
  const contentRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const observer = useRef(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState(null);
  const [initialScrollTop, setInitialScrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleResize(ref, trackSize) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  const handleTrackClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;

      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio = (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(clickRatio * contentCurrent.scrollHeight);

        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [thumbHeight]
  );

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollTrackRef.current || !scrollThumbRef.current) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } = contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    const thumb = scrollThumbRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;

    newTop = Math.min(newTop, trackHeight - thumbHeight);
    thumb.style.top = `${newTop}px`;
  }, [thumbHeight]);

  const handleThumbMousedown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);

    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e) => {
      if (!isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e) => {
      if (!isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      if (isDragging) {
        const { scrollHeight: contentScrollHeight, offsetHeight: contentOffsetHeight } =
          contentRef.current;

        const deltaY = (e.clientY - scrollStartPosition) * (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight
        );

        contentRef.current.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight, initialScrollTop]
  );

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;

      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });

      observer.current.observe(ref);
      ref.addEventListener("scroll", handleThumbPosition);

      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [handleThumbPosition]);

  useEffect(() => {
    const handleDocumentMousemove = (e) => handleThumbMousemove(e);
    const handleDocumentMouseup = (e) => handleThumbMouseup(e);

    document.addEventListener("mousemove", handleDocumentMousemove);
    document.addEventListener("mouseup", handleDocumentMouseup);
    document.addEventListener("mouseleave", handleDocumentMouseup);

    return () => {
      document.removeEventListener("mousemove", handleDocumentMousemove);
      document.removeEventListener("mouseup", handleDocumentMouseup);
      document.removeEventListener("mouseleave", handleDocumentMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <div className="scrollbarsContainer">
      <div className="scrollbarsContent" ref={contentRef} {...props}>
        {children}
      </div>
      <div className="scrollbarsScrollbar">
        <div className="scrollbarsTrackAndThumb">
          <div
            className="scrollbarsTrack"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging && "grabbing" }}></div>
          <div
            className="scrollbarsThumb"
            ref={scrollThumbRef}
            onMouseDown={handleThumbMousedown}
            style={{
              height: `${thumbHeight}px`,
              cursor: isDragging ? "grabbing" : "grab",
            }}></div>
        </div>
      </div>
    </div>
  );
};

export default Stylebars;
