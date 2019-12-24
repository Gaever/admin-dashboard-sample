import React, {useState, useEffect, useContext, createContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

const context = createContext();

export function useSnackbar() {
  const [message, setMessage] = useContext(context);

  return {message, setMessage};
}

export function SnackbarProvider({children}) {
  const [message, setMessage] = useState(null);

  return (
    <context.Provider value={[message, setMessage]} children={children} />
  );
}

export default function GlobalSnackbar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const {message, setMessage} = useSnackbar();

  useEffect(() => {
    if (message) setIsOpen(true);
  }, [message]);

  useEffect(() => {
    if (!isOpen) setMessage(null);
  // eslint-disable-next-line
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }
  
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}