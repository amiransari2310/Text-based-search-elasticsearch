# Text-Based-Search-Elasticsearch

Typesctipt based mini proect to perform full text based in Elasticsearch. 

Contains:

  - Script to load data in an Index
  - Scriptto search data in an Index

Note:Make Sure Elasticsearch on your local machine is up and running. You can change the host and port in config file.
### Requirements
* [node & npm](https://nodejs.org/en/)
* [elasticsearch](https://www.elastic.co/downloads/elasticsearch)

### Installation
Download/Clone the project repository
Install the dependencies.

```sh
$ cd Text-based-search-elasticsearch
$ npm install
```
and once all dependencies are installed, run
```sh
$ npm run load                      // to load dummy data
$ npm start {input_keyword}         // Input and search
```
## Examples
1 . Searching with keyword 'ice cream' as product name
```sh
$ npm start ice cream
-------------------------------------------------------------
Result:
 [
  {
    "id": 1,
    "name": "ice cream",
    "description": "This an ice cream product with a space in name",
    "price": 25
  },
  {
    "id": 2,
    "name": "icecream",
    "description": "This an icecream product with no space in name",
    "price": 25
  }
]
```

2 . Searching with keyword 'AlMarai' as product name
```sh
$ npm start AlMarai
-------------------------------------------------------------
Result:
 [
  {
    "id": 4,
    "name": "Almarai",
    "description": "This an Almarai product with no space in name",
    "price": 25
  },
  {
    "id": 3,
    "name": "Al Marai",
    "description": "This an Al Marai product with a space in name",
    "price": 25
  }
]
```


## Versioning
Version 1.0.0

## Authors
* *Mohammed Amir Ansari** - *Initial work* - [Mohammed Amir Ansari](https://github.com/amiransari2310)