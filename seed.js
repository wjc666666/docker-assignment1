const mongoose = require('mongoose');
const seedingData = require('./seeding.json');


mongoose.connect('mongodb://admin:password@mongo:27017/tmdb_movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'admin',
  pass: 'password',
  authSource: 'admin'
});

const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model('Movie', movieSchema);

async function seedDatabase() {
  try {
  
    await Movie.deleteMany({});

    const result = await Movie.insertMany(seedingData);
    console.log('Data seeded:', result);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {

    mongoose.connection.close();
  }
}

seedDatabase();