# Simple CRUD App with EJS and Express Backend

A student management CRUD application built with Node.js, Express, EJS templating, and MongoDB.

## Current Focus

Building core CRUD functionality with a grayscale color palette. Visual refinements will be added in future iterations.

## End-points

**base URI : http://localhost:8080/**

| Name | Endpoint | Method |
| --- | --- | --- |
| 🏠 Home page | **/** | GET |
| 👨🏻‍🎓 Add Student Page | **/add** | GET |
| 👨🏻‍🎓 Add Student | **/add-student** | POST |
| 📔 Students List | **/students** | GET |
| ✏️ Edit Student Page | **/edit/:id** | GET |
| 🔄 Update Student | **/update/:id** | POST |
| 🗑️ Delete Student | **/delete/:id** | DELETE |
| 👨🏻‍⚕️ Health Check | **/health** | GET |
| ☠️ Error Test | **/raise-error** | GET |


## Style guidelines
text color 
shades of grays

| Area | Guideline |
| --- | --- |
| Text colors | **shades of grays** (ex. gray-300 on dark bg and gray-600 on light bg) |


## API Request Guides

```
POST /add-student

{
    name,
    email,
    phone,
    profilePicture (optional, file upload)
}
```

```
POST /update/:id

{
    name,
    email,
    phone,
    profilePicture (optional, file upload)
}
```


## Setup Guide


* Create uploads folder in ```src/```
* setup .env (mv env.example .env)
* in global space run ```npm i``` (where index.js file is)


