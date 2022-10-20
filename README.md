# runing the project
clone the repo with:
````
git clone https://github.com/erezLieberman/wordcount.git
````

then 
````
cd wordcount
````

then run 
````
yarn
````
to install all dependencies.
<br/><br/>


after finishing install all dependencies, run: 
````
yarn run dev
````
to run the project in dev mode, if everything is ok - you should see:
````
⚡️[server]: Server is running! at https://localhost:8000
````
if you want to change the port of the server you can add:
````
PORT={the port number that you want} 
````
to .env file.
___
# word-counter endpoint 
the body of this API is wating for 2 keys: type and value.
<br/>
value have to be string and can be regular string, url or path to file.
<br/>
type have to be 1 of this 3 options: 
* `url`
* `file`
* `string`
<br/>

## word-counter examples  
when type is file: 
````
curl --location --request POST 'http://localhost:8000/word-counter' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "file",
    "value": "test.txt"
}'
````

when type is url: <br/> 
````
curl --location --request POST 'http://localhost:8000/word-counter' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "url",
    "value": "https://randommer.io/api/Text/LoremIpsum?loremType=normal&type=paragraphs&number=500000"
}'
````

(you can use any url of course but if you want to use this specific curl with this mock server you just need to login to this site:
https://randommer.io/randommer-api
and create a x-api-key (totally free).
<br/>
after you have x-api-key you just need to add it to .env file
````
XApiKey={your x-api-key}
````
)

when type is string:
````
curl --location --request POST 'http://localhost:8000/word-counter' \
--header 'Content-Type: application/json' \
--data-raw '{
   "type": "string",
   "value": "Hi! My name is (what?), my name is (who?), my name is Slim Shady"
}'
````

# word-statistics endpoint 
the word statistics endpoint has 1 param called word.
## word-counter example
````
curl --location --request GET 'http://localhost:8000/word-statistics?word=my' \
--data-raw ''
````