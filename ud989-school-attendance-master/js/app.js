/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());

$(document).ready(function(){
    var octopus = {
        init: function(){
            model.init();
            view.init();
        },
        
        updateAttendence: function(obj){
           model.data.forEach(function(student){
               return function(studentCopy){
                   if (obj.student == studentCopy.name){
                       if (obj.checked){
                           studentCopy.missedDays--;
                           console.log('decrease')
                       } else {
                           studentCopy.missedDays++;
                           console.log('increase')
                       }
                   }
               }(student);
             });
             
               console.log(model.data)
               view.render();   	
           }
           
    };
    var model = {
        numDaysToTrack: 12, //how many days do we want to show?
        data: [
            {
                name: "Slappy the Frog",

            },
            {
                name: "Lilly the Lizard",

            },
            {
                name:"Paulrus the Walrus",

            },
            {
                name: "Gregory the Goat",

            },
            {
                name: "Adam the Anaconda",

            }
        ],
        
        init: function()
        {
            this.data.forEach(function(student){
                return function(studentCopy){
                    studentCopy.missedDays = model.numDaysToTrack
                    console.log(studentCopy)
                }(student)                
            })
        }
        
    }
    var view = {
        init: function(){
            //build our table here
           var htmlStr = ''
           var nameCol = $('.name-col-main')
           var d = model.data.reverse();
           
           //how many checkboxes do we need
            for (var i = model.numDaysToTrack; i > 0; i--){
                nameCol.after('<th>' + i + '</th>')
            }
            
            //populate a row for each name
            for (var o = 0; o < model.data.length; o++){
                htmlStr = ''
                htmlStr += "<tr class='student'>"
                htmlStr += "<td class='name-col'>" + model.data[o].name + "</td>"
                for (var x = 1; x <= model.numDaysToTrack; x++){
                    htmlStr += "<td class='attend-col'><input type='checkbox'></td>"
                }
                htmlStr += "<td id='" + o +"' class='missed-col'>" + model.data[o].missedDays + "</td>"
                $('tbody').after(htmlStr)
            } 
            
            //set event handler
            $('input').on('click', function(event){
                var node = event.currentTarget.parentNode;
                var e = event.currentTarget
                var $this = $(this)
                var isChecked = false
                var obj = {}
                
                if ($this.is(':checked')){
                   isChecked = true
                }
                
                obj.student = $(node).siblings('.name-col').text();
                obj.checked = isChecked
                
                octopus.updateAttendence(obj)
            })  
            
        },
        
        render: function(){
            var o = 0
            //I can't get this to work at all!!
            model.data.forEach(function(stud){
                oCopy = o
                $('#'+ o ).text(stud.missedDays)
                o ++
            })
        }      
    };

    octopus.init();
    
})

///* STUDENT APPLICATION */
//$(function() {
//    var attendance = JSON.parse(localStorage.attendance),
//        $allMissed = $('tbody .missed-col'),
//        $allCheckboxes = $('tbody input');
//
//    // Count a student's missed days
//    function countMissing() {
//        $allMissed.each(function() {
//            var studentRow = $(this).parent('tr'),
//                dayChecks = $(studentRow).children('td').children('input'),
//                numMissed = 0;
//
//            dayChecks.each(function() {
//                if (!$(this).prop('checked')) {
//                    numMissed++;
//                }
//            });
//
//            $(this).text(numMissed);
//        });
//    }
//
//    // Check boxes, based on attendace records
//    $.each(attendance, function(name, days) {
//        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//            dayChecks = $(studentRow).children('.attend-col').children('input');
//
//        dayChecks.each(function(i) {
//            $(this).prop('checked', days[i]);
//        });
//    });
//
//    // When a checkbox is clicked, update localStorage
//    $allCheckboxes.on('click', function() {
//        var studentRows = $('tbody .student'),
//            newAttendance = {};
//
//        studentRows.each(function() {
//            var name = $(this).children('.name-col').text(),
//                $allCheckboxes = $(this).children('td').children('input');
//
//            newAttendance[name] = [];
//
//            $allCheckboxes.each(function() {
//                newAttendance[name].push($(this).prop('checked'));
//            });
//        });
//
//        countMissing();
//        localStorage.attendance = JSON.stringify(newAttendance);
//    });
//
//    countMissing();
//}());
