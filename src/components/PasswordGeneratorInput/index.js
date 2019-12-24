import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CasinoIcon from '@material-ui/icons/Casino';
import {request} from 'api';
import {url} from 'api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
}));

export default function PasswordGeneratorInput(props) {
  const classes = useStyles();
  const {
    label='Пароль',
    onChange,
    ...rest
  } = props;

  async function generatePassword() {
    try {
      const password = await request(`${url}?action=generatePassword`);
      onChange(password);
    } catch (e) {
      console.error(e);
    }
  }

  function handleChange(event) {
    onChange(event.target.value);
  };

  return (
    <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel shrink htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        id="standard-adornment-password"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => generatePassword()}
              onMouseDown={event => event.preventDefault()}
            >
              <CasinoIcon />
            </IconButton>
          </InputAdornment>
        }
        onChange={handleChange}
        {...rest}
      />
    </FormControl>
  );
}
