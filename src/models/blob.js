import mongoose from 'mongoose';

const blobSchema = new mongoose.Schema({
  blob: {
    type: Object,
    required: true
  }
});

export default mongoose.model('Blob', blobSchema);
