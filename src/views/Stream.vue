<template>
	<div>
		<h1>
			{{ name }}
		</h1>


		<div id="videowrapper">
			<video id="video1" autoplay width="100%" controls></video> <br />
		</div>
		
		<h2>
			{{ description }}
		</h2>

		<div>
			<!-- CHAT -->
		</div>

		<div>
			<div id='logs'>
				Logs
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
				//this.Connect()

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
					axios({
						url: `http://localhost:8000/api/sdp/` + this.$route.params.username,
						data: btoa(JSON.stringify(pc.localDescription)),
						method: "POST"
					}).then(
						res => {
							console.log(JSON.parse(atob(res.data)))
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
			//pc.addTransceiver('audio') omggg mom i am going to commit suicide
		    pc.addTransceiver('video')
			pc.createOffer()
				.then(d => { 
					pc.setLocalDescription(d)
				})
				.catch(e => this.logBroadcast += e + '\n')
			pc.ontrack = (event) => {
				// var el = document.getElementById('video1')
				// el.srcObject = event.streams[0]
				console.log("ontrack")
				console.log(event.streams[0])

				pc.addStream(document.getElementById('video1').srcObject = event.streams[0])

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
	created: function() {
		this.checkIfStreamLive()
	}
}
</script>


<style scoped>
#videowrapper {
	box-shadow: 0px 0px 10px 5px #aaaaaa;
	background-color:#333333;
	width:85%;
	padding:0.1em;
	margin: 0em auto;
	border-radius: 5px;
}
</style>