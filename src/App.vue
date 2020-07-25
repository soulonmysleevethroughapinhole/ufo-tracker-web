<template>
	<div id="app">
		<div id="nav">
			<div>
				<router-link to="/worldmap">
					<img src="./assets/worldmap.png">
				</router-link>
			</div>

			<div>	
				<router-link to="/pins">
					<img src="./assets/pin.png">
				</router-link>
			</div>

			<div>
				<router-link to="/sightings">
					<img src="./assets/sightings.png">
				</router-link>
			</div>

			<div>
				<router-link to="/friends">
					<img src="./assets/friends.png">
				</router-link>
			</div>

		</div>

		<div id='view'>
			<router-view/>
		</div>
	</div>
</template>

<style>


:root {	
	color-scheme: light dark;
	--themed-background-color: #fff;
	--themed-background-color-secondary: #aaa;
	--themed-foreground-color: #222;
}

@media (prefers-color-scheme: dark) {
	:root {
		--themed-background-color: #121212;
		--themed-background-color-secondary: #101010;
		--themed-background-color-tertiary: #222222;
		--themed-foreground-color: #00ff00;
	}
}

body {
	margin:0;
	background-color:#121212;
	background: linear-gradient(145deg, var(--themed-background-color-secondary), var(--themed-background-color));
}

::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	background:#000;
}


/* Track */
::-webkit-scrollbar-track {
	/* background:#fff; */
	background:#000;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: var(--themed-foreground-color);
}

#view {
	height: calc(100vh - 84px);
}

#nav {
	background-color: #121212;
	justify-content: space-around;
	display:flex;
	height:64px;
	width:36em;
	padding: 8px;
}

#nav div {
	border-radius: 5px;
	background: linear-gradient(145deg, var(--themed-foreground-color), #00772a);

	box-shadow: 4px 5px 5px -2.5px #3cd07031;

	width:20%;
	height:64px;
}

#nav img {
	height: 48px;
	margin:8px;
}

#nav a {
	font-weight: bold;
	color: #01005e;
}

#nav a.router-link-exact-active {
	color: #01005e;
}
</style>
