package chatup.server

import akka.actor.Actor
import akka.actor.ActorLogging
import akka.actor.ActorRef
import akka.actor.ActorSystem
import akka.actor.Props
import scala.collection.mutable.Set
import play.Logger

case class ChatManager(val chatRooms: List[ActorRef]) {
  //Work in progress
  // Add feature to initialize list of chat rooms

}

object ChatManager {

  def getChatRoom(roomName: String)(implicit system: ActorSystem) = {
    Logger.info("Creating the chat room")
    system.actorOf(Props(classOf[ChatRoom], roomName, Set()), name = roomName)
  }

}

case class ClientActor(color : String, member: String, out: ActorRef, chat: ActorRef) extends Actor with ActorLogging {

  chat ! Join(member)
  Logger.info("Joined the chat")
  
  override def postStop() = {
    Logger.info("leaving the chat room ")
    chat ! Leave(member)
  }

  def receive = {
    case message: String           => chat ! BroadCastMessage(member,message,color)
    case BroadCastMessage(author, message,color) => out ! s"$color:$author : $message"
    case Notification(message) => out ! s"#fff:Admin : $message"
  }

}