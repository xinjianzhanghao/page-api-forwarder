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
|`PROTOCOL`|`HTTP` or `HTTPS`|The protocol of the api,This will overide the one you include at the `APIHOST`. However, if you have a valid value for protocol in the `APIHOST` part, then you don't need to set this varible.|`HTTP`|
|`REQUIREHEADERNAME`|a header name, this is case sensitive|If you set this then you must include this header in you request or it will response with `403 invalid request`|password|
|`REQUIREHEADERVALUE`|The password for the header|This is the value for the header you set with `REQUIREHEADERNAME`, if you don't set it then this value is ignored|password|
|`REQUIREPARAMNAME`|a param name|If you set this then you must include a param with a proper value wo use or it will response `403 invalid request`|password|
|`REQUIREPARAMVALUE`|The value for the param|This is the value for the param you set with `REQUIREPARAMNAME`, ignored if the value is not set.|password|
Both header and param set to be required will be remove when sending the request.
If you set to require to then you must include both of them or it won't work.

***Please note that Cloudflare Pages only support HTTPS request into pages.***

## Contributing
You can open issues or submit your changes.

## Support me
__GIVE ME A STAR 😆__  
If you think my work helps you, consider support me
- ETH/USDT(ERC20): `0x414E4de402C12de27bB3412e43E3F9B0fBdEBB17`
