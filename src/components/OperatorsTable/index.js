import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux';
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
import TextField from '@material-ui/core/TextField';
import EnhancedTable from "./EnhancedTable";
import AddOperatorDialog from "views/AddOperatorDialog";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
};

const useStyles = makeStyles(styles);

export default function OperatorsTable() {
  const classes = useStyles();
  const {
    operator: {list},
    user: {active: client},
  } = useSelector(({operator, user}) => ({operator, user})) || {};

  const rows = (Object.values(list || {}) || []).map(item => {
    const {
      id,
      login,
      name,
      isActive,
      lastActivity,
      is_manager: isManager
    } = item || {};

    return {
      id, login, name, isActive, lastActivity, isManager,
    }
  });
  const [sorted, setSorted] = useState(rows);

  useEffect(() => {
    setSorted(rows);
  // eslint-disable-next-line
  }, [rows.length]);

  function sort(event) {
    const value = event.target.value;
    if (!value) {
      setSorted(rows);
      return;
    }

    const newRows = rows.filter(item => item.login.match(new RegExp(value, 'i')));
    setSorted(newRows);
  }

  if (!client) {
    return (
      <div>
        <h4>Клиент не выбран</h4>
      </div>
    );
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Операторы</h4>
          </CardHeader>
          <CardBody>
            <TextField
              fullWidth
              label="Поиск"
              margin="normal"
              onChange={sort}
            />
            <EnhancedTable rows={sorted} />
          </CardBody>
          <CardFooter>
            <AddOperatorDialog />
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
