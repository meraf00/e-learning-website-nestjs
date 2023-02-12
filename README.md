# E-learning Web Site

## Group members (Section 2)

| Name             | ID          | Github Account                              |
| ---------------- | ----------- | ------------------------------------------- |
| Bethelhem Yemane | UGR/1894/13 | [betabravah](https://github.com/Betabravah) |
| Habiba Nesro     | UGR/0088/13 | [bintnesro](https://github.com/habibanesro) |
| Leul Wujira      | UGR/8834/13 | [meraf00](https://github.com/meraf00)       |
| Rihana Ersanu    | UGR/8031/13 | [RihanaE](https://github.com/RihanaE)       |
| Thomas Wondwosen | UGR/1972/13 | [47thommy](https://github.com/47thommy)     |

## Selected project

- [Source code](https://github.com/meraf00/UGR-8834-13)
- [Hosted github page](https://meraf00.github.io/UGR-8834-13/)

## Project structure

```
├── api (Nestjs backend)
│   ├── src
│   │   ├── auth
│   │   ├── course
│   │   ├── enrollment
│   │   ├── user
│
│
├── frontend (fetch api and ui controllers)
│   ├── js
│   │   ├── auth
│   │   ├── enrollment
│   │   ├── rating
│   │
│   ├── *.html
```

### Selected CRUD Features

1. `Enrollment` - Users can enroll for course, view list of courses for which they are currently enrolled in, push deadline of enrollment and quit enrollment.

2. `Rating` - Users can rate course, view rating, update their rating and remove their rating.

- When user starts course it will be available in the user dashboard page.


## Choice of database

We chose to use relational database because the data we tend to store is predictable and the projects database has fixed schema. Relational databases are also preferable for structured data, which is the case for our project. 

Therefore we have User, Course, Rating and Enrollment table. Rating holds rating of users for courses. Enrollment holds the many to many relationship between user and course.