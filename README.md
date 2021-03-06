To run API server, please follow the steps below:

#### 1. Node packages installation
```
$ npm install
```

#### 2. PostgreSQL database
The database is run in the docker container:
```
$ cd database
$ docker-compose up
```
The configuration of database is stored in the file `database/docker-compose.yml`, the table schemas in `database/scripts/schemas.sql` and the database volume in `database/data`.\
To connect to the running database:
```
psql -h localhost -p 15432 -U locker locker
```

#### 3. Data import
The challenge data is stored in the file `data/challenge.json`. To start the import one need to launch the Node process:
```
$ npm run import
```
This will import all the results of the golf tournament from the json file. However to keep it simple I create the record of the tournament event manually (row with ID: 0 in table `main.event` - this ID will used to retrieve results from the event by API).\
I have decided to use the real IDs of the objects from the json file instead of generating them with a sequencer. This results in that the import can be run only once. To restart the import you need to first delete the data from the tables. This can be done either by:
* removing volume `database/data` and restarting the docker container or
* via a script `database/scripts/clean_database.sql`.

#### 4. REST API server
The Node server can be run on the localhost with the following command:
```
$ npm start
```

#### 5. Retrieve players from the server
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

Every player object returned from the server has the following keys (which can be translated to table columns):
| 1        | 2    | 3           | 4              | 5            | 6              | 7            | 8              | 9            | 10             | 11           | 12            |
|----------|------|-------------|----------------|--------------|----------------|--------------|----------------|--------------|----------------|--------------|---------------|
| position | name | total_score | round1_strikes | round1_score | round2_strikes | round2_score | round3_strikes | round3_score | round4_strikes | round4_score | total_strikes |

Sample queries:
* `curl -o /tmp/res.json 'http://localhost:3000/players/0?limit=5&skip=5&sort=12&dir=desc'` it returns next 5 players sorted by total strikes in descending order.
* `curl -o /tmp/res.json 'http://localhost:3000/players/0/matt?sort=1&dir=asc'` it returns players whose names include `matt`

I have prepared sample queries to retrieve players by Postman as well: `Locker.postman_collection.json`.