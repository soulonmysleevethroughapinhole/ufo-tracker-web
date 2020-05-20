<template>
	<div>
		Video<br />
		<video id="video1" width="160" height="120" autoplay></video> <br />

		{{ name }}
		{{ description }}

		{{ getIsPlayerLive }}

		<div>
			<div id='logs'>
				{{ logBroadcast }}
			</div>
		</div>
	</div>
</template>


<script>
import axios from 'axios'

export default {
	name: 'Liveset',
	data: function () {
		return {
			isLoaded: false,
			isStreamCreated: false,
			isStreamLive: false,
			
			name: '',
			description: '',

			nickname: 'username',
			message: '',
			chBuffer: '',

			logBroadcast: '',

			socket: null,
			userPing: '',
			lastPing: '',

			MessagePing: 101,
			MessagePong: 102,
			MessageChat: 120,
			MessageNick: 113
		}
	},
	methods: {
		Connect() {
			//reconnectTimeOut = null
			if (this.webSocketReady() || this.ReconnectDelay === -1) {
				return
			}

			this.userPing = -1 // only for data	//userListStatus	//updateStatus() // fuck that, only add later
			
			this.socket = new WebSocket("ws://localhost:8005/api/" + this.$route.params.username )
			this.socket.onerror = function (e) {
				console.log(e)
			}
			this.socket.onopen = (e) => {
				this.w(this.MessageNick, "username") //topic of stream

				this.pingServer()
			}
			//onmessage is for receiving socket messages
			this.socket.onmessage = (e) => {
				try {
					if (typeof e.data === "string") {
						const p = JSON.parse(e.data) //parse? I think
						if (p.M !== undefined) {
							p.M = atob(p.M)
						}

						console.log("Read ", p)

						if (p.T == this.MessagePong) {
							if (parseInt(p.M, 10) == this.lastPing) {
								this.userPing = Date.now() - this.lastPing
							}
						} else if (p.T == 120) {
							if (p.N === undefined) {
								return
							}
							//this.LogChannel(p.C, "&lt;" + escapeEntities(p.N) + "&gt; " + p.M);
							//nick will be generated from the token ea request
							this.LogChannel(p.C, "&lt;" + p.N + "&gt; " + p.M);
							//append to chat corpus
						}
						//alright what else
					}
				} 
				catch (e) {
					console.log(e)
				}
				finally {
					console.log("New message received")
				}
			}

			this.socket.onclose = function(e) {
				console.log("Disconnected")
			}
		},
		sendMessage() {
			if (this.message != "") {
				this.writeSocket({
						T: this.MessageChat, 
						//C: this.$route.params.username,
						C: 1,
						M: btoa(this.message)})
				this.message = ""
			}
		},
		checkIfStreamLive() {
			axios({
				url: "http://localhost:8000/api/streams/" + this.$route.params.username,
				method: "GET"
			}).then(res => {
				console.log(res) //I think setting name and whatnot here would be the best move
				this.isLoaded = true
				this.isStreamCreated = true
				this.name = res.data.name
				this.description = res.data.description
				this.Connect()

				if (res.data.NumOfPeers > 0) {
					this.isStreamLive = true
					this.createLivesetSession()
				}
			}).catch(err => {
				this.isLoaded = true
				console.log(err)
			})
		},
		createLivesetSession() {
			const pc = new RTCPeerConnection({
				iceServers: [
					{
						urls: 'stun:stun.l.google.com:19302'
					}
				]
			})
			pc.oniceconnectionstatechange = e => this.logBroadcast += pc.iceConnectionState + '\n'
			pc.onicecandidate = event => {
				if (event.candidate === null) {
					//this.browsersdp = btoa(JSON.stringify(pc.localDescription))

					axios({
						url: `http://localhost:8000/api/sdp/` + this.$route.params.username,
						data: btoa(JSON.stringify(pc.localDescription)),
						method: "POST"
					}).then(
						res => {
							console.log(res.data)
							if (res.data === '') {
								return alert('Session Description must not be empty')
							}

							try {
								pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(res.data))))
							} catch (e) {
								alert(e)
							}
						}
					).catch(
						e => console.log(e)
					)
				}
			}
			pc.addTransceiver('audio')
			pc.createOffer()
				.then(d => { 
					pc.setLocalDescription(d)
				})
				.catch(e => this.logBroadcast += e + '\n')
			pc.ontrack = (event) => {
				var el = document.getElementById('video1')
				el.srcObject = event.streams[0]
				el.autoplay = true
				el.controls = true
			}
		},
		w(t, m) {
			this.writeSocket({T: t, M: btoa(m)})
		},
		wpc(pc, t, m) {
			this.writeSocket({PC: parseInt(pc), T: t, M: btoa(m)})
		},
		writeSocket(p) {
			console.log("Write ", p);
			if (!this.webSocketReady()) {
				return
			}
			this.socket.send(JSON.stringify(p))
		},
		webSocketReady() {
		return (this.socket !== null && this.socket.readyState === 1)
		},
		pingServer() {
			this.lastPing = Date.now()
			this.writeSocket({T:this.MessagePing, M: btoa(this.lastPing)})
		},
		LogChannel(ch, msg) {
			if (msg.charAt && msg.charAt(0) != '<' && msg.charAt(0) != '&' && msg.charAt(1) != '&' && msg.charAt(2) != 't' && msg.charAt(3) != ';') {
				msg = '* ' + msg;
			}

			const date = new Date();
			msg = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + " " + msg + "\n";

			//if (ch != this.$route.params.username) {
			if (ch != 1) {
				return
			}

			
			if (this.chBuffer === undefined) {
				this.chBuffer = msg;
			} else {
				this.chBuffer += '<br>' + msg;
			}

			// if ($('.buffer').html().trim() != "") {
			// 	$('.buffer').append("<br>")
			// }
			// $('.buffer').append(msg)
			// $('.buffer').scrollTop($('.buffer').prop("scrollHeight"))
		}
	},
	computed: {
		getIsPlayerLive() {
			return this.$store.getters['liveset/getIsPlayerLive']
		}
	},
	created: function() {
		this.checkIfStreamLive()
	}
}
</script>
