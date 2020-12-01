var config = {
   //individualCustomerurl: "https://qxl-cust233.dev.sapbydesign.com/sap/c4c/odata/v1/c4codata/IndividualCustomerCollection",
   individualCustomerurl: "https://my500092.c4c.saphybriscloud.cn/sap/c4c/odata/v1/c4codata/IndividualCustomerCollection",
   indivudualCustomerNewurl: "https://203.c4c.saphybriscloud.cn/sap/c4c/odata/cust/v1/zindividualcustomer/CustomerCommonCollection?$filter=",
   credential: "wangjerry37:NewUser1A",
   credential_qxl: "_QXL:Saptest1",
   //credential_odata: "WANGJERRY62818:Saptest1",
   credential_odata: "WANGJERRY1:Saptest1",
   testAccount: "o0KlM1i2_4-zHRmDk-IWGRlA1Cjc",
   testAccountAppid: "wx73b49bfe02fd3a17",
   testAccountSecret: "8a269a9916c32069901c2e6b6f3f16a6",
   accessToken: "11_PcK8E4Rf1r9dUrJniF7FQnxzwpDh7yzMfP4jdS0jXuup4emKmHEg3VSJp48DxmFX3NAeDLcFa7iuC-whpMGkBIVmQQ_1funciX0pqePavltWNqYCv7Rpj2YCwVyMjqBMJOIXbLN_ZU8HK_HQVJSbAIAQEN",
   userMap: {
   	"gh_106591ffb8a3": "Jerry test Subscription Account",
   	"o0KlM1i2_4-zHRmDk-IWGRlA1Cjc": "null"
   },
   mainUserProfileEndPoint: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/managesocialmediauserprofilein",
   socialMediaMessageEndPoint: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/managesocialmediaactivityin",
   socialMediaMessageGetEndPoint: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/querysocialmediaactivityin",
   socialMediaProfileGetEndPoint: "https://qxl-cust233.dev.sapbydesign.com/sap/bc/srt/scs/sap/requestforsocialmediauserprofi",
   useRedis: false
};
module.exports = config;