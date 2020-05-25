import moment from "moment";

export const dateToString = myDate => {
  const event = myDate;
  return moment(event).format("MMMM Do YYYY, h:mm A");
};

export const dateToTimeString = myDate => {
  const event = myDate;
  return moment(event).format("h:mm A");
};

export const dateToDateString = myDate => {
  const event = myDate;
  return moment(event).format("MMMM Do YYYY");
};
