import classNames from 'classnames';
import styles from './TextInput.module.scss';

export const getAccent = ({ error, success }) => {
  return (
    (error && classNames(styles.error)) ||
    (success && classNames(styles.success))
  );
};

export const classes = {
    container: styles.container,
    textInput: styles.textInput,
    textInputWithIcon: styles.textInputWithIcon,
    filled: styles.filled,
  };