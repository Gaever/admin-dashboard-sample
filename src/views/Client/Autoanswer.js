import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
// @material-ui/core components
// import {makeStyles} from "@material-ui/core/styles";
// core components
import TextField from '@material-ui/core/TextField';
import {Grid, ListItem, Button, Checkbox} from "@material-ui/core";
import moment from 'moment';
import {
  TimePicker,
} from '@material-ui/pickers';
import {setAutoanswerTime, setAutoanswerText} from "actions/user";
import {useSnackbar} from "components/GlobalSnackbar";
import {getDefaltAutoAnswerDate} from "tools";

export default function Autoanswer(props) {
  const {
    autoAnswerText,
    autoAnswerStart,
    autoAnswerFinish,
    onTextChange,
    onTimeChange,
  } = props || {};
  const dispatch = useDispatch();
  const [isAutoanswer, setIsAutoanswer] = useState(false);
  const [autoAnswerTextState, setAutoAnswerTextState] = useState(null);
  const [autoAnswerStartState, setAutoAnswerStartState] = useState(false);
  const [autoAnswerFinishState, setAutoAnswerFinishState] = useState(false);

  const {setMessage} = useSnackbar();

  useEffect(() => {
    const isAutoanswer = (
      moment(autoAnswerStart).format('HH-mm-ss') !== '00-00-00'
      || moment(autoAnswerFinish).format('HH-mm-ss') !== '00-00-00'
    );
    setIsAutoanswer(isAutoanswer);

    setAutoAnswerStartState(autoAnswerStart);
    setAutoAnswerFinishState(autoAnswerFinish);
  }, [autoAnswerStart, autoAnswerFinish]);

  useEffect(() => {
    setAutoAnswerTextState(autoAnswerText);
  }, [autoAnswerText]);

  function toggleAutoAnswer() {
    if (isAutoanswer) {
      if (onTimeChange) {
        typeof onTimeChange === 'function' && onTimeChange(getDefaltAutoAnswerDate().valueOf(), getDefaltAutoAnswerDate().valueOf());
      } else {
        dispatch(setAutoanswerTime(0, 0));
      }
      setIsAutoanswer(false);
    } else {
      const d1 = getDefaltAutoAnswerDate()
      const d2 = getDefaltAutoAnswerDate();
      d2.setSeconds(1);

      const ts1 = Math.floor(d1.valueOf() / 1000);
      const ts2 = Math.floor(d2.valueOf() / 1000);

      if (onTimeChange) {
        typeof onTimeChange === 'function' && onTimeChange(d1, d2);
      } else {
        dispatch(setAutoanswerTime(ts1, ts2));
      }

      setIsAutoanswer(true);
    }
  }

  function updateAutoanswerTime(startDate, finishDate) {
    const momentStartDate = moment(startDate);
    const momentFinishDate = moment(finishDate)
    const startTs = (momentStartDate || 0).valueOf();
    const finishTs = (momentFinishDate || 0).valueOf();

    dispatch(setAutoanswerTime(Math.floor(startTs / 1000), Math.floor(finishTs / 1000)));
    setAutoAnswerStartState(momentStartDate);
    setAutoAnswerFinishState(momentFinishDate);
  }

  function renderAutoanswer() {
    if (!isAutoanswer) return null;

    return (
      <>
        <ListItem>
          <Grid item xs={6} >Текст автоответчика</Grid>
          <Grid item xs={4} >
            <TextField
              onChange={event => {
                if (onTextChange) {
                  typeof onTextChange === 'function' && onTextChange(event.target.value);
                }
                setAutoAnswerTextState(event.target.value);
              }}
              value={autoAnswerTextState}
              multiline={true}
              rows={6}
              placeholder="Введите текст"
              fullWidth
            />
          </Grid>
          <Grid item xs={2} >
            {!onTextChange && (
              <Button color="primary" variant="contained" onClick={() => {
                dispatch(setAutoanswerText(autoAnswerTextState));
                setMessage('Сообщение автоответчика обновлено');
              }}>ОК</Button>
            )}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Время автоответчика</Grid>
          <Grid item xs={3} >
            <TimePicker
              clearable
              ampm={false}
              label="Начало"
              value={autoAnswerStartState}
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              onChange={date => {
                if (onTimeChange) {
                  typeof onTimeChange === 'function' && onTimeChange(date, autoAnswerFinishState);
                } else {
                  updateAutoanswerTime(date, autoAnswerFinishState);
                  setMessage('Новое время установлено');
                }
              }}
            />            
          </Grid>
          <Grid item xs={3} >
            <TimePicker
              clearable
              ampm={false}
              label="Конец"
              value={autoAnswerFinishState}
              views={["hours", "minutes", "seconds"]}
              format="HH:mm:ss"
              onChange={date => {
                if (onTimeChange) {
                  typeof onTimeChange === 'function' && onTimeChange(autoAnswerStartState, date);
                } else {
                  updateAutoanswerTime(autoAnswerStartState, date);
                  setMessage('Новое время установлено');
                }
              }}
            />            
          </Grid>
        </ListItem>
      </>
    );
  }

  return (
    <>
      <ListItem>
        <Grid item xs={6}>Автоответчик</Grid>
        <Grid item xs={6}>
          <Checkbox
            value="checkedC"
            checked={!!isAutoanswer}
            onClick={toggleAutoAnswer}
            inputProps={{
              'aria-label': 'uncontrolled-checkbox',
            }}
          />
        </Grid>
      </ListItem>

      {renderAutoanswer()}
    </>
  );
}
