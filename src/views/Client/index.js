import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
// @material-ui/core components
// import {makeStyles} from "@material-ui/core/styles";
// core components
import TextField from '@material-ui/core/TextField';
import {useParams, useHistory} from "react-router-dom";
import {setUser, updateWorkMode, updatePassword} from '../../actions/user';
import {Redirect} from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, List, ListItem, Badge, Select, MenuItem, Button, LinearProgress} from "@material-ui/core";
import moment from 'moment';
import Autoanswer from './Autoanswer';
import {useSnackbar} from "components/GlobalSnackbar";

export const workModes = {
  '-1': 'Отключен',
  '0': 'При активности операторов',
  '1': 'Постоянный',
};

export default function Client(props) {
  const dispatch = useDispatch();
  const {push} = useHistory();
  const [redirect, setRedirect] = useState(null);
  const {login: loginParam} = useParams();
  const {setMessage} = useSnackbar();

  const {
    active: login,
    list,
    loginToIndex,
  } = useSelector(({user}) => user) || {};
  const fields = list && list[loginToIndex[login]];
  const {
    jid,
    created,
    pass,
    work_mode: workMode,
    isActive,
    lastActivity,
    auto_answer_text: autoAnswerText,
    auto_answer_start: autoAnswerStart,
    auto_answer_finish: autoAnswerFinish
  } = fields || {};
  const [passwordState, setPasswordState] = useState(pass);

  useEffect(() => {
    if (loginToIndex) {
      if (loginToIndex[loginParam] === undefined || loginToIndex[loginParam] === null) {
        setRedirect('/dashboard');
      } else {
        dispatch(setUser(loginParam));
      }
    }
  // eslint-disable-next-line
  }, [list]);

  useEffect(() => {
    if (pass) setPasswordState(pass);
  }, [pass]);

  useEffect(() => {
    if (loginParam) push(`/client/${loginParam}`);
  // eslint-disable-next-line
  }, [loginParam]);

  function renderFields() {
    if (!fields) return null;

    const workModeItems = [];
    // eslint-disable-next-line
    for (let index in workModes) {
      workModeItems.push(
        <MenuItem value={index} key={index}>{workModes[index]}</MenuItem>
      );
    }

    return (
      <List>
        <ListItem>
          <Grid item xs={6} >jid</Grid>
          <Grid item xs={6} >{jid}</Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Создан</Grid>
          <Grid item xs={6} >
            {moment(created).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6}>Время последней активности</Grid>
          <Grid item xs={6}>
            {moment(lastActivity).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Режим работы</Grid>
          <Grid item xs={6} >
            <Select
              value={workMode}
              onChange={event => {
                dispatch(updateWorkMode(event.target.value));
              }}
            >
              {workModeItems}
            </Select>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Пароль dashboard и openfire</Grid>
          <Grid item xs={4} >
            <TextField value={passwordState} onChange={(event) => {
              setPasswordState(event.target.value);
            }}/>
          </Grid>
          <Grid item xs={2} >
            <Button color="primary" variant="contained" onClick={() => {
              dispatch(updatePassword(passwordState));
              setMessage('Пароль обновлен');
            }}>ОК</Button>
          </Grid>
        </ListItem>

        <Autoanswer
          autoAnswerText={autoAnswerText}
          autoAnswerStart={autoAnswerStart}
          autoAnswerFinish={autoAnswerFinish}
        />
      </List>      
    );
  }

  function renderTable() {
    if (!fields) return <LinearProgress />

    return (
      <GridContainer>
        <GridItem xs={12} >
          <Card>
            <CardHeader color="primary">
              <h4> <Badge color={isActive ? "primary" : "secondary"} variant="dot"/> {login}</h4>
            </CardHeader>
            <CardBody>
              {renderFields()}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

  return (
    <div>
      {redirect && <Redirect to={redirect}/>}
      {renderTable()}
    </div>
  );
}
