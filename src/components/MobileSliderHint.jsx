const MobileSliderHint = ({ dotCount = 3, text = 'Swipe for more' }) => {
  const totalDots = Math.max(2, Math.min(dotCount, 6));

  return (
    <div className="mobile-card-slider__hint" aria-hidden="true">
      <div className="mobile-card-slider__dots">
        {Array.from({ length: totalDots }).map((_, index) => (
          <span key={index} className="mobile-card-slider__dot" />
        ))}
      </div>
      <span className="mobile-card-slider__text">{text}</span>
    </div>
  );
};

export default MobileSliderHint;
