package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.libs.streams._
import javax.inject.Inject
import akka.actor.ActorSystem
import akka.stream.Materializer
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import chatup.server.ChatManager
import akka.actor.Props
import chatup.server.ClientActor
import scala.util.Random
import chatup.server.RandomName
import play.api.i18n.I18nSupport
import play.api.i18n.MessagesApi

@Singleton
class ChatController @Inject() (implicit system: ActorSystem,
                                materializer: Materializer,
                                implicit val webJarAssets: WebJarAssets,
                                val messagesApi: MessagesApi) extends Controller with I18nSupport {

  val chatRoom = ChatManager.getChatRoom("general")
  val names = List("Shad", "Arshi", "Ammi", "Abbu")

  def socket = WebSocket.accept[String, String] { request =>
    import play.Logger
    Logger.info("Inside the socket")
    val clientName = RandomName.getName
    val color = RandomName.getColor
    ActorFlow.actorRef(out => Props(ClientActor(color,clientName, out, chatRoom)))

  }

  def chat = Action {
    Ok(views.html.chat("Chatup : Start chit chatting."))
  }

}