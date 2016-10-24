package chatup.server

import javax.inject.Singleton
import javax.inject.Inject
import java.time.Clock
import play.api.inject.ApplicationLifecycle
import play.api.Environment
import play.api.Logger
import scala.io.Source
import scala.util.Random

@Singleton
class RandomClientNames  @Inject() (clock: Clock, appLifecycle: ApplicationLifecycle,env : Environment) {
  Logger.info("Fetching the names for the client")
  val f = env.getFile("conf/names.list")
  val names = Source.fromFile(f).getLines().toArray
  RandomName.namesList = names
  
}

object RandomName {
  
  var namesList : Array[String] = Array()
  val colors = List("#f7d842","#f76d3c","#f15f74","#913ccd","#5481e6","#17bfe2","#ff6961","#FF6961","#44D7A8")

  def getColor : String = colors(Random.nextInt(9))

  def getName : String = namesList(Random.nextInt(namesList.size))


}