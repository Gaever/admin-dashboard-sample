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
import TextField from '@material-ui/core/TextField';
import EnhancedTable from "./EnhancedTable";
import {LinearProgress} from "@material-ui/core";
import CardFooter from "components/Card/CardFooter";
import AddUserDialog from "views/AddUserDialog";

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

export default function ClientsTable() {
  const classes = useStyles();
  const {list} = useSelector(({user}) => user) || {};
  const rows = (list || []).map(item => {
    const {
      id,
      login,
      isActive,
      lastActivity,
    } = item || {};
    const statUrl = `https://mysender.im/admin/stat.php?id=${id}&login=${login}`

    return {
      login, isActive, lastActivity, url: statUrl,
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

  if (!list || !list.length) {
    return <LinearProgress />
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Клиенты</h4>
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
            <AddUserDialog />
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
