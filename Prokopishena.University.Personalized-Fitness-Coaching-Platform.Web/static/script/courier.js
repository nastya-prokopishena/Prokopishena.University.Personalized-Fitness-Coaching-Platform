const { CourierClient } = require("@trycourier/courier");

    const courier = CourierClient({ authorizationToken: "dk_prod_1PW4V0HG4F4CEJP8JAV0QEKH499Z" });
      courier.send({
       eventId: "87931C86EXM6C7NZ38BTGT2D851T", 
       recipientId: "2UTE3RFH6WBUY2VCMHU97PHH", 
       profile: {
         email: "<EMAIL_ADDRESS>"
       },
       data: {} *// optional variables for merging into templates }).then((resp) => {
         console.log('Email sent', resp)
       })
       .catch((error) => {
         console.error(error)
       });