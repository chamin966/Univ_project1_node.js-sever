const express = require("express");
const app = express();
const portNum = 3002;
const fs1 = require("fs"); // filesystem 임포트
const { db } = require("./firebase.js"); // firebase.js 임포트
const crypto = require("crypto"); // 해시 함수를 위해, npm install crypto --save로 crypto 설치 필요

app.use(express.json());
var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.post("/dataAdd", async (req, res) => {
  // 데이터의 추가
  const { name, status } = req.body;
  console.log(req.body, name, status);
  await db
    .collection("people")
    .doc("Person1") // 나중에 이 부분을 user의 UID로 바꿀 것
    .set({
      // 대괄호를 사용, 데이터를 집어넣는다
      [name]: status,
    });
  res.status(200).send(); // status(200), 성공 상태를 전송
});

app.delete("/dataDel", async (req, res) => {
  // 데이터의 삭제
  const { name, status } = req.body;
  console.log(req.body, name, status);
  await db
    .collection("people")
    .doc("Person1") // 나중에 이 부분을 user의 UID로 바꿀 것
    .delete(); // delete 함수
  res.status(200).send(); // status(200), 성공 상태를 전송
});

app.get("/dataGet", async (req, res) => {
  // 데이터의 추가
  const { name, status } = req.body;
  console.log(req.body, name, status);
  const res2 = await db
    .collection("people")
    .doc("Person1") // 나중에 이 부분을 user의 UID로 바꿀 것
    .get();
  let a = res2.data();
  res.status(200).send(); // status(200), 성공 상태를 전송
});

// dataSample.json 형식을 이용한 더미데이터를 dataJson에 json 형식으로 저장
const dataSample = {
  // json 형식으로 데이터 제작
  name: "형석",
  mail: "shinhs9902@gmail.com",
  PhoneNum: "010-5621-1263",
  sex: "M",
  address: "ABC.XXX, DDD",
  Legal_Representative_name: "xxx",
  Legal_Representative_PhoneNum: "xxx-xxxx-xxxx",
  Legal_Representative_Relation: "xxxxx",
  BioBank_Institute_Name: "National BioBank of Korea", // 고정된 데이터 1
  BioBank_Institute_PhoneNum: "043-719-6520", // 고정된 데이터 2
};
// console.log(data1);
const dataSampleJSON = JSON.stringify(dataSample); // 실제 json 데이터로 만들기
const hashedDataSample = crypto // 만든 데이터를 crypto를 이용, sha512 방식으로 암호화(해시)
  .createHash("sha512")
  .update(dataSampleJSON)
  .digest("base64");
console.log(hashedDataSample); // 해쉬 결과 1

// 위 제작한 데이터를 해시한 데이터를, 새로운 json 데이터에 집어넣은 후 암호화해야 한다.
const dataComplex = {
  // 새롭게 만든 json 데이터
  User_ID: "--------------------",
  SignedDateTime: "CurrentDate",
  Issuer: "Admin",
  PaperNumber: "AXB10023(temp)",
  InputHash: hashedDataSample,
};
// console.log(data1Final);
const dataComplexJSON = JSON.stringify(dataComplex);
const hashedDataComplex = crypto
  .createHash("sha512")
  .update(dataComplexJSON)
  .digest("base64");
console.log(hashedDataComplex);

// json 파일 파싱
fs1.readFile("./dataComplex.json", "utf8", (err, data) => {
  // fs의 함수 중 하나인 readFile을 사용, customer.json 파일을 받아온다.
  if (err) {
    // 에러 처리
    console.log("File read failed:", err);
    return;
  }
  try {
    // try ... catch 문
    const dummy = JSON.parse(data);
    // 새로운 변수 customer을 이용하여 data를 JSON 파싱한다.
    console.log("Current Data is:", dummy[0].요청일자);
    // 그 중, 주소(address)만 사용하기 위한 명령어
  } catch (err) {
    console.log("Error parsing JSON:", err);
  }
  // console.log("File data:", data); data 전체 출력
});

app.listen(portNum, () => {
  console.log("서버가 실행중입니다...");
});
