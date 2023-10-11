import React from 'react';
import { AlertDialog } from './AlertDialog';

export const DefaultAlertDialog = () => {
    return (
        <AlertDialog 
            text={"A message !"}
        />
    );
};

export const AlertDialogSuccess = () => {
    return (
        <AlertDialog 
            text={"A message !"}
            variant={"success"}
        />
    );
};

export const AlertDialogError = () => {
    return (
        <AlertDialog 
            text={"A message !"}
            variant={"error"}
        />
    );
};

export const AlertDialogWithPoints = () => {
    return (
        <AlertDialog 
            text={"A message !"}
            points={"34"}
            variant={"info"}
        />
    );
};