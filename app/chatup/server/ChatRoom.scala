package chatup.server

import akka.actor.Actor
import akka.actor.ActorLogging
import akka.actor.ActorRef
import scala.collection.mutable.Set
import play.Logger

class ChatRoom(name: String, var available: Set[ActorRef]) extends Actor with ActorLogging {

  override def receive = {
    case joined: Join => {
      available = available + sender
      val broadcast = Notification(s"${joined.member} joined the chat room")
      (available - sender).foreach { actor => actor ! broadcast }
      Logger.info("Joined 1 member. # of Available members " + available.size)
    }
    case leave: Leave => {
      val broadcast = Notification(s"<i>@${leave.member}</i> left the chat room")
      available = available - sender
      available.foreach { actor => actor ! broadcast }
      
    }
    case msg: BroadCastMessage => {
      available.foreach { actor => actor ! msg }
    }
  }
}

trait Message
case class Join(member: String) extends Message
case class Leave(member: String) extends Message
case class BroadCastMessage(author : String, msg: String,color : String) extends Message
case class Notification(message : String) extends Message
