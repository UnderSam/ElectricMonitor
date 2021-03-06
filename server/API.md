# API documemt

base_url : '/api/v1'
general_response :
```javascript
{
    "status",
    "data":{
        "message",
        "data",
        "error_code",
        ...
    }
}
```
## point
### get realtime point
```javascript
{
    method : "GET",
    url : '/point',
    header : {
        "authorization" : "your jwt token"
    },
    data : [
        "status": "OK",
        "data": {
            "tagname": "All",
            "data": []
        }
}
```
### get specify tagname point
```javascript
{
    method : "GET",
    url : '/point/:tagname(1~9)',
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
            "tagname": "All",
            "data":[]
    }
}
```
## token
### get token list
```javascript
{
    method : "GET",
    url : "/token",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
            "valid_token": [
                {
                    "token": "ACCOUNT_TOKEN",
                    "auth": "AUTH",
                    "us_use": "USE_STATE"
                },
                ...
            ]
        }
    }   
}
```
### post a token
```javascript
{
    method : "POST",
    url : "/token",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "id" : 'AUTH_ID'
    },
    data : {
        "status": "OK",
        "data": {
            "valid_token": "VALID ACCOUNT_TOKEN",
            "auth": "AUTH"
        }
    }   
}
```
### extends a jwt token
```javascript
{
    method : "POST",
    url : "/token/extends",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
             "message": "STATUS",
             "permission": "AUTH",
             "token":"NEW_TOKEN"
        }
    }   
}
```
## user
### get clients
```javascript
{
    method : "GET",
    url : "/user",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "token" : "VALID_TOKEN",
    },
    data : ［
        {
            
            "account": "ACCOUNT",
            "auth": "auth",
            "token": "ACCOUNT_TOKEN",
            "status": "SUSPEND_OR_OK"
        },
        ...
    ］   
}
```
### get specify clients
```javascript
{
    method : "GET",
    url : "/user/:id",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        "token" : "VALID_TOKEN",
    },
    data : {
        {
            
            "account": "ACCOUNT",
            "auth": "auth",
            "token": "ACCOUNT_TOKEN",
            "status": "SUSPEND_OR_OK"
        },
    }   
}
```
### patch user
```javascript
{
    method : "PATCH",
    url : "/user/:id",
    header : {
        "authorization" : "your jwt token"
    },
    payload : {
        
            "KEY" : "CHANEGED_VALUE",
            ...
        
    },
    data : {
        {
            "status": "OK",
            "data": {
                "message": "PATCH OK"
            }
        }
    }   
}
```
## login auth
### register
```javascript
{
    method : "POST",
    url : "/auth/register",
    payload : {
        "token" : "VALID_TOKEN",
        "account" : "ACCOUNT",
        "password" : "PASSWORD(example:larrycp3vul3)"
    },
    data : {
        "status": "OK",
        "data": {
            "status": "STATUS",
            "data": {
                "message": "MESSAGE"
            }
        }
    }   
}
```
### login
```javascript
{
    method : "POST",
    url : "/auth/login",
    payload : {
        "account" : "ACCOUNT",
        "password" : "PASSWORD(example:larrycp3vul3)"
    },
    data : {
        "status": "OK",
        "data": {
            "message": "STATUS",
            "permission": "AUTH",
            "token": "VALID_JWT_TOKEN",
            "status": "SUSPEND_OR_OK"
        }
    }   
}
```
### logout
```javascript
{
    method : "POST",
    url : "/logout",
    header : {
        "authorization" : "your jwt token"
    },
    data : {
        "status": "OK",
        "data": {
            "message": "STATUS",
        }
    }   
}
```

### error code
```
error code : 0 -> invalid token format
error code : 1 -> user single login limit
error code : 2 -> no permission
error code : 3 -> invalid token
error code : 4 -> account has been suspend
error code : 5 -> sql connection lost or failure
error code : 51 -> sql query error
error code : 6 -> redis connection lost or redis error
error code : 7 -> login denied (account wrong or password wrong)
error code : 8 -> register denied (duplicate or something)
```
the format will be { payload -> data -> error_code}
