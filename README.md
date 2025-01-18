# Page-api-forwarder
A Cloudflare pages script for forwarding api request.
This project is design to forward API request only.

## 1. Description 
This is a js script for Cloudflare pages. This script will forward the request you send to it to the api host.  
It can help you bypass ip restrictions on some api, and it is fast due to it goes through Cloudflare.  

## 2. Usage
1. Make sure you have a [Cloudflare](https://cloudflare.com) account. Than go [here](https://pages.cloudflare.com) and click login.  
2. Click `new` button and select `Pages`.   
3. Click the `upload assets` button and fill in `project name`. The project name is up to you.  
4. Click `create project` and drag the zip file into it.  
5. Go to the `setting` part of this project and Click the `Add` button next to the `Varible and Secrets` part.
   - add this value
     |key|values|
     |-----------|----------|
     |type|text|
     |Varible name|`APIHOST`|
     |Value|Your Api host name with path should go here.|  

     For more enviromental varible usage, please read [here](#enviromental-varible-explanation)
  
7. Go to Deployments and reupload the zip file to make sure the enviroment varible work.

And now, you can request to `your-project-name.pages.dev` and it should return the response from the api host.

## Enviromental varible explanation
|Name|Avalible values|explanation|example|
|----|----------------|------------|-------|
|`APIHOST`|A url|The api url|`example.com/api`|
|`PROTOCOL`|The protocol of the api,This will overide the one you include at the `APIHOST`. However, if you have a valid value for protocol in the `APIHOST` part, then you don't need to set this varible.|`HTTP` or `HTTPS`|


## Usage Example 
I'll give an example on forwarding [Google AI](https://aistudio.google.com) request. Google AI provides a free API. You can use this project's script to use this API even if you're in country that Gemini API isn't avalible. 
1. Make sure you have an [API key](https://aistudio.google.com/apikey).
2. You will need to upload your assets to cloudflare following the steps that I metioned before.
3. Now you can set enviromental varible in the setting part.
   |Key|Value|
   |---|-----|
   |`APIHOST`|`https://generativelanguage.googleapis.com/`|
   |`PROTOCOL`|This is optional due to you've set the protocol in the API host part. But however, the value here can be `HTTPS`|
4. Try to run this in the command
  ```bash
   curl "https://yourpageurl.pages.dev/v1beta/models/gemini-1.5-flash:generateContent?key=GEMINI_API_KEY" \
-H 'Content-Type: application/json' \
-X POST \
-d '{
  "contents": [{
    "parts":[{"text": "Input your message here"}]
    }]
   }'
```
  - replace `yourpageurl.pages.dev` with your page url
  - replace `GEMINI_API_KEY` with your [API key](https://aistudio.google.com/apikey)
  - replace `Input your message here` to your message
5. Press enter then the request should go through you page function and then reach google. 

## Contributing
You can open issues or submit your changes.

## Support me
If you think my work helps you, consider support me
- ETH/USDT(ERC20): `0x414E4de402C12de27bB3412e43E3F9B0fBdEBB17`
