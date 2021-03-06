const Auction = require("../models/auction");
const socket = require("socket.io");

const BiddingController = (server) => {
  const io = socket(server, {
    cors: {
      allowed: "*",
    },
  });

  io.on("connection", function (socket) {
    socket.on("join auction room", (data) => {
      socket.join(data.room);
      console.log("join auction room==============================");
    });
    socket.on("leave auction room", (data) => {
      socket.leave(data.room);
      console.log("leave auction room==============================");
    });
    socket.on("new bid", (data) => {
      bid(data.bidInfo, data.room);
      console.log(
        "new bid===================================================="
      );
    });
  });

  const bid = async (bid, auction) => {
    try {
      let result = await Auction.findOneAndUpdate(
        {
          _id: auction,
          $or: [{ "bids.0.bid": { $lt: bid.bid } }, { bids: { $eq: [] } }],
        },
        { $push: { bids: { $each: [bid], $position: 0 } } },
        { new: true }
      )
        .populate("bids.bidder", "_id name")
        .populate("seller", "_id name")
        .exec();
      io.to(auction).emit("new bid", result);
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports = BiddingController;
