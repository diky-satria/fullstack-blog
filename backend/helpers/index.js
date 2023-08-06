exports.techstack_sanitation_detail = (val) => {
  var val_split = val.split(",");
  var val_data = [];
  for (var i = 0; i < val_split.length; i++) {
    val_data.push({
      label: val_split[i],
      value: val_split[i],
    });
  }

  return val_data;
};

exports.timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + " " + month + " " + year + " " + hour + ":" + min;
  return time;
};
