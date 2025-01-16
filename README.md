# Page-api-forwarder
A Cloudflare pages for forwarding api request.

## 1. Description 
This is a js script for Cloudflare pages. This script will forward the request you send to it to the api host.  
It can help you bypass ip restrictions on some api, and it is fast due to it goes through Cloudflare.  

## 2. Usage
1. Make sure you have a [Cloudflare]("cloudflare.com") account. Than go [here]("pages.cloudflare.com") and click login.  
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
  
7. Go to Deployments and reupload the zip file to make sure the enviroment varible work.

And now, you can request to `your-project-name.pages.dev` and it should return the response from the api host.



