const sql = require('mssql');
const logger = require("./logFile");
const config = {
  user: "sa",
  password: "Automatic",
  // password: "12345678",
  database: "",
  server: '172.23.10.51',
  // server: '127.0.0.1',
  pool: {
    // max: 10,
    // min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  }
}

// exports.qurey = async (input) => {
//   try {
//     await sql.connect(config)
//     const result = await sql.query(input)
//     //  console.dir(result)
//     return result;
//   } catch (err) {
//     return "err";
//   }
// };

exports.qurey = async (input) => {
  let connection = null;
  try {
    await sql.connect(config);
    const result = await sql.query(input);

    return result;
  } catch (err) {
    console.log("Query error:", err);
    try {
      await logger.error("Database query failed", err, {
        query: input,
      });
      console.log("return err");
    } catch (err) {
      console.log("logger error err : ", err);
      throw err;
    }
    throw err;
  } finally {
    try {
      await sql.close();
    } catch (closeErr) {
      sql.close();
      console.log("Error closing connection:", closeErr);
    }
  }
};

// exports.qurey = async (input) => {
//   try {
//     let out;
//     await sql.connect(config)
//     const result = await sql.query(input).then((v) => {
//       // console.log(`---------------`);
//       // console.log(v);
//       out = v;
//       // console.log(`---------------`);
//       return v;

//     }).then(() => sql.close())
//     // console.log(".query : ", input);
//     // console.log(result)
//     return out;
//   } catch (err) {
//     sql.close()
//     return err;
//   }
// };

exports.stringQureyLog = (action, user, detail) => {
  detail = detail.replace(/'/g, "''");
  let stringQuery = `
  INSERT INTO log_data (action,action_user,action_detail) VALUES ('${action}','${user}',N'${detail}');`;
  return stringQuery;
};

exports.stringSafeN = (textIn) => {
  try {
    textIn = textIn.replace(/'/g, "''");
    return textIn;
  } catch {
    console.log("stringSafeN err : ", err);
    return "";
  }
};