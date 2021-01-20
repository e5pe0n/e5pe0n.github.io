---
title: "体系的に学ぶ 安全な Web アプリケーションの作り方"
categories:
  - Note
tags:
  - Note, Security, Web App
last_modified_at: 2021-01-14
---

# What is Vulnerability?

- Vulnerability is bugs to be able to be abused

<br>


# GET request and POST request

- Use GET method for only reference (to get resource)
- GET method should not have side effect
- Use POST method to send credentials

<br>

# hidden parameter

- hidden parameter can be rewritten by user
- but robust against information leak and rewrite by third party
  - Use session variable to store infomation about authentication (認証) and authorization (認可)
  - Otherwise, Use hidden parameter

<br>

# Cookie

- To store session ID
- Users can rewrite cookie values

Cases of leak of session ID
- Cookie attributes are not set properly
- Eavesdroped
- Vulnerability of application such as XSS or so
- Vulnerability of platform such as PHP, browser, or so
- Leak from Referer header when using URL to store session ID


| attributes |                                         description                                          |
| :--------: | :------------------------------------------------------------------------------------------: |
|   Domain   | Domain of a server whom a browser send a cookie value to. <br> **Don't set this as defalut** |
|    Path    |                   Directory of a URL whom a browser send a cookie value to                   |
|  Expires   |               Expiration of a cookie. Until browser is closed if not specified               |
|   Secure   |                              Only send cookie in case of HTTPS                               |
|  HttpOnly  | JavaScript code cannot access a cookie having HttpOnly attribute. <br> **Set on as default** |

## Don't set these values to cookie

- user ID
- authentication information

<br>

# Attacks

- active attack
  - attack app directly
  - e.g. SQL injection
- passive attack
  - attack app through user by trap

<br>

# Same Origin Policy (同一オリジンポリシー)

- One of feature of sandbox of browser
- Restriction to forbid scripts such JavaScript access accross sites
  - -> see alos CORS
- Same oringin is
  - the same host of URL (FQDN; Fully Qualified Domain Name)
  - the same scheme (protocol)
  - the same port

<br>

# CORS (Cross-Origin Resource Sharing)

## Simple Request

Allowed CORS as default.

- method is
  - GET
  - HEAD
  - POST
- request header is
  - Accept
  - Accept-Language
  - Content-Language
  - Content-Type
    - application/x-www-form-urlencoded
    - multipart/form-data
    - text/plain

## Access-Control-Allow-Origin

- To allow access from other origins

e.g. To allow access to `http://example.jp` from other origins, set HTTP response header like below in server (`http://exapmle.jp`)

```
Access-Control-Allow-Origin: http://example.jp
```

<br>

# XSS (Cross-Site Scripting)

## Countermeasures
- Surround attributes by double quotes (`"`)
- Escape special characters in HTML
  - elements: `<`, `&`
  - attributes: `<`, `"`, `&`
  - Specify correct encoding

<br>

# SQL Injection

## Countermeasures

- Issue queries with static placeholder
  - `SELECT * FROM books WHERE author = ? ORDER BY id`
- Restrict error log

<br>

# CSRF (Cross-Site Request Forgery)

- Forces an end user to execute **unwanted** actions on a web app in which they're currently **authenticated**.
  - forgery (to falsify)
- caused by improper settings for authentication
  - e.g. manage login by only session ID

## Countermeasures

- Embed token
- Request to enter password again just before a important proccess such as payment

## XSS vs CSRF

- XSS
  - on a browser (client side)
- CSRF
  - against a server

<br>

# Session Hijacking

- Abuse session ID and spoof a user
  - spoof (なりすます)

- How to gain session ID
  - infer
  - steal
  - force (強制)

## Countermeasures

- Use session management mechanism in web app dev tools, don't make it by yourself
- Store session ID by Cookie
- Change session ID when authentication is succeeded
- **Don't set credentials to session variable before authentication**

<br>

# Directory Traversal

- Vulnerability that allows an attacker to read, tamper and delete files on server

## Countermeasures

- Avoid a form to specify file name from outside
- File name should not include directory name
- Restrict characters usable for file name
  - only alphabets and numbers

# Brute-Force Attack

[Password Cracking with 8x NVIDIA GTX 1080 Ti GPUs](https://www.servethehome.com/password-cracking-with-8x-nvidia-gtx-1080-ti-gpus/)  

8-digit password including alphabets, numbers and symbols is decrypted
- MD5: 14 min
- SHA-1: 39 min
