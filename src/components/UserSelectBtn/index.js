import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import VirtualizedList from './VirtualizedList';
import TextField from '@material-ui/core/TextField';
import {useLocation} from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function UserSelectBtn() {
  const classes = useStyles();
  const {pathname} = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    active,
    list,
    loginToIndex,
    error,
  } = useSelector(({user}) => user) || {};
  const [sorted, setSorted] = useState(list);

  function sort(event) {
    const value = event.target.value;
    if (!value) {
      setSorted(list);
      return;
    }

    const newList = (list || []).filter(item => item.login.match(new RegExp(value, 'i')));
    setSorted(newList);
  }

  useEffect(() => {
    if (list) {
      setIsLoading(false);
      setSorted(list);
    }
  }, [list]);

  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  useEffect(() => {
    if (active !== null && loginToIndex) {
      const index = loginToIndex[active];
      const activeUser = list[index];
      const {login: activeLogin} = activeUser || {};
      setLogin(activeLogin);
    }
  // eslint-disable-next-line
  }, [active, loginToIndex]);

  if (/dashboard/.test(pathname)) return null;

  function renderList() {
    if (error) return <p>Не удалось загрузить список клиентов <span role="img" aria-label="sad">😢</span></p>;
    if (isLoading) return <LinearProgress />;
    if (!list) return <p>Список клиентов пуст</p>;

    return <VirtualizedList itemCount={list.length} list={sorted || []} onClick={() => setIsOpen(false)}/>
  }

  return (
    <div>
      <Button  className={classes.title} onClick={() => setIsOpen(true)}>
        {login || 'Выбрать клиента'}
      </Button>
      <Drawer anchor="top" open={isOpen} onClose={() => setIsOpen(false)}>
        <TextField
          label="Поиск"
          margin="normal"
          onChange={sort}
        />        
        {renderList()}
      </Drawer>
    </div>
  );
}