# Assignment 3: Tic Tac Toe + Database

## Running
`bun dev`

## Running Docker
```
docker build --pull -t bun-express .
docker run -d -p 3000:3000 bun-express
```

## Branches

`first-pass`: just converting a tic-tac-toe app to Express and keeping track of the tic tac toe games in memory server side.
`database-pass`: converting `first-pass` into a express server that uses a database.