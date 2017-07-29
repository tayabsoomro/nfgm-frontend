import React from 'react';
import { Button , Col , Row , Panel , FormGroup , ControlLabel , FormControl , HelpBlock }
  from 'react-bootstrap/lib';
import fire from '../../fire';
import MessageForm from './MessageForm';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: "", ph: ["num1","num2"] };
    }

    componentWillMount(){
        /* Create reference to messages in Fire base Database */
        let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
        messagesRef.on('child_added', snapshot => {
            /* Update React state when message is added at Fire base Database */
            let message = { text: snapshot.val(), id: snapshot.key };
            this.setState({ messages: [message].concat(this.state.messages) });
        })
    }

    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        fire.database().ref('messages').push( this.inputEl.value );
        this.inputEl.value = '..'; // <- clear the input
    }


    render() {
        return(
          <div className="col-sm-12 major-content">
            <div className="col-sm-6">
              <Panel header="Contact">
                <div className="col-sm-12 address-panel">
                  <a target="_blank" href="https://www.google.ca/maps/place/Natural+Fresh+Meat/@52.1300124,-106.680819,17z/data=!3m1!4b1!4m5!3m4!1s0x5304f726767579f7:0x80a086221c7d8431!8m2!3d52.1300124!4d-106.6786303">
                    <p>4-606 22nd St West</p>
                    <p>Saskatoon</p>
                    <p>SK S7M 5W1</p>
                  </a>
                  <p>Phone:</p>
                  {this.state.ph.map((num) =>
                    <p><a href={"tel:" + num}>num</a></p>
                  )}
                </div>
              </Panel>
            </div>
            <MessageForm size="col-sm-6"/>
          </div>
        )
    }
};

export default Contact;
