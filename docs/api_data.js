define({ "api": [
  {
    "type": "GET",
    "url": "/api/health-check",
    "title": "Server Monitoring",
    "name": "Health_Check_API_for_monitoring",
    "group": "Index",
    "version": "1.0.0",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Boolean to inform if the API was success or errored</p>"
          },
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>OK if the server is running and is connected to the databases</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    success : true,\n    message : 'OK'\n}",
          "type": "type"
        }
      ]
    },
    "filename": "server/routes/index.route.js",
    "groupTitle": "Index"
  },
  {
    "type": "GET",
    "url": "/api/search?q=",
    "title": "To get the JSON from text queries",
    "name": "Translate_text_queries_to_JSON",
    "group": "search",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "q",
            "description": "<p>The text query to be parsed</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    q : error OR info\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "object",
            "optional": false,
            "field": "The",
            "description": "<p>formatted JSON</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ \"$or\": [\"error\", \"info\"] }",
          "type": "object"
        }
      ]
    },
    "filename": "server/routes/search.route.js",
    "groupTitle": "search"
  }
] });
