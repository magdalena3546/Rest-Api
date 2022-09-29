import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { getSeats, loadSeats } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';
import { URL } from '../../../config';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const [socket, setSocket] = useState(null);
  const [freeSeats, setFreeSeats] =  useState(0);
  let arrayFreeSeats = [];

  useEffect(() => {
    const socket = io(URL);
    setSocket(socket);
    socket.on('seatsUpdated', (seats) => {
    dispatch(loadSeats(seats));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chosenDay]);

  useEffect(() => {
    for (let elm of seats){
      if(elm.day === chosenDay){
        arrayFreeSeats.push(elm);
      }
    }
    let freeSeats = 50 - arrayFreeSeats.length;
    setFreeSeats(freeSeats);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayFreeSeats, chosenDay]);

  function isTaken(seatId) {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>
      <div><p>Free seats: {freeSeats}/50</p></div>
    </div>
  )
}

export default SeatChooser;