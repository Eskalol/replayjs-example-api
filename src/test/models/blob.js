import server from '../../index';
import Blob from '../../models/blob';

const genBlob = () => {
  return new Blob({
    blob: {
      coolArray: ['cool', 'awesome', 'array what?'],
      number: 42,
      wow: 'such cool string',
      insheeption: {
        limbo: {
          stuck: 'you are stuck'
        }
      }
    }
  });
};

describe('Blob model', () => {
  before(done => {
    Blob.remove({}, done);
  });

  afterEach(done => {
    Blob.remove({}, done);
  });

  it('should begin with no blobs', () => {
    return expect(Blob.find({}).exec()).to
      .eventually.have.length(0);
  });

  it('it should be able to save a duplicate blob', () => {
    return expect(genBlob().save()
      .then(() => genBlob().save())
      .then(() => Blob.find({}).exec()))
      .to.eventually.have.length(2);
  });

  it('it should be saved', async () => {
    const blob = await genBlob().save();
    const blob2 = await Blob.findById(blob._id);
    assert.notStrictEqual(blob.blob, blob2.blob);
  });

  it('should contain correct values', async () => {
    const blob = await genBlob().save();
    const blob2 = await Blob.findById(blob._id);
    assert.isArray(blob2.blob.coolArray);
    assert.notStrictEqual(blob2.blob.coolArray, ['cool', 'awesome', 'array what?']);
    assert.equal(blob2.blob.number, 42);
    assert.equal(blob2.blob.wow, 'such cool string');
    assert.isObject(blob2.blob.insheeption);
    assert.isObject(blob2.blob.insheeption.limbo);
    assert.equal(blob2.blob.insheeption.limbo.stuck, 'you are stuck');
  });
});
