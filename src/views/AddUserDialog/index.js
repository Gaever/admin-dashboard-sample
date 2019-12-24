import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autoanswer from 'views/Client/Autoanswer';
import {getDefaltAutoAnswerDate} from 'tools';
import PasswordGeneratorInput from 'components/PasswordGeneratorInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createClient} from 'actions/user';
import {setUsers} from 'actions/user';
import {useSnackbar} from 'components/GlobalSnackbar';

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {setMessage} = useSnackbar();
  const [busy, setBusy] = useState(false);
  const [jid, setJid] = useState('');
  const [autoAnswerText, setAutoAnswerText] = useState('');
  const [autoAnswerStart, setAutoAnswerStart] = useState(getDefaltAutoAnswerDate().valueOf());
  const [autoAnswerFinish, setAutoAnswerFinish] = useState(getDefaltAutoAnswerDate().valueOf());
  const [openfirePassword, setOpenfirePassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAddClient() {
    setBusy(true);
    const clientList = await createClient({
      jid,
      password: openfirePassword,
      workMode: 0,
      autoAnswerStartTs: autoAnswerStart,
      autoAnswerFinishTs: autoAnswerFinish,
      autoAnswerText,
    });
    dispatch(setUsers(clientList));
    setBusy(false);
    setOpen(false);
    setMessage('Клиент создан');
  }

  return (
    <div>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Создать</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Новый клиент</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="jid"
            label="JID"
            fullWidth
            value={jid}
            onChange={event => setJid(event.target.value)}
          />
          <PasswordGeneratorInput
            value={openfirePassword}
            onChange={value => setOpenfirePassword(value)}
            label="Пароль openfire"
          />
          <Autoanswer
            autoAnswerText={autoAnswerText}
            autoAnswerStart={autoAnswerStart}
            autoAnswerFinish={autoAnswerFinish}
            onTimeChange={(start, finish) => {
              console.log('onTimeChange', start, finish)
              setAutoAnswerStart(start);
              setAutoAnswerFinish(finish);
            }}
            onTextChange={text => {
              setAutoAnswerText(text);
            }}
          />
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
                  <Button onClick={handleAddClient} color="primary">
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
