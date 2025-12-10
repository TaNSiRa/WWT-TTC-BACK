const PDFDocument = require("pdfkit");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
var mongodb = require('../../function/mongodb');

router.post("/WWT/CreateReport", async (req, res) => {
  console.log("CreateReport");
  try {
    let dataRow = JSON.parse(req.body.dataRow);
    console.log(dataRow);
    // Loop through each report key
    const reportKeys = Object.keys(dataRow);
    // เข้าถึงข้อมูลแรกของ dataRow
    const firstKey = Object.keys(dataRow)[0];
    const firstData = dataRow[firstKey];
    // หา SAMPDATE ที่เก่าสุดจากทุก reportKeys
    let oldestSampDate = null;
    for (const reportKey of reportKeys) {
      const reportData = dataRow[reportKey];
      for (const item of reportData) {
        if (item.SAMPDATE) {
          // แปลง format จาก dd-mm-yy hh:mm:ss เป็น Date object
          const dateParts = item.SAMPDATE.split(' ')[0].split('-'); // ['31', '07', '25']
          const day = dateParts[0];
          const month = dateParts[1];
          const year = '20' + dateParts[2]; // แปลง yy เป็น yyyy

          // สร้าง Date object (month ต้องลบ 1 เพราะ JavaScript นับเดือนเริ่มจาก 0)
          const currentDate = new Date(year, parseInt(month) - 1, day);

          if (!oldestSampDate || currentDate < oldestSampDate) {
            oldestSampDate = currentDate;
          }
        }
      }
    }
    // console.log("Oldest SAMPDATE:", oldestSampDate);
    // ดึงปีและเดือนจาก SAMPDATE ที่เก่าสุด
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = oldestSampDate ? oldestSampDate.getFullYear().toString() : new Date().getFullYear().toString();
    const month = oldestSampDate ? monthNames[oldestSampDate.getMonth()] : monthNames[new Date().getMonth()];

    // สร้าง folder structure
    const custName = firstData[0].CUSTNAME;
    const basePath = "C:\\AutomationProject\\WWT\\Report";
    const custPath = path.join(basePath, custName);
    const yearPath = path.join(custPath, year);
    const monthPath = path.join(yearPath, month);

    // สร้าง folder ถ้ายังไม่มี
    if (!fs.existsSync(custPath)) {
      fs.mkdirSync(custPath, { recursive: true });
    }
    if (!fs.existsSync(yearPath)) {
      fs.mkdirSync(yearPath, { recursive: true });
    }
    if (!fs.existsSync(monthPath)) {
      fs.mkdirSync(monthPath, { recursive: true });
    }

    // กำหนด savePath ใหม่
    const savePath = path.join(monthPath, firstData[0].REQNO + ".pdf");
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const writeStream = fs.createWriteStream(savePath);

    doc.registerFont('AngsanaNew', 'assets/fonts/angsa.ttf');
    doc.registerFont('AngsanaNew-Bold', 'assets/fonts/angsab.ttf');
    doc.registerFont('cambria-math', 'assets/fonts/cambria-math.ttf');

    doc.pipe(writeStream);

    let CUSTNAME = await mongodb.find("TALMASTER", "CUSTNAME", { "activeid": `active_id` }, { "CUSTNAME": 1 });
    let myCompanyAddress = '';
    let tel = '';
    let DocNo = '';
    let labNo = '';
    let labNoRemark = '';

    if (firstData && firstData[0] && firstData[0].REQBRANCH == 'TPK HES LAB') {
      myCompanyAddress = '500/19 MOO 3, WHA EASTERN SEABOARD INDUSTRIAL ESTATE1, TASIT, PLUAK DAENG, RAYONG 21140';
      tel = 'TEL: 0-3365-8800, FAX: 0-3365-8883';
      labNo = 'LABORATORY No. ว - 285';
      labNoRemark = 'Laboratory No. ว-256';
      DocNo = 'FR-LCR-02/014-03-05/01/2';
    } else {
      myCompanyAddress = '570 MOO 4 BANGPOO INDUSTRIAL ESTATE SOI 12, SUKHUMVIT ROAD, PRAKASA, MUANG, SAMUTPRAKARN 10280';
      tel = 'TEL: 0-2324-6600, FAX: 0-2324-6660';
      labNo = 'LABORATORY No. ว - 256';
      labNoRemark = 'Laboratory No. ว-285';
      DocNo = 'FR-CTC-02/004-04-05/01/26';
    }

    const { front: companyAddressFront, back: companyAddressBack } = splitAddress(myCompanyAddress);
    const custname = CUSTNAME.find(item => item.CUSTNAME === firstData[0].CUSTNAME);
    const customerAddress = custname ? custname.ADDRESS : '';

    let isFirstPage = true;

    for (const reportKey of reportKeys) {
      const allReportData = dataRow[reportKey];

      // แยกข้อมูลตาม REPORTFORMAT
      const format1Data = allReportData.filter(item => item.REPORTFORMAT === '1');
      const format2Data = allReportData.filter(item => item.REPORTFORMAT === '2');

      // สร้าง 2 หน้า (หน้าแรก = format1, หน้าที่สอง = format2)
      const pages = [
        { data: format1Data, suffix: '', showLabNo: true, showBottomRemark: true, showRegistrationNo: true, showRemark: true, showSamplingPersonNo: true },
        { data: format2Data, suffix: ' EX', showLabNo: false, showBottomRemark: false, showRegistrationNo: false, showRemark: false, showSamplingPersonNo: false }
      ];

      for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const currentPage = pages[pageIndex];
        const reportData = currentPage.data;

        if (!isFirstPage) {
          doc.addPage();
        }
        isFirstPage = false;

        // ตำแหน่งเริ่มต้น
        let yPos = 20;

        // 1. Logo และชื่อบริษัท (ด้านซ้าย)
        doc.image('assets/logo/logoTPK.jpg', 50, yPos, { width: 50 });

        doc.fontSize(20).font('AngsanaNew-Bold');
        doc.text('THAI PARKERIZING CO., LTD.', 100, yPos);
        yPos += 5;

        // 2. LABORATORY No. (ด้านขวา)
        doc.fontSize(12).font('AngsanaNew-Bold');
        if (currentPage.showLabNo) {
          doc.text(labNo, 400, yPos, { align: 'right' });
        } else {
          doc.text('LABORATORY No. -', 400, yPos, { align: 'right' });
        }

        yPos += 25;

        // 3. ที่อยู่
        doc.text(companyAddressFront, 50, yPos);
        yPos += 15;
        doc.text(companyAddressBack, 50, yPos);
        yPos += 15;

        // 4. เบอร์โทร
        doc.fontSize(12).font('AngsanaNew');
        doc.text(tel, 50, yPos);
        yPos += 25;

        // 5. หัวข้อ TESTING REPORT ในกล่อง
        doc.rect(200, yPos, 200, 30).stroke();
        doc.fontSize(20).font('AngsanaNew-Bold');
        doc.text('TESTING REPORT', 200, yPos + 2, { width: 200, align: 'center' });

        yPos += 45;

        // 6. ข้อมูล Customer, Report No, etc.
        doc.fontSize(14).font('AngsanaNew');

        const customerName = allReportData[0]?.CUSTNAME || '';
        const reportNo = reportKey || '';
        const raw = allReportData[0]?.SAMPDATE || '';
        const samplingDate = raw ? raw.split(" ")[0].replace(/-/g, "/") : '';

        // 1. Filter เฉพาะ record ที่มี RECEIVEDDATE
        const receivedList = allReportData
          .filter(x => x.RECEIVEDDATE && x.RECEIVEDDATE.trim() !== "");

        // 2. sort เอาตัวที่วันที่ใหม่ที่สุด (Descending)
        receivedList.sort((a, b) => {
          return new Date(b.RECEIVEDDATE) - new Date(a.RECEIVEDDATE);
        });

        // 3. ดึงวันที่ล่าสุด
        const latestReceived = receivedList[0]?.RECEIVEDDATE || "";

        // 4. ตัดเวลาออก
        const receivingDate = latestReceived.split(" ")[0].replace(/-/g, "/");

        const sourceOfSample = allReportData[0]?.SAMPNAME || '';

        // 1. Filter เฉพาะที่มี RECEIVEDDATE
        const receivefirstList = allReportData
          .filter(x => x.RECEIVEDDATE && x.RECEIVEDDATE.trim() !== "");

        // 2. sort แบบเก่าสุดมาก่อน (Ascending)
        receivefirstList.sort((a, b) => {
          return new Date(a.RECEIVEDDATE) - new Date(b.RECEIVEDDATE);
        });

        // 3. ดึงวันที่เก่าสุด
        const firstReceiveDate = receivefirstList[0]?.RECEIVEDDATE || "";

        // 4. ตัดเวลาออก
        const firstReceive = firstReceiveDate.split(" ")[0].replace(/-/g, "/");

        // 1. Filter เฉพาะ record ที่มี JOBAPPROVEDATE
        const jobApproveDateList = allReportData
          .filter(x => x.JOBAPPROVEDATE && x.JOBAPPROVEDATE.trim() !== "");

        // 2. sort เอาตัวที่วันที่ใหม่ที่สุด (Descending)
        jobApproveDateList.sort((a, b) => {
          return new Date(b.JOBAPPROVEDATE) - new Date(a.JOBAPPROVEDATE);
        });

        // 3. ดึงวันที่ล่าสุด
        const latestjobApproveDate = jobApproveDateList[0]?.JOBAPPROVEDATE || "";

        // 4. ตัดเวลาออก
        const jobApproveDate = latestjobApproveDate.split(" ")[0].replace(/-/g, "/");

        let samplingBy = allReportData[0]?.SAMPPERSON || '';

        // 1. Filter เฉพาะ record ที่มี REPORTAPPROVEDATE
        const reportDateList = allReportData
          .filter(x => x.REPORTAPPROVEDATE && x.REPORTAPPROVEDATE.trim() !== "");

        // 2. sort เอาตัวที่วันที่ใหม่ที่สุด (Descending)
        reportDateList.sort((a, b) => {
          return new Date(b.REPORTAPPROVEDATE) - new Date(a.REPORTAPPROVEDATE);
        });

        // 3. ดึงวันที่ล่าสุด
        const latestReportDate = reportDateList[0]?.REPORTAPPROVEDATE || "";

        // 4. ตัดเวลาออก
        const reportDate = latestReportDate.split(" ")[0].replace(/-/g, "/");

        // แถวที่ 1
        doc.text('Customer name:', 50, yPos);
        doc.text(customerName, 125, yPos);
        doc.moveTo(120, yPos + 18).lineTo(295, yPos + 18).stroke();
        doc.text('Report No.:', 320, yPos);
        doc.text(reportNo + currentPage.suffix, 395, yPos);
        doc.moveTo(390, yPos + 18).lineTo(550, yPos + 18).stroke();

        yPos += 17;

        // แถวที่ 2
        doc.text('Address:', 50, yPos);
        doc.fontSize(14).font('AngsanaNew');
        doc.text(customerAddress, 90, yPos, { width: 210 });
        doc.fontSize(14).font('AngsanaNew');
        doc.moveTo(90, yPos + 18).lineTo(295, yPos + 18).stroke();
        doc.text('Sampling Date:', 320, yPos);
        doc.text(samplingDate, 395, yPos);
        doc.moveTo(390, yPos + 18).lineTo(550, yPos + 18).stroke();

        yPos += 17;

        // แถวที่ 3
        doc.text('', 50, yPos);
        doc.moveTo(90, yPos + 18).lineTo(295, yPos + 18).stroke();
        doc.text('Receiving date:', 320, yPos);
        doc.text(receivingDate, 395, yPos);
        doc.moveTo(390, yPos + 18).lineTo(550, yPos + 18).stroke();

        yPos += 17;

        // แถวที่ 4
        doc.text('Source of sample:', 50, yPos);
        doc.text(sourceOfSample, 125, yPos);
        doc.moveTo(120, yPos + 18).lineTo(295, yPos + 18).stroke();
        doc.text('Analysis date:', 320, yPos);
        doc.text(firstReceive + ' - ' + jobApproveDate, 395, yPos);
        doc.moveTo(390, yPos + 18).lineTo(550, yPos + 18).stroke();

        yPos += 17;
        // แถวที่ 5
        doc.text('Sampling by:', 50, yPos);
        if (currentPage.showSamplingPersonNo) {
          doc.text(samplingBy, 125, yPos);
        } else {
          samplingBy = samplingBy.replace(/\s*\(.*?\)/, "");
          doc.text(samplingBy, 125, yPos);
        }
        doc.moveTo(120, yPos + 18).lineTo(295, yPos + 18).stroke();
        doc.text('Report date:', 320, yPos);
        doc.text(reportDate, 395, yPos);
        doc.moveTo(390, yPos + 18).lineTo(550, yPos + 18).stroke();

        yPos += 30;

        // 7. ตาราง (15 แถว + หัวตาราง)
        const tableTop = yPos;
        const colWidths = [80, 50, 80, 80, 210];
        const colPositions = [50, 130, 180, 260, 340];
        let rowHeight = 40;

        // หัวตาราง
        doc.font('AngsanaNew-Bold').fontSize(14);
        doc.rect(colPositions[0], tableTop, colWidths[0], rowHeight).stroke();
        doc.text('Parameters', colPositions[0], tableTop + 10, { width: colWidths[0], align: 'center' });

        doc.rect(colPositions[1], tableTop, colWidths[1], rowHeight).stroke();
        doc.text('Unit', colPositions[1], tableTop + 10, { width: colWidths[1], align: 'center' });

        doc.rect(colPositions[2], tableTop, colWidths[2], rowHeight).stroke();
        doc.text('Result', colPositions[2], tableTop + 10, { width: colWidths[2], align: 'center' });

        doc.rect(colPositions[3], tableTop, colWidths[3], rowHeight).stroke();
        doc.text('Guideline/', colPositions[3], tableTop + 3, { width: colWidths[3], align: 'center' });
        doc.text('Specification', colPositions[3], tableTop + 17, { width: colWidths[3], align: 'center' });

        doc.rect(colPositions[4], tableTop, colWidths[4], rowHeight).stroke();
        doc.text('Method', colPositions[4], tableTop + 10, { width: colWidths[4], align: 'center' });

        yPos = tableTop + rowHeight;
        rowHeight = 20;

        // สร้าง 15 แถว (ใช้ข้อมูลที่ filter แล้ว)
        doc.font('AngsanaNew').fontSize(14);
        for (let j = 0; j < 15; j++) {
          const rowData = reportData[j];

          // Parameters
          doc.rect(colPositions[0], yPos, colWidths[0], rowHeight).stroke();
          if (rowData) {
            doc.text(rowData.ITEMNAME || '', colPositions[0] + 5, yPos, { width: colWidths[0] - 10, align: 'center' });
          }

          // Unit
          doc.rect(colPositions[1], yPos, colWidths[1], rowHeight).stroke();
          if (rowData) {
            doc.text(rowData.UNIT || '', colPositions[1] + 5, yPos, { width: colWidths[1] - 10, align: 'center' });
          }

          // Result
          doc.rect(colPositions[2], yPos, colWidths[2], rowHeight).stroke();
          if (rowData) {
            doc.font('AngsanaNew-Bold').fontSize(14);
            doc.text(rowData.RESULTAPPROVE || '', colPositions[2] + 5, yPos, { width: colWidths[2] - 10, align: 'center' });
            doc.font('AngsanaNew').fontSize(14);
          }

          // Guideline/Specification
          doc.rect(colPositions[3], yPos, colWidths[3], rowHeight).stroke();
          if (rowData) {
            const controlRange = rowData.CONTROLRANGE || '';

            if (controlRange.includes('≤')) {
              const parts = controlRange.split('≤');
              const cellCenterX = colPositions[3] + colWidths[3] / 2;

              doc.font('cambria-math').fontSize(10);
              const symbolWidth = doc.widthOfString('≤');
              doc.font('AngsanaNew').fontSize(14);
              const textWidth = doc.widthOfString(parts.join(''));

              const totalWidth = textWidth + symbolWidth;
              let xPos = cellCenterX - (totalWidth / 2);

              const mainFontSize = 18;
              const yOffset = (rowHeight - mainFontSize) / 2;
              const textYPos = yPos + yOffset;

              if (parts[0]) {
                doc.font('AngsanaNew').fontSize(14);
                doc.text(parts[0], xPos, textYPos, { width: colWidths[3], lineBreak: false, continued: true });
                xPos += doc.widthOfString(parts[0]);
              }

              const symbolYOffset = (rowHeight - 10) / 2 - 1;
              doc.font('cambria-math').fontSize(10);
              doc.text('≤', xPos, yPos + symbolYOffset, { width: colWidths[3], lineBreak: false, continued: true });
              xPos += symbolWidth;
              xPos -= 8;

              if (parts[1]) {
                doc.font('AngsanaNew').fontSize(14);
                doc.text(parts[1], xPos, textYPos, { width: colWidths[3], lineBreak: false });
              }

            } else {
              doc.font('AngsanaNew').fontSize(14);
              doc.text(controlRange, colPositions[3] + 5, yPos, { width: colWidths[3] - 10, align: 'center' });
            }

            doc.font('AngsanaNew').fontSize(14);
          }

          // Method
          doc.rect(colPositions[4], yPos, colWidths[4], rowHeight).stroke();
          if (rowData) {
            doc.text(rowData.METHOD || '', colPositions[4] + 5, yPos, { width: colWidths[4] - 10, align: 'left' });
          }

          yPos += rowHeight;
        }

        yPos += 7;

        // 8. Remark (ใช้ Remark_Job ของ BOD)
        doc.fontSize(14).font('AngsanaNew-Bold');
        doc.text('Remark:', 50, yPos);
        yPos += 15;

        // หา BOD remark จาก allReportData
        const bodData = allReportData.find(item => item.ITEMNAME === 'BOD');
        const remarkText = bodData?.REMARKJOB || '';

        doc.fontSize(14).font('AngsanaNew');
        if (currentPage.showRemark) {
          doc.text(remarkText, 50, yPos, { width: 500 });
        } else {
          doc.text('', 50, yPos, { width: 500 });
        }


        yPos += 17;
        doc.moveTo(50, yPos).lineTo(550, yPos).stroke();
        yPos += 17;
        doc.moveTo(50, yPos).lineTo(550, yPos).stroke();
        yPos += 5;

        // 9. หัวข้อ 1-4
        doc.fontSize(12).font('AngsanaNew');
        if (currentPage.showBottomRemark) {
          doc.text('1. This report is according to Ministry of Industry Announcement Subject: Establishing standards for controlling wastewater drainage from factories, B.E.2560', 50, yPos, { width: 550 });
          yPos += 12;

          doc.text('2. Guideline/Specification are according to Notification of the Industrial Estate Authority of Thailand No.76, B.E.2560: Criteria of wastewater', 50, yPos, { width: 550 });
          yPos += 12;

          doc.text('3. Analysis Method refer to Standard Methods for the Examination of Water and Wastewater, 24th Edition, 2023', 50, yPos, { width: 550 });
          yPos += 12;

          doc.text('4. * Means result from Thai Parkerizing Co., Ltd.: ' + labNoRemark, 50, yPos, { width: 550 });
          yPos += 20;
        } else {
          doc.text('These parameters are not registered by DIW.', 50, yPos, { width: 550 });
          yPos += 56;
        }



        // 10. Report by และ Approve by
        doc.fontSize(14).font('AngsanaNew');

        doc.text('Reported by:', 50, yPos);
        doc.text('Approved by:', 340, yPos);

        const job = findFinalApprover(
          allReportData,
          "JOBAPPROVER",
          "JobApproverFullName",
          "JobApproverRegistrationNo"
        );

        const finalJobApprover = job.name;
        const finalJobFullName = job.fullName;
        const finalJobRegNo = job.regNo;

        const report = findFinalApprover(
          allReportData,
          "REPORTAPPROVER",
          "ReportApproverFullName",
          "ReportApproverRegistrationNo"
        );

        const finalReportApprover = report.name;
        const finalReportFullName = report.fullName;
        const finalReportRegNo = report.regNo;

        const reporterSignPath = `\\\\172.23.10.51\\Sign_Pic\\${finalJobApprover}.jpg`;
        const approverSignPath = `\\\\172.23.10.51\\Sign_Pic\\${finalReportApprover}.jpg`;

        const jobImgX = 150;
        const reportImgX = 430;
        const imgW = 50;
        const imgH = 30;

        if (fs.existsSync(reporterSignPath)) {
          doc.image(reporterSignPath, jobImgX, yPos, { width: imgW, height: imgH });
        }

        if (fs.existsSync(approverSignPath)) {
          doc.image(approverSignPath, reportImgX, yPos, { width: imgW, height: imgH });
        }

        yPos += imgH;

        const jobNameX = jobImgX + (imgW - doc.widthOfString("(" + finalJobFullName + ")")) / 2;
        const reportNameX = reportImgX + (imgW - doc.widthOfString("(" + finalReportFullName + ")")) / 2;

        doc.text("(" + finalJobFullName + ")", jobNameX, yPos);
        doc.text("(" + finalReportFullName + ")", reportNameX, yPos);

        yPos += 15;

        const jobRegX = jobImgX + (imgW - doc.widthOfString("Registration No " + finalJobRegNo)) / 2;
        const reportRegX = reportImgX + (imgW - doc.widthOfString("Registration No " + finalReportRegNo)) / 2;

        doc.fontSize(14);
        if (currentPage.showRegistrationNo) {
          doc.text("Registration No " + finalJobRegNo, jobRegX, yPos);
          doc.text("Registration No " + finalReportRegNo, reportRegX, yPos);
        } else {
          doc.text("Registration No -", 143, yPos);
          doc.text("Registration No -", 423, yPos);
        }


        yPos += 20;

        // 11. ท้ายกระดาษ
        doc.fontSize(14).font('AngsanaNew').fillColor('grey');
        doc.text(DocNo, 50, yPos);
        yPos += 20;

        doc.fontSize(9);
        doc.text('This report certifies only the samples that have been analyzed. Do not use this report for advertising or reference without permission. If any numbers or text are scratched, deleted, crossed out, edited or changed.', 50, yPos, { width: 500 });
        yPos += 10;
        doc.text('This report will be considered incomplete. Do not copy only part of the report of the results of the inspection, measurement, and analysis. without written permission from the laboratory.', 50, yPos, { width: 500 });
      }
    }

    doc.end();

    writeStream.on("finish", () => {
      const bitmap = fs.readFileSync(savePath);
      res.json(bitmap.toString("base64"));
    });

    writeStream.on("error", (err) => {
      console.error("WriteStream error:", err);
      res.status(500).send("Error writing PDF file");
    });

  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).send("Internal Server Error");
  }
});

function splitAddress(address) {
  const parts = address.split(",");

  if (parts.length < 3) {
    return {
      front: address,
      back: ""
    };
  }

  const lastTwo = parts.slice(-3).join(",").trim();
  const front = parts.slice(0, -3).join(",").trim() + ",";

  return { front, back: lastTwo };
}

function findFinalApprover(reportData, keyName, keyFullName, keyRegNo) {
  if (!Array.isArray(reportData) || reportData.length === 0) {
    return { name: "", fullName: "", regNo: "" };
  }

  const countMap = {};
  reportData.forEach(item => {
    const name = item[keyName]?.trim();
    if (!name) return;
    countMap[name] = (countMap[name] || 0) + 1;
  });

  const maxCount = Math.max(...Object.values(countMap));

  const candidates = Object.keys(countMap).filter(
    name => countMap[name] === maxCount
  );

  if (candidates.length === 1) {
    const name = candidates[0];
    const record = reportData.find(x => x[keyName] === name);
    return {
      name,
      fullName: record?.[keyFullName] || "",
      regNo: record?.[keyRegNo] || ""
    };
  }

  const regList = candidates.map(name => {
    const record = reportData.find(x => x[keyName] === name);
    const regNo = record?.[keyRegNo] || "";

    const match = regNo.match(/(\d{4})$/);
    const last4 = match ? parseInt(match[1], 10) : 9999;

    return { name, record, last4 };
  });

  regList.sort((a, b) => a.last4 - b.last4);

  const best = regList[0];

  return {
    name: best.name,
    fullName: best.record?.[keyFullName] || "",
    regNo: best.record?.[keyRegNo] || ""
  };
}

module.exports = router;