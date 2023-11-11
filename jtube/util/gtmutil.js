import TagManager from "react-gtm-module";

export const tokenPurchaseGTMCallback = (
  r,
  eventName,
  paymentStatus,
  paymentGateway,
  currency,
  nftfinalPrice,
  tokenDetails,
  tokenOwnership,
  paymentId,
  mobile,
  email,
  gaID,
  videoId,
  videoTitle,
  LanguagePrefId,
  LanguagePrefName,
  tokenquantity
) => {
  if (paymentStatus == "SUCCESS") {
    const tagManagerArgs = {
      dataLayer: {
        event: eventName,
        paymentStatus: paymentStatus,
        paymentGateway: paymentGateway,
        currency: currency,
        mobile: mobile,
        email: email,
        gaID: gaID,
        videoId: videoId,
        videoTitle: videoTitle,
        LanguagePrefId: LanguagePrefId,
        LanguagePrefName: LanguagePrefName,
        ecommerce: {
          purchase: {
            actionField: {
              id: paymentId, 
              affiliation: "website",
              revenue: nftfinalPrice,
              tax: 0,
              shipping: 0,
              coupon: 0,
            },
            products: [
              {
                name: tokenDetails,
                id: tokenDetails,
                price: nftfinalPrice,
                brand: "FanTv",
                category: tokenDetails,
                variant: tokenOwnership,
                quantity: tokenquantity,
                coupon: 0,
              },
            ],
          },
        },
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }
};
