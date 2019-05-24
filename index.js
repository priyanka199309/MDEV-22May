const sqlite3 =require("sqlite3").verbose();

const db=new sqlite3.Database(":memory:");

db.serialize(function()
{

  db.run("CREATE TABLE instructor (ID NUMBER, Name TEXT, Dept_name Text,Salary NUMBER)");
    db.run("INSERT INTO instructor VALUES(1001, 'Priyanka', 'Comp_Sci',700000)");
    db.run("INSERT INTO instructor VALUES(1002, 'Kiran', 'Science',750000)");
   db.run("INSERT INTO instructor VALUES(1003, 'Gagan','Arts',50000)");
   db.run("INSERT INTO instructor VALUES(1004, 'Paul', 'Physics',90000)");
   db.run("INSERT INTO instructor VALUES(1005, 'Nick', 'Comp_Sci',80000)");
   db.run("INSERT INTO instructor VALUES(1006, 'Joe', 'Physics',10000)");
   db.run("INSERT INTO instructor VALUES(1007, 'Einstein', 'Chemistry',750000)");
   db.run("INSERT INTO instructor VALUES(1008, 'Kate', 'Arts',550000)");
   db.run("INSERT INTO instructor VALUES(1009, 'Kevin', 'Chemistry',60000)");
  //  db.each("SELECT * FROM instructor",function(err,row)
  db.each("SELECT name FROM instructor",function(err,row)
   {
      // if(err)
      // console.log(err);
      // console.log(row);
   }
   );
   db.each("SELECT  Distinct Dept_name FROM instructor",function(err,row)
   {
      // console.log(row.Dept_name);
   });

   let results=new Array();
   db.each("SELECT name from instructor where Dept_name='Arts' and salary>70000",function(err,row)
   {
    console.log(row);

   },
   function(erro,count)
   {
     let resultString="";
     for(let i=0;i!=results.length;i++)
     {
       if(i!=count)
       {
         resultString +=results[i]+ " , "
       }
       else
       resultString+=results[i];
     }
    //  console.log(resultString + "have high salary");
  //print high salary

   }

   );
   //print departname and the total salary spend for each department
   //History: 1000000 yearly
   let depts={}
   db.each("SELECT Dept_name,Salary from instrutor",function(err,row){
     
    if(depts[row.Dept_name]===undefined)
    depts[row.Dept_name]=0;
    depts[row.Dept_name] += row.Salary;

   },
   function(err,count)
   {
     console.log("History" + ":"+depts["Physics"]+ "Yearly");
    // let keys=Object.keys(depts);
    // for(let i=0;i!=keys.length;i++)
    // {
    //   console.log(keys[i] +":"+depts[keys[i]]+"yearly");
    // }
   }
   );
});
