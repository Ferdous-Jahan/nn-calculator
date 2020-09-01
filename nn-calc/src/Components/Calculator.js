import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  valuesLine: {
    display: "flex",
    alignSelf: "center",
  },
  values: {
    color: "#f50057",
  },
});

function Calculator() {
  const [selectedDate, setSelectedDate] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [days, setDays] = useState();
  const [separateMonth, setSeparateMonth] = useState();
  const [separateDays, setSeparateDays] = useState();
  const [hours, sethours] = useState();
  const [seconds, setSeconds] = useState();
  const [miliseconds, setMiliseconds] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    //console.log(selectedDate);
  };

  const calculate = () => {
    var yearThen = parseInt(selectedDate.substring(0, 4), 10);
    var monthThen = parseInt(selectedDate.substring(5, 7), 10);
    var dayThen = parseInt(selectedDate.substring(8, 10), 10);
    var today = new Date();
    var birthday = new Date(yearThen, monthThen - 1, dayThen);
    var differenceInMilisecond = today.valueOf() - birthday.valueOf();

    var year_age = Math.floor(differenceInMilisecond / 31536000000);
    var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);

    // if (
    //   today.getMonth() == birthday.getMonth() &&
    //   today.getDate() == birthday.getDate()
    // ) {
    //   alert("Happy B'day!!!");
    // }

    var month_age = Math.floor(day_age / 30);

    day_age = day_age % 30;

    var tMnt = month_age + year_age * 12;
    var tDays = tMnt * 30 + day_age;
    setYear(year_age);
    setMonth(month_age);
    setDays(day_age);
    setSeparateMonth(tMnt);
    setSeparateDays(tDays);
    sethours(tDays * 24);
    setSeconds(tDays * 24 * 3600);
    setMiliseconds(tDays * 24 * 3600 * 1000);
  };

  const classes = useStyles();

  return (
    <div
      style={{
        display: "container",
        width: "90%",
        textAlign: "center",
        margin: "auto",
        marginTop: "5rem",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Typography style={{ marginBottom: "3rem" }}>
          Nibba <FavoriteIcon /> Nibbi
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="Starting Date"
            label="Starting Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <section style={{ alignSelf: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={calculate}
            disabled={!selectedDate}
          >
            CALCULATE
          </Button>
        </section>
      </div>
      <div
        style={{
          marginTop: "5rem",
          display: miliseconds ? "flex" : "none",
          flexDirection: "column",
        }}
      >
        <Typography>You have spent</Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{year}</Typography>&nbsp;
          years&nbsp;
          <Typography className={classes.values}>{month}</Typography>&nbsp;
          months&nbsp;
          <Typography className={classes.values}>{days}</Typography>&nbsp; days
        </Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{separateMonth}</Typography>
          &nbsp; months&nbsp;
          <Typography className={classes.values}>{days}</Typography>&nbsp; days
        </Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{separateDays}</Typography>
          &nbsp; days
        </Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{hours}</Typography>&nbsp;
          hours
        </Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{seconds}</Typography>&nbsp;
          seconds
        </Typography>
        <Typography className={classes.valuesLine}>
          <Typography className={classes.values}>{miliseconds}</Typography>
          &nbsp; miliseconds
        </Typography>
        <Typography>With your nibba</Typography>
      </div>
    </div>
  );
}

export default Calculator;
