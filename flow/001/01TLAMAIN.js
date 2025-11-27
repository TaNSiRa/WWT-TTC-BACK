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

  let itemList = await mongodb.find("TALMASTER", "ITEMNAME", { "activeid": `active_id` }, {
    "ITEMNAME": 1
  });

  const itemMap = {};
  itemList.forEach(item => {
    itemMap[item.ITEMNAME] = item;
  });

  let preservedList = await mongodb.find("TALMASTER", "PRESERVED", { "activeid": `active_id` }, {
    "BOTTLENO": 1
  });

  const preservedMap = {};
  preservedList.forEach(item => {
    preservedMap[item.BOTTLENO] = item;
  });

  let allValueStrings = [];

  for (const dataRow of dataRows) {
    const sampNoStr = dataRow.SampNo.toString().padStart(2, '0');
    const sampleCode = `${baseReqNo}/${sampNoStr}`;
    const bottleStr = dataRow.BottleNo.toString().padStart(2, '0');
    const bottleCode = `${baseReqNo}/${sampNoStr}/${bottleStr}`;

    const matchedItem = itemMap[dataRow.ItemName];
    if (matchedItem) {
      dataRow.ControlRange = matchedItem.CONTROLRANGE || '';
      dataRow.Unit = matchedItem.UNIT || '';
      dataRow.Method = matchedItem.METHOD || '';
    }

    const matchedPreserved = preservedMap[dataRow.BottleNo];
    if (matchedPreserved) {
      dataRow.Preserved = matchedPreserved.PRESERVED || '';
    }

    let valueFields = [];
    // function pushValue(name, value) {
    //   if (value !== '' && value !== null && value !== 'null') {
    //     valueFields.push(`'${value}'`);
    //   }
    //   else {
    //     valueFields.push('NULL');
    //   }
    // }
    function pushValue(name, value) {
      if (value !== '') {
        const escapedValue = value.toString().replace(/'/g, "''");
        if (typeof value === 'string') {
          valueFields.push(`N'${escapedValue}'`);
        } else {
          valueFields.push(`'${escapedValue}'`);
        }
      } else {
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
    pushValue("ControlRange", dataRow.ControlRange);
    pushValue("Unit", dataRow.Unit);
    pushValue("Method", dataRow.Method);
    pushValue("Preserved", dataRow.Preserved);
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
    'ItemNo', 'InsName', 'ItemName', 'ControlRange', 'Unit', 'Method', 'Preserved', 'ReportFormat', 'RemarkSample',
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
    // console.log("Checking ReqNo:", ReqNo);
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

router.post('/WWT/receiveSample', async (req, res) => {
  console.log("--receiveSample--");
  // console.log(req.body);
  let dataRow = JSON.parse(req.body.dataRow);
  // console.log(dataRow);
  const now = ISOToLocal(new Date());
  const nowISO = new Date().toISOString().split('T')[0];
  let allQueries = '';

  await loadHolidays();

  const analysisDueResult = await calculateAnalysisDue(nowISO, req.body.AnalysisDue);
  const analysisDueDate = analysisDueResult.AnalysisDue;

  for (const data of dataRow) {
    let fields = [];

    // console.log("AnalysisDueDate:", analysisDueDate);
    function pushField(name, value) {
      if (value !== '') {
        fields.push(`[${name}] = '${value}'`);
      } else {
        fields.push(`[${name}] = NULL`);
      }
    }

    pushField("ItemStatus", "RECEIVE SAMPLE");
    pushField("Receiver", req.body.Receiver);
    pushField("ReceivedDate", now);
    pushField("AnalysisDue", analysisDueDate);

    let query = `
      UPDATE [WWT].[dbo].[Request]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}';
    `;
    allQueries += query + '\n';
  }

  try {
    await mssql.qurey(allQueries);
    // console.log(allQueries);

    const sampleCode = dataRow[0].SampleCode;
    // console.log("Checking SampleCode:", sampleCode);
    const checkQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN ItemStatus = 'RECEIVE SAMPLE' THEN 1 ELSE 0 END) AS Sent
      FROM [WWT].[dbo].[Request]
      WHERE SampleCode = '${sampleCode}';
    `;
    // console.log(checkQuery);
    const result = await mssql.qurey(checkQuery);
    const total = result.recordset[0].Total;
    const sent = result.recordset[0].Sent;

    if (total > 0 && total === sent) {
      // console.log("inside");
      const updateSampleStatusQuery = `
        UPDATE [WWT].[dbo].[Request]
        SET SampleStatus = 'RECEIVE SAMPLE'
        WHERE SampleCode = '${sampleCode}';
      `;
      // console.log(updateSampleStatusQuery);
      await mssql.qurey(updateSampleStatusQuery);
      // console.log("SampleStatus updated to SEND SAMPLE");
    }
    // console.log(dataRow);
    const ReqNo = dataRow[0].ReqNo;
    // console.log("Checking ReqNo:", ReqNo);
    const checkSampleQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN SampleStatus = 'RECEIVE SAMPLE' THEN 1 ELSE 0 END) AS Sent
      FROM [WWT].[dbo].[Request]
      WHERE ReqNo = '${ReqNo}';
    `;
    // console.log(checkSampleQuery);
    const Sampleresult = await mssql.qurey(checkSampleQuery);
    const Sampletotal = Sampleresult.recordset[0].Total;
    const Samplesent = Sampleresult.recordset[0].Sent;

    if (Sampletotal > 0 && Sampletotal === Samplesent) {
      // console.log("inside");
      const updateReqStatusQuery = `
        UPDATE [WWT].[dbo].[Request]
        SET ReqStatus = 'RECEIVE SAMPLE'
        WHERE ReqNo = '${ReqNo}';
      `;
      // console.log(updateReqStatusQuery);
      await mssql.qurey(updateReqStatusQuery);
      // console.log("SampleStatus updated to SEND SAMPLE");
    }

    const updateAnalysisDueQuery = `
    UPDATE [WWT].[dbo].[Request]
    SET AnalysisDue = '${analysisDueDate}'
    WHERE ReqNo = '${ReqNo}' AND AnalysisDue IS NOT NULL;
    `;
    await mssql.qurey(updateAnalysisDueQuery);

    return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
  } catch (error) {
    console.error("Update Failed", error);
    return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
  }
});

router.post('/WWT/rejectRequest', async (req, res) => {
  //-------------------------------------
  console.log("--rejectRequest--");
  //-------------------------------------
  // console.log(req.body);
  // console.log(req.body.RemarkReject);
  const now = ISOToLocal(new Date());
  const inputReqNo = req.body.BottleCode || "";
  const trimmedReqNo = inputReqNo.split('/')[0];
  const parts = inputReqNo.split('/');
  const trimmedSampleCode = parts.slice(0, 2).join('/');

  let fields = [];
  // function pushField(name, value) {
  //   if (value !== '') {
  //     fields.push(`[${name}] = '${value}'`);
  //   } else {
  //     fields.push(`[${name}] = NULL`);
  //   }
  // }

  function pushField(name, value) {
    if (value !== '') {
      const escapedValue = value.toString().replace(/'/g, "''");
      fields.push(`[${name}] = N'${escapedValue}'`);
    } else {
      fields.push(`[${name}] = NULL`);
    }
  }

  // pushField("ReqStatus", "REJECT");
  // pushField("SampleStatus", "REJECT");
  pushField("ItemStatus", "REJECT");
  pushField("UserReject", req.body.UserReject);
  pushField("RejectDate", now);
  pushField("RemarkReject", req.body.RemarkReject);

  let query = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE BottleCode = '${req.body.BottleCode}'
        `;
  // console.log(query);
  // let db = await mssql.qurey(query);
  // console.log(db);
  try {
    await mssql.qurey(query);

    const sampleCode = trimmedSampleCode;
    // console.log("Checking SampleCode:", sampleCode);
    const checkQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN ItemStatus = 'REJECT' THEN 1 ELSE 0 END) AS Sent
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
        SET SampleStatus = 'REJECT'
        WHERE SampleCode = '${sampleCode}';
      `;
      await mssql.qurey(updateSampleStatusQuery);
      // console.log("SampleStatus updated to SEND SAMPLE");
    }
    // console.log(dataRow);
    const ReqNo = trimmedReqNo;
    // console.log("Checking ReqNo:", ReqNo);
    const checkSampleQuery = `
      SELECT COUNT(*) AS Total,
             SUM(CASE WHEN SampleStatus = 'REJECT' THEN 1 ELSE 0 END) AS Sent
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
        SET ReqStatus = 'REJECT'
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

  // if (db["rowsAffected"][0] > 0) {
  //   console.log("Update Success");
  //   return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
  //   // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
  // } else {
  //   console.log("Update Failed");
  //   return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
  // }
  // //-------------------------------------

});

router.post('/WWT/editDueDate', async (req, res) => {
  //-------------------------------------
  console.log("--editDueDate--");
  //-------------------------------------
  // console.log(req.body);
  // console.log(req.body.RemarkReject);
  const now = ISOToLocal(new Date());

  let fields = [];
  function pushField(name, value) {
    if (value !== '') {
      fields.push(`[${name}] = '${value}'`);
    } else {
      fields.push(`[${name}] = NULL`);
    }
  }

  pushField("AnalysisDue", req.body.dueDate);
  pushField("UserEditAnalysisDue", req.body.userEditAnalysisDue);
  pushField("EditAnalysisDueDate", now);

  let query = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ReqNo = '${req.body.reqNo}'
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

router.post('/WWT/CheckOldPassword', async (req, res) => {
  //-------------------------------------
  console.log("--CheckOldPassword--");
  //-------------------------------------
  // console.log(req.body);
  let query = `SELECT * From [SAR].[dbo].[Master_User] WHERE UserName = '${req.body.UserName}' 
                AND Password = '${req.body.OldPassword}'`;
  let db = await mssql.qurey(query);
  // console.log(query);
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

router.post('/WWT/SearchReceiveSample', async (req, res) => {
  //-------------------------------------
  console.log("--SearchReceiveSample--");
  //-------------------------------------
  let output = [];
  let query = '';
  // console.log(req.body['Branch']);
  // console.log(req.body);
  if (req.body['Branch'] == 'All' && req.body['INSTRUMENT'] != '') {
    // console.log("case 1");
    query = `SELECT * From [WWT].[dbo].[Request] WHERE InsName = '${req.body['INSTRUMENT']}' and (ItemStatus = 'RECEIVE SAMPLE' OR ItemStatus = 'RECHECK ITEM')  order by ReqNo DESC, BottleCode`;
  } else if (req.body['Branch'] == 'All' && req.body['INSTRUMENT'] == '') {
    // console.log("case 2");
    query = `SELECT * From [WWT].[dbo].[Request] WHERE (ItemStatus = 'RECEIVE SAMPLE' OR ItemStatus = 'RECHECK ITEM') order by ReqNo DESC, BottleCode`;
  } else if (req.body['Branch'] != 'All' && req.body['INSTRUMENT'] == '') {
    // console.log("case 2");
    query = `SELECT * From [WWT].[dbo].[Request] WHERE ReqCode = '${req.body['Branch']}' and (ItemStatus = 'RECEIVE SAMPLE' OR ItemStatus = 'RECHECK ITEM') order by ReqNo DESC, BottleCode`;
  } else if (req.body['Branch'] != 'All' && req.body['INSTRUMENT'] != '') {
    // console.log("case 3");
    query = `SELECT * From [WWT].[dbo].[Request] WHERE ReqCode = '${req.body['Branch']}' and InsName = '${req.body['INSTRUMENT']}' and (ItemStatus = 'RECEIVE SAMPLE' OR ItemStatus = 'RECHECK ITEM') order by ReqNo DESC, BottleCode`;
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

router.post('/WWT/SearchSendSampleForBottleCode', async (req, res) => {
  //-------------------------------------
  console.log("--SearchSendSampleForBottleCode--");
  //-------------------------------------
  let output = [];
  let query = `SELECT * From [WWT].[dbo].[Request] WHERE BottleCode = '${req.body['BOTTLECODE']}' order by ReqNo DESC, BottleCode`;

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
    return res.status(400).json('ไม่พบข้อมูล');
  }
  //-------------------------------------

});

router.post('/WWT/getReqList', async (req, res) => {
  console.log("--getReqList--");

  const {
    ReqNo,
    Custname,
    ReqStatus,
    ReceiveStart,
    ReceiveEnd,
    DueDateStart,
    DueDateEnd,
    Bangpoo,
    Rayong
  } = req.body;
  // console.log(req.body);
  let output = [];
  let conditions = [];

  if (ReqNo) {
    conditions.push(`ReqNo LIKE '%${ReqNo}%'`);
  }
  if (Custname) {
    conditions.push(`CustName LIKE N'%${Custname}%'`);
  }
  if (ReqStatus) {
    conditions.push(`ReqStatus = '${ReqStatus}'`);
  }
  if (ReceiveStart && ReceiveEnd) {
    conditions.push(`ReceivedDate BETWEEN '${ReceiveStart}' AND '${ReceiveEnd}'`);
  }
  if (DueDateStart && DueDateEnd) {
    conditions.push(`AnalysisDue BETWEEN '${DueDateStart}' AND '${DueDateEnd}'`);
  }

  if (Bangpoo && Rayong) {
  } else if (Bangpoo) {
    conditions.push(`ReqCode = 'ACB'`);
  } else if (Rayong) {
    conditions.push(`ReqCode = 'ACR'`);
  } else {
    return res.status(400).json('ไม่พบข้อมูล');
  }

  let whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  // console.log(whereClause);
  let query = `
  WITH R AS (
    SELECT  *,
            ROW_NUMBER() OVER (PARTITION BY ReqNo ORDER BY BottleCode DESC) AS rn
    FROM [WWT].[dbo].[Request]
    ${whereClause}
  )
  SELECT TOP 10000 *
  FROM R
  WHERE rn = 1
  ORDER BY ReqDate DESC;
  `;

  // console.log(query);
  try {
    let db = await mssql.qurey(query);
    if (db["recordsets"].length > 0) {
      let buffer = db["recordsets"][0];
      output = buffer;
      return res.status(200).json(output);
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json('เกิดข้อผิดพลาดที่ server');
  }
});

router.post('/WWT/getReqDetail', async (req, res) => {
  //-------------------------------------
  console.log("--getReqDetail--");
  //-------------------------------------
  let output = [];
  let query = `SELECT * From [WWT].[dbo].[Request] WHERE ReqNo = '${req.body.ReqNo}' order by BottleNo, ItemNo`;

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
    return res.status(400).json('ไม่พบข้อมูล');
  }
  //-------------------------------------

});

router.post('/WWT/listNewJob', async (req, res) => {
  console.log("--listNewJob--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    let insName = req.body.Instrument;
    let userListJob = req.body.UserListJob;
    const now = ISOToLocal(new Date());
    // console.log(dataRow);
    const reqBranch = dataRow[0].REQBRANCH;
    const baseJobCode = await generateBaseJobCode(reqBranch, insName);
    let allQueries = '';
    let itemStatusValue = '';

    // STEP 1: UPDATE
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '') {
          const escapedValue = value.toString().replace(/'/g, "''");
          fields.push(`[${name}] = N'${escapedValue}'`);
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      if (data.ITEMSTATUS === 'RECEIVE SAMPLE') {
        itemStatusValue = 'LIST ITEM';
      } else if (data.ITEMSTATUS === 'RECHECK ITEM') {
        itemStatusValue = 'LIST RECHECK';
      } else {
        itemStatusValue = 'LIST ITEM';
      }

      pushField("JobCode", baseJobCode);
      pushField("UserListJob", userListJob);
      pushField("ListJobDate", now);
      pushField("ItemStatus", itemStatusValue);
      pushField("JobStatus", 'IN PROCESS');

      let query = `
      UPDATE [WWT].[dbo].[Request]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}';
      `;
      allQueries += query + '\n';
    }
    let updateJobCode = await mssql.qurey(allQueries);
    // console.log(allQueries);
    // STEP 2: CREATE INSERT QUERY
    if (updateJobCode["rowsAffected"][0] > 0) {
      console.log("Update Success");

      let insertQuery = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }

        pushField("JobCode", baseJobCode);
        pushField("ReqBranch", data.REQBRANCH);
        pushField("ID", data.ID);
        pushField("UserListJob", userListJob);
        pushField("ListJobDate", now);
        pushField("AnalysisDue", convertDateToSQLFormat(data.ANALYSISDUE));
        pushField("CustName", data.CUSTNAME);
        pushField("SampDate", convertDateToSQLFormat(data.SAMPDATE));
        pushField("BottleCode", data.BOTTLECODE);
        if (data.INSNAME === 'ICP') {
          pushField("ItemName", data.ITEMNAME);
        }

        // AllFields.push(`(${fields.join(', ')})`);

        // INSERT
        let insert = `
        INSERT INTO [WWT].[dbo].[${insName}] (
        ${fields.map(field => field.split('=')[0].trim()).join(',\n')}
        )
        VALUES (
        ${fields.map(field => field.split('=').slice(1).join('=').trim()).join(',\n')}
        )
        `;
        insertQuery += insert + '\n';
      }
      // console.log(insertQuery);
      let insertResult = await mssql.qurey(insertQuery);

      if (insertResult["rowsAffected"][0] > 0) {
        console.log("Insert Success");
        return res.status(200).json({ message: baseJobCode });
      } else {
        console.log("Insert Failed");
        return res.status(400).json('Insert ไม่สำเร็จ');
      }

    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/listInsertJob', async (req, res) => {
  console.log("--listInsertJob--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    let insName = req.body.Instrument;
    let userListJob = req.body.UserListJob;
    const now = ISOToLocal(new Date());
    const baseJobCode = req.body.JobCode;
    let allQueries = '';
    let itemStatusValue = '';

    // STEP 1: UPDATE
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '') {
          const escapedValue = value.toString().replace(/'/g, "''");
          fields.push(`[${name}] = N'${escapedValue}'`);
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      if (data.ITEMSTATUS === 'RECEIVE SAMPLE') {
        itemStatusValue = 'LIST ITEM';
      } else if (data.ITEMSTATUS === 'RECHECK ITEM') {
        itemStatusValue = 'LIST RECHECK';
      } else {
        itemStatusValue = 'LIST ITEM';
      }

      pushField("JobCode", baseJobCode);
      pushField("UserListJob", userListJob);
      pushField("ListJobDate", now);
      pushField("ItemStatus", itemStatusValue);
      pushField("JobStatus", 'IN PROCESS');

      let query = `
      UPDATE [WWT].[dbo].[Request]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}';
      `;
      allQueries += query + '\n';
    }
    let updateJobCode = await mssql.qurey(allQueries);
    // console.log(allQueries);
    // STEP 2: CREATE INSERT QUERY
    if (updateJobCode["rowsAffected"][0] > 0) {
      console.log("Update Success");

      let insertQuery = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }

        pushField("JobCode", baseJobCode);
        pushField("ReqBranch", data.REQBRANCH);
        pushField("ID", data.ID);
        pushField("UserListJob", userListJob);
        pushField("ListJobDate", now);
        pushField("AnalysisDue", convertDateToSQLFormat(data.ANALYSISDUE));
        pushField("CustName", data.CUSTNAME);
        pushField("SampDate", convertDateToSQLFormat(data.SAMPDATE));
        pushField("BottleCode", data.BOTTLECODE);
        if (data.INSNAME === 'ICP') {
          pushField("ItemName", data.ITEMNAME);
        }

        // AllFields.push(`(${fields.join(', ')})`);

        // INSERT
        let insert = `
        INSERT INTO [WWT].[dbo].[${insName}] (
        ${fields.map(field => field.split('=')[0].trim()).join(',\n')}
        )
        VALUES (
        ${fields.map(field => field.split('=').slice(1).join('=').trim()).join(',\n')}
        )
        `;
        insertQuery += insert + '\n';
      }
      // console.log(insertQuery);
      let insertResult = await mssql.qurey(insertQuery);

      if (insertResult["rowsAffected"][0] > 0) {
        console.log("Insert Success");
        return res.status(200).json({ message: baseJobCode });
      } else {
        console.log("Insert Failed");
        return res.status(400).json('Insert ไม่สำเร็จ');
      }

    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SearchJobList', async (req, res) => {
  console.log("--SearchJobList--");

  const {
    Instrument,
    JobCode,
    ListCheck,
    FinishCheck,
    Username
  } = req.body;

  // console.log(req.body);
  // console.log(Instrument, JobCode, ListCheck, FinishCheck, Username);
  let output = [];
  let conditions = [];

  if (Instrument) {
    conditions.push(`InsName = '${Instrument}'`);
  }
  if (JobCode) {
    conditions.push(`JobCode LIKE '%${JobCode}%'`);
  }
  if (Username) {
    conditions.push(`UserListJob = '${Username}'`);
  }
  if (ListCheck && FinishCheck) {
    conditions.push(`ItemStatus IN ('LIST ITEM','LIST RECHECK', 'FINISH ITEM', 'FINISH RECHECK')`);
  } else if (ListCheck) {
    conditions.push(`ItemStatus IN ('LIST ITEM', 'LIST RECHECK')`);
  } else if (FinishCheck) {
    conditions.push(`ItemStatus IN ('FINISH ITEM', 'FINISH RECHECK')`);
  } else {
    return res.status(400).json({ message: 'กรุณาเลือก LIST หรือ FINISH' });
  }

  let whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  // console.log(whereClause);
  let query = `
  WITH R AS (
    SELECT  *,
            ROW_NUMBER() OVER (PARTITION BY JobCode ORDER BY AnalysisDue) AS rn
    FROM [WWT].[dbo].[Request]
    ${whereClause}
  )
  SELECT TOP 10000 *
  FROM R
  WHERE rn = 1
  ORDER BY ReqDate DESC;
  `;

  // console.log(query);
  try {
    let db = await mssql.qurey(query);
    if (db["recordsets"].length > 0) {
      let buffer = db["recordsets"][0];
      output = buffer;
      return res.status(200).json(output);
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }
  } catch (error) {
    console.error("Query Error:", error);
    return res.status(500).json('เกิดข้อผิดพลาดที่ server');
  }
});

router.post('/WWT/getJobDetail', async (req, res) => {
  //-------------------------------------
  console.log("--getJobDetail--");
  //-------------------------------------
  let output = [];
  let query = `SELECT I.*, R.ItemStatus
               FROM [WWT].[dbo].[${req.body.Instrument}] I
               LEFT JOIN [WWT].[dbo].[Request] R
                 ON I.ID = R.ID
               WHERE I.JobCode = '${req.body.JobCode}' AND (I.Status is null OR I.Status = 'APPROVE')
               ORDER BY I.ListJobDate, I.AnalysisDue;`;
  // console.log(query);
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
    return res.status(400).json('ไม่พบข้อมูล');
  }
  //-------------------------------------

});

router.post('/WWT/getJobDetailFromLandingPage', async (req, res) => {
  console.log("--getJobDetailFromLandingPage--");
  let output = [];

  try {
    const instrument = req.body.Instrument;
    const bottleCode = req.body.BottleCode;
    const dropdownR = req.body.DropdownR;

    let jobCodeToSearch = req.body.JobCode; // default ใช้จาก frontend
    // console.log(req.body);
    // ถ้ามีส่ง BottleCode + DropdownR เข้ามา -> เข้าเงื่อนไขตรวจสอบ
    if (bottleCode && dropdownR) {
      let checkQuery = `
        SELECT ID_${instrument} as RowID, JobCode, BottleCode
        FROM [WWT].[dbo].[${instrument}]
        WHERE BottleCode = '${bottleCode}'
      `;
      let checkDb = await mssql.qurey(checkQuery);

      if (checkDb.recordset.length > 0) {
        let rowList = checkDb.recordset;
        let selectedRow;

        if (dropdownR === "R1") {
          selectedRow = rowList.reduce((prev, curr) => prev.RowID < curr.RowID ? prev : curr);
        } else if (dropdownR === "R3") {
          selectedRow = rowList.reduce((prev, curr) => prev.RowID > curr.RowID ? prev : curr);
        }

        if (selectedRow) {
          jobCodeToSearch = selectedRow.JobCode;
        }
      }
    }

    if (!jobCodeToSearch) {
      return res.status(200).json(output);
    }
    let query = `
      SELECT I.*, R.ItemStatus
      FROM [WWT].[dbo].[${instrument}] I
      LEFT JOIN [WWT].[dbo].[Request] R
        ON I.ID = R.ID
      WHERE I.JobCode = '${jobCodeToSearch}'
      ORDER BY I.JobCode;
    `;
    // console.log(query);
    let db = await mssql.qurey(query);

    if (db.recordset.length > 0) {
      output = db.recordset;
      return res.status(200).json(output);
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดของเซิร์ฟเวอร์');
  }
});


router.post('/WWT/jobAvailable', async (req, res) => {
  //-------------------------------------
  console.log("--jobAvailable--");
  //-------------------------------------
  let output = [];
  let query = `SELECT I.*, R.JobStatus
               FROM [WWT].[dbo].[${req.body.Instrument}] I
               LEFT JOIN [WWT].[dbo].[Request] R
                 ON I.ID = R.ID AND I.JobCode = R.JobCode
               WHERE I.UserListJob = '${req.body.UserListJob}' AND R.JobStatus = 'IN PROCESS'
               ORDER BY I.JobCode;`;
  // let query = `SELECT * From [WWT].[dbo].[${req.body.Instrument}] WHERE UserListJob = '${req.body.UserListJob}' order by JobCode DESC`;
  console.log(query);
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
    return res.status(400).json('ไม่พบข้อมูล');
  }
  //-------------------------------------

});

router.post('/WWT/returnJob', async (req, res) => {
  console.log("--returnJob--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    let insName = dataRow.INSNAME;
    const baseJobCode = dataRow.JOBCODE;
    let allQueries = '';
    let itemStatusValue = '';
    // STEP 1: UPDATE

    let querySelect = `SELECT * From [WWT].[dbo].[Request] WHERE JobCode = '${baseJobCode}'`;
    // console.log(querySelect);
    let db = await mssql.qurey(querySelect);

    if (db["recordsets"].length > 0) {
      let buffer = db["recordsets"][0];
      for (const data of buffer) {
        let fields = [];
        let itemStatus = data.ItemStatus;

        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }

        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'RECEIVE SAMPLE';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }

        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');

        let query = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query + '\n';
      }
      let updateJobCode = await mssql.qurey(allQueries);
      // console.log(allQueries);
      // STEP 2: CREATE DELETE QUERY
      if (updateJobCode["rowsAffected"][0] > 0) {
        console.log("Update Success");

        let query = `
        DELETE FROM [WWT].[dbo].[${insName}] 
        WHERE JobCode = '${baseJobCode}';
        `;

        // console.log(query);
        let deleteResult = await mssql.qurey(query);

        if (deleteResult["rowsAffected"][0] > 0) {
          console.log("Insert Success");
          return res.status(200).json({ message: baseJobCode });
        } else {
          console.log("Insert Failed");
          return res.status(400).json('Insert ไม่สำเร็จ');
        }

      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทไม่สำเร็จ');
      }
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/returnRequest', async (req, res) => {
  console.log("--returnRequest--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    let insName = dataRow.JOBCODE?.split('-').pop();
    let ID = dataRow.ID;
    let BottleCode = dataRow.BOTTLECODE;
    const baseJobCode = dataRow.JOBCODE;
    let allQueries = '';
    let itemStatusValue = '';
    // STEP 1: UPDATE
    let fields = [];

    function pushField(name, value) {
      if (value !== '') {
        const escapedValue = value.toString().replace(/'/g, "''");
        fields.push(`[${name}] = N'${escapedValue}'`);
      } else {
        fields.push(`[${name}] = NULL`);
      }
    }

    let querySelect = `SELECT * From [WWT].[dbo].[Request] WHERE  BottleCode = '${BottleCode}'`;
    // console.log(querySelect);
    let db = await mssql.qurey(querySelect);

    if (db["recordsets"].length > 0) {
      let buffer = db["recordsets"][0];
      for (const data of buffer) {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'RECEIVE SAMPLE';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }

        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');

        let query = `
      UPDATE [WWT].[dbo].[Request]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}';
      `;
        allQueries += query + '\n';
        fields = [];
      }
      let updateJobCode = await mssql.qurey(allQueries);
      // console.log(allQueries);
      // STEP 2: CREATE DELETE QUERY
      if (updateJobCode["rowsAffected"][0] > 0) {
        console.log("Update Success");

        let query = `
        DELETE FROM [WWT].[dbo].[${insName}] 
        WHERE BottleCode = '${BottleCode}' AND JobCode = '${baseJobCode}';
        `;

        // console.log(query);
        let deleteResult = await mssql.qurey(query);

        if (deleteResult["rowsAffected"][0] > 0) {
          return res.status(200).json({ message: 'Success' });
        } else {
          return res.status(400).json('Delete ไม่สำเร็จ');
        }

      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทไม่สำเร็จ');
      }
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveBOD', async (req, res) => {
  console.log("--TempSaveBOD--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    let action = req.body.Action;
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Seed_Blank", data.SEED_BLANK);
      pushField("Seed_BlankSeed", data.SEED_BLANKSEED);
      pushField("Seed_SeedControl_1", data.SEED_SEEDCONTROL_1);
      pushField("Seed_SeedControl_2", data.SEED_SEEDCONTROL_2);
      pushField("Seed_GGACheck_1", data.SEED_GGACHECK_1);
      pushField("Seed_GGACheck_2", data.SEED_GGACHECK_2);
      pushField("Sample_GGACheck_1", data.SAMPLE_GGACHECK_1);
      pushField("Sample_GGACheck_2", data.SAMPLE_GGACHECK_2);
      pushField("Final_GGACheck_1", data.FINAL_GGACHECK_1);
      pushField("Final_GGACheck_2", data.FINAL_GGACHECK_2);
      pushField("Dilution_GGACheck_1", data.DILUTION_GGACHECK_1);
      pushField("Dilution_GGACheck_2", data.DILUTION_GGACHECK_2);
      pushField("DO0_B", data.DO0_B);
      pushField("DO0_BL", data.DO0_BL);
      pushField("DO0_S1", data.DO0_S1);
      pushField("DO0_S2", data.DO0_S2);
      pushField("DO0_G1", data.DO0_G1);
      pushField("DO0_G2", data.DO0_G2);
      pushField("DO5_B", data.DO5_B);
      pushField("DO5_BL", data.DO5_BL);
      pushField("DO5_S1", data.DO5_S1);
      pushField("DO5_S2", data.DO5_S2);
      pushField("DO5_G1", data.DO5_G1);
      pushField("DO5_G2", data.DO5_G2);
      pushField("DO0_DO5_B", data.DO0_DO5_B);
      pushField("DO0_DO5_BL", data.DO0_DO5_BL);
      pushField("DO0_DO5_S1", data.DO0_DO5_S1);
      pushField("DO0_DO5_S2", data.DO0_DO5_S2);
      pushField("DO0_DO5_G1", data.DO0_DO5_G1);
      pushField("DO0_DO5_G2", data.DO0_DO5_G2);
      pushField("Calculate_G1", data.CALCULATE_G1);
      pushField("Calculate_G2", data.CALCULATE_G2);
      pushField("QC_f", data.QC_F);
      pushField("QC_PercentSeed_1", data.QC_PERCENTSEED_1);
      pushField("QC_PercentSeed_2", data.QC_PERCENTSEED_2);
      pushField("QC_GGA", data.QC_GGA);
      pushField("Seed_1", data.SEED_1);
      pushField("Sample_1", data.SAMPLE_1);
      pushField("DO0_1", data.DO0_1);
      pushField("DO5_1", data.DO5_1);
      pushField("DO0_DO5_1", data.DO0_DO5_1);
      pushField("Calculate_1", data.CALCULATE_1);
      pushField("Result_1", data.RESULT_1);
      pushField("RPD_1", data.RPD_1);
      pushField("Seed_2", data.SEED_2);
      pushField("Sample_2", data.SAMPLE_2);
      pushField("DO0_2", data.DO0_2);
      pushField("DO5_2", data.DO5_2);
      pushField("DO0_DO5_2", data.DO0_DO5_2);
      pushField("Calculate_2", data.CALCULATE_2);
      pushField("Result_2", data.RESULT_2);
      pushField("RPD_2", data.RPD_2);
      pushField("Seed_3", data.SEED_3);
      pushField("Sample_3", data.SAMPLE_3);
      pushField("DO0_3", data.DO0_3);
      pushField("DO5_3", data.DO5_3);
      pushField("DO0_DO5_3", data.DO0_DO5_3);
      pushField("Calculate_3", data.CALCULATE_3);
      pushField("Result_3", data.RESULT_3);
      pushField("RPD_3", data.RPD_3);
      pushField("Seed_4", data.SEED_4);
      pushField("Sample_4", data.SAMPLE_4);
      pushField("DO0_4", data.DO0_4);
      pushField("DO5_4", data.DO5_4);
      pushField("DO0_DO5_4", data.DO0_DO5_4);
      pushField("Calculate_4", data.CALCULATE_4);
      pushField("Result_4", data.RESULT_4);
      pushField("RPD_4", data.RPD_4);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[BOD]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSavePH', async (req, res) => {
  console.log("--TempSavePH--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    let action = req.body.Action;
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("QCS_pH_1", data.QCS_pH_1);
      pushField("QCS_Temp_1", data.QCS_Temp_1);
      pushField("QCS_pH_2", data.QCS_pH_2);
      pushField("QCS_Temp_2", data.QCS_Temp_2);
      pushField("QCS_Diff", data.QCS_Diff);
      pushField("QCS_Avg", data.QCS_Avg);
      pushField("QCS_RPD", data.QCS_RPD);
      pushField("QCS_Slope", data.QCS_Slope);
      pushField("pH_1_R1", data.pH_1_R1);
      pushField("Temp_1_R1", data.Temp_1_R1);
      pushField("pH_2_R1", data.pH_2_R1);
      pushField("Temp_2_R1", data.Temp_2_R1);
      pushField("Diff_R1", data.Diff_R1);
      pushField("Avg_R1", data.Avg_R1);
      pushField("RPD", data.RPD);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[pH]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveTF', async (req, res) => {
  console.log("--TempSaveTF--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    let action = req.body.Action;
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("QCS_DilutionTime", data.QCS_DilutionTime);
      pushField("QCS_F_1", data.QCS_F_1);
      pushField("QCS_F_2", data.QCS_F_2);
      pushField("QCS_F_Xbar", data.QCS_F_Xbar);
      pushField("QCS_RPD", data.QCS_RPD);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("DilutionTime", data.DilutionTime);
      pushField("F_1", data.F_1);
      pushField("F_2", data.F_2);
      pushField("F_Xbar", data.F_Xbar);
      pushField("RPD", data.RPD);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[TF]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      // return res.status(400).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveTDS', async (req, res) => {
  console.log("--TempSaveTDS--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Blank_No", data.Blank_No);
      pushField("Blank_Sample", data.Blank_Sample);
      pushField("Blank_W1_1", data.Blank_W1_1);
      pushField("Blank_W1_2", data.Blank_W1_2);
      pushField("Blank_W1_Diff", data.Blank_W1_Diff);
      pushField("Blank_W2_1", data.Blank_W2_1);
      pushField("Blank_W2_2", data.Blank_W2_2);
      pushField("Blank_W2_Diff", data.Blank_W2_Diff);
      pushField("Blank_W2_W1", data.Blank_W2_W1);
      pushField("QCS_No", data.QCS_No);
      pushField("QCS_Sample", data.QCS_Sample);
      pushField("QCS_W1_1", data.QCS_W1_1);
      pushField("QCS_W1_2", data.QCS_W1_2);
      pushField("QCS_W1_Diff", data.QCS_W1_Diff);
      pushField("QCS_W2_1", data.QCS_W2_1);
      pushField("QCS_W2_2", data.QCS_W2_2);
      pushField("QCS_W2_Diff", data.QCS_W2_Diff);
      pushField("QCS_W2_W1", data.QCS_W2_W1);
      pushField("QCS_Cal", data.QCS_Cal);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("No_1", data.No_1);
      pushField("Sample_Use_1", data.Sample_Use_1);
      pushField("W1_1_1", data.W1_1_1);
      pushField("W1_2_1", data.W1_2_1);
      pushField("W1_Diff_1", data.W1_Diff_1);
      pushField("W2_1_1", data.W2_1_1);
      pushField("W2_2_1", data.W2_2_1);
      pushField("W2_Diff_1", data.W2_Diff_1);
      pushField("W2_W1_1", data.W2_W1_1);
      pushField("Cal_1", data.Cal_1);
      pushField("No_2", data.No_2);
      pushField("Sample_Use_2", data.Sample_Use_2);
      pushField("W1_1_2", data.W1_1_2);
      pushField("W1_2_2", data.W1_2_2);
      pushField("W1_Diff_2", data.W1_Diff_2);
      pushField("W2_1_2", data.W2_1_2);
      pushField("W2_2_2", data.W2_2_2);
      pushField("W2_Diff_2", data.W2_Diff_2);
      pushField("W2_W1_2", data.W2_W1_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("Remark_Job", data.REMARKJOB);


      let query = `
      UPDATE [WWT].[dbo].[TDS]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveTSS', async (req, res) => {
  console.log("--TempSaveTSS--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Blank_No", data.Blank_No);
      pushField("Blank_Sample", data.Blank_Sample);
      pushField("Blank_W1_1", data.Blank_W1_1);
      pushField("Blank_W1_2", data.Blank_W1_2);
      pushField("Blank_W1_Diff", data.Blank_W1_Diff);
      pushField("Blank_W2_1", data.Blank_W2_1);
      pushField("Blank_W2_2", data.Blank_W2_2);
      pushField("Blank_W2_Diff", data.Blank_W2_Diff);
      pushField("Blank_W2_W1", data.Blank_W2_W1);
      pushField("QCS_No", data.QCS_No);
      pushField("QCS_Sample", data.QCS_Sample);
      pushField("QCS_W1_1", data.QCS_W1_1);
      pushField("QCS_W1_2", data.QCS_W1_2);
      pushField("QCS_W1_Diff", data.QCS_W1_Diff);
      pushField("QCS_W2_1", data.QCS_W2_1);
      pushField("QCS_W2_2", data.QCS_W2_2);
      pushField("QCS_W2_Diff", data.QCS_W2_Diff);
      pushField("QCS_W2_W1", data.QCS_W2_W1);
      pushField("QCS_Cal", data.QCS_Cal);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("No_1", data.No_1);
      pushField("Sample_Use_1", data.Sample_Use_1);
      pushField("W1_1_1", data.W1_1_1);
      pushField("W1_2_1", data.W1_2_1);
      pushField("W1_Diff_1", data.W1_Diff_1);
      pushField("W2_1_1", data.W2_1_1);
      pushField("W2_2_1", data.W2_2_1);
      pushField("W2_Diff_1", data.W2_Diff_1);
      pushField("W2_W1_1", data.W2_W1_1);
      pushField("Cal_1", data.Cal_1);
      pushField("No_2", data.No_2);
      pushField("Sample_Use_2", data.Sample_Use_2);
      pushField("W1_1_2", data.W1_1_2);
      pushField("W1_2_2", data.W1_2_2);
      pushField("W1_Diff_2", data.W1_Diff_2);
      pushField("W2_1_2", data.W2_1_2);
      pushField("W2_2_2", data.W2_2_2);
      pushField("W2_Diff_2", data.W2_Diff_2);
      pushField("W2_W1_2", data.W2_W1_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("Remark_Job", data.REMARKJOB);


      let query = `
      UPDATE [WWT].[dbo].[TSS]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveCOD', async (req, res) => {
  console.log("--TempSaveCOD--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("STD_Titrant_Blank", data.STD_Titrant_Blank);
      pushField("STD_QC_FAS", data.STD_QC_FAS);
      pushField("Blank_Blank", data.Blank_Blank);
      pushField("LFB_Dilute", data.LFB_Dilute);
      pushField("LFB_SampleUse", data.LFB_SampleUse);
      pushField("LFB_Titrant_sample", data.LFB_Titrant_sample);
      pushField("LFB_Titrant_Blank_Sample", data.LFB_Titrant_Blank_Sample);
      pushField("LFB_Cal", data.LFB_Cal);
      pushField("LFB_Recovery", data.LFB_Recovery);
      pushField("LFM1_Dilute", data.LFM1_Dilute);
      pushField("LFM1_SampleUse", data.LFM1_SampleUse);
      pushField("LFM1_Titrant_sample", data.LFM1_Titrant_sample);
      pushField("LFM1_Titrant_Blank_Sample", data.LFM1_Titrant_Blank_Sample);
      pushField("LFM1_Cal", data.LFM1_Cal);
      pushField("LFM1_RPD", data.LFM1_RPD);
      pushField("LFM1_Recovery", data.LFM1_Recovery);
      pushField("LFM2_Dilute", data.LFM2_Dilute);
      pushField("LFM2_SampleUse", data.LFM2_SampleUse);
      pushField("LFM2_Titrant_sample", data.LFM2_Titrant_sample);
      pushField("LFM2_Titrant_Blank_Sample", data.LFM2_Titrant_Blank_Sample);
      pushField("LFM2_Cal", data.LFM2_Cal);
      pushField("LFM2_Recovery", data.LFM2_Recovery);
      pushField("Dilute_1", data.Dilute_1);
      pushField("SampleUse_1", data.SampleUse_1);
      pushField("Titrant_sample_1", data.Titrant_sample_1);
      pushField("Titrant_Blank_Sample_1", data.Titrant_Blank_Sample_1);
      pushField("Cal_1", data.Cal_1);
      pushField("Dilute_2", data.Dilute_2);
      pushField("SampleUse_2", data.SampleUse_2);
      pushField("Titrant_sample_2", data.Titrant_sample_2);
      pushField("Titrant_Blank_Sample_2", data.Titrant_Blank_Sample_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("Select_L", data.Select_L);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[COD]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/TempSaveICP', async (req, res) => {
  console.log("--TempSaveICP--");
  // const bodyString = JSON.stringify(req.body);
  // const sizeInBytes = Buffer.byteLength(bodyString, 'utf8');
  // const sizeInMB = sizeInBytes / (1024 * 1024);

  // console.log(`📦 Body size: ${sizeInMB.toFixed(2)} MB`);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    dataRow = dataRow.filter(item => item.ID && item.ID.trim() !== "");
    console.log(dataRow);
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("R2_Zn_Result", data.R2_Zn_Result);
      pushField("R2_Zn_Cal", data.R2_Zn_Cal);
      pushField("R2_Ni_Result", data.R2_Ni_Result);
      pushField("R2_Ni_Cal", data.R2_Ni_Cal);
      pushField("R2_Mn_Result", data.R2_Mn_Result);
      pushField("R2_Mn_Cal", data.R2_Mn_Cal);
      pushField("R2_Cr_Result", data.R2_Cr_Result);
      pushField("R2_Cr_Cal", data.R2_Cr_Cal);
      pushField("R2_Cu_Result", data.R2_Cu_Result);
      pushField("R2_Cu_Cal", data.R2_Cu_Cal);
      pushField("R2_Fe_Result", data.R2_Fe_Result);
      pushField("R2_Fe_Cal", data.R2_Fe_Cal);
      pushField("R2_Pb_Result", data.R2_Pb_Result);
      pushField("R2_Pb_Cal", data.R2_Pb_Cal);
      pushField("R2_Cd_Result", data.R2_Cd_Result);
      pushField("R2_Cd_Cal", data.R2_Cd_Cal);
      pushField("CCV_1_Zn_Result", data.CCV_1_Zn_Result);
      pushField("CCV_1_Zn_Cal", data.CCV_1_Zn_Cal);
      pushField("CCV_1_Ni_Result", data.CCV_1_Ni_Result);
      pushField("CCV_1_Ni_Cal", data.CCV_1_Ni_Cal);
      pushField("CCV_1_Mn_Result", data.CCV_1_Mn_Result);
      pushField("CCV_1_Mn_Cal", data.CCV_1_Mn_Cal);
      pushField("CCV_1_Cr_Result", data.CCV_1_Cr_Result);
      pushField("CCV_1_Cr_Cal", data.CCV_1_Cr_Cal);
      pushField("CCV_1_Cu_Result", data.CCV_1_Cu_Result);
      pushField("CCV_1_Cu_Cal", data.CCV_1_Cu_Cal);
      pushField("CCV_1_Fe_Result", data.CCV_1_Fe_Result);
      pushField("CCV_1_Fe_Cal", data.CCV_1_Fe_Cal);
      pushField("CCV_1_Pb_Result", data.CCV_1_Pb_Result);
      pushField("CCV_1_Pb_Cal", data.CCV_1_Pb_Cal);
      pushField("CCV_1_Cd_Result", data.CCV_1_Cd_Result);
      pushField("CCV_1_Cd_Cal", data.CCV_1_Cd_Cal);
      pushField("CCV_1_Zn_Recovery", data.CCV_1_Zn_Recovery);
      pushField("CCV_1_Ni_Recovery", data.CCV_1_Ni_Recovery);
      pushField("CCV_1_Mn_Recovery", data.CCV_1_Mn_Recovery);
      pushField("CCV_1_Cr_Recovery", data.CCV_1_Cr_Recovery);
      pushField("CCV_1_Cu_Recovery", data.CCV_1_Cu_Recovery);
      pushField("CCV_1_Fe_Recovery", data.CCV_1_Fe_Recovery);
      pushField("CCV_1_Pb_Recovery", data.CCV_1_Pb_Recovery);
      pushField("CCV_1_Cd_Recovery", data.CCV_1_Cd_Recovery);
      pushField("BLK_SampleUse", data.BLK_SampleUse);
      pushField("BLK_Dilution", data.BLK_Dilution);
      pushField("BLK_Zn_Result", data.BLK_Zn_Result);
      pushField("BLK_Zn_Cal", data.BLK_Zn_Cal);
      pushField("BLK_Ni_Result", data.BLK_Ni_Result);
      pushField("BLK_Ni_Cal", data.BLK_Ni_Cal);
      pushField("BLK_Mn_Result", data.BLK_Mn_Result);
      pushField("BLK_Mn_Cal", data.BLK_Mn_Cal);
      pushField("BLK_Cr_Result", data.BLK_Cr_Result);
      pushField("BLK_Cr_Cal", data.BLK_Cr_Cal);
      pushField("BLK_Cu_Result", data.BLK_Cu_Result);
      pushField("BLK_Cu_Cal", data.BLK_Cu_Cal);
      pushField("BLK_Fe_Result", data.BLK_Fe_Result);
      pushField("BLK_Fe_Cal", data.BLK_Fe_Cal);
      pushField("BLK_Pb_Result", data.BLK_Pb_Result);
      pushField("BLK_Pb_Cal", data.BLK_Pb_Cal);
      pushField("BLK_Cd_Result", data.BLK_Cd_Result);
      pushField("BLK_Cd_Cal", data.BLK_Cd_Cal);
      pushField("LFB_SampleUse", data.LFB_SampleUse);
      pushField("LFB_Dilution", data.LFB_Dilution);
      pushField("LFB_Zn_Result", data.LFB_Zn_Result);
      pushField("LFB_Zn_Cal", data.LFB_Zn_Cal);
      pushField("LFB_Ni_Result", data.LFB_Ni_Result);
      pushField("LFB_Ni_Cal", data.LFB_Ni_Cal);
      pushField("LFB_Mn_Result", data.LFB_Mn_Result);
      pushField("LFB_Mn_Cal", data.LFB_Mn_Cal);
      pushField("LFB_Cr_Result", data.LFB_Cr_Result);
      pushField("LFB_Cr_Cal", data.LFB_Cr_Cal);
      pushField("LFB_Cu_Result", data.LFB_Cu_Result);
      pushField("LFB_Cu_Cal", data.LFB_Cu_Cal);
      pushField("LFB_Fe_Result", data.LFB_Fe_Result);
      pushField("LFB_Fe_Cal", data.LFB_Fe_Cal);
      pushField("LFB_Pb_Result", data.LFB_Pb_Result);
      pushField("LFB_Pb_Cal", data.LFB_Pb_Cal);
      pushField("LFB_Cd_Result", data.LFB_Cd_Result);
      pushField("LFB_Cd_Cal", data.LFB_Cd_Cal);
      pushField("LFB_Zn_Recovery", data.LFB_Zn_Recovery);
      pushField("LFB_Ni_Recovery", data.LFB_Ni_Recovery);
      pushField("LFB_Mn_Recovery", data.LFB_Mn_Recovery);
      pushField("LFB_Cr_Recovery", data.LFB_Cr_Recovery);
      pushField("LFB_Cu_Recovery", data.LFB_Cu_Recovery);
      pushField("LFB_Fe_Recovery", data.LFB_Fe_Recovery);
      pushField("LFB_Pb_Recovery", data.LFB_Pb_Recovery);
      pushField("LFB_Cd_Recovery", data.LFB_Cd_Recovery);
      pushField("LFM_SampleUse", data.LFM_SampleUse);
      pushField("LFM_Dilution", data.LFM_Dilution);
      pushField("LFM_Zn_Result", data.LFM_Zn_Result);
      pushField("LFM_Zn_Cal", data.LFM_Zn_Cal);
      pushField("LFM_Ni_Result", data.LFM_Ni_Result);
      pushField("LFM_Ni_Cal", data.LFM_Ni_Cal);
      pushField("LFM_Mn_Result", data.LFM_Mn_Result);
      pushField("LFM_Mn_Cal", data.LFM_Mn_Cal);
      pushField("LFM_Cr_Result", data.LFM_Cr_Result);
      pushField("LFM_Cr_Cal", data.LFM_Cr_Cal);
      pushField("LFM_Cu_Result", data.LFM_Cu_Result);
      pushField("LFM_Cu_Cal", data.LFM_Cu_Cal);
      pushField("LFM_Fe_Result", data.LFM_Fe_Result);
      pushField("LFM_Fe_Cal", data.LFM_Fe_Cal);
      pushField("LFM_Pb_Result", data.LFM_Pb_Result);
      pushField("LFM_Pb_Cal", data.LFM_Pb_Cal);
      pushField("LFM_Cd_Result", data.LFM_Cd_Result);
      pushField("LFM_Cd_Cal", data.LFM_Cd_Cal);
      pushField("LFM_Zn_Recovery", data.LFM_Zn_Recovery);
      pushField("LFM_Ni_Recovery", data.LFM_Ni_Recovery);
      pushField("LFM_Mn_Recovery", data.LFM_Mn_Recovery);
      pushField("LFM_Cr_Recovery", data.LFM_Cr_Recovery);
      pushField("LFM_Cu_Recovery", data.LFM_Cu_Recovery);
      pushField("LFM_Fe_Recovery", data.LFM_Fe_Recovery);
      pushField("LFM_Pb_Recovery", data.LFM_Pb_Recovery);
      pushField("LFM_Cd_Recovery", data.LFM_Cd_Recovery);
      pushField("LFMD_SampleUse", data.LFMD_SampleUse);
      pushField("LFMD_Dilution", data.LFMD_Dilution);
      pushField("LFMD_Zn_Result", data.LFMD_Zn_Result);
      pushField("LFMD_Zn_Cal", data.LFMD_Zn_Cal);
      pushField("LFMD_Ni_Result", data.LFMD_Ni_Result);
      pushField("LFMD_Ni_Cal", data.LFMD_Ni_Cal);
      pushField("LFMD_Mn_Result", data.LFMD_Mn_Result);
      pushField("LFMD_Mn_Cal", data.LFMD_Mn_Cal);
      pushField("LFMD_Cr_Result", data.LFMD_Cr_Result);
      pushField("LFMD_Cr_Cal", data.LFMD_Cr_Cal);
      pushField("LFMD_Cu_Result", data.LFMD_Cu_Result);
      pushField("LFMD_Cu_Cal", data.LFMD_Cu_Cal);
      pushField("LFMD_Fe_Result", data.LFMD_Fe_Result);
      pushField("LFMD_Fe_Cal", data.LFMD_Fe_Cal);
      pushField("LFMD_Pb_Result", data.LFMD_Pb_Result);
      pushField("LFMD_Pb_Cal", data.LFMD_Pb_Cal);
      pushField("LFMD_Cd_Result", data.LFMD_Cd_Result);
      pushField("LFMD_Cd_Cal", data.LFMD_Cd_Cal);
      pushField("LFMD_Zn_Recovery", data.LFMD_Zn_Recovery);
      pushField("LFMD_Ni_Recovery", data.LFMD_Ni_Recovery);
      pushField("LFMD_Mn_Recovery", data.LFMD_Mn_Recovery);
      pushField("LFMD_Cr_Recovery", data.LFMD_Cr_Recovery);
      pushField("LFMD_Cu_Recovery", data.LFMD_Cu_Recovery);
      pushField("LFMD_Fe_Recovery", data.LFMD_Fe_Recovery);
      pushField("LFMD_Pb_Recovery", data.LFMD_Pb_Recovery);
      pushField("LFMD_Cd_Recovery", data.LFMD_Cd_Recovery);
      pushField("LFM_LFMD_Zn_Avg", data.LFM_LFMD_Zn_Avg);
      pushField("LFM_LFMD_Ni_Avg", data.LFM_LFMD_Ni_Avg);
      pushField("LFM_LFMD_Mn_Avg", data.LFM_LFMD_Mn_Avg);
      pushField("LFM_LFMD_Cr_Avg", data.LFM_LFMD_Cr_Avg);
      pushField("LFM_LFMD_Cu_Avg", data.LFM_LFMD_Cu_Avg);
      pushField("LFM_LFMD_Fe_Avg", data.LFM_LFMD_Fe_Avg);
      pushField("LFM_LFMD_Pb_Avg", data.LFM_LFMD_Pb_Avg);
      pushField("LFM_LFMD_Cd_Avg", data.LFM_LFMD_Cd_Avg);
      pushField("LFM_LFMD_Zn_RPD", data.LFM_LFMD_Zn_RPD);
      pushField("LFM_LFMD_Ni_RPD", data.LFM_LFMD_Ni_RPD);
      pushField("LFM_LFMD_Mn_RPD", data.LFM_LFMD_Mn_RPD);
      pushField("LFM_LFMD_Cr_RPD", data.LFM_LFMD_Cr_RPD);
      pushField("LFM_LFMD_Cu_RPD", data.LFM_LFMD_Cu_RPD);
      pushField("LFM_LFMD_Fe_RPD", data.LFM_LFMD_Fe_RPD);
      pushField("LFM_LFMD_Pb_RPD", data.LFM_LFMD_Pb_RPD);
      pushField("LFM_LFMD_Cd_RPD", data.LFM_LFMD_Cd_RPD);
      pushField("CCV_2_Zn_Result", data.CCV_2_Zn_Result);
      pushField("CCV_2_Zn_Cal", data.CCV_2_Zn_Cal);
      pushField("CCV_2_Ni_Result", data.CCV_2_Ni_Result);
      pushField("CCV_2_Ni_Cal", data.CCV_2_Ni_Cal);
      pushField("CCV_2_Mn_Result", data.CCV_2_Mn_Result);
      pushField("CCV_2_Mn_Cal", data.CCV_2_Mn_Cal);
      pushField("CCV_2_Cr_Result", data.CCV_2_Cr_Result);
      pushField("CCV_2_Cr_Cal", data.CCV_2_Cr_Cal);
      pushField("CCV_2_Cu_Result", data.CCV_2_Cu_Result);
      pushField("CCV_2_Cu_Cal", data.CCV_2_Cu_Cal);
      pushField("CCV_2_Fe_Result", data.CCV_2_Fe_Result);
      pushField("CCV_2_Fe_Cal", data.CCV_2_Fe_Cal);
      pushField("CCV_2_Pb_Result", data.CCV_2_Pb_Result);
      pushField("CCV_2_Pb_Cal", data.CCV_2_Pb_Cal);
      pushField("CCV_2_Cd_Result", data.CCV_2_Cd_Result);
      pushField("CCV_2_Cd_Cal", data.CCV_2_Cd_Cal);
      pushField("CCV_2_Zn_Recovery", data.CCV_2_Zn_Recovery);
      pushField("CCV_2_Ni_Recovery", data.CCV_2_Ni_Recovery);
      pushField("CCV_2_Mn_Recovery", data.CCV_2_Mn_Recovery);
      pushField("CCV_2_Cr_Recovery", data.CCV_2_Cr_Recovery);
      pushField("CCV_2_Cu_Recovery", data.CCV_2_Cu_Recovery);
      pushField("CCV_2_Fe_Recovery", data.CCV_2_Fe_Recovery);
      pushField("CCV_2_Pb_Recovery", data.CCV_2_Pb_Recovery);
      pushField("CCV_2_Cd_Recovery", data.CCV_2_Cd_Recovery);
      pushField("CCV_3_Zn_Result", data.CCV_3_Zn_Result);
      pushField("CCV_3_Zn_Cal", data.CCV_3_Zn_Cal);
      pushField("CCV_3_Ni_Result", data.CCV_3_Ni_Result);
      pushField("CCV_3_Ni_Cal", data.CCV_3_Ni_Cal);
      pushField("CCV_3_Mn_Result", data.CCV_3_Mn_Result);
      pushField("CCV_3_Mn_Cal", data.CCV_3_Mn_Cal);
      pushField("CCV_3_Cr_Result", data.CCV_3_Cr_Result);
      pushField("CCV_3_Cr_Cal", data.CCV_3_Cr_Cal);
      pushField("CCV_3_Cu_Result", data.CCV_3_Cu_Result);
      pushField("CCV_3_Cu_Cal", data.CCV_3_Cu_Cal);
      pushField("CCV_3_Fe_Result", data.CCV_3_Fe_Result);
      pushField("CCV_3_Fe_Cal", data.CCV_3_Fe_Cal);
      pushField("CCV_3_Pb_Result", data.CCV_3_Pb_Result);
      pushField("CCV_3_Pb_Cal", data.CCV_3_Pb_Cal);
      pushField("CCV_3_Cd_Result", data.CCV_3_Cd_Result);
      pushField("CCV_3_Cd_Cal", data.CCV_3_Cd_Cal);
      pushField("CCV_3_Zn_Recovery", data.CCV_3_Zn_Recovery);
      pushField("CCV_3_Ni_Recovery", data.CCV_3_Ni_Recovery);
      pushField("CCV_3_Mn_Recovery", data.CCV_3_Mn_Recovery);
      pushField("CCV_3_Cr_Recovery", data.CCV_3_Cr_Recovery);
      pushField("CCV_3_Cu_Recovery", data.CCV_3_Cu_Recovery);
      pushField("CCV_3_Fe_Recovery", data.CCV_3_Fe_Recovery);
      pushField("CCV_3_Pb_Recovery", data.CCV_3_Pb_Recovery);
      pushField("CCV_3_Cd_Recovery", data.CCV_3_Cd_Recovery);
      pushField("SampleUse_1_1", data.SampleUse_1_1);
      pushField("Dilution_1_1", data.Dilution_1_1);
      pushField("Zn_Result_1_1", data.Zn_Result_1_1);
      pushField("Zn_Cal_1_1", data.Zn_Cal_1_1);
      pushField("Ni_Result_1_1", data.Ni_Result_1_1);
      pushField("Ni_Cal_1_1", data.Ni_Cal_1_1);
      pushField("Mn_Result_1_1", data.Mn_Result_1_1);
      pushField("Mn_Cal_1_1", data.Mn_Cal_1_1);
      pushField("Cr_Result_1_1", data.Cr_Result_1_1);
      pushField("Cr_Cal_1_1", data.Cr_Cal_1_1);
      pushField("Cu_Result_1_1", data.Cu_Result_1_1);
      pushField("Cu_Cal_1_1", data.Cu_Cal_1_1);
      pushField("Fe_Result_1_1", data.Fe_Result_1_1);
      pushField("Fe_Cal_1_1", data.Fe_Cal_1_1);
      pushField("Pb_Result_1_1", data.Pb_Result_1_1);
      pushField("Pb_Cal_1_1", data.Pb_Cal_1_1);
      pushField("Cd_Result_1_1", data.Cd_Result_1_1);
      pushField("Cd_Cal_1_1", data.Cd_Cal_1_1);
      pushField("SampleUse_1_2", data.SampleUse_1_2);
      pushField("Dilution_1_2", data.Dilution_1_2);
      pushField("Zn_Result_1_2", data.Zn_Result_1_2);
      pushField("Zn_Cal_1_2", data.Zn_Cal_1_2);
      pushField("Ni_Result_1_2", data.Ni_Result_1_2);
      pushField("Ni_Cal_1_2", data.Ni_Cal_1_2);
      pushField("Mn_Result_1_2", data.Mn_Result_1_2);
      pushField("Mn_Cal_1_2", data.Mn_Cal_1_2);
      pushField("Cr_Result_1_2", data.Cr_Result_1_2);
      pushField("Cr_Cal_1_2", data.Cr_Cal_1_2);
      pushField("Cu_Result_1_2", data.Cu_Result_1_2);
      pushField("Cu_Cal_1_2", data.Cu_Cal_1_2);
      pushField("Fe_Result_1_2", data.Fe_Result_1_2);
      pushField("Fe_Cal_1_2", data.Fe_Cal_1_2);
      pushField("Pb_Result_1_2", data.Pb_Result_1_2);
      pushField("Pb_Cal_1_2", data.Pb_Cal_1_2);
      pushField("Cd_Result_1_2", data.Cd_Result_1_2);
      pushField("Cd_Cal_1_2", data.Cd_Cal_1_2);
      pushField("SampleUse_1_3", data.SampleUse_1_3);
      pushField("Dilution_1_3", data.Dilution_1_3);
      pushField("Zn_Result_1_3", data.Zn_Result_1_3);
      pushField("Zn_Cal_1_3", data.Zn_Cal_1_3);
      pushField("Ni_Result_1_3", data.Ni_Result_1_3);
      pushField("Ni_Cal_1_3", data.Ni_Cal_1_3);
      pushField("Mn_Result_1_3", data.Mn_Result_1_3);
      pushField("Mn_Cal_1_3", data.Mn_Cal_1_3);
      pushField("Cr_Result_1_3", data.Cr_Result_1_3);
      pushField("Cr_Cal_1_3", data.Cr_Cal_1_3);
      pushField("Cu_Result_1_3", data.Cu_Result_1_3);
      pushField("Cu_Cal_1_3", data.Cu_Cal_1_3);
      pushField("Fe_Result_1_3", data.Fe_Result_1_3);
      pushField("Fe_Cal_1_3", data.Fe_Cal_1_3);
      pushField("Pb_Result_1_3", data.Pb_Result_1_3);
      pushField("Pb_Cal_1_3", data.Pb_Cal_1_3);
      pushField("Cd_Result_1_3", data.Cd_Result_1_3);
      pushField("Cd_Cal_1_3", data.Cd_Cal_1_3);
      pushField("SampleUse_1_4", data.SampleUse_1_4);
      pushField("Dilution_1_4", data.Dilution_1_4);
      pushField("Zn_Result_1_4", data.Zn_Result_1_4);
      pushField("Zn_Cal_1_4", data.Zn_Cal_1_4);
      pushField("Ni_Result_1_4", data.Ni_Result_1_4);
      pushField("Ni_Cal_1_4", data.Ni_Cal_1_4);
      pushField("Mn_Result_1_4", data.Mn_Result_1_4);
      pushField("Mn_Cal_1_4", data.Mn_Cal_1_4);
      pushField("Cr_Result_1_4", data.Cr_Result_1_4);
      pushField("Cr_Cal_1_4", data.Cr_Cal_1_4);
      pushField("Cu_Result_1_4", data.Cu_Result_1_4);
      pushField("Cu_Cal_1_4", data.Cu_Cal_1_4);
      pushField("Fe_Result_1_4", data.Fe_Result_1_4);
      pushField("Fe_Cal_1_4", data.Fe_Cal_1_4);
      pushField("Pb_Result_1_4", data.Pb_Result_1_4);
      pushField("Pb_Cal_1_4", data.Pb_Cal_1_4);
      pushField("Cd_Result_1_4", data.Cd_Result_1_4);
      pushField("Cd_Cal_1_4", data.Cd_Cal_1_4);
      pushField("SampleUse_1_5", data.SampleUse_1_5);
      pushField("Dilution_1_5", data.Dilution_1_5);
      pushField("Zn_Result_1_5", data.Zn_Result_1_5);
      pushField("Zn_Cal_1_5", data.Zn_Cal_1_5);
      pushField("Ni_Result_1_5", data.Ni_Result_1_5);
      pushField("Ni_Cal_1_5", data.Ni_Cal_1_5);
      pushField("Mn_Result_1_5", data.Mn_Result_1_5);
      pushField("Mn_Cal_1_5", data.Mn_Cal_1_5);
      pushField("Cr_Result_1_5", data.Cr_Result_1_5);
      pushField("Cr_Cal_1_5", data.Cr_Cal_1_5);
      pushField("Cu_Result_1_5", data.Cu_Result_1_5);
      pushField("Cu_Cal_1_5", data.Cu_Cal_1_5);
      pushField("Fe_Result_1_5", data.Fe_Result_1_5);
      pushField("Fe_Cal_1_5", data.Fe_Cal_1_5);
      pushField("Pb_Result_1_5", data.Pb_Result_1_5);
      pushField("Pb_Cal_1_5", data.Pb_Cal_1_5);
      pushField("Cd_Result_1_5", data.Cd_Result_1_5);
      pushField("Cd_Cal_1_5", data.Cd_Cal_1_5);
      pushField("SampleUse_2_1", data.SampleUse_2_1);
      pushField("Dilution_2_1", data.Dilution_2_1);
      pushField("Zn_Result_2_1", data.Zn_Result_2_1);
      pushField("Zn_Cal_2_1", data.Zn_Cal_2_1);
      pushField("Ni_Result_2_1", data.Ni_Result_2_1);
      pushField("Ni_Cal_2_1", data.Ni_Cal_2_1);
      pushField("Mn_Result_2_1", data.Mn_Result_2_1);
      pushField("Mn_Cal_2_1", data.Mn_Cal_2_1);
      pushField("Cr_Result_2_1", data.Cr_Result_2_1);
      pushField("Cr_Cal_2_1", data.Cr_Cal_2_1);
      pushField("Cu_Result_2_1", data.Cu_Result_2_1);
      pushField("Cu_Cal_2_1", data.Cu_Cal_2_1);
      pushField("Fe_Result_2_1", data.Fe_Result_2_1);
      pushField("Fe_Cal_2_1", data.Fe_Cal_2_1);
      pushField("Pb_Result_2_1", data.Pb_Result_2_1);
      pushField("Pb_Cal_2_1", data.Pb_Cal_2_1);
      pushField("Cd_Result_2_1", data.Cd_Result_2_1);
      pushField("Cd_Cal_2_1", data.Cd_Cal_2_1);
      pushField("SampleUse_2_2", data.SampleUse_2_2);
      pushField("Dilution_2_2", data.Dilution_2_2);
      pushField("Zn_Result_2_2", data.Zn_Result_2_2);
      pushField("Zn_Cal_2_2", data.Zn_Cal_2_2);
      pushField("Ni_Result_2_2", data.Ni_Result_2_2);
      pushField("Ni_Cal_2_2", data.Ni_Cal_2_2);
      pushField("Mn_Result_2_2", data.Mn_Result_2_2);
      pushField("Mn_Cal_2_2", data.Mn_Cal_2_2);
      pushField("Cr_Result_2_2", data.Cr_Result_2_2);
      pushField("Cr_Cal_2_2", data.Cr_Cal_2_2);
      pushField("Cu_Result_2_2", data.Cu_Result_2_2);
      pushField("Cu_Cal_2_2", data.Cu_Cal_2_2);
      pushField("Fe_Result_2_2", data.Fe_Result_2_2);
      pushField("Fe_Cal_2_2", data.Fe_Cal_2_2);
      pushField("Pb_Result_2_2", data.Pb_Result_2_2);
      pushField("Pb_Cal_2_2", data.Pb_Cal_2_2);
      pushField("Cd_Result_2_2", data.Cd_Result_2_2);
      pushField("Cd_Cal_2_2", data.Cd_Cal_2_2);
      pushField("SampleUse_2_3", data.SampleUse_2_3);
      pushField("Dilution_2_3", data.Dilution_2_3);
      pushField("Zn_Result_2_3", data.Zn_Result_2_3);
      pushField("Zn_Cal_2_3", data.Zn_Cal_2_3);
      pushField("Ni_Result_2_3", data.Ni_Result_2_3);
      pushField("Ni_Cal_2_3", data.Ni_Cal_2_3);
      pushField("Mn_Result_2_3", data.Mn_Result_2_3);
      pushField("Mn_Cal_2_3", data.Mn_Cal_2_3);
      pushField("Cr_Result_2_3", data.Cr_Result_2_3);
      pushField("Cr_Cal_2_3", data.Cr_Cal_2_3);
      pushField("Cu_Result_2_3", data.Cu_Result_2_3);
      pushField("Cu_Cal_2_3", data.Cu_Cal_2_3);
      pushField("Fe_Result_2_3", data.Fe_Result_2_3);
      pushField("Fe_Cal_2_3", data.Fe_Cal_2_3);
      pushField("Pb_Result_2_3", data.Pb_Result_2_3);
      pushField("Pb_Cal_2_3", data.Pb_Cal_2_3);
      pushField("Cd_Result_2_3", data.Cd_Result_2_3);
      pushField("Cd_Cal_2_3", data.Cd_Cal_2_3);
      pushField("SampleUse_2_4", data.SampleUse_2_4);
      pushField("Dilution_2_4", data.Dilution_2_4);
      pushField("Zn_Result_2_4", data.Zn_Result_2_4);
      pushField("Zn_Cal_2_4", data.Zn_Cal_2_4);
      pushField("Ni_Result_2_4", data.Ni_Result_2_4);
      pushField("Ni_Cal_2_4", data.Ni_Cal_2_4);
      pushField("Mn_Result_2_4", data.Mn_Result_2_4);
      pushField("Mn_Cal_2_4", data.Mn_Cal_2_4);
      pushField("Cr_Result_2_4", data.Cr_Result_2_4);
      pushField("Cr_Cal_2_4", data.Cr_Cal_2_4);
      pushField("Cu_Result_2_4", data.Cu_Result_2_4);
      pushField("Cu_Cal_2_4", data.Cu_Cal_2_4);
      pushField("Fe_Result_2_4", data.Fe_Result_2_4);
      pushField("Fe_Cal_2_4", data.Fe_Cal_2_4);
      pushField("Pb_Result_2_4", data.Pb_Result_2_4);
      pushField("Pb_Cal_2_4", data.Pb_Cal_2_4);
      pushField("Cd_Result_2_4", data.Cd_Result_2_4);
      pushField("Cd_Cal_2_4", data.Cd_Cal_2_4);
      pushField("SampleUse_2_5", data.SampleUse_2_5);
      pushField("Dilution_2_5", data.Dilution_2_5);
      pushField("Zn_Result_2_5", data.Zn_Result_2_5);
      pushField("Zn_Cal_2_5", data.Zn_Cal_2_5);
      pushField("Ni_Result_2_5", data.Ni_Result_2_5);
      pushField("Ni_Cal_2_5", data.Ni_Cal_2_5);
      pushField("Mn_Result_2_5", data.Mn_Result_2_5);
      pushField("Mn_Cal_2_5", data.Mn_Cal_2_5);
      pushField("Cr_Result_2_5", data.Cr_Result_2_5);
      pushField("Cr_Cal_2_5", data.Cr_Cal_2_5);
      pushField("Cu_Result_2_5", data.Cu_Result_2_5);
      pushField("Cu_Cal_2_5", data.Cu_Cal_2_5);
      pushField("Fe_Result_2_5", data.Fe_Result_2_5);
      pushField("Fe_Cal_2_5", data.Fe_Cal_2_5);
      pushField("Pb_Result_2_5", data.Pb_Result_2_5);
      pushField("Pb_Cal_2_5", data.Pb_Cal_2_5);
      pushField("Cd_Result_2_5", data.Cd_Result_2_5);
      pushField("Cd_Cal_2_5", data.Cd_Cal_2_5);
      pushField("Zn_Avg", data.Zn_Avg);
      pushField("Zn_RPD", data.Zn_RPD);
      pushField("Ni_Avg", data.Ni_Avg);
      pushField("Ni_RPD", data.Ni_RPD);
      pushField("Mn_Avg", data.Mn_Avg);
      pushField("Mn_RPD", data.Mn_RPD);
      pushField("Cr_Avg", data.Cr_Avg);
      pushField("Cr_RPD", data.Cr_RPD);
      pushField("Cu_Avg", data.Cu_Avg);
      pushField("Cu_RPD", data.Cu_RPD);
      pushField("Fe_Avg", data.Fe_Avg);
      pushField("Fe_RPD", data.Fe_RPD);
      pushField("Pb_Avg", data.Pb_Avg);
      pushField("Pb_RPD", data.Pb_RPD);
      pushField("Cd_Avg", data.Cd_Avg);
      pushField("Cd_RPD", data.Cd_RPD);
      pushField("Select_L", data.Select_L);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[ICP]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveBOD', async (req, res) => {
  console.log("--SaveBOD--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Seed_Blank", data.SEED_BLANK);
      pushField("Seed_BlankSeed", data.SEED_BLANKSEED);
      pushField("Seed_SeedControl_1", data.SEED_SEEDCONTROL_1);
      pushField("Seed_SeedControl_2", data.SEED_SEEDCONTROL_2);
      pushField("Seed_GGACheck_1", data.SEED_GGACHECK_1);
      pushField("Seed_GGACheck_2", data.SEED_GGACHECK_2);
      pushField("Sample_GGACheck_1", data.SAMPLE_GGACHECK_1);
      pushField("Sample_GGACheck_2", data.SAMPLE_GGACHECK_2);
      pushField("Final_GGACheck_1", data.FINAL_GGACHECK_1);
      pushField("Final_GGACheck_2", data.FINAL_GGACHECK_2);
      pushField("Dilution_GGACheck_1", data.DILUTION_GGACHECK_1);
      pushField("Dilution_GGACheck_2", data.DILUTION_GGACHECK_2);
      pushField("DO0_B", data.DO0_B);
      pushField("DO0_BL", data.DO0_BL);
      pushField("DO0_S1", data.DO0_S1);
      pushField("DO0_S2", data.DO0_S2);
      pushField("DO0_G1", data.DO0_G1);
      pushField("DO0_G2", data.DO0_G2);
      pushField("DO5_B", data.DO5_B);
      pushField("DO5_BL", data.DO5_BL);
      pushField("DO5_S1", data.DO5_S1);
      pushField("DO5_S2", data.DO5_S2);
      pushField("DO5_G1", data.DO5_G1);
      pushField("DO5_G2", data.DO5_G2);
      pushField("DO0_DO5_B", data.DO0_DO5_B);
      pushField("DO0_DO5_BL", data.DO0_DO5_BL);
      pushField("DO0_DO5_S1", data.DO0_DO5_S1);
      pushField("DO0_DO5_S2", data.DO0_DO5_S2);
      pushField("DO0_DO5_G1", data.DO0_DO5_G1);
      pushField("DO0_DO5_G2", data.DO0_DO5_G2);
      pushField("Calculate_G1", data.CALCULATE_G1);
      pushField("Calculate_G2", data.CALCULATE_G2);
      pushField("QC_f", data.QC_F);
      pushField("QC_PercentSeed_1", data.QC_PERCENTSEED_1);
      pushField("QC_PercentSeed_2", data.QC_PERCENTSEED_2);
      pushField("QC_GGA", data.QC_GGA);
      pushField("Seed_1", data.SEED_1);
      pushField("Sample_1", data.SAMPLE_1);
      pushField("DO0_1", data.DO0_1);
      pushField("DO5_1", data.DO5_1);
      pushField("DO0_DO5_1", data.DO0_DO5_1);
      pushField("Calculate_1", data.CALCULATE_1);
      pushField("Result_1", data.RESULT_1);
      pushField("RPD_1", data.RPD_1);
      pushField("Seed_2", data.SEED_2);
      pushField("Sample_2", data.SAMPLE_2);
      pushField("DO0_2", data.DO0_2);
      pushField("DO5_2", data.DO5_2);
      pushField("DO0_DO5_2", data.DO0_DO5_2);
      pushField("Calculate_2", data.CALCULATE_2);
      pushField("Result_2", data.RESULT_2);
      pushField("RPD_2", data.RPD_2);
      pushField("Seed_3", data.SEED_3);
      pushField("Sample_3", data.SAMPLE_3);
      pushField("DO0_3", data.DO0_3);
      pushField("DO5_3", data.DO5_3);
      pushField("DO0_DO5_3", data.DO0_DO5_3);
      pushField("Calculate_3", data.CALCULATE_3);
      pushField("Result_3", data.RESULT_3);
      pushField("RPD_3", data.RPD_3);
      pushField("Seed_4", data.SEED_4);
      pushField("Sample_4", data.SAMPLE_4);
      pushField("DO0_4", data.DO0_4);
      pushField("DO5_4", data.DO5_4);
      pushField("DO0_DO5_4", data.DO0_DO5_4);
      pushField("Calculate_4", data.CALCULATE_4);
      pushField("Result_4", data.RESULT_4);
      pushField("RPD_4", data.RPD_4);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[BOD]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(insertQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SavePH', async (req, res) => {
  console.log("--SavePH--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("QCS_pH_1", data.QCS_pH_1);
      pushField("QCS_Temp_1", data.QCS_Temp_1);
      pushField("QCS_pH_2", data.QCS_pH_2);
      pushField("QCS_Temp_2", data.QCS_Temp_2);
      pushField("QCS_Diff", data.QCS_Diff);
      pushField("QCS_Avg", data.QCS_Avg);
      pushField("QCS_RPD", data.QCS_RPD);
      pushField("QCS_Slope", data.QCS_Slope);
      pushField("pH_1_R1", data.pH_1_R1);
      pushField("Temp_1_R1", data.Temp_1_R1);
      pushField("pH_2_R1", data.pH_2_R1);
      pushField("Temp_2_R1", data.Temp_2_R1);
      pushField("Diff_R1", data.Diff_R1);
      pushField("Avg_R1", data.Avg_R1);
      pushField("RPD", data.RPD);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[pH]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(insertQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveTF', async (req, res) => {
  console.log("--SaveTF--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("QCS_DilutionTime", data.QCS_DilutionTime);
      pushField("QCS_F_1", data.QCS_F_1);
      pushField("QCS_F_2", data.QCS_F_2);
      pushField("QCS_F_Xbar", data.QCS_F_Xbar);
      pushField("QCS_RPD", data.QCS_RPD);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("DilutionTime", data.DilutionTime);
      pushField("F_1", data.F_1);
      pushField("F_2", data.F_2);
      pushField("F_Xbar", data.F_Xbar);
      pushField("RPD", data.RPD);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[TF]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(insertQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveTDS', async (req, res) => {
  console.log("--SaveTDS--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Blank_No", data.Blank_No);
      pushField("Blank_Sample", data.Blank_Sample);
      pushField("Blank_W1_1", data.Blank_W1_1);
      pushField("Blank_W1_2", data.Blank_W1_2);
      pushField("Blank_W1_Diff", data.Blank_W1_Diff);
      pushField("Blank_W2_1", data.Blank_W2_1);
      pushField("Blank_W2_2", data.Blank_W2_2);
      pushField("Blank_W2_Diff", data.Blank_W2_Diff);
      pushField("Blank_W2_W1", data.Blank_W2_W1);
      pushField("QCS_No", data.QCS_No);
      pushField("QCS_Sample", data.QCS_Sample);
      pushField("QCS_W1_1", data.QCS_W1_1);
      pushField("QCS_W1_2", data.QCS_W1_2);
      pushField("QCS_W1_Diff", data.QCS_W1_Diff);
      pushField("QCS_W2_1", data.QCS_W2_1);
      pushField("QCS_W2_2", data.QCS_W2_2);
      pushField("QCS_W2_Diff", data.QCS_W2_Diff);
      pushField("QCS_W2_W1", data.QCS_W2_W1);
      pushField("QCS_Cal", data.QCS_Cal);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("No_1", data.No_1);
      pushField("Sample_Use_1", data.Sample_Use_1);
      pushField("W1_1_1", data.W1_1_1);
      pushField("W1_2_1", data.W1_2_1);
      pushField("W1_Diff_1", data.W1_Diff_1);
      pushField("W2_1_1", data.W2_1_1);
      pushField("W2_2_1", data.W2_2_1);
      pushField("W2_Diff_1", data.W2_Diff_1);
      pushField("W2_W1_1", data.W2_W1_1);
      pushField("Cal_1", data.Cal_1);
      pushField("No_2", data.No_2);
      pushField("Sample_Use_2", data.Sample_Use_2);
      pushField("W1_1_2", data.W1_1_2);
      pushField("W1_2_2", data.W1_2_2);
      pushField("W1_Diff_2", data.W1_Diff_2);
      pushField("W2_1_2", data.W2_1_2);
      pushField("W2_2_2", data.W2_2_2);
      pushField("W2_Diff_2", data.W2_Diff_2);
      pushField("W2_W1_2", data.W2_W1_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[TDS]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      console.log(updateQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveTSS', async (req, res) => {
  console.log("--SaveTSS--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("Blank_No", data.Blank_No);
      pushField("Blank_Sample", data.Blank_Sample);
      pushField("Blank_W1_1", data.Blank_W1_1);
      pushField("Blank_W1_2", data.Blank_W1_2);
      pushField("Blank_W1_Diff", data.Blank_W1_Diff);
      pushField("Blank_W2_1", data.Blank_W2_1);
      pushField("Blank_W2_2", data.Blank_W2_2);
      pushField("Blank_W2_Diff", data.Blank_W2_Diff);
      pushField("Blank_W2_W1", data.Blank_W2_W1);
      pushField("QCS_No", data.QCS_No);
      pushField("QCS_Sample", data.QCS_Sample);
      pushField("QCS_W1_1", data.QCS_W1_1);
      pushField("QCS_W1_2", data.QCS_W1_2);
      pushField("QCS_W1_Diff", data.QCS_W1_Diff);
      pushField("QCS_W2_1", data.QCS_W2_1);
      pushField("QCS_W2_2", data.QCS_W2_2);
      pushField("QCS_W2_Diff", data.QCS_W2_Diff);
      pushField("QCS_W2_W1", data.QCS_W2_W1);
      pushField("QCS_Cal", data.QCS_Cal);
      pushField("QCS_Recovery", data.QCS_Recovery);
      pushField("No_1", data.No_1);
      pushField("Sample_Use_1", data.Sample_Use_1);
      pushField("W1_1_1", data.W1_1_1);
      pushField("W1_2_1", data.W1_2_1);
      pushField("W1_Diff_1", data.W1_Diff_1);
      pushField("W2_1_1", data.W2_1_1);
      pushField("W2_2_1", data.W2_2_1);
      pushField("W2_Diff_1", data.W2_Diff_1);
      pushField("W2_W1_1", data.W2_W1_1);
      pushField("Cal_1", data.Cal_1);
      pushField("No_2", data.No_2);
      pushField("Sample_Use_2", data.Sample_Use_2);
      pushField("W1_1_2", data.W1_1_2);
      pushField("W1_2_2", data.W1_2_2);
      pushField("W1_Diff_2", data.W1_Diff_2);
      pushField("W2_1_2", data.W2_1_2);
      pushField("W2_2_2", data.W2_2_2);
      pushField("W2_Diff_2", data.W2_Diff_2);
      pushField("W2_W1_2", data.W2_W1_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[TSS]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(updateQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveCOD', async (req, res) => {
  console.log("--SaveCOD--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("STD_Titrant_Blank", data.STD_Titrant_Blank);
      pushField("STD_QC_FAS", data.STD_QC_FAS);
      pushField("Blank_Blank", data.Blank_Blank);
      pushField("LFB_Dilute", data.LFB_Dilute);
      pushField("LFB_SampleUse", data.LFB_SampleUse);
      pushField("LFB_Titrant_sample", data.LFB_Titrant_sample);
      pushField("LFB_Titrant_Blank_Sample", data.LFB_Titrant_Blank_Sample);
      pushField("LFB_Cal", data.LFB_Cal);
      pushField("LFB_Recovery", data.LFB_Recovery);
      pushField("LFM1_Dilute", data.LFM1_Dilute);
      pushField("LFM1_SampleUse", data.LFM1_SampleUse);
      pushField("LFM1_Titrant_sample", data.LFM1_Titrant_sample);
      pushField("LFM1_Titrant_Blank_Sample", data.LFM1_Titrant_Blank_Sample);
      pushField("LFM1_Cal", data.LFM1_Cal);
      pushField("LFM1_RPD", data.LFM1_RPD);
      pushField("LFM1_Recovery", data.LFM1_Recovery);
      pushField("LFM2_Dilute", data.LFM2_Dilute);
      pushField("LFM2_SampleUse", data.LFM2_SampleUse);
      pushField("LFM2_Titrant_sample", data.LFM2_Titrant_sample);
      pushField("LFM2_Titrant_Blank_Sample", data.LFM2_Titrant_Blank_Sample);
      pushField("LFM2_Cal", data.LFM2_Cal);
      pushField("LFM2_Recovery", data.LFM2_Recovery);
      pushField("Dilute_1", data.Dilute_1);
      pushField("SampleUse_1", data.SampleUse_1);
      pushField("Titrant_sample_1", data.Titrant_sample_1);
      pushField("Titrant_Blank_Sample_1", data.Titrant_Blank_Sample_1);
      pushField("Cal_1", data.Cal_1);
      pushField("Dilute_2", data.Dilute_2);
      pushField("SampleUse_2", data.SampleUse_2);
      pushField("Titrant_sample_2", data.Titrant_sample_2);
      pushField("Titrant_Blank_Sample_2", data.Titrant_Blank_Sample_2);
      pushField("Cal_2", data.Cal_2);
      pushField("Avg", data.Avg);
      pushField("RPD", data.RPD);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[COD]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(updateQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/SaveICP', async (req, res) => {
  console.log("--SaveICP--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("R2_Zn_Result", data.R2_Zn_Result);
      pushField("R2_Zn_Cal", data.R2_Zn_Cal);
      pushField("R2_Ni_Result", data.R2_Ni_Result);
      pushField("R2_Ni_Cal", data.R2_Ni_Cal);
      pushField("R2_Mn_Result", data.R2_Mn_Result);
      pushField("R2_Mn_Cal", data.R2_Mn_Cal);
      pushField("R2_Cr_Result", data.R2_Cr_Result);
      pushField("R2_Cr_Cal", data.R2_Cr_Cal);
      pushField("R2_Cu_Result", data.R2_Cu_Result);
      pushField("R2_Cu_Cal", data.R2_Cu_Cal);
      pushField("R2_Fe_Result", data.R2_Fe_Result);
      pushField("R2_Fe_Cal", data.R2_Fe_Cal);
      pushField("R2_Pb_Result", data.R2_Pb_Result);
      pushField("R2_Pb_Cal", data.R2_Pb_Cal);
      pushField("R2_Cd_Result", data.R2_Cd_Result);
      pushField("R2_Cd_Cal", data.R2_Cd_Cal);
      pushField("CCV_1_Zn_Result", data.CCV_1_Zn_Result);
      pushField("CCV_1_Zn_Cal", data.CCV_1_Zn_Cal);
      pushField("CCV_1_Ni_Result", data.CCV_1_Ni_Result);
      pushField("CCV_1_Ni_Cal", data.CCV_1_Ni_Cal);
      pushField("CCV_1_Mn_Result", data.CCV_1_Mn_Result);
      pushField("CCV_1_Mn_Cal", data.CCV_1_Mn_Cal);
      pushField("CCV_1_Cr_Result", data.CCV_1_Cr_Result);
      pushField("CCV_1_Cr_Cal", data.CCV_1_Cr_Cal);
      pushField("CCV_1_Cu_Result", data.CCV_1_Cu_Result);
      pushField("CCV_1_Cu_Cal", data.CCV_1_Cu_Cal);
      pushField("CCV_1_Fe_Result", data.CCV_1_Fe_Result);
      pushField("CCV_1_Fe_Cal", data.CCV_1_Fe_Cal);
      pushField("CCV_1_Pb_Result", data.CCV_1_Pb_Result);
      pushField("CCV_1_Pb_Cal", data.CCV_1_Pb_Cal);
      pushField("CCV_1_Cd_Result", data.CCV_1_Cd_Result);
      pushField("CCV_1_Cd_Cal", data.CCV_1_Cd_Cal);
      pushField("CCV_1_Zn_Recovery", data.CCV_1_Zn_Recovery);
      pushField("CCV_1_Ni_Recovery", data.CCV_1_Ni_Recovery);
      pushField("CCV_1_Mn_Recovery", data.CCV_1_Mn_Recovery);
      pushField("CCV_1_Cr_Recovery", data.CCV_1_Cr_Recovery);
      pushField("CCV_1_Cu_Recovery", data.CCV_1_Cu_Recovery);
      pushField("CCV_1_Fe_Recovery", data.CCV_1_Fe_Recovery);
      pushField("CCV_1_Pb_Recovery", data.CCV_1_Pb_Recovery);
      pushField("CCV_1_Cd_Recovery", data.CCV_1_Cd_Recovery);
      pushField("BLK_SampleUse", data.BLK_SampleUse);
      pushField("BLK_Dilution", data.BLK_Dilution);
      pushField("BLK_Zn_Result", data.BLK_Zn_Result);
      pushField("BLK_Zn_Cal", data.BLK_Zn_Cal);
      pushField("BLK_Ni_Result", data.BLK_Ni_Result);
      pushField("BLK_Ni_Cal", data.BLK_Ni_Cal);
      pushField("BLK_Mn_Result", data.BLK_Mn_Result);
      pushField("BLK_Mn_Cal", data.BLK_Mn_Cal);
      pushField("BLK_Cr_Result", data.BLK_Cr_Result);
      pushField("BLK_Cr_Cal", data.BLK_Cr_Cal);
      pushField("BLK_Cu_Result", data.BLK_Cu_Result);
      pushField("BLK_Cu_Cal", data.BLK_Cu_Cal);
      pushField("BLK_Fe_Result", data.BLK_Fe_Result);
      pushField("BLK_Fe_Cal", data.BLK_Fe_Cal);
      pushField("BLK_Pb_Result", data.BLK_Pb_Result);
      pushField("BLK_Pb_Cal", data.BLK_Pb_Cal);
      pushField("BLK_Cd_Result", data.BLK_Cd_Result);
      pushField("BLK_Cd_Cal", data.BLK_Cd_Cal);
      pushField("LFB_SampleUse", data.LFB_SampleUse);
      pushField("LFB_Dilution", data.LFB_Dilution);
      pushField("LFB_Zn_Result", data.LFB_Zn_Result);
      pushField("LFB_Zn_Cal", data.LFB_Zn_Cal);
      pushField("LFB_Ni_Result", data.LFB_Ni_Result);
      pushField("LFB_Ni_Cal", data.LFB_Ni_Cal);
      pushField("LFB_Mn_Result", data.LFB_Mn_Result);
      pushField("LFB_Mn_Cal", data.LFB_Mn_Cal);
      pushField("LFB_Cr_Result", data.LFB_Cr_Result);
      pushField("LFB_Cr_Cal", data.LFB_Cr_Cal);
      pushField("LFB_Cu_Result", data.LFB_Cu_Result);
      pushField("LFB_Cu_Cal", data.LFB_Cu_Cal);
      pushField("LFB_Fe_Result", data.LFB_Fe_Result);
      pushField("LFB_Fe_Cal", data.LFB_Fe_Cal);
      pushField("LFB_Pb_Result", data.LFB_Pb_Result);
      pushField("LFB_Pb_Cal", data.LFB_Pb_Cal);
      pushField("LFB_Cd_Result", data.LFB_Cd_Result);
      pushField("LFB_Cd_Cal", data.LFB_Cd_Cal);
      pushField("LFB_Zn_Recovery", data.LFB_Zn_Recovery);
      pushField("LFB_Ni_Recovery", data.LFB_Ni_Recovery);
      pushField("LFB_Mn_Recovery", data.LFB_Mn_Recovery);
      pushField("LFB_Cr_Recovery", data.LFB_Cr_Recovery);
      pushField("LFB_Cu_Recovery", data.LFB_Cu_Recovery);
      pushField("LFB_Fe_Recovery", data.LFB_Fe_Recovery);
      pushField("LFB_Pb_Recovery", data.LFB_Pb_Recovery);
      pushField("LFB_Cd_Recovery", data.LFB_Cd_Recovery);
      pushField("LFM_SampleUse", data.LFM_SampleUse);
      pushField("LFM_Dilution", data.LFM_Dilution);
      pushField("LFM_Zn_Result", data.LFM_Zn_Result);
      pushField("LFM_Zn_Cal", data.LFM_Zn_Cal);
      pushField("LFM_Ni_Result", data.LFM_Ni_Result);
      pushField("LFM_Ni_Cal", data.LFM_Ni_Cal);
      pushField("LFM_Mn_Result", data.LFM_Mn_Result);
      pushField("LFM_Mn_Cal", data.LFM_Mn_Cal);
      pushField("LFM_Cr_Result", data.LFM_Cr_Result);
      pushField("LFM_Cr_Cal", data.LFM_Cr_Cal);
      pushField("LFM_Cu_Result", data.LFM_Cu_Result);
      pushField("LFM_Cu_Cal", data.LFM_Cu_Cal);
      pushField("LFM_Fe_Result", data.LFM_Fe_Result);
      pushField("LFM_Fe_Cal", data.LFM_Fe_Cal);
      pushField("LFM_Pb_Result", data.LFM_Pb_Result);
      pushField("LFM_Pb_Cal", data.LFM_Pb_Cal);
      pushField("LFM_Cd_Result", data.LFM_Cd_Result);
      pushField("LFM_Cd_Cal", data.LFM_Cd_Cal);
      pushField("LFM_Zn_Recovery", data.LFM_Zn_Recovery);
      pushField("LFM_Ni_Recovery", data.LFM_Ni_Recovery);
      pushField("LFM_Mn_Recovery", data.LFM_Mn_Recovery);
      pushField("LFM_Cr_Recovery", data.LFM_Cr_Recovery);
      pushField("LFM_Cu_Recovery", data.LFM_Cu_Recovery);
      pushField("LFM_Fe_Recovery", data.LFM_Fe_Recovery);
      pushField("LFM_Pb_Recovery", data.LFM_Pb_Recovery);
      pushField("LFM_Cd_Recovery", data.LFM_Cd_Recovery);
      pushField("LFMD_SampleUse", data.LFMD_SampleUse);
      pushField("LFMD_Dilution", data.LFMD_Dilution);
      pushField("LFMD_Zn_Result", data.LFMD_Zn_Result);
      pushField("LFMD_Zn_Cal", data.LFMD_Zn_Cal);
      pushField("LFMD_Ni_Result", data.LFMD_Ni_Result);
      pushField("LFMD_Ni_Cal", data.LFMD_Ni_Cal);
      pushField("LFMD_Mn_Result", data.LFMD_Mn_Result);
      pushField("LFMD_Mn_Cal", data.LFMD_Mn_Cal);
      pushField("LFMD_Cr_Result", data.LFMD_Cr_Result);
      pushField("LFMD_Cr_Cal", data.LFMD_Cr_Cal);
      pushField("LFMD_Cu_Result", data.LFMD_Cu_Result);
      pushField("LFMD_Cu_Cal", data.LFMD_Cu_Cal);
      pushField("LFMD_Fe_Result", data.LFMD_Fe_Result);
      pushField("LFMD_Fe_Cal", data.LFMD_Fe_Cal);
      pushField("LFMD_Pb_Result", data.LFMD_Pb_Result);
      pushField("LFMD_Pb_Cal", data.LFMD_Pb_Cal);
      pushField("LFMD_Cd_Result", data.LFMD_Cd_Result);
      pushField("LFMD_Cd_Cal", data.LFMD_Cd_Cal);
      pushField("LFMD_Zn_Recovery", data.LFMD_Zn_Recovery);
      pushField("LFMD_Ni_Recovery", data.LFMD_Ni_Recovery);
      pushField("LFMD_Mn_Recovery", data.LFMD_Mn_Recovery);
      pushField("LFMD_Cr_Recovery", data.LFMD_Cr_Recovery);
      pushField("LFMD_Cu_Recovery", data.LFMD_Cu_Recovery);
      pushField("LFMD_Fe_Recovery", data.LFMD_Fe_Recovery);
      pushField("LFMD_Pb_Recovery", data.LFMD_Pb_Recovery);
      pushField("LFMD_Cd_Recovery", data.LFMD_Cd_Recovery);
      pushField("LFM_LFMD_Zn_Avg", data.LFM_LFMD_Zn_Avg);
      pushField("LFM_LFMD_Ni_Avg", data.LFM_LFMD_Ni_Avg);
      pushField("LFM_LFMD_Mn_Avg", data.LFM_LFMD_Mn_Avg);
      pushField("LFM_LFMD_Cr_Avg", data.LFM_LFMD_Cr_Avg);
      pushField("LFM_LFMD_Cu_Avg", data.LFM_LFMD_Cu_Avg);
      pushField("LFM_LFMD_Fe_Avg", data.LFM_LFMD_Fe_Avg);
      pushField("LFM_LFMD_Pb_Avg", data.LFM_LFMD_Pb_Avg);
      pushField("LFM_LFMD_Cd_Avg", data.LFM_LFMD_Cd_Avg);
      pushField("LFM_LFMD_Zn_RPD", data.LFM_LFMD_Zn_RPD);
      pushField("LFM_LFMD_Ni_RPD", data.LFM_LFMD_Ni_RPD);
      pushField("LFM_LFMD_Mn_RPD", data.LFM_LFMD_Mn_RPD);
      pushField("LFM_LFMD_Cr_RPD", data.LFM_LFMD_Cr_RPD);
      pushField("LFM_LFMD_Cu_RPD", data.LFM_LFMD_Cu_RPD);
      pushField("LFM_LFMD_Fe_RPD", data.LFM_LFMD_Fe_RPD);
      pushField("LFM_LFMD_Pb_RPD", data.LFM_LFMD_Pb_RPD);
      pushField("LFM_LFMD_Cd_RPD", data.LFM_LFMD_Cd_RPD);
      pushField("CCV_2_Zn_Result", data.CCV_2_Zn_Result);
      pushField("CCV_2_Zn_Cal", data.CCV_2_Zn_Cal);
      pushField("CCV_2_Ni_Result", data.CCV_2_Ni_Result);
      pushField("CCV_2_Ni_Cal", data.CCV_2_Ni_Cal);
      pushField("CCV_2_Mn_Result", data.CCV_2_Mn_Result);
      pushField("CCV_2_Mn_Cal", data.CCV_2_Mn_Cal);
      pushField("CCV_2_Cr_Result", data.CCV_2_Cr_Result);
      pushField("CCV_2_Cr_Cal", data.CCV_2_Cr_Cal);
      pushField("CCV_2_Cu_Result", data.CCV_2_Cu_Result);
      pushField("CCV_2_Cu_Cal", data.CCV_2_Cu_Cal);
      pushField("CCV_2_Fe_Result", data.CCV_2_Fe_Result);
      pushField("CCV_2_Fe_Cal", data.CCV_2_Fe_Cal);
      pushField("CCV_2_Pb_Result", data.CCV_2_Pb_Result);
      pushField("CCV_2_Pb_Cal", data.CCV_2_Pb_Cal);
      pushField("CCV_2_Cd_Result", data.CCV_2_Cd_Result);
      pushField("CCV_2_Cd_Cal", data.CCV_2_Cd_Cal);
      pushField("CCV_2_Zn_Recovery", data.CCV_2_Zn_Recovery);
      pushField("CCV_2_Ni_Recovery", data.CCV_2_Ni_Recovery);
      pushField("CCV_2_Mn_Recovery", data.CCV_2_Mn_Recovery);
      pushField("CCV_2_Cr_Recovery", data.CCV_2_Cr_Recovery);
      pushField("CCV_2_Cu_Recovery", data.CCV_2_Cu_Recovery);
      pushField("CCV_2_Fe_Recovery", data.CCV_2_Fe_Recovery);
      pushField("CCV_2_Pb_Recovery", data.CCV_2_Pb_Recovery);
      pushField("CCV_2_Cd_Recovery", data.CCV_2_Cd_Recovery);
      pushField("CCV_3_Zn_Result", data.CCV_3_Zn_Result);
      pushField("CCV_3_Zn_Cal", data.CCV_3_Zn_Cal);
      pushField("CCV_3_Ni_Result", data.CCV_3_Ni_Result);
      pushField("CCV_3_Ni_Cal", data.CCV_3_Ni_Cal);
      pushField("CCV_3_Mn_Result", data.CCV_3_Mn_Result);
      pushField("CCV_3_Mn_Cal", data.CCV_3_Mn_Cal);
      pushField("CCV_3_Cr_Result", data.CCV_3_Cr_Result);
      pushField("CCV_3_Cr_Cal", data.CCV_3_Cr_Cal);
      pushField("CCV_3_Cu_Result", data.CCV_3_Cu_Result);
      pushField("CCV_3_Cu_Cal", data.CCV_3_Cu_Cal);
      pushField("CCV_3_Fe_Result", data.CCV_3_Fe_Result);
      pushField("CCV_3_Fe_Cal", data.CCV_3_Fe_Cal);
      pushField("CCV_3_Pb_Result", data.CCV_3_Pb_Result);
      pushField("CCV_3_Pb_Cal", data.CCV_3_Pb_Cal);
      pushField("CCV_3_Cd_Result", data.CCV_3_Cd_Result);
      pushField("CCV_3_Cd_Cal", data.CCV_3_Cd_Cal);
      pushField("CCV_3_Zn_Recovery", data.CCV_3_Zn_Recovery);
      pushField("CCV_3_Ni_Recovery", data.CCV_3_Ni_Recovery);
      pushField("CCV_3_Mn_Recovery", data.CCV_3_Mn_Recovery);
      pushField("CCV_3_Cr_Recovery", data.CCV_3_Cr_Recovery);
      pushField("CCV_3_Cu_Recovery", data.CCV_3_Cu_Recovery);
      pushField("CCV_3_Fe_Recovery", data.CCV_3_Fe_Recovery);
      pushField("CCV_3_Pb_Recovery", data.CCV_3_Pb_Recovery);
      pushField("CCV_3_Cd_Recovery", data.CCV_3_Cd_Recovery);
      pushField("SampleUse_1_1", data.SampleUse_1_1);
      pushField("Dilution_1_1", data.Dilution_1_1);
      pushField("Zn_Result_1_1", data.Zn_Result_1_1);
      pushField("Zn_Cal_1_1", data.Zn_Cal_1_1);
      pushField("Ni_Result_1_1", data.Ni_Result_1_1);
      pushField("Ni_Cal_1_1", data.Ni_Cal_1_1);
      pushField("Mn_Result_1_1", data.Mn_Result_1_1);
      pushField("Mn_Cal_1_1", data.Mn_Cal_1_1);
      pushField("Cr_Result_1_1", data.Cr_Result_1_1);
      pushField("Cr_Cal_1_1", data.Cr_Cal_1_1);
      pushField("Cu_Result_1_1", data.Cu_Result_1_1);
      pushField("Cu_Cal_1_1", data.Cu_Cal_1_1);
      pushField("Fe_Result_1_1", data.Fe_Result_1_1);
      pushField("Fe_Cal_1_1", data.Fe_Cal_1_1);
      pushField("Pb_Result_1_1", data.Pb_Result_1_1);
      pushField("Pb_Cal_1_1", data.Pb_Cal_1_1);
      pushField("Cd_Result_1_1", data.Cd_Result_1_1);
      pushField("Cd_Cal_1_1", data.Cd_Cal_1_1);
      pushField("SampleUse_1_2", data.SampleUse_1_2);
      pushField("Dilution_1_2", data.Dilution_1_2);
      pushField("Zn_Result_1_2", data.Zn_Result_1_2);
      pushField("Zn_Cal_1_2", data.Zn_Cal_1_2);
      pushField("Ni_Result_1_2", data.Ni_Result_1_2);
      pushField("Ni_Cal_1_2", data.Ni_Cal_1_2);
      pushField("Mn_Result_1_2", data.Mn_Result_1_2);
      pushField("Mn_Cal_1_2", data.Mn_Cal_1_2);
      pushField("Cr_Result_1_2", data.Cr_Result_1_2);
      pushField("Cr_Cal_1_2", data.Cr_Cal_1_2);
      pushField("Cu_Result_1_2", data.Cu_Result_1_2);
      pushField("Cu_Cal_1_2", data.Cu_Cal_1_2);
      pushField("Fe_Result_1_2", data.Fe_Result_1_2);
      pushField("Fe_Cal_1_2", data.Fe_Cal_1_2);
      pushField("Pb_Result_1_2", data.Pb_Result_1_2);
      pushField("Pb_Cal_1_2", data.Pb_Cal_1_2);
      pushField("Cd_Result_1_2", data.Cd_Result_1_2);
      pushField("Cd_Cal_1_2", data.Cd_Cal_1_2);
      pushField("SampleUse_1_3", data.SampleUse_1_3);
      pushField("Dilution_1_3", data.Dilution_1_3);
      pushField("Zn_Result_1_3", data.Zn_Result_1_3);
      pushField("Zn_Cal_1_3", data.Zn_Cal_1_3);
      pushField("Ni_Result_1_3", data.Ni_Result_1_3);
      pushField("Ni_Cal_1_3", data.Ni_Cal_1_3);
      pushField("Mn_Result_1_3", data.Mn_Result_1_3);
      pushField("Mn_Cal_1_3", data.Mn_Cal_1_3);
      pushField("Cr_Result_1_3", data.Cr_Result_1_3);
      pushField("Cr_Cal_1_3", data.Cr_Cal_1_3);
      pushField("Cu_Result_1_3", data.Cu_Result_1_3);
      pushField("Cu_Cal_1_3", data.Cu_Cal_1_3);
      pushField("Fe_Result_1_3", data.Fe_Result_1_3);
      pushField("Fe_Cal_1_3", data.Fe_Cal_1_3);
      pushField("Pb_Result_1_3", data.Pb_Result_1_3);
      pushField("Pb_Cal_1_3", data.Pb_Cal_1_3);
      pushField("Cd_Result_1_3", data.Cd_Result_1_3);
      pushField("Cd_Cal_1_3", data.Cd_Cal_1_3);
      pushField("SampleUse_1_4", data.SampleUse_1_4);
      pushField("Dilution_1_4", data.Dilution_1_4);
      pushField("Zn_Result_1_4", data.Zn_Result_1_4);
      pushField("Zn_Cal_1_4", data.Zn_Cal_1_4);
      pushField("Ni_Result_1_4", data.Ni_Result_1_4);
      pushField("Ni_Cal_1_4", data.Ni_Cal_1_4);
      pushField("Mn_Result_1_4", data.Mn_Result_1_4);
      pushField("Mn_Cal_1_4", data.Mn_Cal_1_4);
      pushField("Cr_Result_1_4", data.Cr_Result_1_4);
      pushField("Cr_Cal_1_4", data.Cr_Cal_1_4);
      pushField("Cu_Result_1_4", data.Cu_Result_1_4);
      pushField("Cu_Cal_1_4", data.Cu_Cal_1_4);
      pushField("Fe_Result_1_4", data.Fe_Result_1_4);
      pushField("Fe_Cal_1_4", data.Fe_Cal_1_4);
      pushField("Pb_Result_1_4", data.Pb_Result_1_4);
      pushField("Pb_Cal_1_4", data.Pb_Cal_1_4);
      pushField("Cd_Result_1_4", data.Cd_Result_1_4);
      pushField("Cd_Cal_1_4", data.Cd_Cal_1_4);
      pushField("SampleUse_1_5", data.SampleUse_1_5);
      pushField("Dilution_1_5", data.Dilution_1_5);
      pushField("Zn_Result_1_5", data.Zn_Result_1_5);
      pushField("Zn_Cal_1_5", data.Zn_Cal_1_5);
      pushField("Ni_Result_1_5", data.Ni_Result_1_5);
      pushField("Ni_Cal_1_5", data.Ni_Cal_1_5);
      pushField("Mn_Result_1_5", data.Mn_Result_1_5);
      pushField("Mn_Cal_1_5", data.Mn_Cal_1_5);
      pushField("Cr_Result_1_5", data.Cr_Result_1_5);
      pushField("Cr_Cal_1_5", data.Cr_Cal_1_5);
      pushField("Cu_Result_1_5", data.Cu_Result_1_5);
      pushField("Cu_Cal_1_5", data.Cu_Cal_1_5);
      pushField("Fe_Result_1_5", data.Fe_Result_1_5);
      pushField("Fe_Cal_1_5", data.Fe_Cal_1_5);
      pushField("Pb_Result_1_5", data.Pb_Result_1_5);
      pushField("Pb_Cal_1_5", data.Pb_Cal_1_5);
      pushField("Cd_Result_1_5", data.Cd_Result_1_5);
      pushField("Cd_Cal_1_5", data.Cd_Cal_1_5);
      pushField("SampleUse_2_1", data.SampleUse_2_1);
      pushField("Dilution_2_1", data.Dilution_2_1);
      pushField("Zn_Result_2_1", data.Zn_Result_2_1);
      pushField("Zn_Cal_2_1", data.Zn_Cal_2_1);
      pushField("Ni_Result_2_1", data.Ni_Result_2_1);
      pushField("Ni_Cal_2_1", data.Ni_Cal_2_1);
      pushField("Mn_Result_2_1", data.Mn_Result_2_1);
      pushField("Mn_Cal_2_1", data.Mn_Cal_2_1);
      pushField("Cr_Result_2_1", data.Cr_Result_2_1);
      pushField("Cr_Cal_2_1", data.Cr_Cal_2_1);
      pushField("Cu_Result_2_1", data.Cu_Result_2_1);
      pushField("Cu_Cal_2_1", data.Cu_Cal_2_1);
      pushField("Fe_Result_2_1", data.Fe_Result_2_1);
      pushField("Fe_Cal_2_1", data.Fe_Cal_2_1);
      pushField("Pb_Result_2_1", data.Pb_Result_2_1);
      pushField("Pb_Cal_2_1", data.Pb_Cal_2_1);
      pushField("Cd_Result_2_1", data.Cd_Result_2_1);
      pushField("Cd_Cal_2_1", data.Cd_Cal_2_1);
      pushField("SampleUse_2_2", data.SampleUse_2_2);
      pushField("Dilution_2_2", data.Dilution_2_2);
      pushField("Zn_Result_2_2", data.Zn_Result_2_2);
      pushField("Zn_Cal_2_2", data.Zn_Cal_2_2);
      pushField("Ni_Result_2_2", data.Ni_Result_2_2);
      pushField("Ni_Cal_2_2", data.Ni_Cal_2_2);
      pushField("Mn_Result_2_2", data.Mn_Result_2_2);
      pushField("Mn_Cal_2_2", data.Mn_Cal_2_2);
      pushField("Cr_Result_2_2", data.Cr_Result_2_2);
      pushField("Cr_Cal_2_2", data.Cr_Cal_2_2);
      pushField("Cu_Result_2_2", data.Cu_Result_2_2);
      pushField("Cu_Cal_2_2", data.Cu_Cal_2_2);
      pushField("Fe_Result_2_2", data.Fe_Result_2_2);
      pushField("Fe_Cal_2_2", data.Fe_Cal_2_2);
      pushField("Pb_Result_2_2", data.Pb_Result_2_2);
      pushField("Pb_Cal_2_2", data.Pb_Cal_2_2);
      pushField("Cd_Result_2_2", data.Cd_Result_2_2);
      pushField("Cd_Cal_2_2", data.Cd_Cal_2_2);
      pushField("SampleUse_2_3", data.SampleUse_2_3);
      pushField("Dilution_2_3", data.Dilution_2_3);
      pushField("Zn_Result_2_3", data.Zn_Result_2_3);
      pushField("Zn_Cal_2_3", data.Zn_Cal_2_3);
      pushField("Ni_Result_2_3", data.Ni_Result_2_3);
      pushField("Ni_Cal_2_3", data.Ni_Cal_2_3);
      pushField("Mn_Result_2_3", data.Mn_Result_2_3);
      pushField("Mn_Cal_2_3", data.Mn_Cal_2_3);
      pushField("Cr_Result_2_3", data.Cr_Result_2_3);
      pushField("Cr_Cal_2_3", data.Cr_Cal_2_3);
      pushField("Cu_Result_2_3", data.Cu_Result_2_3);
      pushField("Cu_Cal_2_3", data.Cu_Cal_2_3);
      pushField("Fe_Result_2_3", data.Fe_Result_2_3);
      pushField("Fe_Cal_2_3", data.Fe_Cal_2_3);
      pushField("Pb_Result_2_3", data.Pb_Result_2_3);
      pushField("Pb_Cal_2_3", data.Pb_Cal_2_3);
      pushField("Cd_Result_2_3", data.Cd_Result_2_3);
      pushField("Cd_Cal_2_3", data.Cd_Cal_2_3);
      pushField("SampleUse_2_4", data.SampleUse_2_4);
      pushField("Dilution_2_4", data.Dilution_2_4);
      pushField("Zn_Result_2_4", data.Zn_Result_2_4);
      pushField("Zn_Cal_2_4", data.Zn_Cal_2_4);
      pushField("Ni_Result_2_4", data.Ni_Result_2_4);
      pushField("Ni_Cal_2_4", data.Ni_Cal_2_4);
      pushField("Mn_Result_2_4", data.Mn_Result_2_4);
      pushField("Mn_Cal_2_4", data.Mn_Cal_2_4);
      pushField("Cr_Result_2_4", data.Cr_Result_2_4);
      pushField("Cr_Cal_2_4", data.Cr_Cal_2_4);
      pushField("Cu_Result_2_4", data.Cu_Result_2_4);
      pushField("Cu_Cal_2_4", data.Cu_Cal_2_4);
      pushField("Fe_Result_2_4", data.Fe_Result_2_4);
      pushField("Fe_Cal_2_4", data.Fe_Cal_2_4);
      pushField("Pb_Result_2_4", data.Pb_Result_2_4);
      pushField("Pb_Cal_2_4", data.Pb_Cal_2_4);
      pushField("Cd_Result_2_4", data.Cd_Result_2_4);
      pushField("Cd_Cal_2_4", data.Cd_Cal_2_4);
      pushField("SampleUse_2_5", data.SampleUse_2_5);
      pushField("Dilution_2_5", data.Dilution_2_5);
      pushField("Zn_Result_2_5", data.Zn_Result_2_5);
      pushField("Zn_Cal_2_5", data.Zn_Cal_2_5);
      pushField("Ni_Result_2_5", data.Ni_Result_2_5);
      pushField("Ni_Cal_2_5", data.Ni_Cal_2_5);
      pushField("Mn_Result_2_5", data.Mn_Result_2_5);
      pushField("Mn_Cal_2_5", data.Mn_Cal_2_5);
      pushField("Cr_Result_2_5", data.Cr_Result_2_5);
      pushField("Cr_Cal_2_5", data.Cr_Cal_2_5);
      pushField("Cu_Result_2_5", data.Cu_Result_2_5);
      pushField("Cu_Cal_2_5", data.Cu_Cal_2_5);
      pushField("Fe_Result_2_5", data.Fe_Result_2_5);
      pushField("Fe_Cal_2_5", data.Fe_Cal_2_5);
      pushField("Pb_Result_2_5", data.Pb_Result_2_5);
      pushField("Pb_Cal_2_5", data.Pb_Cal_2_5);
      pushField("Cd_Result_2_5", data.Cd_Result_2_5);
      pushField("Cd_Cal_2_5", data.Cd_Cal_2_5);
      pushField("Zn_Avg", data.Zn_Avg);
      pushField("Zn_RPD", data.Zn_RPD);
      pushField("Ni_Avg", data.Ni_Avg);
      pushField("Ni_RPD", data.Ni_RPD);
      pushField("Mn_Avg", data.Mn_Avg);
      pushField("Mn_RPD", data.Mn_RPD);
      pushField("Cr_Avg", data.Cr_Avg);
      pushField("Cr_RPD", data.Cr_RPD);
      pushField("Cu_Avg", data.Cu_Avg);
      pushField("Cu_RPD", data.Cu_RPD);
      pushField("Fe_Avg", data.Fe_Avg);
      pushField("Fe_RPD", data.Fe_RPD);
      pushField("Pb_Avg", data.Pb_Avg);
      pushField("Pb_RPD", data.Pb_RPD);
      pushField("Cd_Avg", data.Cd_Avg);
      pushField("Cd_RPD", data.Cd_RPD);
      pushField("Select_L", data.Select_L);
      pushField("UserAnalysis", req.body.UserAnalysis);
      pushField("AnalysisDate", now);
      pushField("Remark_Job", data.REMARKJOB);

      let query = `
      UPDATE [WWT].[dbo].[ICP]
      SET ${fields.join(',\n')}
      WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
      `;
      allQueries += query + '\n';
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    if (db["rowsAffected"][0] > 0) {
      let updateQuery = '';
      let itemStatusValue = '';

      for (const data of dataRow) {
        let fields = [];
        function pushField(name, value) {
          if (value !== '') {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = '${escapedValue}'`);
          } else {
            fields.push(`[${name}] = NULL`);
          }
        }
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'LIST ITEM') {
          itemStatusValue = 'FINISH ITEM';
        } else if (itemStatus === 'LIST RECHECK') {
          itemStatusValue = 'FINISH RECHECK';
        } else {
          itemStatusValue = 'FINISH ITEM';
        }
        pushField("UserAnalysis", req.body.UserAnalysis);
        pushField("AnalysisDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", 'FINISH');

        let query = `
          UPDATE [WWT].[dbo].[Request]
          SET ${fields.join(',\n')}
          WHERE ID = '${data.ID}';
          `;
        updateQuery += query + '\n';
      }
      // console.log(updateQuery);
      let updateRequest = await mssql.qurey(updateQuery);
      if (updateRequest["rowsAffected"][0] > 0) {
        console.log("Update Success");
        return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
      } else {
        console.log("Update Failed");
        return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
      }
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectBOD', async (req, res) => {
  console.log("--approveRejectBOD--");

  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.STATUS === 'APPROVE') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[BOD]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        // if (itemStatus === 'FINISH ITEM') {
        //   itemStatusValue = 'APPROVE ITEM';
        // } else if (itemStatus === 'FINISH RECHECK') {
        //   itemStatusValue = 'APPROVE RECHECK';
        // } else {
        //   itemStatusValue = 'APPROVE ITEM';
        // }
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.RESULT_1 ? data.RESULT_1 : data.RESULT_2);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.RESULT_1 ? data.RESULT_1 : data.RESULT_2);
        }
        pushField("ResultApprove", data.RESULT_1 ? data.RESULT_1 : data.RESULT_2);

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.STATUS === 'REJECT') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.RESULT_1 ? data.RESULT_1 : data.RESULT_2);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.RESULT_1 ? data.RESULT_1 : data.RESULT_2);
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[BOD]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectPH', async (req, res) => {
  console.log("--approveRejectPH--");
  console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[pH]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.Avg_R1);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.Avg_R1);
        }
        pushField("ResultApprove", data.Avg_R1);

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.Avg_R1);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.Avg_R1);
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[pH]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectTF', async (req, res) => {
  console.log("--approveRejectTF--");
  console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[TF]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.F_Xbar);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.F_Xbar);
        }
        pushField("ResultApprove", data.F_Xbar);

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          pushField("Result_1", data.F_Xbar);
        } else if (itemStatus === 'FINISH RECHECK') {
          pushField("Result_2", data.F_Xbar);
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[TF]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectTDS', async (req, res) => {
  console.log("--approveRejectTDS--");
  console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[TDS]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        }

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
          }
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[TDS]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectTSS', async (req, res) => {
  console.log("--approveRejectTSS--");
  // console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[TSS]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        }

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
          }
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[TSS]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectCOD', async (req, res) => {
  console.log("--approveRejectCOD--");
  // console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[COD]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
            pushField("ResultApprove", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
            pushField("ResultApprove", data.Cal_1);
          }
        }

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_1", data.Avg);
          } else {
            pushField("Result_1", data.Cal_1);
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.Avg !== null && data.Avg !== undefined && data.Avg !== '') {
            pushField("Result_2", data.Avg);
          } else {
            pushField("Result_2", data.Cal_1);
          }
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[COD]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/approveRejectICP', async (req, res) => {
  console.log("--approveRejectICP--");
  // console.log(req.body);
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    const now = ISOToLocal(new Date());
    let allQueries = '';
    let itemStatusValue = '';
    for (const data of dataRow) {
      let fields = [];

      function pushField(name, value) {
        if (value !== '' && value !== null && value !== undefined) {
          if (!isNaN(value)) {
            fields.push(`[${name}] = ${value}`);
          } else {
            const escapedValue = value.toString().replace(/'/g, "''");
            fields.push(`[${name}] = N'${escapedValue}'`);
          }
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }
      if (data.DECISIONUSER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[ICP]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query1 + '\n';

        fields = [];
        let itemStatus = data.ItemStatus;
        pushField("JobApprover", req.body.UserAnalysis);
        pushField("JobApproveDate", now);
        pushField("Remark_Job", data.REMARKJOB);
        pushField("ItemStatus", 'APPROVE ITEM');
        pushField("JobStatus", 'COMPLETE');
        if (itemStatus === 'FINISH ITEM') {
          if (data.ItemName === 'Zn') {
            if (data.Zn_Avg !== null && data.Zn_Avg !== undefined && data.Zn_Avg !== '') {
              pushField("Result_1", data.Zn_Avg);
              pushField("ResultApprove", data.Zn_Avg);
            } else {
              const calList = [
                data.Zn_Cal_1_1,
                data.Zn_Cal_1_2,
                data.Zn_Cal_1_3,
                data.Zn_Cal_1_4,
                data.Zn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Ni') {
            if (data.Ni_Avg !== null && data.Ni_Avg !== undefined && data.Ni_Avg !== '') {
              pushField("Result_1", data.Ni_Avg);
              pushField("ResultApprove", data.Ni_Avg);
            } else {
              const calList = [
                data.Ni_Cal_1_1,
                data.Ni_Cal_1_2,
                data.Ni_Cal_1_3,
                data.Ni_Cal_1_4,
                data.Ni_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Mn') {
            if (data.Mn_Avg !== null && data.Mn_Avg !== undefined && data.Mn_Avg !== '') {
              pushField("Result_1", data.Mn_Avg);
              pushField("ResultApprove", data.Mn_Avg);
            } else {
              const calList = [
                data.Mn_Cal_1_1,
                data.Mn_Cal_1_2,
                data.Mn_Cal_1_3,
                data.Mn_Cal_1_4,
                data.Mn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cr') {
            if (data.Cr_Avg !== null && data.Cr_Avg !== undefined && data.Cr_Avg !== '') {
              pushField("Result_1", data.Cr_Avg);
              pushField("ResultApprove", data.Cr_Avg);
            } else {
              const calList = [
                data.Cr_Cal_1_1,
                data.Cr_Cal_1_2,
                data.Cr_Cal_1_3,
                data.Cr_Cal_1_4,
                data.Cr_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cu') {
            if (data.Cu_Avg !== null && data.Cu_Avg !== undefined && data.Cu_Avg !== '') {
              pushField("Result_1", data.Cu_Avg);
              pushField("ResultApprove", data.Cu_Avg);
            } else {
              const calList = [
                data.Cu_Cal_1_1,
                data.Cu_Cal_1_2,
                data.Cu_Cal_1_3,
                data.Cu_Cal_1_4,
                data.Cu_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Fe') {
            if (data.Fe_Avg !== null && data.Fe_Avg !== undefined && data.Fe_Avg !== '') {
              pushField("Result_1", data.Fe_Avg);
              pushField("ResultApprove", data.Fe_Avg);
            } else {
              const calList = [
                data.Fe_Cal_1_1,
                data.Fe_Cal_1_2,
                data.Fe_Cal_1_3,
                data.Fe_Cal_1_4,
                data.Fe_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Pb') {
            if (data.Pb_Avg !== null && data.Pb_Avg !== undefined && data.Pb_Avg !== '') {
              pushField("Result_1", data.Pb_Avg);
              pushField("ResultApprove", data.Pb_Avg);
            } else {
              const calList = [
                data.Pb_Cal_1_1,
                data.Pb_Cal_1_2,
                data.Pb_Cal_1_3,
                data.Pb_Cal_1_4,
                data.Pb_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cd') {
            if (data.Cd_Avg !== null && data.Cd_Avg !== undefined && data.Cd_Avg !== '') {
              pushField("Result_1", data.Cd_Avg);
              pushField("ResultApprove", data.Cd_Avg);
            } else {
              const calList = [
                data.Cd_Cal_1_1,
                data.Cd_Cal_1_2,
                data.Cd_Cal_1_3,
                data.Cd_Cal_1_4,
                data.Cd_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.ItemName === 'Zn') {
            if (data.Zn_Avg !== null && data.Zn_Avg !== undefined && data.Zn_Avg !== '') {
              pushField("Result_2", data.Zn_Avg);
              pushField("ResultApprove", data.Zn_Avg);
            } else {
              const calList = [
                data.Zn_Cal_1_1,
                data.Zn_Cal_1_2,
                data.Zn_Cal_1_3,
                data.Zn_Cal_1_4,
                data.Zn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Ni') {
            if (data.Ni_Avg !== null && data.Ni_Avg !== undefined && data.Ni_Avg !== '') {
              pushField("Result_2", data.Ni_Avg);
              pushField("ResultApprove", data.Ni_Avg);
            } else {
              const calList = [
                data.Ni_Cal_1_1,
                data.Ni_Cal_1_2,
                data.Ni_Cal_1_3,
                data.Ni_Cal_1_4,
                data.Ni_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Mn') {
            if (data.Mn_Avg !== null && data.Mn_Avg !== undefined && data.Mn_Avg !== '') {
              pushField("Result_2", data.Mn_Avg);
              pushField("ResultApprove", data.Mn_Avg);
            } else {
              const calList = [
                data.Mn_Cal_1_1,
                data.Mn_Cal_1_2,
                data.Mn_Cal_1_3,
                data.Mn_Cal_1_4,
                data.Mn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cr') {
            if (data.Cr_Avg !== null && data.Cr_Avg !== undefined && data.Cr_Avg !== '') {
              pushField("Result_2", data.Cr_Avg);
              pushField("ResultApprove", data.Cr_Avg);
            } else {
              const calList = [
                data.Cr_Cal_1_1,
                data.Cr_Cal_1_2,
                data.Cr_Cal_1_3,
                data.Cr_Cal_1_4,
                data.Cr_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cu') {
            if (data.Cu_Avg !== null && data.Cu_Avg !== undefined && data.Cu_Avg !== '') {
              pushField("Result_2", data.Cu_Avg);
              pushField("ResultApprove", data.Cu_Avg);
            } else {
              const calList = [
                data.Cu_Cal_1_1,
                data.Cu_Cal_1_2,
                data.Cu_Cal_1_3,
                data.Cu_Cal_1_4,
                data.Cu_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Fe') {
            if (data.Fe_Avg !== null && data.Fe_Avg !== undefined && data.Fe_Avg !== '') {
              pushField("Result_2", data.Fe_Avg);
              pushField("ResultApprove", data.Fe_Avg);
            } else {
              const calList = [
                data.Fe_Cal_1_1,
                data.Fe_Cal_1_2,
                data.Fe_Cal_1_3,
                data.Fe_Cal_1_4,
                data.Fe_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Pb') {
            if (data.Pb_Avg !== null && data.Pb_Avg !== undefined && data.Pb_Avg !== '') {
              pushField("Result_2", data.Pb_Avg);
              pushField("ResultApprove", data.Pb_Avg);
            } else {
              const calList = [
                data.Pb_Cal_1_1,
                data.Pb_Cal_1_2,
                data.Pb_Cal_1_3,
                data.Pb_Cal_1_4,
                data.Pb_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
          if (data.ItemName === 'Cd') {
            if (data.Cd_Avg !== null && data.Cd_Avg !== undefined && data.Cd_Avg !== '') {
              pushField("Result_2", data.Cd_Avg);
              pushField("ResultApprove", data.Cd_Avg);
            } else {
              const calList = [
                data.Cd_Cal_1_1,
                data.Cd_Cal_1_2,
                data.Cd_Cal_1_3,
                data.Cd_Cal_1_4,
                data.Cd_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
              pushField("ResultApprove", firstValidCal);
            }
          }
        }

        let query2 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query2 + '\n';

      } else if (data.REJECT !== '') {
        let itemStatus = data.ItemStatus;
        if (itemStatus === 'FINISH ITEM') {
          itemStatusValue = 'RECHECK ITEM';
        } else if (itemStatus === 'FINISH RECHECK') {
          itemStatusValue = 'RECHECK ITEM';
        } else {
          itemStatusValue = 'RECEIVE SAMPLE';
        }
        pushField("JobCode", '');
        pushField("UserListJob", '');
        pushField("ListJobDate", '');
        pushField("UserAnalysis", '');
        pushField("AnalysisDate", '');
        pushField("ItemStatus", itemStatusValue);
        pushField("JobStatus", '');
        if (itemStatus === 'FINISH ITEM') {
          if (data.ItemName === 'Zn') {
            if (data.Zn_Avg !== null && data.Zn_Avg !== undefined && data.Zn_Avg !== '') {
              pushField("Result_1", data.Zn_Avg);
            } else {
              const calList = [
                data.Zn_Cal_1_1,
                data.Zn_Cal_1_2,
                data.Zn_Cal_1_3,
                data.Zn_Cal_1_4,
                data.Zn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Ni') {
            if (data.Ni_Avg !== null && data.Ni_Avg !== undefined && data.Ni_Avg !== '') {
              pushField("Result_1", data.Ni_Avg);
            } else {
              const calList = [
                data.Ni_Cal_1_1,
                data.Ni_Cal_1_2,
                data.Ni_Cal_1_3,
                data.Ni_Cal_1_4,
                data.Ni_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Mn') {
            if (data.Mn_Avg !== null && data.Mn_Avg !== undefined && data.Mn_Avg !== '') {
              pushField("Result_1", data.Mn_Avg);
            } else {
              const calList = [
                data.Mn_Cal_1_1,
                data.Mn_Cal_1_2,
                data.Mn_Cal_1_3,
                data.Mn_Cal_1_4,
                data.Mn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Cr') {
            if (data.Cr_Avg !== null && data.Cr_Avg !== undefined && data.Cr_Avg !== '') {
              pushField("Result_1", data.Cr_Avg);
            } else {
              const calList = [
                data.Cr_Cal_1_1,
                data.Cr_Cal_1_2,
                data.Cr_Cal_1_3,
                data.Cr_Cal_1_4,
                data.Cr_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Cu') {
            if (data.Cu_Avg !== null && data.Cu_Avg !== undefined && data.Cu_Avg !== '') {
              pushField("Result_1", data.Cu_Avg);
            } else {
              const calList = [
                data.Cu_Cal_1_1,
                data.Cu_Cal_1_2,
                data.Cu_Cal_1_3,
                data.Cu_Cal_1_4,
                data.Cu_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Fe') {
            if (data.Fe_Avg !== null && data.Fe_Avg !== undefined && data.Fe_Avg !== '') {
              pushField("Result_1", data.Fe_Avg);
            } else {
              const calList = [
                data.Fe_Cal_1_1,
                data.Fe_Cal_1_2,
                data.Fe_Cal_1_3,
                data.Fe_Cal_1_4,
                data.Fe_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Pb') {
            if (data.Pb_Avg !== null && data.Pb_Avg !== undefined && data.Pb_Avg !== '') {
              pushField("Result_1", data.Pb_Avg);
            } else {
              const calList = [
                data.Pb_Cal_1_1,
                data.Pb_Cal_1_2,
                data.Pb_Cal_1_3,
                data.Pb_Cal_1_4,
                data.Pb_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
          if (data.ItemName === 'Cd') {
            if (data.Cd_Avg !== null && data.Cd_Avg !== undefined && data.Cd_Avg !== '') {
              pushField("Result_1", data.Cd_Avg);
            } else {
              const calList = [
                data.Cd_Cal_1_1,
                data.Cd_Cal_1_2,
                data.Cd_Cal_1_3,
                data.Cd_Cal_1_4,
                data.Cd_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_1", firstValidCal);
            }
          }
        } else if (itemStatus === 'FINISH RECHECK') {
          if (data.ItemName === 'Zn') {
            if (data.Zn_Avg !== null && data.Zn_Avg !== undefined && data.Zn_Avg !== '') {
              pushField("Result_2", data.Zn_Avg);
            } else {
              const calList = [
                data.Zn_Cal_1_1,
                data.Zn_Cal_1_2,
                data.Zn_Cal_1_3,
                data.Zn_Cal_1_4,
                data.Zn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Ni') {
            if (data.Ni_Avg !== null && data.Ni_Avg !== undefined && data.Ni_Avg !== '') {
              pushField("Result_2", data.Ni_Avg);
            } else {
              const calList = [
                data.Ni_Cal_1_1,
                data.Ni_Cal_1_2,
                data.Ni_Cal_1_3,
                data.Ni_Cal_1_4,
                data.Ni_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Mn') {
            if (data.Mn_Avg !== null && data.Mn_Avg !== undefined && data.Mn_Avg !== '') {
              pushField("Result_2", data.Mn_Avg);
            } else {
              const calList = [
                data.Mn_Cal_1_1,
                data.Mn_Cal_1_2,
                data.Mn_Cal_1_3,
                data.Mn_Cal_1_4,
                data.Mn_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Cr') {
            if (data.Cr_Avg !== null && data.Cr_Avg !== undefined && data.Cr_Avg !== '') {
              pushField("Result_2", data.Cr_Avg);
            } else {
              const calList = [
                data.Cr_Cal_1_1,
                data.Cr_Cal_1_2,
                data.Cr_Cal_1_3,
                data.Cr_Cal_1_4,
                data.Cr_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Cu') {
            if (data.Cu_Avg !== null && data.Cu_Avg !== undefined && data.Cu_Avg !== '') {
              pushField("Result_2", data.Cu_Avg);
            } else {
              const calList = [
                data.Cu_Cal_1_1,
                data.Cu_Cal_1_2,
                data.Cu_Cal_1_3,
                data.Cu_Cal_1_4,
                data.Cu_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Fe') {
            if (data.Fe_Avg !== null && data.Fe_Avg !== undefined && data.Fe_Avg !== '') {
              pushField("Result_2", data.Fe_Avg);
            } else {
              const calList = [
                data.Fe_Cal_1_1,
                data.Fe_Cal_1_2,
                data.Fe_Cal_1_3,
                data.Fe_Cal_1_4,
                data.Fe_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Pb') {
            if (data.Pb_Avg !== null && data.Pb_Avg !== undefined && data.Pb_Avg !== '') {
              pushField("Result_2", data.Pb_Avg);
            } else {
              const calList = [
                data.Pb_Cal_1_1,
                data.Pb_Cal_1_2,
                data.Pb_Cal_1_3,
                data.Pb_Cal_1_4,
                data.Pb_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
          if (data.ItemName === 'Cd') {
            if (data.Cd_Avg !== null && data.Cd_Avg !== undefined && data.Cd_Avg !== '') {
              pushField("Result_2", data.Cd_Avg);
            } else {
              const calList = [
                data.Cd_Cal_1_1,
                data.Cd_Cal_1_2,
                data.Cd_Cal_1_3,
                data.Cd_Cal_1_4,
                data.Cd_Cal_1_5
              ];
              const firstValidCal = calList.find(v => v !== '-' && v !== null && v !== undefined && v !== '');
              pushField("Result_2", firstValidCal);
            }
          }
        }

        let query3 = `
        UPDATE [WWT].[dbo].[Request]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
        `;
        allQueries += query3 + '\n';

        fields = [];
        pushField("Status", 'REJECT');
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Remark_Job", data.REMARKJOB);

        let query4 = `
        UPDATE [WWT].[dbo].[ICP]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}' AND JobCode = '${data.JOBCODE}';
        `;
        allQueries += query4 + '\n';
      }
    }
    // console.log(allQueries);
    let db = await mssql.qurey(allQueries);
    // console.log(db);

    if (db["rowsAffected"][0] > 0) {
      console.log("Update Success");
      return res.status(200).json('อัปเดทข้อมูลสำเร็จ');
    } else {
      console.log("Update Failed");
      return res.status(400).json('อัปเดทข้อมูลไม่สำเร็จ');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/historyGraph', async (req, res) => {
  //-------------------------------------
  console.log("--historyGraph--");
  //-------------------------------------
  let output = [];
  // console.log(req.body.data);
  let data = req.body.data;
  let query = `SELECT TOP 10 * From [WWT].[dbo].[Request] 
                WHERE CustName = '${data.CUSTNAME}' AND SampNo = '${data.SAMPNO}' AND SampName = '${data.SAMPNAME}' AND ItemName = '${data.ITEMNAME}'
                AND ResultApprove != ''
                ORDER BY SampDate`;
  // console.log(query);
  let db = await mssql.qurey(query);
  if (db["recordsets"].length > 0) {
    let buffer = db["recordsets"][0];
    output = buffer;
    return res.status(200).json(output);
  } else {
    return res.status(400).json('ไม่พบข้อมูล');
  }
});

router.post('/WWT/OCR_ICP', async (req, res) => {
  console.log("--OCR_ICP--");

  try {
    let dataRow = req.body.dataRow;
    // console.log(dataRow);
    const now = ISOToLocal(new Date());
    let insertQuery = '';

    for (const data of dataRow) {
      let fields = [];
      function pushField(name, value) {
        if (value !== '') {
          const escapedValue = value.toString().replace(/'/g, "''");
          fields.push(`[${name}] = '${escapedValue}'`);
        } else {
          fields.push(`[${name}] = NULL`);
        }
      }

      pushField("BottleCode", data.BottleCode);
      pushField("Branch", data.Branch);
      pushField("R", data.R);
      pushField("Dilution", data.DI);
      pushField("Zn_Value", data.Zn_Value);
      pushField("Ni_Value", data.Ni_Value);
      pushField("Mn_Value", data.Mn_Value);
      pushField("Cr_Value", data.Cr_Value);
      pushField("Cu_Value", data.Cu_Value);
      pushField("Fe_Value", data.Fe_Value);
      pushField("Pb_Value", data.Pb_Value);
      pushField("Cd_Value", data.Cd_Value);
      pushField("User_Upload", data.User_Upload);
      pushField("Upload_Date", now);

      // INSERT
      let insert = `
        INSERT INTO [WWT].[dbo].[OCR_ICP] (
        ${fields.map(field => field.split('=')[0].trim()).join(',\n')}
        )
        VALUES (
        ${fields.map(field => field.split('=').slice(1).join('=').trim()).join(',\n')}
        )
        `;
      insertQuery += insert + '\n';
    }
    // console.log(insertQuery);
    let insertResult = await mssql.qurey(insertQuery);

    if (insertResult["rowsAffected"][0] > 0) {
      console.log("Insert Success");
      return res.status(200).json({ message: 'Upload Success' });
    } else {
      console.log("Insert Failed");
      return res.status(400).json('Upload Failed');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json('เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์');
  }
});

router.post('/WWT/getOCRICPValue', async (req, res) => {
  console.log("--getOCRICPValue--");

  try {
    const dataRow = JSON.parse(req.body.dataRow);
    const branch = req.body.Branch;

    const uniqueBottleCodes = [...new Set(dataRow.map(item => item.BOTTLECODE))];

    const baseBottleCodes = [
      'R2', 'CCV-1', 'CCV-2', 'CCV-3',
      'BLK', 'LFB', 'LFM', 'LFMD'
    ];

    const selectColumns = `ID, BottleCode, Branch, R, Dilution, Zn_Value, 
      Ni_Value, Mn_Value, Cr_Value, Cu_Value, Fe_Value, Pb_Value, Cd_Value, User_Upload, Upload_Date`;

    const buildTop1Query = (condition) => {
      return `
        SELECT TOP 1 ${selectColumns}
        FROM [WWT].[dbo].[OCR_ICP]
        WHERE ${condition}
          AND Branch = '${branch}'
        ORDER BY Upload_Date DESC
      `;
    };

    const baseQueryParts = baseBottleCodes.map(code =>
      buildTop1Query(`BottleCode = '${code}'`)
    );

    const likeQueryPartsA = uniqueBottleCodes.map(code => `
        SELECT TOP 5 ${selectColumns}
        FROM (
          SELECT ${selectColumns},
            ROW_NUMBER() OVER (PARTITION BY Dilution ORDER BY Upload_Date DESC) AS rn
          FROM [WWT].[dbo].[OCR_ICP]
          WHERE BottleCode LIKE '%${code}%'
            AND R = 'A'
            AND Branch = '${branch}'
        ) t
        WHERE t.rn = 1
    `);

    const likeQueryPartsB = uniqueBottleCodes.map(code => `
        SELECT TOP 5 ${selectColumns}
        FROM (
          SELECT ${selectColumns},
            ROW_NUMBER() OVER (PARTITION BY Dilution ORDER BY Upload_Date DESC) AS rn
          FROM [WWT].[dbo].[OCR_ICP]
          WHERE BottleCode LIKE '%${code}%'
            AND R = 'B'
            AND Branch = '${branch}'
        ) t
        WHERE t.rn = 1
    `);

    const allQueryParts = [
      ...baseQueryParts,
      ...likeQueryPartsA,
      ...likeQueryPartsB
    ];

    // ✅ ห่อด้วย subquery แล้วค่อย ORDER BY
    const finalQuery = `
      SELECT * FROM (
        ${allQueryParts.join(" UNION ALL ")}
      ) AS combined
      ORDER BY Upload_Date DESC;
    `;

    console.log(finalQuery);

    const db = await mssql.qurey(finalQuery);

    if (db.recordset && db.recordset.length > 0) {
      return res.status(200).json(db.recordset);
    } else {
      return res.status(400).json('ไม่พบข้อมูล');
    }

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.toString() });
  }
});

async function generateBaseReqNo(reqBranch) {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  let prefix = 'ACB';

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

async function generateBaseJobCode(reqBranch, instrument) {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  let prefix = 'ACB';

  if (reqBranch === 'TPK HES LAB') prefix = 'ACR';

  const result = await mssql.qurey(`
    SELECT TOP 1 JobCode FROM [WWT].[dbo].[${instrument}]
    WHERE ReqBranch = '${reqBranch}'
    ORDER BY JobCode DESC
  `);
  // console.log(instrument);
  // console.log(reqBranch);
  let nextNumber = 1;
  if (result.recordset.length > 0) {
    const lastJobCode = result.recordset[0].JobCode; // JOB-ENV-ACB-25XXXX
    const lastNumberStr = lastJobCode.split('-')[3]?.slice(2); // 'XXXX'
    if (lastNumberStr) {
      nextNumber = parseInt(lastNumberStr) + 1;
    }
  }

  const numberPart = nextNumber.toString().padStart(4, '0'); // XXXX
  return `JOB-ENV-${prefix}-${currentYear}${numberPart}-${instrument}`;
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

const formatDate = (date) => {
  if (!date || date.getTime() === 0) {
    return "";
  }
  let day = String(date.getUTCDate()).padStart(2, '0');
  let month = String(date.getUTCMonth() + 1).padStart(2, '0');
  let year = date.getUTCFullYear();
  return `${year}-${month}-${day}`;
};

function convertDateToSQLFormat(input) {
  const [datePart, timePart] = input.split(' ');
  const [day, month, year] = datePart.split('-');

  const formattedTime = timePart || '00:00:00';
  return `20${year}-${month}-${day} ${formattedTime}`;
}


async function calculateAnalysisDue(startDate, addDays) {
  let output = { "AnalysisDue": null };
  let date = new Date(startDate);
  let addedDays = 1;

  if (!holidays) {
    throw new Error("Holidays data has not been loaded. Please call loadHolidays() first.");
  }

  if (addDays === null || addDays === '') {
    return { "AnalysisDue": "" };
  }

  while (addedDays < addDays) {
    const currentDate = date.toISOString().split('T')[0];

    const isHoliday = holidays.has(currentDate);
    // console.log(isHoliday);
    if (!isHoliday) {
      addedDays++;
    }

    date.setDate(date.getDate() + 1);
  }

  while (holidays.has(date.toISOString().split('T')[0])) {
    date.setDate(date.getDate() + 1);
  }

  output['AnalysisDue'] = formatDate(date);
  return output;
}

let holidays = null;
async function loadHolidays() {
  const query = `SELECT HolidayDate FROM [SAR].[dbo].[Master_Holiday]`;
  try {
    let db = await mssql.qurey(query);
    if (db && db.recordsets && db.recordsets[0]) {
      holidays = new Set(db.recordsets[0].map(record => record.HolidayDate.toISOString().split('T')[0]));
      // console.log("Holidays loaded:", holidays);
    }
  } catch (error) {
    console.error("Error loading holidays:", error);
    holidays = new Set();
  }
}

module.exports = router;
