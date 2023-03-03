import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import Header from '../Header/Header'
import Helmet from '../Helmet/Helmet'
import Footer from '../Footer/Footer'
import Conversation from '../Conversations/Conversation'
import Message from '../Message/Message'
import ChatOnline from '../ChatOnline/ChatOnline'
import axiosInstance from '../../../../utils/axiosInstance'
import { useSelector } from 'react-redux'

const Chat = () => {
    const [chats, setChats] = useState([])

    const {user} = useSelector((state) => state.auth)
    

    useEffect(() => {
        const getChats = async() => {
            try {
                const res = await axiosInstance.get("/chat/"+user._id)  
                setChats(res.data)       
            } catch (error) {
                console.log(error);
            }
        };
        getChats()
    }, [user._id])

  return (
    <Helmet title='Chat'>
    <Header/>
    <div className='messenger'>
    <div className='chatMenu'>
         <div className="chatMenuWrapper">
            <input placeholder='Search for friends' className='chatMenuInput' />         
            { chats.map(c => (
            <Conversation conversation={c} currentUser={user}/>
            ))}         
         </div>
    </div>
    <div className='chatBox'>
        <div className="chatBoxWrapper">
            <div className="chatBoxTop">
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message/>
                <Message own={true}/>
            </div>
            <div className="chatBoxBottom">
                <textarea className='chatMessageInput' placeholder='Type your message...'></textarea>
                <button className='chatSubmitButton'>Send</button>
            </div>
        </div>
    </div>
    <div className='chatOnline'>
        <div className="chatOnlineWrapper">
            <ChatOnline/>
        </div>
    </div>
    </div>
    <Footer/>
    </Helmet>
  )
}

export default Chat