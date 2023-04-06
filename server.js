const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const expressVisitorCounter = require('express-visitor-counter');
/* adding multer stuff */
// these shouldn't cause any problems as is, they're just there for when we need 'em!
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const counters = {};

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 500000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUnitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.enable('trust proxy');
app.use(session(sess));
app.use(
  expressVisitorCounter({
    hook: (counterId) => (counters[counterId] = (counters[counterId] || 0) + 1),
  })
);

// this is for the visitor counter, not currently in use
app.use((req, res, next) => {
  req.session.save(() => {
    req.session.counters = counters;
    next();
  });
});

// this is for the multer functionality, needs work!
// also probably needs to go into the homeRoutes / apiRoutes
/* app.post('/api/listings', upload.single('uploaded_file'), function (req, res) {
  console.log(req.file, req.body);
}); */
// THIS WAS BRICKING THE NEW LISTING FUNCTION!!!!
// I THINK THE upload.single('uploaded_file') logic needs to be contained within the SAME POST ROUTE 
// as the rest of the new listing information, so that it's all included in the same post!

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log('Server listening on: http://localhost:' + PORT)
  );
});