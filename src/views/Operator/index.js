import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
// @material-ui/core components
// import {makeStyles} from "@material-ui/core/styles";
// core components
import TextField from '@material-ui/core/TextField';
import {useParams} from "react-router-dom";
import {Redirect} from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, List, ListItem, Badge, LinearProgress, Button, Checkbox} from "@material-ui/core";
import moment from 'moment';
import {useSnackbar} from "components/GlobalSnackbar";
import {updateOperatorLogin} from "actions/operator";
import {updateOperatorName} from "actions/operator";
import {updateOperatorPassword} from "actions/operator";
import {updateIsManager} from "actions/operator";
import {invalidateOperatorSession} from "actions/operator";
import {restoreOperator} from "actions/operator";
import {removeOperator} from "actions/operator";

export default function Operator(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const {id: idParam} = useParams();
  const {setMessage} = useSnackbar();

  const {
    list,
  } = useSelector(({operator}) => operator) || {};
  const fields = list && list[idParam];
  const {
    id,
    created,
    isActive,
    name,
    login,
    lastActivity,
    is_bot: isBot,
    is_manager: isManager,
    lastLogin,
    is_deleted: isDeleted,
  } = fields || {};
  const [loginState, setLoginState] = useState(login);
  const [nameState, setNameState] = useState(name);
  const [passwordState, setPasswordState] = useState(null);
  const [isManagerState, setIsManagerState] = useState(false);

  useEffect(() => {
    setLoginState(login);
    setNameState(name);
    setIsManagerState(isManager);
  // eslint-disable-next-line
  }, [fields]);

  useEffect(() => {
    if (list && Object.keys(list).length) {
      if (list[idParam] === undefined || list[idParam] === null) {
        setRedirect('/dashboard');
      }
    }
  // eslint-disable-next-line
  }, [list]);

  function renderFields() {
    if (!fields) return null;

    return (
      <List>
        <ListItem>
          <Grid item xs={6} >id</Grid>
          <Grid item xs={6} >{id}</Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Создан</Grid>
          <Grid item xs={6} >
            {moment(created).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6}>Последняя активность</Grid>
          <Grid item xs={6}>
            {moment(lastActivity).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6}>Последний вход</Grid>
          <Grid item xs={6}>
            {moment(lastLogin).format('DD.MM.YYYY HH:mm:ss')}
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Логин</Grid>
          <Grid item xs={4} >
            <TextField value={loginState} onChange={(event) => {
              setLoginState(event.target.value);
            }}/>
          </Grid>
          <Grid item xs={2} >
            <Button color="primary" variant="contained" onClick={() => {
              dispatch(updateOperatorLogin(id, loginState));
              setMessage('Логин обновлен');
            }}>ОК</Button>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Имя</Grid>
          <Grid item xs={4} >
            <TextField value={nameState} onChange={(event) => {
              setNameState(event.target.value);
            }}/>
          </Grid>
          <Grid item xs={2} >
            <Button color="primary" variant="contained" onClick={() => {
              dispatch(updateOperatorName(id, nameState));
              setMessage('Имя обновлено');
            }}>ОК</Button>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6}>Менеджер</Grid>
          <Grid item xs={6}>
            <Checkbox
              value="checkedC"
              checked={!!isManagerState}
              onClick={() => {
                dispatch(updateIsManager(id, !isManagerState))
                setMessage('Изменена роль оператора');
              }}
              inputProps={{
                'aria-label': 'uncontrolled-checkbox',
              }}
            />
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6}>Является ботом</Grid>
          <Grid item xs={6}>{isBot ? 'Да' : 'Нет'}</Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={6} >Обновить пароль</Grid>
          <Grid item xs={4} >
            <TextField
              value={passwordState}
              onChange={(event) => {
                setPasswordState(event.target.value);
              }}
              placeholder="Новый пароль"
              type="password"
            />
          </Grid>
          <Grid item xs={2} >
            <Button color="primary" variant="contained" onClick={() => {
              dispatch(updateOperatorPassword(id, passwordState));
              setPasswordState('');
              setMessage('Пароль обновлен');
            }}>ОК</Button>
          </Grid>
        </ListItem>

        <ListItem>
          <Grid item xs={4} >
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                dispatch(invalidateOperatorSession(id));
                setMessage('Принудительно завершена сессия оператора');
              }}
              disabled={!isActive}
            >
              Принудительно завершить сессию
            </Button>
          </Grid>
        </ListItem>

        {
          isDeleted === '0'
            ? (
              <ListItem>
                <Grid item xs={4} >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      dispatch(removeOperator(id));
                      setMessage('Оператор отключен');
                    }}
                  >
                    Отключить оператора
                  </Button>
                </Grid>
              </ListItem>
            )
            : (
              <ListItem>
                <Grid item xs={4} >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      dispatch(restoreOperator(id));
                      setMessage('Оператор восстановлен');
                    }}
                  >
                    Восстановить оператора
                  </Button>
                </Grid>
              </ListItem>
            ) 
        }

      </List>      
    );
  }

  function renderTable() {
    if (!fields) return <LinearProgress />;

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
