const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
const { ISOToLocal } = require('../../function/formatDateTime');
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------


  //-------------------------------------
  res.json(input);
});

router.post('/TLA/GETCUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETCUSTNAME--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "activeid": `active_id` }, { "TYPE": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/GETWWTITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETWWTITEM--");
  // console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/GETREGISTEREDUSER', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETREGISTEREDUSER--");
  // console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "activeid": `active_id` }, { "BRANCH": 1, "REGISTRATIONNO": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/GETPRESERVED', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETPRESERVED--");
  // console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "PRESERVED", { "activeid": `active_id` }, { "BOTTLENO": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETCUSTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETCUSTNAME--");
  // console.log(req.body);
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
  // console.log(req.body);
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

router.post('/TLA/SETREGISTEREDUSER', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETREGISTEREDUSER--");
  // console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['FULLNAME'] != undefined && input['masterID'] != undefined && input['REGISTRATIONNO'] != undefined && input['BRANCH'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `REGISTEREDLIST-${Date.now()}${makeid(15)}`
      let indata = {
        "FULLNAME": input['FULLNAME'],
        "REGISTRATIONNO": input['REGISTRATIONNO'],
        "BRANCH": input['BRANCH'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "REGISTEREDLIST", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "FULLNAME": input['FULLNAME'], "REGISTRATIONNO": input['REGISTRATIONNO'], "BRANCH": input['BRANCH'] }
        let update01 = await mongodb.update("TALMASTER", "REGISTEREDLIST", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
        output = "OK";
      }
    }

  }

  //-------------------------------------
  res.json(output);
});

router.post('/TLA/SETPRESERVED', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETPRESERVED--");
  // console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['PRESERVED'] != undefined && input['masterID'] != undefined && input['BOTTLENO'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `PRESERVED-${Date.now()}${makeid(15)}`
      let indata = {
        "BOTTLENO": input['BOTTLENO'],
        "PRESERVED": input['PRESERVED'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "PRESERVED", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "PRESERVED", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "PRESERVED": input['PRESERVED'], "BOTTLENO": input['BOTTLENO'] }
        let update01 = await mongodb.update("TALMASTER", "PRESERVED", { 'masterID': input[`masterID`] }, { "$set": letsetdata });
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
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
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

router.post('/TLA/DELETEREGISTEREDUSER', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEREGISTEREDUSER--");
  // console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "REGISTEREDLIST", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEPRESERVED', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/DELETEPRESERVED--");
  // console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------

  if (input['masterID'] != undefined) {

    let find01 = await mongodb.find("TALMASTER", "PRESERVED", { "masterID": input[`masterID`] });
    if (find01.length > 0) {
      let del = await mongodb.delete("TALMASTER", "PRESERVED", { 'masterID': input[`masterID`] });
      output = "OK";
    }
  }


  //-------------------------------------
  res.json(output);
});

router.post('/TLA/DELETEEDITPATTERN', async (req, res) => {
  console.log("--TLA/DELETEEDITPATTERN--");
  const input = req.body;
  let output = "NOK";
  if (input['UID'] && input['ITEMNAME']) {
    const filter = { UID: input['UID'] };

    const update = {
      $pull: {
        [input['SAMPLENOLIST']]: {
          ITEMNAME: input['ITEMNAME'],
        }
      }
    };

    const result = await mongodb.update("TALMASTER", "PATTERN", filter, update);
    if (result.modifiedCount > 0) {
      output = "OK";
    }
  }

  res.json(output);
});


// router.post('/TLA/DELETEEDITPATTERN', async (req, res) => {
//   console.log("--TLA/DELETEEDITPATTERN--");
//   let input = req.body;
//   let output = "NOK";

//   if (input['SAMPLENO'] && input['NO'] && input['ITEMNAME']) {
//     const filter = { SAMPLENO: input['SAMPLENO'] };
//     const update = {
//       $pull: {
//         DATA: {
//           NO: input['NO'],
//           ITEMNAME: input['ITEMNAME']
//           // ถ้ามี masterID ด้วยก็ใส่ไป
//           // masterID: input['masterID']
//         }
//       }
//     };

//     const del = await mongodb.update("TALMASTER", "PATTERN", filter, update);
//     if (del.modifiedCount > 0) {
//       output = "OK";
//     }
//   }

//   res.json(output);
// });


router.post('/TLA/SETCUSTNAME_DROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETCUSTNAME_DROP--");
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "TYPE", { "activeid": `active_id` }, { "TYPE": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETTYPE', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETTYPE--");
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "SAMPLENAME", { "activeid": `active_id` }, { "SAMPLENAME": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETSAMPLENAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLENAME--");
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "activeid": `active_id` }, { "INSTRUMENTNAME": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETINSTRUMENTNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/SETINSTRUMENTNAME--");
  // console.log(req.body);
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
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "activeid": `active_id` }, { "ITEMNAME": 1 });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/GETUNIQEWWTITEMDROP', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETUNIQEWWTITEMDROP--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "WWTITEM", { "activeid": `active_id`, "ITEMNAME": input['ITEMNAME'] });

  //-------------------------------------
  res.json(find01);
});

router.post('/TLA/SETITEMNAME', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETITEMNAME--");
  // console.log(req.body);
  let input = req.body;
  let output = `NOK`
  //-------------------------------------


  if (input['ITEMNAME'] != undefined && input['CONTROLRANGE'] != undefined && input['METHOD'] != undefined && input['UNIT'] != undefined && input['masterID'] != undefined) {
    if (input['masterID'] === '') {
      let UID = `ITEMNAME-${Date.now()}${makeid(15)}`
      let indata = {
        "ITEMNAME": input['ITEMNAME'],
        "CONTROLRANGE": input['CONTROLRANGE'],
        "METHOD": input['METHOD'],
        "UNIT": input['UNIT'],
        "masterID": UID,
        "activeid": "active_id"

      }
      let ins = await mongodb.insertMany("TALMASTER", "ITEMNAME", [
        indata
      ],);
    } else {
      let find01 = await mongodb.find("TALMASTER", "ITEMNAME", { "masterID": input[`masterID`] });
      if (find01.length > 0) {
        let letsetdata = { "ITEMNAME": input['ITEMNAME'], "CONTROLRANGE": input['CONTROLRANGE'], "METHOD": input['METHOD'], "UNIT": input['UNIT'] }
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
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let CUSTNAME = await mongodb.find("TALMASTER", "CUSTNAME", { "activeid": `active_id` }, { "CUSTNAME": 1 });
  let TYPE = await mongodb.find("TALMASTER", "TYPE", { "activeid": `active_id` }, { "TYPE": 1 });
  let SAMPLENAME = await mongodb.find("TALMASTER", "SAMPLENAME", { "activeid": `active_id` }, { "SAMPLENAME": 1 });
  let INSTRUMENTNAME = await mongodb.find("TALMASTER", "INSTRUMENTNAME", { "activeid": `active_id` }, { "INSTRUMENTNAME": 1 });
  let ITEMNAME = await mongodb.find("TALMASTER", "ITEMNAME", { "activeid": `active_id` }, { "ITEMNAME": 1 });
  let REGISTEREDUSER = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "activeid": `active_id` }, { "BRANCH": 1, "REGISTRATIONNO": 1 });

  let dataset = {
    "CUSTNAME": CUSTNAME,
    "TYPE": TYPE,
    "SAMPLENAME": SAMPLENAME,
    "INSTRUMENTNAME": INSTRUMENTNAME,
    "ITEMNAME": ITEMNAME,
    "REGISTEREDUSER": REGISTEREDUSER
  };
  //-------------------------------------
  res.json(dataset);
});


router.post('/TLA/NEWPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/NEWPATTERN--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK'
  if (input['CUSTNAME'] != undefined && input['TYPE'] != undefined && input['CUSTNAMEUID'] != undefined && input['TYPEUID'] != undefined && input['UID'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "CUSTNAMEUID": input['CUSTNAMEUID'], "TYPEUID": input['TYPEUID'] });
    // console.log(find01)
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
      // console.log(indata)
      output = 'OK'
    }

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETPATTERN--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let find01 = await mongodb.find("TALMASTER", "PATTERN", { "activeid": `active_id` });

  //-------------------------------------
  res.json(find01);
});


router.post('/TLA/ADDITEM', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/ADDITEM--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = 'NOK'
  //&& input['BottleNo'] != undefined && input['ItemNo'] != undefined && input['InstrumentName'] != undefined && input['ItemName'] != undefined && input['Reportformat'] != undefined
  if (input['UID'] != undefined && input['SAMPLE'] != undefined && input['SAMPLEUID'] != undefined && input['SAMPLENO'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] });
    // console.log(find01)

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
  // console.log(req.body);
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
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['UID'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "UID": input['UID'] }, { "BottleNOset": 1 });
    // console.log(find01)
    // UID
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETUNIQEMASTERPATTERN', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETUNIQEMASTERPATTERN--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['CUSTNAME'] != undefined && input['TYPE'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "PATTERN", { "CUSTNAME": input['CUSTNAME'], "TYPE": input['TYPE'] });
    // console.log(find01)
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETDEFALUTSAMPLINGPERSON', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETDEFALUTSAMPLINGPERSON--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['CUSTNAME'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "CUSTNAME", { "CUSTNAME": input['CUSTNAME'], "activeid": 'active_id' });

    // console.log(find01)
    output = find01;

  }
  //-------------------------------------
  res.json(output);
});

router.post('/TLA/GETSAMPLINGPERSON', async (req, res) => {
  //-------------------------------------
  console.log("--TLA/GETSAMPLINGPERSON--");
  // console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = []
  if (input['BRANCH'] != undefined) {
    let find01 = await mongodb.find("TALMASTER", "REGISTEREDLIST", { "BRANCH": input['BRANCH'] });
    // console.log(find01)
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
      else {
        valueFields.push('NULL');
      }
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
    pushValue("RemarkSample", dataRow.RemarkSample);
    pushValue("ReqStatus", dataRow.ReqStatus);
    pushValue("SampleStatus", dataRow.SampleStatus);
    pushValue("ItemStatus", dataRow.ItemStatus);

    allValueStrings.push(`(${valueFields.join(', ')})`);
  }


  let columns = [
    'ReqNo', 'SampleCode', 'BottleCode', 'ReqCode', 'Type', 'ReqType', 'ReqBranch', 'ReqSection', 'ReqDate', 'ReqUser',
    'CustName', 'SampPerson', 'SampDate', 'SampNo', 'SampName', 'BottleNo',
    'ItemNo', 'InsName', 'ItemName', 'ReportFormat', 'RemarkSample',
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
    // console.log(db);
    if (db.rowsAffected[0] === 0) {
      console.log("Insert Failed");
      return res.status(400).json({ message: 'อัปเดทข้อมูลไม่สำเร็จ' });
    } else {
      console.log("Insert Success");
      return res.status(200).json({ message: baseReqNo });
    }
  } catch (err) {
    console.error("Insert Error:", err);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดขณะเพิ่มข้อมูล', error: err.message });
  }
});

router.post('/WWT/searchReqNoData', async (req, res) => {
  console.log("--searchReqNoData--");
  let output = [];

  const inputReqNo = req.body.ReqNo || "";

  try {
    const checkBottleQuery = `SELECT * FROM [WWT].[dbo].[Request] WHERE BottleCode = '${inputReqNo}'`;
    const checkResult = await mssql.qurey(checkBottleQuery);

    if (
      checkResult["recordsets"].length === 0 ||
      checkResult["recordsets"][0].length === 0
    ) {
      return res.status(404).json({ message: "ไม่พบข้อมูลลูกค้า" });
    }

    const trimmedReqNo = inputReqNo.split('/')[0];
    const searchQuery = `SELECT * FROM [WWT].[dbo].[Request] WHERE ReqNo = '${trimmedReqNo}' ORDER BY BottleCode `;
    const finalResult = await mssql.qurey(searchQuery);

    if (
      finalResult["recordsets"].length > 0 &&
      finalResult["recordsets"][0].length > 0
    ) {
      output = finalResult["recordsets"][0];
      return res.status(200).json(output);
    } else {
      return res.status(404).json({ message: "ไม่พบข้อมูลลูกค้า" });
    }
  } catch (error) {
    console.error("DB Error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการค้นหา" });
  }
});

router.post('/WWT/sendSample', async (req, res) => {
  console.log("--sendSample--");

  let dataRow = JSON.parse(req.body.dataRow);
  const now = ISOToLocal(new Date());
  let allQueries = '';

  for (const data of dataRow) {
    let fields = [];

    function pushField(name, value) {
      if (value !== '') {
        fields.push(`[${name}] = '${value}'`);
      } else {
        fields.push(`[${name}] = NULL`);
      }
    }

    pushField("ItemStatus", "SEND SAMPLE");
    pushField("UserSend", req.body.UserSend);
    pushField("SendDate", now);

    let query = `
      UPDATE [WWT].[dbo].[Request]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}';
    `;
    allQueries += query + '\n';
  }

  try {
    await mssql.qurey(allQueries);

    const sampleCode = dataRow[0].SAMPLECODE;
    // console.log("Checking SampleCode:", sampleCode);
    const checkQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN ItemStatus = 'SEND SAMPLE' THEN 1 ELSE 0 END) AS Sent
      FROM [WWT].[dbo].[Request]
      WHERE SampleCode = '${sampleCode}';
    `;

    const result = await mssql.qurey(checkQuery);
    const total = result.recordset[0].Total;
    const sent = result.recordset[0].Sent;

    if (total > 0 && total === sent) {
      // console.log("inside");
      const updateSampleStatusQuery = `
        UPDATE [WWT].[dbo].[Request]
        SET SampleStatus = 'SEND SAMPLE'
        WHERE SampleCode = '${sampleCode}';
      `;
      await mssql.qurey(updateSampleStatusQuery);
      // console.log("SampleStatus updated to SEND SAMPLE");
    }
    // console.log(dataRow);
    const ReqNo = dataRow[0].REQNO;
    console.log("Checking ReqNo:", ReqNo);
    const checkSampleQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN SampleStatus = 'SEND SAMPLE' THEN 1 ELSE 0 END) AS Sent
      FROM [WWT].[dbo].[Request]
      WHERE ReqNo = '${ReqNo}';
    `;

    const Sampleresult = await mssql.qurey(checkSampleQuery);
    const Sampletotal = Sampleresult.recordset[0].Total;
    const Samplesent = Sampleresult.recordset[0].Sent;

    if (Sampletotal > 0 && Sampletotal === Samplesent) {
      // console.log("inside");
      const updateReqStatusQuery = `
        UPDATE [WWT].[dbo].[Request]
        SET ReqStatus = 'SEND SAMPLE'
        WHERE ReqNo = '${ReqNo}';
      `;
      await mssql.qurey(updateReqStatusQuery);
      // console.log("SampleStatus updated to SEND SAMPLE");
    }

    return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
  } catch (error) {
    console.error("Update Failed", error);
    return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
  }
});

router.post('/WWT/CheckOldPassword', async (req, res) => {
  //-------------------------------------
  console.log("--CheckOldPassword--");
  //-------------------------------------
  // console.log(req.body);
  let query = `SELECT * From [SAR].[dbo].[Master_User] WHERE UserName = '${req.body.UserName}' 
                AND Password = '${req.body.OldPassword}'`;
  let db = await mssql.qurey(query);
  console.log(query);
  // console.log(db);
  if (db["recordset"].length > 0) {
    // console.log('200');
    return res.status(200).json();
  } else {
    // console.log('400');
    return res.status(400).json('Old Password ไม่ถูกต้อง');
  }
  //-------------------------------------

});

router.post('/WWT/UpdatePassword', async (req, res) => {
  //-------------------------------------
  console.log("--UpdatePassword--");
  //-------------------------------------
  let query = `
        UPDATE [SAR].[dbo].[Master_User]
        SET Password = '${req.body.NewPassword}'
        WHERE UserName = '${req.body.UserName}'
        `;
  // console.log(query);
  let db = await mssql.qurey(query);
  // console.log(db);
  if (db["rowsAffected"][0] > 0) {
    console.log("Update Success");
    return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
  } else {
    console.log("Update Failed");
    return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
  }
  //-------------------------------------

});

router.post('/WWT/SearchSendSample', async (req, res) => {
  //-------------------------------------
  console.log("--SearchSendSample--");
  //-------------------------------------
  let output = [];
  let query = '';
  // console.log(req.body['Branch']);
  if (req.body['Branch'] == 'All') {
    query = `SELECT * From [WWT].[dbo].[Request] WHERE ItemStatus = 'SEND SAMPLE' order by ReqNo DESC, BottleCode`;
  } else {
    query = `SELECT * From [WWT].[dbo].[Request] WHERE ReqCode = '${req.body['Branch']}' and ItemStatus = 'SEND SAMPLE' order by ReqNo DESC, BottleCode`;
  }

  let db = await mssql.qurey(query);
  // console.log(db);
  if (db["recordsets"].length > 0) {
    let buffer = db["recordsets"][0];
    // console.log("Alldata: " + buffer.length);
    output = buffer;
    // console.log(output);
    return res.status(200).json(output);
    // return res.status(400).json('ไม่พบข้อมูลลูกค้า');
  } else {
    return res.status(400).json('ไม่พบข้อมูลผู้รับผิดชอบ');
  }
  //-------------------------------------

});

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
