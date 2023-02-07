let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth() + 1;

const timeline = document.querySelector(".timeline");
const memberlist = document.querySelector(".detail-member");
const detailtime = document.querySelector(".detail-time");

// 타임라인 바 길이 계산 함수
function calcTime(startDate, endDate, currentDate) {
  let start = "";
  let hours = "";
  let minutes = "";
  console.log(parseInt(startDate.getDate()));
  console.log(parseInt(endDate.getDate()));
  console.log(parseInt(currentDate));
  if (parseInt(endDate.getDate()) == parseInt(currentDate)) {
    // 앞쪽에서부터 겹치는 경우
    console.log("1");
    if (parseInt(startDate.getDate()) < parseInt(currentDate)) {
      console.log("2");
      start = 0;
      hours = endDate.getHours();
      minutes = endDate.getMinutes();
    }
    // 가운데에 있는 경우
    else if (parseInt(startDate.getDate()) == parseInt(currentDate)) {
      console.log("3");
      start =
        parseInt(startDate.getHours() * 60) + parseInt(startDate.getMinutes());
      hours = endDate.getHours() - startDate.getHours();
      minutes = endDate.getMinutes() - startDate.getMinutes();
    }
  } else if (parseInt(endDate.getDate()) > parseInt(currentDate)) {
    // 뒤로 겹치는 경우
    console.log("4");
    if (parseInt(startDate.getDate()) == parseInt(currentDate)) {
      console.log("5");
      start =
        parseInt(startDate.getHours() * 60) + parseInt(startDate.getMinutes());
      if (startDate.getMinutes() == "00") {
        minutes = "00";
        hours = "24" - startDate.getHours();
      } else {
        minutes = "60" - startDate.getMinutes();
        hours = "23" - startDate.getHours();
      }
    }
    // 통으로 겹치는 경우
    else if (parseInt(startDate.getDate()) < parseInt(currentDate)) {
      console.log("6");
      start = 0;
      hours = "24";
      minutes = "00";
    }
  }
  return [start, hours, minutes];
}

function clearPlanForm() {
  document.getElementById("plan_title").value = "";
  document.getElementById("plan_location").value = "";
  document.getElementById("plan_startTime").value = "";
  document.getElementById("plan_endTime").value = "";
  document.getElementById("plan_content").value = "";
}

function openToggle() {
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("sidebar").style.border = "2px solid orange";
  document.getElementById("sidebar").style.borderLeft = "none";
  document.getElementById("sidebar").style.borderTop = "none";
  document.getElementById("sidebar").style.borderBottom = "none";
}

function closeToggle() {
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("sidebar").style.border = "none";
  document.getElementById("sidebar").style.borderLeft = "none";
  document.getElementById("sidebar").style.borderTop = "none";
  document.getElementById("sidebar").style.borderBottom = "none";
}

const makeMeetingList = (meetingList) => {
  const menu = document.querySelector("#share");

  let contentString = "";
  meetingList.forEach((meeting) => {
    contentString += `<option value="${meeting.fields.meeting_name}">${meeting.fields.meeting_name}</option>`;
  });

  menu.innerHTML = contentString;
};
// 달력이 만들어지는 함수 :
// ajax 사용 x -> 달력이 모두 만들어진 후에 뒤의 코드가 실행되기 때문에
// onload가 필요 없을 것으로 예상
const makeCalendar = () => {
  // 캘린더에 보이는 년도와 달을 보여주기 위해
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  // 캘린더 년도 달 채우기
  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  // 지난 달 마지막 날짜와 요일
  const prevLast = new Date(viewYear, viewMonth, 0);
  const prevDate = prevLast.getDate();
  const prevDay = prevLast.getDay();

  // 이번 달 마지막 날짜 가져오기
  const thisLast = new Date(viewYear, viewMonth + 1, 0);
  const thisDate = thisLast.getDate();
  const thisDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(thisDate + 1).keys()].slice(1);
  const nextDates = [];

  if (prevDay !== 6) {
    for (let i = 0; i < prevDay + 1; i++) {
      prevDates.unshift(prevDate - i);
      // 31-0, 31-1, 31-2, ...
      // 31, 30, 29, 38, ...
    }
  }

  for (let i = 1; i < 7 - thisDay; i++) {
    nextDates.push(i);
  }

  //날짜 그리기
  // 지금 보여지는 달력에 나타나는 일들
  const dates = prevDates.concat(thisDates, nextDates);

  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(thisDate);
  dates.forEach((date, i) => {
    // 삼한연산자 [조건문] ? [참일 때 실행] : [거짓일 때 실행]
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    //this
    //other

    dates[
      i
    ] = `<div class="date"><p class="${condition} day-${date}">${date}</p></div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();

  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

makeCalendar();

// // 이전 달 그리는 함수
// const prevMonth = () => {
//   date.setDate(1);
//   date.setMonth(date.getMonth() - 1);
//   makeCalendar();
// };

// // 다음 달 그리는 함수
// const nextMonth = () => {
//   date.setDate(1);
//   date.setMonth(date.getMonth() + 1);
//   makeCalendar();
// };

// 현재 달 그리는 함수
// const curMonth = () => {
//   date = new Date();
//   makeCalendar();
// };

// 일정 생성 모달 관련
const modalButton = document.querySelector(".modalButton");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");
const closeModal2 = document.querySelector(".closeModal2");

modalButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
closeModal2.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// 새로운 일정 추가하는 함수:
// ajax사용해서 thumbnail 띄우고
// 현재 보고있는 preview에 일정 추가시 해당 preview에도 ajax
const plan_create = () => {
  const requestNewPlan = new XMLHttpRequest();
  const url = "/create-private-plan";
  requestNewPlan.open("POST", url, true);
  requestNewPlan.setRequestHeader(
    "Content-Type",
    "applcation/x-www-form-urlencoded"
  );

  const title = document.getElementById("plan_title").value;
  const location = document.getElementById("plan_location").value;
  const startTime = document.getElementById("plan_startTime").value;
  const endTime = document.getElementById("plan_endTime").value;
  const content = document.getElementById("plan_content").value;
  const selectObj = document.querySelectorAll("#share");

  // 공개하기로 설정한 모임목록 받아오기
  data = selectObj.item(0).options;
  shareMeetingList = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].selected == true) {
      shareMeetingList.push(data[i].value);
    }
  }

  requestNewPlan.send(
    JSON.stringify({
      title: title,
      location: location,
      startTime: startTime,
      endTime: endTime,
      content: content,
      shareMeetings: shareMeetingList,
    })
  );

  requestNewPlan.onreadystatechange = () => {
    if (requestNewPlan.readyState === XMLHttpRequest.DONE) {
      if (requestNewPlan.status < 400) {
        const { plan, userimg } = JSON.parse(requestNewPlan.response);

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        const currentPreview =
          document.querySelector(".date-onclick").childNodes[0].innerText;

        // 새로운 일정이 내가 현재 보고있는 달력의 일정이라면 thumbnail 추가
        if (
          startDate.getFullYear() <= date.getFullYear() &&
          date.getFullYear() <= endDate.getFullYear() &&
          startDate.getMonth() <= date.getMonth() &&
          date.getMonth() <= endDate.getMonth()
        ) {
          for (let i = startDate.getDate(); i <= endDate.getDate(); i++) {
            const day = document.querySelector(`.day-${i}`);
            if (
              !day.nextSibling ||
              !day.nextSibling.classList.contains("private")
            ) {
              const newimg = document.createElement("img");
              newimg.classList.add("private");
              newimg.classList.add("profileImagePlan");
              newimg.src = `${userimg}`;
              newimg.style.width = "15px";
              day.after(newimg);
            }
          }
          // 새로운 일정이 내가 현재 보고 있는 날짜에 포함된다면 preview 추가
          if (
            currentPreview >= startDate.getDate() &&
            currentPreview <= endDate.getDate()
          ) {
            let start = "";
            let hours = "";
            let minutes = "";
            if (timeline.childNodes[0]) {
              // 이미 timeline에 개인일정이 있는 경우
              if (
                timeline.childNodes[0].classList.contains("private-timeline")
              ) {
                [start, hours, minutes] = calcTime(
                  startDate,
                  endDate,
                  currentPreview
                );
                let newplan = document.createElement("a");
                const width = parseInt(hours) * 60 + parseInt(minutes);
                newplan.href = `plan/${plan.id}`;
                newplan.style.position = "absolute";
                newplan.style.width = `${width}px`;
                newplan.style.left = `${start}px`;
                newplan.style.border = "1px solid black";
                newplan.style.backgroundColor = "white";
                newplan.style.color = "black";
                newplan.style.height = "50px";
                newplan.innerText = `${plan.title}`;
                timeline.childNodes[0].appendChild(newplan);
              }
              // timeline에 팀일정만 있는경우
              else {
                // 개인 일정 라인추가
                const newmember = document.createElement("div");
                newmember.innerHTML = `<img class="profileImagePreview" src="${userimg}" width="40" />`;
                newmember.style.height = "50px";
                newmember.style.width = "50px";
                memberlist.firstChild.before(newmember);

                [start, hours, minutes] = calcTime(
                  startDate,
                  endDate,
                  currentPreview
                );

                // 추가한 일정 타임라인 추가
                let newDiv = document.createElement("div");
                newDiv.classList.add("private");
                newDiv.style.height = "50px";
                let newplan = document.createElement("a");
                const width = parseInt(hours) * 60 + parseInt(minutes);
                newplan.href = `plan/${plan.id}`;
                newplan.style.position = "absolute";
                newplan.style.width = `${width}px`;
                newplan.style.left = `${start}px`;
                newplan.style.border = "1px solid black";
                newplan.style.backgroundColor = "white";
                newplan.style.color = "black";
                newplan.style.height = "50px";
                newplan.innerText = `${plan.title}`;
                newDiv.appendChild(newplan);
                timeline.childNodes[0].before(newDiv);
              }
            }
            // timeline에 아무일정도 없는 경우
            else {
              // 개인 일정 라인추가
              const newmember = document.createElement("div");
              newmember.innerHTML = `<img class="profileImagePreview" src="${userimg}" width="40" />`;
              newmember.style.height = "50px";
              newmember.style.width = "50px";
              memberlist.appendChild(newmember);

              [start, hours, minutes] = calcTime(
                startDate,
                endDate,
                currentPreview
              );

              let newDiv = document.createElement("div");
              newDiv.classList.add("private-timeline");
              newDiv.style.height = "50px";
              let newplan = document.createElement("a");
              const width = parseInt(hours) * 60 + parseInt(minutes);
              newplan.href = `plan/${plan.id}`;
              newplan.style.position = "absolute";
              newplan.style.width = `${width}px`;
              newplan.style.left = `${start}px`;
              newplan.style.border = "1px solid black";
              newplan.style.backgroundColor = "white";
              newplan.style.color = "black";
              newplan.style.height = "50px";
              newplan.innerText = `${plan.title}`;
              newDiv.appendChild(newplan);
              timeline.appendChild(newDiv);
            }
          }
        }
        clearPlanForm();
      }
    }
  };
};

window.onload = function () {
  // 달력 모두 load 됐을 시 해당 달 thumbnail 출력
  const requestPlan = new XMLHttpRequest();
  const url = "/view_plan/";
  requestPlan.open("POST", url, true);
  requestPlan.setRequestHeader(
    "Content-Type",
    "applcation/x-www-form-urlencoded"
  );

  requestPlan.send(
    JSON.stringify({
      year: currentYear,
      month: currentMonth,
    })
  );
  requestPlan.onreadystatechange = () => {
    if (requestPlan.readyState === XMLHttpRequest.DONE) {
      if (requestPlan.status < 400) {
        const {
          public_plans,
          private_plans,
          userimg,
          meetingimg,
          meetingList,
        } = JSON.parse(requestPlan.response);
        makeMeetingList(JSON.parse(meetingList));

        const publicPlansArray = JSON.parse(public_plans);
        const privatePlansArray = JSON.parse(private_plans);

        const thismonthDates = document.querySelectorAll(".this");
        // 현재 달력의 갈 날짜를 돌면서
        // 각 plan에 포함되는지 확인한 후
        // 확인된 날짜에서 thumbnail 추가
        // 개인일정이 위쪽에 와야하므로 먼저 추가
        thismonthDates.forEach((day) => {
          privatePlansArray.forEach((plan) => {
            const startTime = new Date(plan.fields.startTime);
            const endTime = new Date(plan.fields.endTime);
            const today = new Date(
              currentYear,
              currentMonth - 1,
              day.innerText
            );
            if (
              startTime.setHours(0, 0, 0, 0) <= today &&
              today <= endTime.setHours(0, 0, 0, 0)
            ) {
              if (day.nextSibling == null) {
                const newImg = document.createElement("img");
                newImg.classList.add(`private`);
                newImg.classList.add(`profileImagePlan`);
                newImg.src = `${userimg}`;
                newImg.style.width = "15px";
                day.parentElement.appendChild(newImg);
              }
            }
          });
          // 이미 추가된 모임의 썸네일인지 확인
          let already = [];
          publicPlansArray.forEach((plan) => {
            const startTime = new Date(plan.fields.startTime);
            const endTime = new Date(plan.fields.endTime);
            const today = new Date(
              currentYear,
              currentMonth - 1,
              day.innerText
            );
            if (
              startTime.setHours(0, 0, 0, 0) <= today &&
              today <= endTime.setHours(0, 0, 0, 0)
            ) {
              if (already.indexOf(`${plan.fields.meetings}`) == -1) {
                const newImg = document.createElement("img");
                meetingimg[plan.fields.meetings];
                newImg.src = `${meetingimg[plan.fields.meetings]}`;
                newImg.classList.add("profileImagePlan");
                newImg.style.width = "15px";
                day.parentElement.appendChild(newImg);
                already.push(`${plan.fields.meetings}`);
              }
            }
          });
        });
      }
    }
  };

  // 전에 선택되었던 날짜 확인
  // date-onclick 없애기 위함
  let prevClickDate = document.querySelector(".today").parentNode;
  prevClickDate.classList.add("date-onclick");

  // onclick시 달력 아래에 타임라인 출력
  const requestExplan = new XMLHttpRequest();
  function viewDetail() {
    const day = this.childNodes[0].innerText;
    const url = "/view_explan/";
    requestExplan.open("POST", url, true);
    requestExplan.setRequestHeader(
      "Content-Type",
      "applcation/x-www-form-urlencoded"
    );
    requestExplan.send(
      JSON.stringify({
        year: currentYear,
        month: currentMonth,
        day: day,
      })
    );
    requestExplan.onreadystatechange = () => {
      if (requestExplan.readyState === XMLHttpRequest.DONE) {
        if (requestExplan.status < 400) {
          const { public_plans, private_plans, today, userimg, meetingimg } =
            JSON.parse(requestExplan.response);
          const publicPlansArray = JSON.parse(public_plans);
          const privatePlansArray = JSON.parse(private_plans);
          memberlist.innerHTML = "";
          timeline.innerHTML = ``;
          // 이미 타임라인에 있는 라인인지 확인
          let already = [];

          privatePlansArray.forEach((plan) => {
            if (already.indexOf(`private`) == -1) {
              let newDiv = document.createElement("div");
              newDiv.classList.add("private-timeline");
              newDiv.style.height = "50px";
              timeline.appendChild(newDiv);
              const newmember = document.createElement("div");
              newmember.innerHTML = `<img class="profileImagePreview"src="${userimg}" width="40" />`;
              newmember.style.height = "50px";
              newmember.style.width = "50px";
              memberlist.appendChild(newmember);
              already.push(`private`);
            }
            const startDate = new Date(plan.fields.startTime);
            const endDate = new Date(plan.fields.endTime);

            let start = "";
            let hours = "";
            let minutes = "";

            [start, hours, minutes] = calcTime(startDate, endDate, today);

            let newplan = document.createElement("a");
            const width = parseInt(hours) * 60 + parseInt(minutes);
            newplan.href = `plan/${plan.pk}`;
            newplan.style.position = "absolute";
            newplan.style.width = `${width}px`;
            newplan.style.left = `${start}px`;
            newplan.style.border = "1px solid black";
            newplan.style.backgroundColor = "white";
            newplan.style.color = "black";
            newplan.style.height = "50px";
            newplan.innerText = `${plan.fields.title}`;
            document.querySelector(".private-timeline").appendChild(newplan);
          });

          publicPlansArray.forEach((plan) => {
            if (already.indexOf(`${plan.fields.meetings}`) == -1) {
              const newmember = document.createElement("div");
              newmember.innerHTML = `<img class="profileImagePreview"src="${
                meetingimg[plan.fields.meetings]
              }" width="40" />`;
              newmember.style.height = "50px";
              newmember.style.width = "50px";
              memberlist.appendChild(newmember);
              let newDiv = document.createElement("div");
              newDiv.style.height = "50px";
              newDiv.classList.add(`meeting-${plan.fields.meetings}`);
              timeline.appendChild(newDiv);
              already.push(`${plan.fields.meetings}`);
            }
            const startDate = new Date(plan.fields.startTime);
            const endDate = new Date(plan.fields.endTime);

            let start = "";
            let hours = "";
            let minutes = "";

            [start, hours, minutes] = calcTime(startDate, endDate, today);

            let newplan = document.createElement("a");
            const width = parseInt(hours) * 60 + parseInt(minutes);
            newplan.href = `plan/${plan.pk}`;
            newplan.style.position = "absolute";
            newplan.style.width = `${width}px`;
            newplan.style.left = `${start}px`;
            newplan.style.border = "1px solid black";
            newplan.style.backgroundColor = "white";
            newplan.style.color = "black";
            newplan.style.height = "50px";
            newplan.innerText = `${plan.fields.title}`;
            document
              .querySelector(`.meeting-${plan.fields.meetings}`)
              .appendChild(newplan);
          });
        }
      }
    };
    prevClickDate.classList.remove("date-onclick");
    prevClickDate.classList.add("date");
    this.classList.remove("date");
    this.classList.add("date-onclick");
    prevClickDate = this;
  }

  // 이번달의 각 날짜에 onclick 이벤트 추가
  let dateTarget = document.querySelectorAll(".this");
  dateTarget.forEach((target) =>
    target.parentNode.addEventListener("click", viewDetail)
  );
};
