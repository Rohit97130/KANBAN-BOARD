
let addBtn =  document.querySelector('.add-btn');
let modalCont = document.querySelector('.model-cont');
let mainCont = document.querySelector('.main-cont');
let textAreaCont = document.querySelector('.textArea-cont');
let  allPriorityColors = document.querySelectorAll('.priority-color');
// console.log(allPriorityColors);

let modalPriorityColor = 'lightpink';

let lockClass = 'fa-lock';
let unlockClass = 'fa-lock-open';


let addTaskFlag =false
let ticketsArr =[]
 if(localStorage.getItem('tickets')){
     ticketsArr = JSON.parse(localStorage.getItem('tickets'));

     ticketsArr.forEach(function(Ticket){
      createTicket(Ticket.ticketTask ,Ticket.ticketColorClass ,  Ticket.ticketId)
  })

 } 

addBtn.addEventListener('click', function(){
      addTaskFlag =!addTaskFlag //true //false
      if(addTaskFlag ==true){
         modalCont.style.display ='flex'
      }
      else{
         modalCont.style.display ='none';
      }
})


modalCont.addEventListener('keydown' ,function(e){
    // console.log('done');
     let key = e.key //a,b,shift...
     
     if(key=='Shift'){  
        //  let ticketId = shortid();
          createTicket(textAreaCont.value,modalPriorityColor);
     }
       
})


//Add Tasks according to  active color
allPriorityColors.forEach(function(colorElem){
    colorElem.addEventListener('click',function(){
          allPriorityColors.forEach(function (priorityColorElem){
               priorityColorElem.classList.remove('active')
           })
          colorElem.classList.add('active');     
          console.log(colorElem.classList[0]);
            
           modalPriorityColor = colorElem.classList[0];
    })
}) 

  
//This function  generate a ticket
 function createTicket(ticketTask ,ticketColorClass,ticketId){
    let id = ticketId || shortid(); //generates unique id for tickets 
    // console.log(id);
    
    let ticketCont = document.createElement('div');
    ticketCont.setAttribute('class','ticket-cont')

     ticketCont.innerHTML=` <div class="ticket-color-cont ${ticketColorClass}">

      </div>
        <div class="ticket-id">
        ${id}
        </div>
        <div class="ticket-task">
         ${ticketTask}
        </div>
        <div class="ticket-lock">
          <i class="fa-solid fa-lock"></i>
        </div>`;
    
    mainCont.appendChild(ticketCont);
    modalCont.style.display ='none';
     addTaskFlag = false; 
        handleLock(ticketCont, id) // lock
           handleRemoval(ticketCont,id) // removal
          
        handleColor(ticketCont ,id)            //change color bands
        
        if(!ticketId){
        ticketsArr.push({ ticketColorClass , ticketTask ,ticketId:id})
        localStorage.setItem('tickets', JSON.stringify(ticketsArr));
 }
        // console.log(ticketsArr);
        
}

 



// handle Lock
function handleLock(ticket, id){
   let ticketLockElem = ticket.querySelector('.ticket-lock');

  
   
   let ticketLockIcon =  ticketLockElem.children[0] ;
      let ticketTaskArea = ticket.querySelector('.ticket-task');
    ticketLockIcon.addEventListener('click' , function(){
            
     let ticketIdx = getIdx(id) //sn123ns%
    if(ticketLockIcon.classList.contains(lockClass)){     
              ticketLockIcon.classList.remove(lockClass);
              ticketLockIcon.classList.add(unlockClass);
            ticketTaskArea.setAttribute('contenteditable' ,'true')              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
     }
     else{
      ticketLockIcon.classList.remove(unlockClass);
       ticketLockIcon.classList.add(lockClass);
      ticketTaskArea.setAttribute('contenteditable' ,'false')   
    }


         ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText
         localStorage.setItem('tickets', JSON.stringify(ticketsArr))


     
    })

}  



   //handle remval of Delete Ticket
     
  
  let removeBtn =  document.querySelector('.multi-btn');
   let removeTaskFlag = false; 
   removeBtn.addEventListener('click',function(){ 
         removeTaskFlag = !removeTaskFlag;  //true
        
        if(removeTaskFlag == true){
         alert("Delete button  Activated");
          removeBtn.style.color = 'red';
        }
        else{
           alert("Delete button Deactivated");
           removeBtn.style.color = 'white';
        }
        
   })

  function  handleRemoval(ticket,id){

     ticket.addEventListener('click', function(){           
             if(!removeTaskFlag) return
              let ticketIdx = getIdx(id);
               
              
                ticket.remove();
                ticketsArr.splice(ticketIdx ,1);
                localStorage.setItem('tickets',JSON.stringify(ticketsArr));

       })
   }


   // handle  color band
   let colors = ['lightpink', 'lightgreen', 'lightblue', 'black'];
   function handleColor(ticket ,id){
     let ticketColorBand = ticket.querySelector(".ticket-color-cont"); 

     
         ticketColorBand.addEventListener('click',function(){
            let ticketIdx = getIdx(id)
             let currentColor = ticketColorBand.classList[1];
             
             
              let currentColorIdx = colors.findIndex(function(color ){
               return color === currentColor;
              })

              currentColorIdx++;

              let newTicketColorIdx = currentColorIdx % colors.length;
              let newTicketColorValue = colors[newTicketColorIdx];


              ticketColorBand.classList.remove(currentColor);
              ticketColorBand.classList.add(newTicketColorValue);
              
               ticketsArr[ticketIdx].ticketColorClass = newTicketColorValue
               localStorage.setItem('tickets' ,JSON.stringify(ticketsArr));
         })
        
   }

  

   // GEt tasks based on color Filter
   let toolboxColors =  document.querySelectorAll('.color-box');
   
   let colorflag = false;
   let allTickets;
   for(let i=0 ; i<toolboxColors.length ; i++){
    toolboxColors[i].addEventListener('click', function(){
      colorflag = !colorflag;
      if(!colorflag){

        allTickets = document.querySelectorAll('.ticket-cont');
        for(let i=0 ; i<allTickets.length ; i++){
            allTickets[i].remove()
        }
        ticketsArr.forEach(function(filterdTicket){
          createTicket(filterdTicket.ticketTask ,filterdTicket.ticketColorClass ,  filterdTicket.ticketId)
      })
      }
      else{
        let selectedToolBoxColor = toolboxColors[i].classList[0]
         
         let filteredTickets = ticketsArr.filter(function(ticket){
            return selectedToolBoxColor === ticket.ticketColorClass
         })

         console.log(filteredTickets)


         allTickets = document.querySelectorAll('.ticket-cont')
        for(let i=0 ; i<allTickets.length ; i++){
            allTickets[i].remove()
        }

        filteredTickets.forEach(function(filterdTicket){
            createTicket(filterdTicket.ticketTask ,filterdTicket.ticketColorClass ,  filterdTicket.ticketId)
        })

      }
    })
}





function  getIdx(id){
     
  let ticketIdx = ticketsArr.findIndex(function(ticketObj){
    return ticketObj.ticketId== id;
  })
  return ticketIdx;
}

