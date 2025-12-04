import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now() },
    amount: { type: Number, required: true },
    purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
)

const Ticket = mongoose.model('Tickets', ticketSchema);

export default Ticket;