const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

// wip saving - expected data structure

// const chosenAnswersObject = [
//   {
//     0: {
//       isTheTruth: false,
//       isWrittenByUser: true,
//       answer: "trees",
//       writer: "Nadica",
//       choosers: ["Gili", "Tim", "Alki"],
//     },
//     1: {
//       isTheTruth: false,
//       isWrittenByUser: true,
//       answer: "flowers",
//       writer: "Nadica",
//       choosers: ["Torsten", "Dennis"],
//     },
//     2: {
//       isTheTruth: false,
//       isWrittenByUser: false,
//       answer: "flowers",
//       writer: undefined,
//       choosers: ["Torsten", "Dennis"],
//     },
//     3: {
//       isTheTruth: true,
//       isWrittenByUser: false,
//       answer: "Rocks",
//       writer: undefined,
//       choosers: ["Torsten", "Dennis"],
//     },
//   },
// ];

// 1 iteration
// show worng chosen answer (without the players who chose it)
// loop over chosenAnswersObject show 1st key
// setTimeOut 5 sec
// show the players who chose that ( worng chosen answer)
// inside current/same loop display the names in the array
// setTimeOut 5 sec
// show how wrote it
