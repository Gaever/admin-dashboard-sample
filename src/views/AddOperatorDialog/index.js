import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import {addOperator, setOperatorList} from 'actions/operator';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import {ListItem} from "@material-ui/core";
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AddOperatorDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {active: client} = useSelector(({user}) => user);
  const [busy, setBusy] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [login, setLogin] = useState(null);
  const [name, setName] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [operatorPsw, setOperatorPsw] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddOperator() {
    setBusy(true);
    const {
      operator: {
        password = null
      },
      list: operatorList = [],
    } = await addOperator(client, {
      login,
      name,
      isManager,
    }) || {};
    setOperatorPsw(password);
    if (operatorList.length) {
      dispatch(setOperatorList(operatorList));
    }
    setBusy(false);
    setIsAlertOpen(true);
  }

  return (
    <div>
      <Dialog
        open={isAlertOpen}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Готово!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Оператор создан. Пароль: {operatorPsw}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsAlertOpen(false);
            setOpen(false);
          }} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Создать</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Новый оператор</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="Логин"
            fullWidth
            value={login}
            onChange={event => {
              setLogin(event.target.value)
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="Отображаемое имя"
            fullWidth
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
          />
          <ListItem>
            <Grid item xs={6}>Менеджер</Grid>
            <Grid item xs={6}>
              <Checkbox
                value="checkedC"
                checked={!!isManager}
                onClick={() => setIsManager(!isManager)}
                inputProps={{
                  'aria-label': 'uncontrolled-checkbox',
                }}
              />
            </Grid>
          </ListItem>
        </DialogContent>
        <DialogActions>
          {
            busy
              ? <CircularProgress />
              : (
                <>
                  <Button onClick={handleClose} color="primary">
                    Отмена
                  </Button>
                  <Button onClick={handleAddOperator} color="primary">
                    Создать
                  </Button>
                </>
              )
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}
