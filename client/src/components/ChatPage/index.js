import React, { Component } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBAvatar,
  MDBBadge,
  MDBIcon,
  MDBBtn,
} from 'mdbreact';
import './style.css';

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      friends: [
        {
          name: 'John Doe',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-8',
          message: 'Hello, Are you there?',
          when: 'Just now',
          toRespond: 1,
          seen: false,
          active: true,
        },
        {
          name: 'Danny Smith',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-1',
          when: '5 min ago',
          toRespond: 0,
          seen: false,
          active: false,
        },
        {
          name: 'Alex Steward',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-2',
          when: 'Yesterday',
          toRespond: 0,
          seen: false,
          active: false,
        },
        {
          name: 'Ashley Olsen',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-3',
          when: 'Yesterday',
          toRespond: 0,
          seen: false,
          active: false,
        },
        {
          name: 'Kate Moss',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-4',
          when: 'Yesterday',
          toRespond: 0,
          seen: false,
          active: false,
        },
        {
          name: 'Lara Croft',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-5',
          when: 'Yesterday',
          toRespond: 0,
          seen: false,
          active: false,
        },
        {
          name: 'Brad Pitt',
          message: 'Lorem ipsum dolor sit',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-6',
          when: '5 min ago',
          toRespond: 0,
          seen: true,
          active: false,
        },
      ],
      messages: [
        {
          author: 'Brad Pitt',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-6',
          when: '12 mins ago',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
        },
        {
          author: 'Lara Croft',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-5',
          when: '13 mins ago',
          message:
            ' Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        },
        {
          author: 'Brad Pitt',
          avatar: 'https://mdbootstrap.com/img/Photos/Avatars/avatar-6',
          when: '14 mins ago',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolo',
        },
      ],
    };
  }

  render() {
    return (
      <MDBCard className='grey lighten-3 chat-room'>
        <MDBCardBody>
          <MDBRow className='px-lg-2 px-2'>
            <MDBCol md='6' xl='4' className='px-0 mb-md-0'>
              <h6 className='font-weight-bold mb-3 text-lg-left'>Member</h6>
              <div className='white z-depth-1 p-3'>
                <MDBListGroup className='friend-list'>
                  {this.state.friends.map((friend) => (
                    <Friend key={friend.name} friend={friend} />
                  ))}
                </MDBListGroup>
              </div>
            </MDBCol>
            <MDBCol md='6' xl='8' className='pl-md-3 px-lg-auto mt-2 mt-md-0'>
              <MDBRow>
                <MDBListGroup className='list-unstyled pl-3'>
                  {this.state.messages.map((message) => (
                    <ChatMessage
                      key={message.author + message.when}
                      message={message}
                    />
                  ))}
                  <li>
                    <div className='form-group basic-textarea'>
                      <textarea
                        className='form-control pl-2 my-0'
                        id='exampleFormControlTextarea2'
                        rows='3'
                        placeholder='Type your message here...'
                      />
                      <MDBBtn
                        color='info'
                        rounded
                        size='sm'
                        className='float-right mt-4'
                      >
                        Send
                      </MDBBtn>
                    </div>
                  </li>
                </MDBListGroup>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

const Friend = ({
  friend: { name, avatar, message, when, toRespond, seen, active },
}) => (
  <MDBListGroupItem
    href='#!'
    className='d-flex justify-content-between p-2 border-light'
    style={{ backgroundColor: active ? '#eeeeee' : '' }}
  >
    <MDBAvatar
      tag='img'
      src={avatar}
      alt='avatar'
      circle
      className='mr-2 z-depth-1'
    />
    <div style={{ fontSize: '0.95rem' }}>
      <strong>{name}</strong>
      <p className='text-muted'>{message}</p>
    </div>
    <div>
      <p className='text-muted mb-0' style={{ fontSize: '0.75rem' }}>
        {when}
      </p>
      {seen ? (
        <span className='text-muted float-right'>
          <MDBIcon className='fa-check' aria-hidden='true' />
        </span>
      ) : toRespond ? (
        <MDBBadge color='danger' className='float-right'>
          {toRespond}
        </MDBBadge>
      ) : (
        <span className='text-muted float-right'>
          <MDBIcon icon='reply' aria-hidden='true' />
        </span>
      )}
    </div>
  </MDBListGroupItem>
);

const ChatMessage = ({ message: { author, avatar, when, message } }) => (
  <li className='chat-message d-flex justify-content-between mb-4'>
    <MDBAvatar
      tag='img'
      src={avatar}
      alt='avatar'
      circle
      className='mx-2 z-depth-1'
    />
    <MDBCard>
      <MDBCardBody>
        <div>
          <strong className='primary-font'>{author}</strong>
          <small className='pull-right text-muted'>
            <i className='far fa-clock' /> {when}
          </small>
        </div>
        <hr />
        <p className='mb-0'>{message}</p>
      </MDBCardBody>
    </MDBCard>
  </li>
);

export default ChatPage;
