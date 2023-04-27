import{Button,Form,Container,Row,Col, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');


function App() {


const [message,setMessage] = useState("");
const [showText,setShowText]= useState("");
const [selectedRoom,setSelectedRoom] = useState("")
const sendMessage = () => {
  socket.emit("the_message",{message,selectedRoom});
}
const joinRoom = () =>{
  if(selectedRoom !== ""){
    socket.emit("join_room",selectedRoom);
  }
}
useEffect(()=>{
socket.on("get_message",(data)=>{
  setShowText(data.message);
})
},[socket]);

  return (
    <div className="App">
      <ToastContainer/>
        <Container>
          <Row>
            <Col xl={12} sm={12}>
              <Form>
              <Form.Group >
                <Form.Label>Select room</Form.Label>
                <Form.Control 
                onChange={(event)=>{setSelectedRoom(event.target.value)}}
                type="text" 
                placeholder="Select your room" />
              </Form.Group>
              <Button variant='warning' onClick={joinRoom} style={{width:'100%',marginTop:10}}>Joing this room</Button>
              <br/><br/><br/>
              <Form.Group >
                <Form.Label>Add message</Form.Label>
                <Form.Control 
                onChange={(event)=>{setMessage(event.target.value)}}
                type="text" 
                placeholder="Add your message" />
              </Form.Group>
            </Form>
            <Button onClick={sendMessage} style={{width:'100%',marginTop:10}}>Send message</Button>
            <br/><br/>
            <p>{showText}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
