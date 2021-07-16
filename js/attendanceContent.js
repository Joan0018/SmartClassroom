let studentDetails = new Map();
let studentsNameSet = new Set();
let ui_buttons;
let totalClassDuration = 0;
let StartTime = new Date().toLocaleTimeString();
let goingToStop = 0;
let isAttendanceWorking = false;

function displayAttendanceList(){
    let meetingCode = window.location.pathname.substring(1);
    let date = new Date();
    let dd = date.getDate();
    let mm = date.toLocaleString('default', { month: 'short' })
    let yyyy = date.getFullYear();
    let newWindow = window.open();
    newWindow.document.writeln("<style>");
    newWindow.document.writeln("table{ font-family: arial, sans-serif; border-collapse: collapse; width: 100%; }");
    newWindow.document.writeln("td,th{   border: 1px solid black;text-align: center;padding: 8px; }");
    newWindow.document.writeln("tr:nth-child(even) { background-color: #dddddd; }");
    newWindow.document.writeln(`.btn{ background-color: DodgerBlue; border: none; color: white; padding: 12px 30px; cursor: pointer; font-size: 12px; }`);
    newWindow.document.writeln(`.btn:hover{ background-color: RoyalBlue; }`);
    newWindow.document.writeln(`#heading{ justify-content:space-around;display:flex; }`);
    newWindow.document.writeln("</style>");
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<title>Google Meet Attendance Summary</title>");
    newWindow.document.writeln("<div id=heading>");
    newWindow.document.writeln("<p style=font-size:17px;>Meeting Code: <b>"+ meetingCode +"</b></p>");
    newWindow.document.writeln(`<p style=font-size:25px;margin-left:-6%>Google Meet Attendance Tracking Report</p>`);
    newWindow.document.writeln("<p style=font-size:20px;><b>"+ dd+"-"+mm+"-"+yyyy +"</b></p>");
    newWindow.document.writeln("</div>");
    newWindow.document.writeln(`<button class="btn" id="download-btn">Download</button>`);
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Attendance Tracking Started at &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+StartTime+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Attendance Tracking Stopped at &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+new Date().toLocaleTimeString()+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Total Number of People Attended&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;"+((studentDetails.size))+"</h3>");
    newWindow.document.writeln("<h3 style=margin-left:35%;>Total Meeting Duration;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;"+toTimeFormat(totalClassDuration)+"</h3>");
    newWindow.document.writeln("<hr>");
    // let sortedtstudentsNameSet = [];
    // let mapKeys = studentDetails.keys();
    // let PercentDuration_65 = Math.ceil((totalClassDuration*65)/100);
    // let studentsLessThan_65 = 0,studentsMoreThan_65 = 0;
    // for(i=0; i<studentDetails.size; i++){ 
    //     let studentName = mapKeys.next().value;
    //     sortedtstudentsNameSet.push(studentName);
    //     studentDetails.get(studentName) >= PercentDuration_65 ? studentsMoreThan_65++ : studentsLessThan_65++;
    // }
    // newWindow.document.write("<p style=margin-left:12px;font-size:18px;display:inline>"+"*Number Of People Attended More Than 65% of the Meeting : <b>"+(studentsMoreThan_65)+"</b></p>");
    // newWindow.document.write("<p style=margin-left:150px;font-size:18px;color:red;display:inline>"+"*Number Of People Attended Less Than 65% of the Meeting : <b>"+studentsLessThan_65+"</b></p>");
    newWindow.document.writeln("<hr>");
    newWindow.document.writeln("<h2 style=text-align:center>Detailed Attendance Report</h2>");
    newWindow.document.writeln("<table>");
    newWindow.document.writeln("<tr>");
    newWindow.document.writeln("<th>SNo</th>");
    newWindow.document.writeln("<th>People Name</th>");
    newWindow.document.writeln("<th>Attended Duration</th>");
    newWindow.document.writeln("<th>Attended Percentage</th>");
    newWindow.document.writeln("</tr>");
    // let serialNum = 1;
    // sortedtstudentsNameSet.sort();
    // for(studentName of sortedtstudentsNameSet){
    //     let attendedPercentage = Math.ceil(((studentDetails.get(studentName)/60)/(totalClassDuration/60))*100);
    //     let attendedDuration = toTimeFormat(studentDetails.get(studentName));
    //     newWindow.document.writeln("<tr>");
    //     newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+serialNum+"</td>" : "<td>"+serialNum+"</td>");
    //     newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+studentName.toUpperCase()+"</td>" : "<td>"+studentName.toUpperCase()+"</td>");
    //     newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+attendedDuration+"</td>" : "<td>"+attendedDuration+"</td>");
    //     newWindow.document.writeln(attendedPercentage<65 ? "<td style=color:red>"+attendedPercentage+"%</td>" : "<td>"+attendedPercentage+"%</td>");
    //     newWindow.document.writeln("</tr>");
    //     serialNum++;
    // }
    // newWindow.document.writeln("</table>");
    // if(sortedtstudentsNameSet.length==0){
    //     newWindow.document.writeln("<h3 style=text-align:center;>Oops ! Meeting Duration was too short</h3>");
    //     newWindow.document.writeln("<h3 style=text-align:center;>**No Data Available To Display**</h3>");
    // }
    newWindow.document.write(`
        <script>
            window.stop();
            document.getElementById("download-btn").addEventListener("click",function(){
                window.print();
            });
        </script>
    `);
    // return "Thank You For Using Meet Attendance Tracker"; 
}
