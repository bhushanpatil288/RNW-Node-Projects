# Simple CRUD app made with ejs and express backend

## current focus
creating project pages with grayscale color pallet
will update it to colors in future for now focusing on usage not visuals

## End-points

**base URI : http://localhost:8080/**

| Name | Endpoint |
| --- | --- |
| 🏠 Home page | GET **/** |
| 👨🏻‍🎓 Add Student | POST **/add-student** |
| 👨🏻‍⚕️ Health Check | GET **/health** | 
| ☠️ Error Test | GET **/raise-error** |


## Style guidelines
text color 
shades of grays

| Area | Guideline |
| --- | --- |
| Text colors | **shades of grays** (ex. gray-300 on dark bg and gray-600 on light bg) |


## Post Routes Guides

```
POST /add-student

{
    name,
    email,
    phone,
    profilePicture (optional)
}
```