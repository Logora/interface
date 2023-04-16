import React from 'react';

/**
 * a method to extract form elements data from within a form element's submit event
 */
export function extractFormData(event) {
  const formData = new FormData(event.currentTarget)?.entries();
  const dataToSubmit = {};
  for (let [key, value] of formData) {
    if (!key) return;
    dataToSubmit[key] = value;
  }
  return dataToSubmit;
}
