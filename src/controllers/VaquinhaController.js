const donation = require('../models/Donations');

module.exports = {
  async index(request, response) {
    let total = 0;

    try {
      const donations = await donation.aggregate([{ 
          $group: { 
              _id: null, 
              total: { 
                  $sum: "$value" 
              } 
          } 
      }]);

      if (donations.length > 0) {
        total = donations[0].total;
      }
      
      return response.status(200).json({ total });
    } catch (error) {
      return response.status(500).json(error);
    }

  },
  async store(request, response) {
    const { body, io } = request;

    try {
      const donationStored = await donation.create(body);

      const donations = await donation.aggregate([{ 
          $group: { 
              _id: null, 
              total: { 
                  $sum: "$value" 
              } 
          } 
      }]);

      const { total } = donations[0];

      io.emit('Backend:DonationTotal', { total })

      return response.status(200).json(donationStored);
    } catch (error) {
      console.log('error', error);
      return response.status(500).json(error);
    }
  }
}