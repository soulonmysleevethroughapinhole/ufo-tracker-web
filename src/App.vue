<template>
	<div id="app">
		<div id='view'>
			<router-view/>
		</div>

		<div id="nav">
			<div>
				<router-link to="/worldmap">
					<img src="./assets/worldmap.png" height='64px'>
				</router-link>
			</div>

			<div>	
				<router-link to="/pins">
					<img src="./assets/pin.png" height='64px'>
				</router-link>
			</div>

			<div>
				<router-link to="/sightings">
					<img src="./assets/sightings.png" height='64px'>
				</router-link>
			</div>

			<div>
				<router-link to="/friends">
					<img src="./assets/friends.png" height='64px'>
				</router-link>
			</div>

		</div>
	</div>
</template>

<style>

body {
	margin:0;
	background-color:#14e37b;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#view {
	height: calc(100vh - 96px);
	overflow:scroll;
}

#nav {
	background-color: #14e37b;
	justify-content: space-around;
	display:flex;

}

#nav div {
	border-radius: 5px;
	background: linear-gradient(145deg, #12cc6f, #15f384);
	box-shadow:  20px 20px 60px #11c169, 
             -20px -20px 60px #17ff8d;

	height:64px;
	width:64px;

	margin:16px;

}

#nav a {
	font-weight: bold;
	color: #01005e;

	margin:4px;
}

#nav a.router-link-exact-active {
	color: #01005e;
}
</style>
