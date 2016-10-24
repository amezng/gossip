if (window.console) {
	console.log("Welcome to your Play application's JavaScript!");
}
var host = window.location.host;
var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket

$(document)
		.ready(
				function() {
					/*$('.chat-msgs').scrollbar({
					    "onScroll": function(y, x){
					        if(y.scroll == y.maxScroll){
					            console.log('Scrolled to bottom');
					        }
					    }
					});*/
					var host = window.location.host;
					var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
					var chatSocket = new WS('ws://' + host + "/chat/general");

					var chatDiv = $('.chat-msgs');
					var chatht = chatDiv[0].scrollHeight;
					console.log("Scroll height is " + chatht)
					console.log("chat height is " + $('.chat-msgs').height());
					// chatDiv.scrollTop(chatht);

					/*chatDiv.animate({
						"scrollTop" : chatht
					}, "slow");
*/
					$("#chat-form").submit(
							function(event) {
								event.preventDefault ? event.preventDefault()
										: (event.returnValue = false);
								var message = $("#chat-form input").val();
								chatSocket.send(message);
								$('#chat-form')[0].reset();
							});

					chatSocket.onmessage = function(msg) {
						console.log("received message : " + msg.data)
						var incomingMessage = msg.data;
						var res = incomingMessage.split(":", 3);
						var colorCode = res[0];
						var author = res[1];
						var message = res[2];

						var chatMessageTemplate = "<div class='media-chatbubble'><div class='media-body'><div><div class='media-heading'"
						        +"style='color:"+colorCode+"'>"
								+ author
								+ "</strong></div>"
								+ message
								+ "</div></div>";
						$(chatMessageTemplate).appendTo('.chat-msgs');
						var chatmsg = $('.chat-msgs');
						var scrollht = chatmsg[0].scrollHeight;
						console.log("Scroll height is " + scrollht)
						chatDiv.animate({
							"scrollTop" : scrollht
						}, "slow");
					};

					$(window)
							.resize(
									function() {
										var chatDiv = $('.chat-msgs');
										console.log("chat height on resize "
												+ $('.chat-msgs').height());
										console.log("chat scroll height is "
												+ chatDiv[0].scrollHeight);
										chatDiv
												.animate(
														{
															"scrollTop" : $('.chat-msgs')[0].scrollHeight
														}, "slow");
									});

				});