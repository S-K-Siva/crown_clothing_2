import React from 'react';
import './loadingComponent.styles.scss';
import {RiseLoader} from "react-spinners"
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <RiseLoader />
    </div>
  );
};

export default LoadingSpinner;
