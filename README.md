## Text Parser - Parse text to json format for searching data
Eg: 
Input=> :healthcheck OR info
Output=> {"$or": ["healthcheck", "info"]}

Input=> healthcheck (-successful OR ping)
Output=> {"$and":["healthcheck",{"$or":["-successful","ping"]}]}

Input=> healthcheck (!successful OR ping)
Output=> {"$and":["healthcheck",{"$or":[{"$not":"successful"},"ping"]}]}

Below are the search rules:
- terms are implicitly AND'd together unless quoted
- terms are implicitly an exact match
- multiple search terms can be nested using ()'s
- negation can be done using ! in front of search term
- OR'ing search terms can be done by explicitly using "OR" keyword
- AND'ing search terms can optionally be done by explicitly using "AND" keyword
- using '>', '>=', '<', '=<' denotes a non exact match on the term following respective symbol
- using '=' denotes an exact match on the term following respective symbol
- len(#) will allow us to match length of JSON data instead of actual value
- 'true', 'false' will be matched to their boolean values instead of string values

The project is completed using Node.js so you might need to install some packages.
Please use node version 8.x or 10.x

### Getting started:

Unzip the folder.
```
cd text-parser
```
Install yarn:
```
npm install -g yarn
```
Install dependencies:
```
yarn
```
Set environment (vars):
```
cp .env.example .env	(linux)
copy .env.example .env	(windows)
```
Change the port in .env file if you want to.

Start server:
```
yarn start
```
Tests:
```
yarn test
```

Information on some files in the project:

```
config
	|_ config.js - configuration file to load all the environmental variables from .env. 
                  Parameters are also validated here using Object Scheme Validation(joi)
	|_ express.js - The main app setup
	|_ param_validation.js - All the parameters in the APIs are validated here using Object Scheme Validation(joi)
	|_ winston.js - The project uses winston to log the api or errors in a separate log folder. 
                  Currently, everything is logged in a file in json format. A new file is generated per day. 
                  If you want to change to logging to console, change the transport from winston.transports.File or winston.transports.DailyRotateFile to winston.transports.console
server
	|_controllers - folder to keep all the controllers
	|_routes - folder to keep all the routes
		|_index.route.js - The entry position for the routes.
		|_search.route.js - The required API is in the search route
	|_services - folder to keep services files if any
	|_helpers - folder to keep helper files
	|_tests - folder to keep the files for unit testing
.env.example - The secret keys and environment variables are present here like the database passwords or the port to run the server
index.js - The main entry point for the project. The server is started in this file
package.json - Contains the scripts and dependencies for the project
```

#### API information:
All the APIs are mounted on the /api
The following two APIs are there:
1. GET api/health-check
2. GET api/search with query parameter 'q'
	Example: /api/search?q=error OR info
More information on the APIs are present in the docs/index.html

#### Some restrictions to pass the text to the query parameter

1. Just pass the text without the : as given in the requirement file
2. Do not leave space after '(' or before ')' as it will add a space in the $and
3. The string inside the len() should be a numeric string. len(9) is valid, len(hi) is invalid
4. AND or OR should have a single space padding. Hi AND Vivek is valid, Hi     AND   Vivek is invalid.
5. Keywords like %20 and %30 are restricted for searching as they are used for parsing
6. Keywords like AND/OR are treated as special operators. and/or can be used in search

#### Test

1. If you want to try out some texts, you can either do it in the browser using the '/api/search?q=error OR info' api and passing the string as query.
2. You can do the same thing using a client like POSTMAN
3. You can also create some test cases in the test/misc.test.js file (after //add more test cases here) by adding the following lines
```
describe('<test name>', () => {
    it('<what the test does>', (done) => {
      request(app)
        .get('/api/search')
        .query({q: 'write your test string here'})
        .expect(httpStatus.OK)
        .then((res) => {
			//expected output
          let out = {"$and":["write","your","test","string","here"]}
          expect(res.body).to.eql(out);
          done();
        })
        .catch(done);
    });
  });
```
Run the command `yarn test` to run the test cases.
