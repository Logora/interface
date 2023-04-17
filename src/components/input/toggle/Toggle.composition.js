import React from 'react';
import { Toggle } from './Toggle';

export function BasicToggle() {
  return <Toggle onInputChanged={(e) => console.log('e', e.target.checked)} />;
}

export function ToggleWithLabel() {
  return (
    <Toggle label={"Yes or no ?"} onInputChanged={(e) => console.log('e', e.target.checked)} />
  );
}

export function DisabledToggle() {
  return <Toggle disabled />;
}

export function DisabledAndCheckedToggle() {
  return <Toggle disabled checked />;
}
