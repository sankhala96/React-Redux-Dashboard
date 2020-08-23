import React from 'react';

const LoadingComponent = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={process.env.PUBLIC_URL + "/loader.gif"} alt='loading..'/>
    </div>
  )
}

export default LoadingComponent;
