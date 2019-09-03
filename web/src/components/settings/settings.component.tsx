import React from 'react';
import { AddressFormComponent } from './address-form.component';

export const SettingsComponent: React.FC = props => {
  return (
    <>
      <h1>Settings</h1>
      <p>Watched addresses:</p>
      <AddressFormComponent/>
    </>
  );
};
