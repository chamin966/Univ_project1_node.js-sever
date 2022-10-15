const express = require("express");
const app = express();
const portNum = 3000;
const { db } = require("./firebase.js"); // firebase.js 임포트

app.use(express.json());

const friends = {
  // 예시 자료
  james: "friend",
  larry: "friend",
  lucy: "friend",
  banana: "enemy",
};

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

app.listen(portNum, () => {
  console.log("서버가 실행중입니다...");
});
