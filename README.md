https://www.filmplace.co/en/rooms/11410

# MERN

## Setup

1. Create `vite` project -> `npm create vite`
   1. Answer the questions -> `mern` folder
2. `cd mern` && `npm install`

## Git setup

1. `git init`
2. Add on the `.gitignore` from <https://www.toptal.com/developers/gitignore/api/windows,osx,node,visualstudiocode>
3. `git add .` && `git commit -m ...`

Goto `github.com` and create a new EMPTY repo

```bash
 git remote add origin git@git.generalassemb.ly:simonlau/mern-50.git
  git branch -M main
  git push -u origin main
```

optional
download husky -force everyone to make pretty their codes
usually use lint-staged

## express morgan

npm install express morgan serve-favicon

you can install debug by adding debug. or install debug
npm install express morgan serve-favicon debug

## server.js

add into server
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(**dirname, "build", "favicon.ico")));
app.use(express.static(path.join(**dirname, "build")));

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
console.log(`Express app running on port ${port}`);
});

when they start complaining in server. add this in eslintrc
env: { browser: true, es2020: true, node: true },

Inside `package.json`
Remove `type: "module"`

## Adaptation for vite dist instead of CRA build

Inside `server.js`

```js
app.use(favicon(path.join(__dirname, "dist", "vite.svg")));
app.use(express.static(path.join(__dirname, "dist")));
```

run this in terminal, do not npm run dev
node server.js

add in server.js below app.use
// Put API routes here, before the "catch all" route

// The following "catch all" route (note the _) is necessary
// to return the index.html on all non-AJAX requests
app.get("/_", function (req, res) {
res.sendFile(path.join(\_\_dirname, "build", "index.html"));
});

npm install -D nodemon

put in script
"dev:react": "vite",
"dev:express": "node --watch server.js",
"dev:express-win": "nodemon server.js",

## run 3 browser

try to rename browser so got difference

node server.js
npm run dev:react
npm run dev:express

npm run dev:react
will run in local host 5173

server and express run in 3001

## Clean up

`main.js` -> remove CSS

app.jsx put this
function App() {
return (
<>

<main className="App">App</main>
</>
);
}

export default App;

Unused files

```bash
rm src/*.css
rm -r src/assets
```

## React convention

Folder -> name is same as the actual Component

split into `pages` and stand-alone `components` folders

remove assets and react.svg

## express

rmb to go to correct folder
mkdir config routes models controllers

## env

npm install dotenv

put in server.js
require("dotenv").config();

touch .env

dotenv-safe -> `.env.example`
changing `.env` -> does not restart express

## install mongoose

npm install mongoose

DATABASE_URL=mongodb+srv://meryl:meryl1234@student-cluster.kn4jraw.mongodb.net/mern-infra?retryWrites=true&w=majority&appName=student-cluster

put in server
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

put this in database.js
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

## debug in express

In server.js -> `const debug = require("debug")("mern:server");`
In `config/database.js` -> `const debug = require("debug")("mern:config:database");` also in replace console.log

const mongoose = require("mongoose");
const debug = require("debug")("mern:config:database");
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

IN PACKAGE json
`"dev:express": "DEBUG=mern:* node --watch server.js",`
"dev:react": "vite",
"dev:express": "DEBUG=mern:\* node --watch server.js",
"dev:express-win": "nodemon server.js",

## debug in react

in `App.js` as well as every other file you want to log

```js
import debug from "debug";

const log = debug("mern-50:pages:App:App");
```

in `main.jsx` -> write once -> `localStorage.debug = "mern-50:*";`

## Structure

React -> src -> pages / components etc
Express -> server.js, models, controllers etc

Project
--> React
--> Express

server runs express. if you havent build anything, it wont change
dist holds all the information. if you pluck out all the code, it will run the whole react

## Proxy setup

In `vite.config.js`, change to

```js
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});

go to server change build to dist
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

## Deploy -> Vercel

## Router

this is how it should look like. it shouldnt route the same way cos browser get confused.
React -> React Router -> /movies
Express -> ALL should be /api/movies

app.use(express.static(path.join(\_\_dirname, "dist")));
this code in server routes everything, without this it weill crash

can check by going components, you will see App

shouldn't put too many things in your app

## Nested route -Open outlet this is optional

https://reactrouter.com/en/6.23.0/components/outlet

make two on same page

app
<Routes>
<Route path="/orders" element={<OrderHistoryPage />} />
<Route path="/orders/new" element={<NewOrderPage />} />

          <Route path="/orders2" element={<OrderHistoryPage />}>
            <Route path="new" element={<NewOrderPage />} />
          </Route>
        </Routes>

order history page
import { Outlet } from "react-router-dom";

export default function OrderHistoryPage() {
return (
<>

<p>OrderHistoryPage</p>
<Outlet />
</>
);
}

## login

import { Component } from "react";

export default class SignUpForm extends Component {
state = {
name: "",
email: "",
password: "",
confirm: "",
error: "",
};
render() {
return <p>SignUpForm - {this.state.name}</p>;
}
}

this. grabs the class component and put in info accordingly
this. changes depending on using arrow or no arrow function
if you put in event handler
wk 2 02

allows change while you type in your name
and also update its state
before this pls rmb to add this. to your return input section one by one

handleChange(event) {
pluck out name and value and change its state
const { name, value } = event;
//set.state updates the new state accordingly
this.setState({ [name]: value });
}

## controlled form

render() {
return (
<>

<fieldset>
<legend>SignUp</legend>

          <label>
            Name:{" "}
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />

          <label>
            Email:{" "}
            <input
              name="email"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
              <button>Sign Up</button>
        </fieldset>

you can check if state is correct by looking at component . state will be what you typed in form

handle submit
event.default to prevent user to submit form
handleSubmit = (event) => {
event.preventDefault();
alert(JSON.stringify(this.state));
};

fire off fetch to your form when submit

## Troubleshooting: how you know your shit works.

run your browser, console should show

how you know bruno works
if your bruno works means your express is working
see in network, payload. should also show in preview and response

bcos its react, browser components should show when you click sign up form

learn to log to show which part is the mistake
export async function signUp(userData) {
log("userData: %o", userData);
const res = await fetch(BASE_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(userData),
});

if (res.ok) {
return res.json();
} else {
log("error: Invalid Sign Up");
throw new Error("Invalid Sign Up");
}
}

url in bruno now the same as const BASE_URL
if not browser thinks its wrong place
USERS-API
const BASE_URL = "/api/users";

BRUNO
http://localhost:3001/api/users

WHY? bcos vite config is set up

why need proxy in vite config
becos localhost:3001 does not deploy when you run this. just dont deploy.

what is render
network request need money . when you run, you need use render (700hours)

make sure local host url in bruno and vite config is the same.
eg my fav careless part spelling http://

-always check your fking imports even if they dont show error

-400 usually means mongoose throw an error
500 means server is not talking to you

### React VERY IMPORTANT

- `/` -> AuthPage -> SignUpForm
- User fill in the SignUpForm -> onSubmit
- preventDefault() -> users-service -> users-api -> FETCH

Fetch (Network) -> `/api/users`, POST + JSON Body (Bruno also)

### Express

`server.js` -> `/api/users` -> usersRouter
usersRouter -> `/` (`/api/users`) + POST -> usersController.create
create -> req.body
create user -> const user = await User.create()
user -> makeJWT -> JWT
-> res.json(jwt)

### Back to React

users-api -> JSON -> users-service
users-service -> SignUpForm (onSubmit) -> console.log -> Not right

## JWT

### Security Terms

encrypt <-> decrypt : Casear Cypher
plain text + key -> algo -> encrypted text

encode -> change format (no key) -> decode
<https://www.google.com.sg/search?q=singapore's+best+boot+camp>

Authentication -> check if the person is who he says he is
Authorization -> check if the person can do he wants

why we need to do transform thing
when you create new person, for security reasons, password will show up on both bruno response and mongoDB data
can solve by asking bruno not to send back the password / hasting(one-way, fast compared to encryption)

hashing ->

tells mongoose to throw away password
toJSON: {
transform: function(doc, ret) {
delete ret.password;
return ret;
}
}

hastings

...

userSchema.pre('save', async function(next) {
// 'this' is the user doc
if (!this.isModified('password')) return next();
// update the password with the computed hash
this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
return next();
});

module.exports = mongoose.model('User', userSchema);
npm install bcrypt

## do models > bruno > controller
