var firebaseConfig = {
  apiKey: "AIzaSyCdSBa4Q1nUrrmws6Tb_khKywEVhaQXtkU",
  authDomain: "fir-test-7406d.firebaseapp.com",
  databaseURL: "https://fir-test-7406d.firebaseio.com",
  projectId: "fir-test-7406d",
  storageBucket: "",
  messagingSenderId: "998523890084",
  appId: "1:998523890084:web:36375cc719530818db7931"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

const obtainSubmittedInfo = event => {
  event.preventDefault();
  const name = $("#name")
    .val()
    .trim();
  const destination = $("#destination")
    .val()
    .trim();
  const startTime = $("#startTime").val();
  const frequency = $("#frequency")
    .val()
    .trim();
  if (!(name && destination && startTime && frequency)) {
    alert("Please input Values before hitting submit");
    return 0;
  }

  $("#name").val("");
  $("#destination").val("");
  $("#startTime").val("");
  $("#frequency").val("");
  database.ref().push({
    name,
    destination,
    frequency,
    startTime
  });
};

$(document).on("click", "#submiting", obtainSubmittedInfo);

database.ref().on("child_added", function(childSnapshot) {
  const sv = childSnapshot.val();
  const $trow = $("<tr>");

  let firstTimeConverted = moment(sv.startTime, "HH:mm").subtract(1, "years");
  let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  let remainder = diffTime % sv.frequency;
  let minutesAway = sv.frequency - remainder;
  let nextTrain = moment()
    .add(minutesAway, "minutes")
    .format("LT");
  $trow.append(
    $("<td>").text(`${sv.name}`),
    $("<td>").text(`${sv.destination}`),
    $("<td>").text(`${sv.frequency}`),
    $("<td>").text(`${nextTrain}`),
    $("<td>").text(`${minutesAway}`)
  );
  $("tbody").append($trow);
});
