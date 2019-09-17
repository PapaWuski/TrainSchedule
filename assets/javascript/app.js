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
    console.log(name, destination, startTime, frequency);
    if (!(name && destination && startTime && frequency)) {
      console.log("weewoo");
      return 0;
    }
    // do more checking
    // convert start time with moment.
    //const { nextTrain, minutesAway } = convertTime(startTime, frequency);
    // check if start time has am/pm or just a military time
    database.ref().push({
      name,
      destination,
      frequency,
    //   nextTrain,
    //   minutesAway
    });
  };
  
  $(document).on("click", "#submiting", obtainSubmittedInfo);
  
  database.ref().on("child_added", function(childSnapshot) {
    const sv = childSnapshot.val();
    console.log(sv);
    const $trow = $("<tr>");
  
    $trow.append(
      $("<td>").text(`${sv.name}`),
      $("<td>").text(`${sv.destination}`),
      $("<td>").text(`${sv.frequency}`),
      $("<td>").text(`${sv.nextTrain}`),
      $("<td>").text(`${sv.minutesAway}`)
    );
    $("tbody").append($trow);
  });
  