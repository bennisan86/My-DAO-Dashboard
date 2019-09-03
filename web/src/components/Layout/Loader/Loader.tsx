import React  from 'react';
import './loader.css';

interface Props {
  message?: string;
}

export const Loader: React.FC<Props> = props => {
  const renderMessage = () => {
    if (props.message) {
      return <p>{props.message}</p>;
    } else {
      return undefined;
    }
  };

  return (
    <div className="loader-center">
      {renderMessage()}
      <div className="donut-loader" />
    </div>
  );
};

export default Loader;
