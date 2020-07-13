import React, { Component } from 'react';

import {add_reminder,remove_reminder,clear_reminders} from  './component/actionCreator/actionCreator'
import {connect} from 'react-redux'
import moment from 'moment'
import logo from './image.png'


class App extends Component{
    state ={
        text:'',
        date:new Date()
    }
   
    render_reminders =()=>{
        const {reminders} = this.props;
          return(
            reminders.map(reminder =>{
              return(
                <ul key={reminder.id} className='list-group'>
                  <li className="list-group-item">
                      <div> {reminder.text}</div>
                      <div> {moment(new Date(reminder.date)).fromNow()}</div>
                        <div className="btn-danger closeIcon"
                        onClick={()=>this.props.remove_reminder(reminder.id)} >X</div>
                  </li>
                </ul>
              )
            })
          )
      }



  render(){
    return (
      <div className="App">
        <img src={logo}/>
        <div className="reminder_title">
          <h2>What shoud you do ?</h2>
        </div>
        <input 
              type="text"
              placeholder="your plan ..?"
              className="form-control"
              onChange= {(e)=> this.setState({text:e.target.value})}
              value={this.state.text}
        />

        <input 
              type="datetime-local"
              className="form-control"
              onChange= {(e)=> this.setState({date:e.target.value})}
              value={this.state.date}
        />

     

          {/* button Add  */}
            <button className="btn-primary btn-block" 
              onClick={()=>{
                this.props.add_reminder(this.state.text,this.state.date)
                this.setState({text:"",date:''})
                }}>
               Add Reminder
            </button>
           {/* button Add  */}

            {this.render_reminders()}
          
            
            {/* button clear  */}
            <button className=" btn-danger btn-block clearReminders"
               onClick={ ()=> this.props.clear_reminders()}
            >Clear Reminders
            </button>
               {/* button clear  */}
      </div>
    );
  }
}


function mapStateToProps(state){
  return{
    reminders:state
  }
}
export default connect(mapStateToProps,{add_reminder,remove_reminder,clear_reminders}) (App);
