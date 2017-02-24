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

					$("#chat-form").submit(
							function(event) {
								event.preventDefault ? event.preventDefault()
										: (event.returnValue = false);
								var message = $("#chat-form input").val();
								chatSocket.send(message);
								$('#chat-form')[0].reset();
							});

                    /* Handle the click on the post button */
                    $('button.post').on('click',function(event){
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
										chatDiv
												.animate(
														{
															"scrollTop" : $('.chat-msgs')[0].scrollHeight
														}, "slow");
									});

				});