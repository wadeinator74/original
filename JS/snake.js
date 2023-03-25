<!DOCTYPE html>
<html>
<head>
	<title>Snake Game</title>
	<style type="text/css">
		canvas {
			border: 1px solid black;
		}
	</style>
</head>
<body>
	<canvas id="canvas" width="400" height="400"></canvas>
	<script type="text/javascript">
		// Set up the canvas and its context
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		// Set up the initial state of the game
		var snake = [{x: 10, y: 10}];
		var direction = "right";
		var food = generateFood();

		// Set up the game loop
		var intervalId = setInterval(function() {
			update();
			draw();
		}, 100);

		// Handle user input
		document.addEventListener("keydown", function(event) {
			if (event.keyCode === 37 && direction !== "right") {
				direction = "left";
			} else if (event.keyCode === 38 && direction !== "down") {
				direction = "up";
			} else if (event.keyCode === 39 && direction !== "left") {
				direction = "right";
			} else if (event.keyCode === 40 && direction !== "up") {
				direction = "down";
			}
		});

		// Update the state of the game
		function update() {
			// Move the snake
			var head = {x: snake[0].x, y: snake[0].y};
			if (direction === "right") {
				head.x++;
			} else if (direction === "left") {
				head.x--;
			} else if (direction === "up") {
				head.y--;
			} else if (direction === "down") {
				head.y++;
			}
			snake.unshift(head);

			// Check for collision with food
			if (head.x === food.x && head.y === food.y) {
				food = generateFood();
			} else {
				snake.pop();
			}

			// Check for collision with walls
			if (head.x < 0 || head.x >= canvas.width / 10 ||
				head.y < 0 || head.y >= canvas.height / 10 ||
				collisionWithSelf()) {
				clearInterval(intervalId);
				alert("Game over!");
			}
		}

		// Draw the game on the canvas
		function draw() {
			// Clear the canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw the snake
			ctx.fillStyle = "green";
			snake.forEach(function(segment) {
				ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
			});

			// Draw the food
			ctx.fillStyle = "red";
			ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
		}

		// Generate a new food location
		function generateFood() {
			var food = {
				x: Math.floor(Math.random() * (canvas.width / 10)),
				y: Math.floor(Math.random() * (canvas.height / 10))
			};
			while (collisionWithSnake(food)) {
				food.x = Math.floor(Math.random() * (canvas.width / 10));
				food.y = Math.floor(Math.random() * (canvas.height / 10));
			}
