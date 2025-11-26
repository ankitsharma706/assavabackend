const mongoose = require("mongoose");
const slugify = require("slugify");
const coffeeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [40, " A Coffee name must have less or equal than 40 character"],
    minlength: [7, " A Coffee name must have more or equal than 7 character"],
  },
  images: { type: String },
  slug: String,
  coverImages: [String],
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  weightInGrams: { type: Number },
  shortDetails: [String],
  premium: { type: Boolean, default: false },
  shelfLifeMonths: { type: Number },

  coffeeType: [String],
  roastLevel: [String],
  grinding: [String],
  coffeeTimeDrink: [String],
  coffeeMakingTime: [String],

  preservation: { type: Boolean, default: false },
  estate: { type: Boolean, default: false },

  flavours: [String],
  cupsPerPacket: [Number],
  processing: { type: String },
  createdAt: { type: Date, default: Date.now(), select: false },
  description: { type: String, trim: true },
  briefDescription: [
    {
      types: [
        {
          image: String,
          title: String,
          description: { type: String, trim: true },
        },
      ],
    },
  ],

  reviews: [
    {
      name: { type: String, trim: true },
      image: String,
      rating: { type: Number, min: 1, max: 5 },
      comment: { type: String, trim: true },
    },
  ],
});

coffeeSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
coffeeSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
