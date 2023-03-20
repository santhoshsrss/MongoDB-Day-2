db.createCollection("users"); 
db.createCollection("addendance"); 
db.createCollection("topics");
db.createCollection("tasks"); 
db.createCollection("mentors"); 
db.createCollection("company_drives");

db.users.insertMany([
  { userid: 1, name: "Santhosh", email: "santhosh@gmail.com" },
  { userid: 2, name: "Jai", email: "jai@gmail.com" },
  { userid: 3, name: "Arun", email: "Arun@gmail.com" },
  { userid: 4, name: "Javith", email: "javith@gmail.com" },
]);

db.mentors.insertMany([
  { mentorid: 1, name: "Sanjay", email: "Sanjay@gmail.com", mentees: 40 },
  { mentorid: 2, name: "Gopi", email: "gopi@gmail.com", mentees: 34 },
  { mentorid: 3, name: "Suthakaran", email: "suthakaran@gmail.com", mentees: 52 },
]);

db.topics.insertMany([
  { topics: "Html", monthofTeaching: "June" },
  { topics: "Css", monthofTeaching: "July" },
  { topics: "JS", monthofTeaching: "August" },
  { topics: "React", monthofTeaching: "September" },
  { topics: "SQL", monthofTeaching: "october" },
  { topics: "MongoDB", monthofTeaching: "November" },
  { topics: "Nodejs", monthofTeaching: "December" },
]);

db.task.insertMany([
  { task: "Html", monthofTeaching: "june" },
  { task: "Css", monthofTeaching: "july" },
  { task: "JS", monthofTeaching: "august" },
  { task: "React", monthofTeaching: "september" },
  { task: "SQL", monthofTeaching: "octomber" },
  { task: "MongoDB", monthofTeaching: "november" },
  { task: "Nodejs", monthofTeaching: "december" },
]);

db.company_drives.insertMany([
  { company: "ZOHO", date: ISODate("2023-10-05"),attendor:1 }, // used ISOdate to use aggregates $gt $lt
  { company: "Swiggy", date: ISODate("2023-10-12"),attendor:3 },// atttendor refers userid
  { company: "Wipro", date: ISODate("2023-10-23"),attendor:4 },
  { company: "TCS", date: ISODate("2023-11-29"),attendor:1 },
  { company: "Microsoft", date: ISODate("2023-11-20"),attendor:2 },
]);

//Quesion-1
//Find all the topics and tasks which are thought in the month of October

db.topics.find({ month: October });
db.tasks.find({ month: October });

//2
//Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({date:{$gte:ISODate("2023-10-15"),$lte:ISODate("2023-10-30")}}) //$gte --> gt or equal  and lte --> lt or equal 

//3
//Find all the company drives and students who are appeared for the placement

db.users.aggregate([{
    $lookup:{
        from:"company_drives",
        localfield:"userid",
        foreignfield:"attendor",
        as:"attendor"
    }
}])

//4.Find all the mentors with mentee's count more than 15
db.mentors.find({mentees:{$gte:15}})