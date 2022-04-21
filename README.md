### 1. Node packages instalation
```
$ npm install
```

### 2. PostgreSQL database
The database is run in the docker container:
```
$ cd database
$ docker-compose up
```
The configuration is stored in the file `database/docker-compose.yml`, the table schemas in `database/schemas.sql` and the database volume in `database/data`.\
To connect to the database:
```
psql -h localhost -p 15432 -U locker locker
```

### 3. Data import
The challenge data is stored in the file `data/challenge.json`. To start the import one need to launch the Node process:
```
$ npm run import
```
This will import all the results of the golf tournament from the json file. However to keep it simple I create the record of the tournament manually (row with ID: 0 in table `main.event`).\
I have decided to use the real IDs of the objects from the json file instead of generating them with a sequencer. So this is the reason why the import can be run only once. To restart the import you need to first delete the data from the tables. This can be done either by removing volume `database/data` and restarting the docker container or via a script `database/clean_database.sql`.

### 4. REST API server
The Node server can be run on the localhost with the following command:
```
$ npm start
```

### 5. Retrieve players from the server
The players data can be retrieved by the GET request to the endpoint:
`/players/eventId/filterName`\
where:
* `eventId` is the only required parameter and it is the ID of the tournament - here: `0`
* `filterName` is optional and can be used for name filtering

One can use query parameters as well:
* `limit` to limit the number of returned players
* `skip` to skip the number of players - for pagination purposes
* `sort` to sort the result by the column number
* `dir` can have values `asc` or `desc`

Sample queries:
* `curl -o /tmp/res.json 'http://localhost:3000/players/0?limit=5&skip=5&sort=12&dir=desc'` it will return next 5 players sorted by total strikes in descending order.
* `curl -o /tmp/res.json 'http://localhost:3000/players/0/matt?sort=1&dir=asc'` it will return players whose names include `matt`

I have prepared sample queries to retrieve players by Postman as well: `Locker.postman_collection.json`.