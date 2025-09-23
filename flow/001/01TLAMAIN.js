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
  console.log("--SearchJobList  --");

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
    conditions.push(`ItemStatus IN ('LIST ITEM','LIST RECHECK','LIST RECONFIRM', 'FINISH ITEM', 'FINISH RECONFIRM', 'FINISH RECHECK')`);
  } else if (ListCheck) {
    conditions.push(`ItemStatus IN ('LIST ITEM', 'LIST RECHECK', 'LIST RECONFIRM')`);
  } else if (FinishCheck) {
    conditions.push(`ItemStatus IN ('FINISH ITEM', 'FINISH RECONFIRM', 'FINISH RECHECK')`);
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
               ORDER BY I.JobCode;`;
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

router.post('/WWT/jobAvailable', async (req, res) => {
  //-------------------------------------
  console.log("--jobAvailable--");
  //-------------------------------------
  let output = [];
  let query = `SELECT I.*, R.JobStatus
               FROM [WWT].[dbo].[${req.body.Instrument}] I
               LEFT JOIN [WWT].[dbo].[Request] R
                 ON I.ID = R.ID
               WHERE I.UserListJob = '${req.body.UserListJob}' AND R.JobStatus = 'IN PROCESS'
               ORDER BY I.JobCode;`;
  // let query = `SELECT * From [WWT].[dbo].[${req.body.Instrument}] WHERE UserListJob = '${req.body.UserListJob}' order by JobCode DESC`;

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

    let querySelect = `SELECT * From [WWT].[dbo].[Request] WHERE ID = '${ID}'`;
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
        WHERE ID = '${ID}';
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
      WHERE ID = '${data.ID}';
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
      WHERE ID = '${data.ID}';
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
      if (data.JOBAPPROVER !== '') {
        pushField("DecisionUser", req.body.UserAnalysis);
        pushField("DecisionDate", now);
        pushField("Status", 'APPROVE');
        pushField("Remark_Job", data.REMARKJOB);

        let query1 = `
        UPDATE [WWT].[dbo].[BOD]
        SET ${fields.join(',\n')}
        WHERE ID = '${data.ID}';
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
        WHERE ID = '${data.ID}';
        `;
        allQueries += query4 + '\n';

        // let query4 = `
        // DELETE FROM [WWT].[dbo].[BOD] 
        // WHERE ID = '${data.ID}';
        // `;
        // allQueries += query4 + '\n';
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
