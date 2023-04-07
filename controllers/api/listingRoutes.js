const router = require('express').Router();
const { Listing } = require('../../models');
const withAuth = require('../../utils/auth');

/* adding multer stuff */
// these shouldn't cause any problems as is, they're just there for when we need 'em!
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, path.resolve(__dirname, '..', '..', 'public', 'uploads'));    
  }, 
  filename: function (req, file, cb) { 
     cb(null, `Uploads_${file.originalname}`);   
  }
});

const upload = multer({ 
  /* dest: path.resolve(__dirname, '..', '..', 'public', 'uploads'), */
  storage,
  /* maximum 5MB file size for uploading */
  limits : {fileSize : 5000000},
});

router.post('/', async (req, res) => {
  try {
    const newListing = await Listing.create({
      ...req.body,
      /* setting cover_art to equal the string of the uploaded file location */
      /* cover_art: `/uploads/${req.file.filename}`, */
      user_id: req.session.user_id,
    });

    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/uploads', upload.single('uploaded_file'), async (req, res) => {
  try {
    const newListing = await Listing.create({
      ...req.body,
      /* setting cover_art to equal the string of the uploaded file location */
      cover_art: `/uploads/${req.file.filename}`,
      user_id: req.session.user_id,
    });

    res.status(200).json(newListing);
  } catch (err) {
    res.status(400).json(err);
  }
});

// need a .update functionality so that users can change the price, shipping information, etc. for their listings

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const listingData = await Listing.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!listingData) {
      res.status(404).json({ message: 'No listing found with this ID!' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
