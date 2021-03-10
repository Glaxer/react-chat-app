import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import ChatList from '../components/ChatList';
import ChatView from '../components/ChatView';
import ChatSend from '../components/ChatSend';
import NewChat from '../components/NewChat';
import UpdateProfile from '../components/UpdateProfile';
import firebase from 'firebase/app';
import 'firebase/firestore';

class Dashboard extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      updateProfileVisible: false,
      email: null,
      chats: []
    }
  }

  render() {
    return (
      <main>
        <Row>
          <Col xl={3} lg={4} className="right-col">
            <Button style={{ height: "100px" }} className="w-100"
              onClick={this.updateProfileClicked}
            >
              {this.state.userName}
            </Button>
            <ChatList
              history={this.props.history}
              newChatBtnFn={this.newChatBtnClicked}
              selectChatFn={this.selectChat}
              chats={this.state.chats}
              userEmail={this.state.email}
              userName={this.state.userName}
              selectedChatIndex={this.state.selectedChat} >
            </ChatList>
          </Col>
          <Col xl={9} lg={8}>
            {
              this.state.updateProfileVisible ?
                <UpdateProfile
                  userEmail={this.state.email}
                  userName={this.state.userName}
                  userAddress={this.state.address}
                ></UpdateProfile> : null
            }
            {
              this.state.newChatFormVisible ?
                null :
                <ChatView
                  user={this.state.email}
                  chat={this.state.chats[this.state.selectedChat]}
                >
                </ChatView>
            }
            {
              this.state.selectedChat !== null && !this.state.newChatFormVisible ?
                <ChatSend submitMessageFn={this.submitMessage} messageReadFn={this.messageRead}></ChatSend> :
                null
            }
            {
              this.state.newChatFormVisible ? <NewChat goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChat> : null
            }
          </Col>
        </Row>
      </main>
    );
  }

  updateProfileClicked = () => {
    this.setState({ updateProfileVisible: true, newChatFormVisible: false, selectedChat: null });
  }

  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false, updateProfileVisible: false });
    this.messageRead();
  }

  messageRead = () => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user => _user !== this.state.email)[0]);
    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
      firebase.firestore().collection('chats').doc(docKey).update({ receiverHasRead: true })
    }
  }

  clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null, updateProfileVisible: false });

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(':');
    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));
    this.setState({ newChatFormVisible: false, updateProfileVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  }

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase.firestore().collection('chats').doc(docKey).set({
      receiverHasRead: false,
      users: [this.state.email, chatObj.sendTo],
      messages: [{
        message: chatObj.message,
        sender: this.state.email
      }]
    });
    this.setState({ newChatFormVisible: false, updateProfileVisible: false });
    this.selectChat(this.state.chats.length - 1);
  }

  submitMessage = (msg) => {
    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user => _user !== this.state.email)[0]);
    firebase.firestore().collection('chats').doc(docKey).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        sender: this.state.email,
        message: msg,
        timestamp: Date.now()
      }),
      receiverHasRead: false
    });
  }


  //Called when the component has successfully been rendered to the DOM
  componentDidMount = () => {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(async _user => {
      if (!_user) {
        this.props.history.push('/login');
      } else {
        await firebase.firestore().collection('chats')
          .where('users', 'array-contains', _user.email)
          .onSnapshot(async res => { //call whenever this database document gets updated 
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _user.email,
              chats: chats
            });
          });
        if (this._isMounted) {
          await firebase.firestore().collection('users')
            .doc(_user.email)
            .onSnapshot(async res => {
              console.log('success')
              const user = res.data()
              await this.setState({
                userName: user.userName,
                address: user.address
              });
            });
        }
      }
    })

  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

}

export default Dashboard;