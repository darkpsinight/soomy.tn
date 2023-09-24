import DateTimeDisplay from '../components/DateTimeDisplay'
const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <div
          className="countdown-link"
        >
     <span >Commence Dans :</span>
          <DateTimeDisplay value={days} type={'Jours'} isDanger={days <= 3} />
          <p style={{ margin: 0,
  color:"white"}}>:</p>
          <DateTimeDisplay value={hours} type={'Heures'} isDanger={false} />
          <p style={{ margin: 0,
  color:"white"}}>:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p style={{ margin: 0,
  color:"white"}}>:</p>
          <DateTimeDisplay value={seconds} type={'Secondes'} isDanger={false} />
        </div>
      </div>
    );
  };
  export default ShowCounter
  