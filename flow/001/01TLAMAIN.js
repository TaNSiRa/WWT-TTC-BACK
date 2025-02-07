const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');


router.get('/TEST', async (req, res) => {
  // console.log(mssql.qurey())
  res.json("TEST");
})

router.post('/TEST', async (req, res) => {
  //-------------------------------------
  console.log("--TEST--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------


  //-------------------------------------
  res.json(input);
});

router.post('/TLA/GETCUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETCUSTNAME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETCUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETCUSTNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['CUSTNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `CUSTNAME-${Date.now()}${makeid(15)}`
      let indata = {
        "CUSTNAME": input['CUSTNAME'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "CUSTNAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "CUSTNAME": input['CUSTNAME'] }
        let update01 = await mongodb.update("TALMASTER", "CUSTNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETCUSTNAME_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETCUSTNAME_DROP--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------
  if (input['CUSTNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {

    } else {
      let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "activeid": "no_active_id" }
        let update01 = await mongodb.update("TALMASTER", "CUSTNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }
  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETTYPE', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETTYPE--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "TYPE", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETTYPE', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETTYPE--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['TYPE'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `TYPE-${Date.now()}${makeid(15)}`
      let indata = {
        "TYPE": input['TYPE'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "TYPE", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "TYPE", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "TYPE": input['TYPE'] }
        let update01 = await mongodb.update("TALMASTER", "TYPE", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETTYPE_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETTYPE_DROP--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['TYPE'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {

    } else {
      let find01 = await mongodb.find("TALMASTER", "TYPE", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "activeid": "active_id" }
        let update01 = await mongodb.update("TALMASTER", "TYPE", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETSAMPLENAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLENAME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "SAMPLENAME", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETSAMPLENAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLENAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['SAMPLENAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `SAMPLENAME-${Date.now()}${makeid(15)}`
      let indata = {
        "SAMPLENAME": input['SAMPLENAME'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "SAMPLENAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "SAMPLENAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "SAMPLENAME": input['SAMPLENAME'] }
        let update01 = await mongodb.update("TALMASTER", "SAMPLENAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETSAMPLENAME_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLENAME_DROP--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['SAMPLENAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {

    } else {
      let find01 = await mongodb.find("TALMASTER", "SAMPLENAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "activeid": "no_active_id" }
        let update01 = await mongodb.update("TALMASTER", "SAMPLENAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETINSTRUMENTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETINSTRUMENTNAME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETINSTRUMENTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETINSTRUMENTNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['INSTRUMENTNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `INSTRUMENTNAME-${Date.now()}${makeid(15)}`
      let indata = {
        "INSTRUMENTNAME": input['INSTRUMENTNAME'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "INSTRUMENTNAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "INSTRUMENTNAME": input['INSTRUMENTNAME'] }
        let update01 = await mongodb.update("TALMASTER", "INSTRUMENTNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETINSTRUMENTNAME_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETINSTRUMENTNAME_DROP--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['INSTRUMENTNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {

    } else {
      let find01 = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "activeid": "no_active_id" }
        let update01 = await mongodb.update("TALMASTER", "INSTRUMENTNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETITEMNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETITEMNAME--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETITEMNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETITEMNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['ITEMNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `ITEMNAME-${Date.now()}${makeid(15)}`
      let indata = {
        "ITEMNAME": input['ITEMNAME'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "ITEMNAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "ITEMNAME": input['ITEMNAME'] }
        let update01 = await mongodb.update("TALMASTER", "ITEMNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETITEMNAME_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETITEMNAME_DROP--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['ITEMNAME'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {

    } else {
      let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "activeid": "no_active_id" }
        let update01 = await mongodb.update("TALMASTER", "ITEMNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});


router.post('/TLA/GETALLMASTER', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETALLMASTER--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let CUSTNAME = await mongodb.find("TALMASTER", "CUSTNAME", { "activeid": `active_id` });
  let TYPE = await mongodb.find("TALMASTER", "TYPE", { "activeid": `active_id` });
  let SAMPLENAME = await mongodb.find("TALMASTER", "SAMPLENAME", { "activeid": `active_id` });
  let INSTRUMENTNAME = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "activeid": `active_id` });
  let ITEMNAME = await mongodb.find("TALMASTER", "ITEMNAME", { "activeid": `active_id` });


  let dataset = {
    "CUSTNAME": CUSTNAME,
    "TYPE": TYPE,
    "SAMPLENAME": SAMPLENAME,
    "INSTRUMENTNAME": INSTRUMENTNAME,
    "ITEMNAME": ITEMNAME,
  };
  //-------------------------------------
  res.json(dataset);
});


router.post('/TLA/NEWPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/NEWPATTERN--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK'
  if (input['CUSTNAME'] != undefined && input['TYPE'] != undefined && input['CUSTNAMEUID'] != undefined && input['TYPEUID'] != undefined && input['UID'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "CUSTNAMEUID": input['CUSTNAMEUID'], "TYPEUID": input['TYPEUID'] });
    console.log(find01)
    if (find01.length > 0) {

    } else {
      let UID = `PATTERN-${Date.now()}${makeid(15)}`
      let indata = {
        "CUSTNAME": input['CUSTNAME'],
        "TYPE": input['TYPE'],
        "CUSTNAMEUID": input['CUSTNAMEUID'],
        "TYPEUID": input['TYPEUID'],
        "UID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "PATTERN", [
        indata
      ],);
      console.log(indata)
      output = 'OK'
    }

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETPATTERN--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "PATTERN", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});


router.post('/TLA/ADDITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/ADDITEM--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK'
  //&& input['BottleNo'] != undefined && input['ItemNo'] != undefined && input['InstrumentName'] != undefined && input['ItemName'] != undefined && input['Reportformat'] != undefined
  if (input['UID'] != undefined && input['SAMPLE'] != undefined && input['SAMPLEUID'] != undefined && input['SAMPLENO'] != undefined ) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    console.log(find01)

    if (find01.length === 1) {
      if (input['SAMPLENO'] === '1') {
        let indata = {
          "SMAPLENO1": input['SAMPLE'],
          "SMAPLENO1UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '2') {
        let indata = {
          "SMAPLENO2": input['SAMPLE'],
          "SMAPLENO2UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '3') {
        let indata = {
          "SMAPLENO3": input['SAMPLE'],
          "SMAPLENO3UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '4') {
        let indata = {
          "SMAPLENO4": input['SAMPLE'],
          "SMAPLENO4UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '5') {
        let indata = {
          "SMAPLENO5": input['SAMPLE'],
          "SMAPLENO5UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '6') {
        let indata = {
          "SMAPLENO6": input['SAMPLE'],
          "SMAPLENO6UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '7') {
        let indata = {
          "SMAPLENO7": input['SAMPLE'],
          "SMAPLENO7UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '8') {
        let indata = {
          "SMAPLENO8": input['SAMPLE'],
          "SMAPLENO8UID": input['SAMPLEUID'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
    }
  }
  //-------------------------------------
  res.json(output);
});


router.post('/TLA/ADDITEMlist', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/ADDITEMlist--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK'
  //&& input['BottleNo'] != undefined && input['ItemNo'] != undefined && input['InstrumentName'] != undefined && input['ItemName'] != undefined && input['Reportformat'] != undefined
  if (input['UID'] != undefined && input['SAMPLELIST'] != undefined ) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    // console.log(find01)

    if (find01.length === 1) {
      if (input['SAMPLENO'] === '1') {
        let indata = {
          "SMAPLENO1LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '2') {
        let indata = {
          "SMAPLENO2LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }

      if (input['SAMPLENO'] === '3') {
        let indata = {
          "SMAPLENO3LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '4') {
        let indata = {
          "SMAPLENO4LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '5') {
        let indata = {
          "SMAPLENO5LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '6') {
        let indata = {
          "SMAPLENO6LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '7') {
        let indata = {
          "SMAPLENO7LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '8') {
        let indata = {
          "SMAPLENO8LIST": input['SAMPLELIST'] ,
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
   
    }
    
  }
  //-------------------------------------
  res.json(output);
});


router.post('/TLA/GETPATTERNdata', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETPATTERNdata--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['UID'] != undefined ) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    console.log(find01)
    // UID
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

module.exports = router;
