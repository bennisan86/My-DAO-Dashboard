import React, { ChangeEvent, useContext, useState } from 'react';
import _ from 'underscore';
import * as ethers from 'ethers';
import { BoxContext } from '../../contexts/box.context';
import { useProgress } from '../../hooks/use-progress';

export const AddressFormComponent: React.FC = props => {
  const box = useContext(BoxContext);

  const [addresses, setAddresses] = useState<string[]>(_.uniq(box.watchedAddresses));
  const progress = useProgress(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!progress.isRunning()) {
      progress.start();
      box
        .updateWatchedAddresses(addresses)
        .then(() => {
          progress.stop();
        })
        .catch(error => {
          progress.stop(error);
        });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const all = value
      .replace(/\s+/g, '')
      .split(',')
      .filter(a => {
        try {
          return !!ethers.utils.getAddress(a);
        } catch (e) {
          return false;
        }
      });
    setAddresses(_.uniq(all));
  };

  const renderError = () => {
    if (progress.isError()) {
      return <p>{progress.isError()}</p>;
    } else {
      return undefined;
    }
  };

  const renderButton = () => {
    if (progress.isRunning()) {
      return <button disabled={true}>Saving...</button>;
    } else {
      return <button type={'submit'}>Save</button>;
    }
  };

  return (
    <>
      <p>Please, use commas to separate the addresses:</p>
      <form onSubmit={handleSubmit}>
        <p>
          <input type={'text'} onChange={handleChange} style={{ width: '80%' }} />
        </p>
        <p>To save: {addresses.join(', ')}</p>
        <p>Currently stored: {box.watchedAddresses.join(', ')}</p>
        {renderError()}
        <p>{renderButton()}</p>
        <br />
      </form>
    </>
  );
};
