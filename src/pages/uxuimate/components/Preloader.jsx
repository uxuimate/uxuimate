import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return <div className="loader">
      <div className="cssload-loader">
        <div className="cssload-inner cssload-one" />
        <div className="cssload-inner cssload-two" />
        <div className="cssload-inner cssload-three" />
      </div>
    </div>;
};
export default Preloader;