const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');
const e = require("express");


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

router.post('/TLA/GETWWTITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETWWTITEM--");
  console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETCUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETCUSTNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['CUSTNAME'] != undefined && input['masterID'] != undefined && input['ADDRESS'] != undefined && input['DEFAULTPERSON'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `CUSTNAME-${Date.now()}${makeid(15)}`
      let indata = {
        "CUSTNAME": input['CUSTNAME'],
        "ADDRESS": input['ADDRESS'],
        "DEFAULTPERSON": input['DEFAULTPERSON'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "CUSTNAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "CUSTNAME": input['CUSTNAME'], "ADDRESS": input['ADDRESS'], "DEFAULTPERSON": input['DEFAULTPERSON'] }
        let update01 = await mongodb.update("TALMASTER", "CUSTNAME", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETWWTITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETWWTITEM--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['INSTRUMENTNAME'] != undefined && input['masterID'] != undefined && input['ITEMNAME'] != undefined && input['BOTTLENO'] != undefined && input['REPORTFORMAT'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `WWTITEM-${Date.now()}${makeid(15)}`
      let indata = {
        "INSTRUMENTNAME": input['INSTRUMENTNAME'],
        "ITEMNAME": input['ITEMNAME'],
        "BOTTLENO": input['BOTTLENO'],
        "REPORTFORMAT": input['REPORTFORMAT'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "WWTITEM", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "INSTRUMENTNAME": input['INSTRUMENTNAME'], "ITEMNAME": input['ITEMNAME'], "BOTTLENO": input['BOTTLENO'], "REPORTFORMAT": input['REPORTFORMAT'] }
        let update01 = await mongodb.update("TALMASTER", "WWTITEM", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETETYPE', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETETYPE--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "TYPE", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "TYPE", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEPATTERN--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "PATTERN", { 'UID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETESAMPLENAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETESAMPLENAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "SAMPLENAME", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "SAMPLENAME", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEINSTRUMENTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEINSTRUMENTNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "INSTRUMENTNAME", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEITEMNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEITEMNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "ITEMNAME", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETECUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETECUSTNAME--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "CUSTNAME", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEWWTITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEWWTITEM--");
  console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "WWTITEM", { 'masterID': input[`masterID`] });
      output = "OK";
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

router.post('/TLA/GETUNIQEWWTITEMDROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETUNIQEWWTITEMDROP--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "activeid": `active_id`, "ITEMNAME": input['ITEMNAME'] });

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
  if (input['UID'] != undefined && input['SAMPLE'] != undefined && input['SAMPLEUID'] != undefined && input['SAMPLENO'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    console.log(find01)

    if (find01.length === 1) {
      if (input['SAMPLENO'] === '1') {
        let indata = {
          "SMAPLENO1": input['SAMPLE'],
          "SMAPLENO1UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '2') {
        let indata = {
          "SMAPLENO2": input['SAMPLE'],
          "SMAPLENO2UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '3') {
        let indata = {
          "SMAPLENO3": input['SAMPLE'],
          "SMAPLENO3UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '4') {
        let indata = {
          "SMAPLENO4": input['SAMPLE'],
          "SMAPLENO4UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '5') {
        let indata = {
          "SMAPLENO5": input['SAMPLE'],
          "SMAPLENO5UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '6') {
        let indata = {
          "SMAPLENO6": input['SAMPLE'],
          "SMAPLENO6UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '7') {
        let indata = {
          "SMAPLENO7": input['SAMPLE'],
          "SMAPLENO7UID": input['SAMPLEUID'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '8') {
        let indata = {
          "SMAPLENO8": input['SAMPLE'],
          "SMAPLENO8UID": input['SAMPLEUID'],
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
  if (input['UID'] != undefined && input['SAMPLELIST'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    // console.log(find01)

    if (find01.length === 1) {
      if (input['SAMPLENO'] === '1') {
        let indata = {
          "SMAPLENO1LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '2') {
        let indata = {
          "SMAPLENO2LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }

      if (input['SAMPLENO'] === '3') {
        let indata = {
          "SMAPLENO3LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '4') {
        let indata = {
          "SMAPLENO4LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '5') {
        let indata = {
          "SMAPLENO5LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '6') {
        let indata = {
          "SMAPLENO6LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '7') {
        let indata = {
          "SMAPLENO7LIST": input['SAMPLELIST'],
        }
        let update01 = await mongodb.update("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "$set": indata });
        output = 'OK'
      }
      if (input['SAMPLENO'] === '8') {
        let indata = {
          "SMAPLENO8LIST": input['SAMPLELIST'],
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
  if (input['UID'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    console.log(find01)
    // UID
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETUNIQEMASTERPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETUNIQEMASTERPATTERN--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['CUSTNAME'] != undefined && input['TYPE'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "CUSTNAME": input['CUSTNAME'], "TYPE": input['TYPE'] });
    console.log(find01)
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETDEFALUTSAMPLINGPERSON', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETDEFALUTSAMPLINGPERSON--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['CUSTNAME'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "CUSTNAME": input['CUSTNAME'], "activeid": 'active_id' });

    console.log(find01)
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETSAMPLINGPERSON', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLINGPERSON--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['BRANCH'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "BRANCH": input['BRANCH'], "PERMISSION": 'ข' });
    console.log(find01)
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

//-------------------------------------------------SQL Server Zone-------------------------------------------------//

router.post('/WWT/CreateRequest', async (req, res) => {
  console.log("--CreateRequest--");
  let dataRows = req.body.dataRow.dataRow;
  // console.log(dataRows);

  const reqBranch = dataRows[0].ReqBranch; // ใช้แค่ค่าเดียว เพราะทุก record ใช้ ReqBranch เดียวกัน
  const baseReqNo = await generateBaseReqNo(reqBranch);

  let allValueStrings = [];

  for (const dataRow of dataRows) {
    const sampNoStr = dataRow.SampNo.toString().padStart(2, '0');
    const sampleCode = `${baseReqNo}/${sampNoStr}`;
    const bottleStr = dataRow.BottleNo.toString().padStart(2, '0');
    const bottleCode = `${baseReqNo}/${sampNoStr}/${bottleStr}`;

    let valueFields = [];
    function pushValue(name, value) {
      if (value !== '' && value !== null && value !== 'null') {
        valueFields.push(`'${value}'`);
      }
      // else {
      //   valueFields.push('NULL');
      // }
    }

    pushValue("ReqNo", baseReqNo);
    pushValue("SampleCode", sampleCode);
    pushValue("BottleCode", bottleCode);
    pushValue("ReqCode", dataRow.ReqCode);
    pushValue("Type", dataRow.Type);
    pushValue("ReqType", dataRow.ReqType);
    pushValue("ReqBranch", dataRow.ReqBranch);
    pushValue("ReqSection", dataRow.ReqSection);
    pushValue("ReqDate", dataRow.ReqDate);
    pushValue("ReqUser", dataRow.ReqUser);
    pushValue("CustName", dataRow.CustName);
    pushValue("SampPerson", dataRow.SampPerson);
    pushValue("SampDate", dataRow.SampDate);
    pushValue("SampNo", dataRow.SampNo);
    pushValue("SampName", dataRow.SampName);
    pushValue("BottleNo", dataRow.BottleNo);
    pushValue("ItemNo", dataRow.ItemNo);
    pushValue("InsName", dataRow.InsName);
    pushValue("ItemName", dataRow.ItemName);
    pushValue("ReportFormat", dataRow.ReportFormat);
    pushValue("ReqStatus", dataRow.ReqStatus);
    pushValue("SampleStatus", dataRow.SampleStatus);
    pushValue("ItemStatus", dataRow.ItemStatus);

    allValueStrings.push(`(${valueFields.join(', ')})`);
  }


  let columns = [
    'ReqNo', 'SampleCode', 'BottleCode', 'ReqCode', 'Type', 'ReqType', 'ReqBranch', 'ReqSection', 'ReqDate', 'ReqUser',
    'CustName', 'SampPerson', 'SampDate', 'SampNo', 'SampName', 'BottleNo',
    'ItemNo', 'InsName', 'ItemName', 'ReportFormat',
    'ReqStatus', 'SampleStatus', 'ItemStatus'
  ];

  let query = `
  INSERT INTO [WWT].[dbo].[Request] (
  ${columns.map(col => `[${col}]`).join(', ')}
  )
  VALUES 
  ${allValueStrings.join(',\n')}
  `;

  try {
    // console.log(query);
    const db = await mssql.qurey(query);
    console.log(db);
    if (db.rowsAffected[0] === 0) {
      console.log("Insert Failed");
      return res.status(400).json({ message: 'อัปเดทข้อมูลไม่สำเร็จ' });
    } else {
      console.log("Insert Success:", db.rowsAffected);
      return res.status(200).json({ message: 'Request No: ' + baseReqNo });
    }
  } catch (err) {
    console.error("Insert Error:", err);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดขณะเพิ่มข้อมูล', error: err.message });
  }
});


// router.post('/WWT/CreateRequest', async (req, res) => {
//   //-------------------------------------
//   console.log("--CreateRequest--");
//   //-------------------------------------
//   let dataRows = req.body.dataRow.dataRow;
//   console.log(dataRows);
//   for (const dataRow of dataRows) {
//     let fields = [];
//     function pushField(name, value) {
//       if (value !== '' && value !== null && value !== 'null') {
//         fields.push(`[${name}] = '${value}'`);
//       }
//     }

//     // pushField("ReqNo", dataRow.ReqNo);
//     // pushField("ReqCode", dataRow.ReqCode);
//     pushField("ReqType", dataRow.ReqType);
//     pushField("ReqBranch", dataRow.ReqBranch);
//     pushField("ReqSection", dataRow.ReqSection);
//     pushField("ReqDate", dataRow.ReqDate);
//     pushField("ReqUser", dataRow.ReqUser);
//     pushField("CustName", dataRow.CustName);
//     pushField("SampPerson", dataRow.SampPerson);
//     pushField("SampDate", dataRow.SampDate);
//     pushField("SampNo", dataRow.SampNo);
//     pushField("SampName", dataRow.SampName);
//     pushField("BottleNo", dataRow.BottleNo);
//     pushField("ItemNo", dataRow.ItemNo);
//     pushField("InsName", dataRow.InsName);
//     pushField("ItemName", dataRow.ItemName);
//     pushField("ReportFormat", dataRow.ReportFormat);
//     pushField("ReqStatus", dataRow.ReqStatus);
//     pushField("SampleStatus", dataRow.SampleStatus);
//     pushField("ItemStatus", dataRow.ItemStatus);


//     let query = `
//     INSERT INTO [WWT].[dbo].[Request] (
//     ${fields.map(field => field.split('=')[0].trim()).join(',\n')}
//     )
//     VALUES (
//     ${fields.map(field => field.split('=')[1].trim()).join(',\n')}
//     )
//     `;
//     console.log(query);
//     let db = await mssql.qurey(query);
//     // console.log(db);
//   }

//   // if (db["rowsAffected"][0] > 0) {
//   //   console.log("Insert Success");
//   //   return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
//   //   // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
//   // } else {
//   //   console.log("Insert Failed");
//   //   return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
//   // }

//   //-------------------------------------

// });

async function generateBaseReqNo(reqBranch) {
  const currentYear = new Date().getFullYear().toString().slice(-2); // '25' จาก 2025
  let prefix = 'ACB'; // default

  if (reqBranch === 'TPK HES LAB') prefix = 'ACR';

  const result = await mssql.qurey(`
    SELECT TOP 1 ReqNo FROM [WWT].[dbo].[Request]
    WHERE ReqBranch = '${reqBranch}'
    ORDER BY ReqNo DESC
  `);

  let nextNumber = 1;
  if (result.recordset.length > 0) {
    const lastReqNo = result.recordset[0].ReqNo; // ENV-ACB-25XXXX
    const lastNumberStr = lastReqNo.split('-')[2]?.slice(2); // 'XXXX'
    if (lastNumberStr) {
      nextNumber = parseInt(lastNumberStr) + 1;
    }
  }

  const numberPart = nextNumber.toString().padStart(4, '0'); // XXXX
  return `ENV-${prefix}-${currentYear}${numberPart}`;
}


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
