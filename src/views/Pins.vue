<template>
	<div>
		<div v-if='this.$route.params.username'>
			<div v-if='isLoaded'>
				Video<br />
				<video id="video1" width="160" height="120" autoplay muted></video> <br />


				<div v-if="isStreamCreated">
					<div v-if='isStreamLive'>
						there is already a sendonly peerconnection
						<button>END STREAM</button>
					</div>
					<div v-else>
						<h1>{{ name }}</h1>
						{{ description }}
						<button 
							@click="createSession"
							id="createSessionButton"> 
							Create Broadcast 
						</button>
					</div>
				</div>
				<div v-else>
					<h1>Create a room</h1>
					<form @submit.prevent='createRoom' class='PinsForm'>
						<div>
							<label>Description</label>
						</div><div>
						<input type='text' v-model='description'>
						</div><div>
						<button
							id="createRoomButton">
							Create Room {{this.$route.params.username}}
						</button>
						</div>
					</form>
				</div>

				<div id="logs">
					Logs
					{{ logBroadcast }}
				</div>
			</div>
			<div v-else>
				<h1>SERVICE TEMPORARILY UNAVAILABLE</h1>
			</div>
		</div>
		<div v-else>
			<h1>
				SET STREAM NAME
			</h1>

			<form @submit.prevent='submitStreamName' class='PinsForm'>
				<div>
					<label for="Stream Name">Stream name</label>
				</div><div>
				<input type='text' name='streamName' v-model='streamName'>
				</div><div>
				<button>
					Submit Stream Name
				</button>
				</div>
			</form>

		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Broadcast',
	data: function () {
		return {
			isStreamCreated: false,
			isStreamLive: false,
			isLoaded: false,
			streamName: '',
			name: '',
			description: '',
			//backgroundimage
			logBroadcast: '',
			pc: new RTCPeerConnection({
				iceServers: [
					{
						urls: 'stun:stun.l.google.com:19302'
					}
				]
			}),
			//peerConnections: [],
			socket: null,
			userPing: '',
			lastPing: '',
			MessagePing: 101,
			MessagePong: 102,
		}
	},
	methods: {
		//after chat is done, call createbroadcastsession & ws connect seperately
		submitStreamName() {
			this.$router.push({name: 'Pins', params: { username: this.streamName }})
		},

		checkIfStreamLive() {
			axios({
				url: "http://localhost:8000/api/streams/" + this.$route.params.username,
				method: "GET"
			}).then(res => {
				console.log(res)
				this.isLoaded = true
				this.isStreamCreated = true
				if (res.data.NumOfPeers > 0) {
					this.isStreamLive = true
				}
			}).catch(err => {
				this.isLoaded = true
				console.log("stream not live " + this.$route.params.username )
			})
		},
		createRoom() {
			axios({
				url: "http://localhost:8000/api/streams/" + this.$route.params.username,
				data: this.description,
				method: "POST"
			}).then(res => {
				console.log(res)

				this.description = res.data.description
				this.name = res.data.name
				this.isStreamCreated = true
			})
		},
		createSession() {
			this.pc.oniceconnectionstatechange = e => this.logBroadcast += this.pc.iceConnectionState + '\n'
			this.pc.onicecandidate = event => {
				if (event.candidate === null) {					
					axios({
						url: "http://localhost:8000/api/sdp/" + this.$route.params.username,
						data: btoa(JSON.stringify(this.pc.localDescription)),
						method: "POST"
					}).then(res => {				//console.log(res.data)
							if (res.data === '') {
								return alert('Session Description must not be empty')
							}
							this.isStreamLive = true
							try {
								this.pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(res.data))))
							} catch (e) {
								alert(e)
							}
						}
					)
				}
			}
			navigator.mediaDevices.getDisplayMedia({audio: true, video: true})
				.then(stream => {
					this.pc.addStream(document.getElementById('video1').srcObject = stream)
   
					console.log(stream)
					console.log("^stream above this is clusterfucked please somebody help me")

					this.pc.createOffer()
						.then(d => this.pc.setLocalDescription(d))
						.catch(err => this.logBroadcast += err + '\n')
			}).catch(err => this.logBroadcast += err + '\n')
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
		}
	},
	created: function() {
		this.checkIfStreamLive()
	}
}
</script>

<style scoped>
.PinsForm {
	display:block;
}

.PinsForm div {
	width:85%;
	margin:1em auto;
}

.PinsForm label {
	font-size:1.5rem;
}

.PinsForm input {
	width:calc(100% - 1em);
	box-shadow: 5px 5px 7.5px #888;
	border:1px solid #14e37b;
	height:1em;
	border-radius: 5px;
	padding: 0.1em 0.5em;
	font-size: 2rem;
	color:#14e37b;
}

.PinsForm button {
	background-color:#14e37b;
	border:1px #ccc solid;
	font-size: 2em;
	color:white;
	padding:0.25em 0;
	width:100%;
	border-radius: 15px;
}



</style>