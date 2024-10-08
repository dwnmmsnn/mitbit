module.exports = (function() {
      'use strict'
       const QRCode = require('qrcode');
       const xpub = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/sql/xpub/xpub');
       const Xpub = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/scripts/xpub');
       const SQL = require('/Users/dwynmsnn/bit/mitbit/mitbit/mitbit/src/routes/db');
       const route = require('express').Router(); 

      // POST billing
      route.post('/billing', async (req: { session: { billID: any; userID: any; }; body: { sum: any; shipping: any; discount: any; }; }, res: { render: (arg0: string, arg1: { sum: any; img: any; address: any; }) => void; }) => {
            try {
                  const billID = req.session.billID;
                  const ID = req.session.userID;
                  const sum = req.body.sum;
                  const shipping = req.body.shipping;
                  const discount = req.body.discount;

                  const Pub = await xpub.pubkey(ID);
                  const pub = JSON.parse(JSON.stringify(Pub));

                  const address = await Xpub.pub(pub);

                  await SQL.query(`UPDATE Bill SET shipping = '${shipping}', discount = '${discount}', sum = '${sum}' WHERE ID = '${billID}' AND userID = '${ID}'`)
  
                  const amount = 1;
                  const URI = (`bitcoin:${address}[?amount=${amount}]`);
        
                  const img = await QRCode.toDataURL(URI, { errorCorrectionLevel: 'H', color: { dark:'#9C9C9C', light:'#FFFFFF' } })
                  res.render('billing.ejs', { sum: sum, img: img, address: address })
            } catch (err) {
                     console.log(err);
            }
  })
  
  return route;
  })();