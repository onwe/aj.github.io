  
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getDatabase, set, get, ref ,query, child, onValue, limitToFirst, orderByChild,equalTo } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCobTrhlsjzQ1KGSeVoN-j8wM3S7uy4ie0",
    authDomain: "emventory-c2455.firebaseapp.com",
	  databaseURL: "https://emventory-c2455-default-rtdb.firebaseio.com/",
    projectId: "emventory-c2455",
    storageBucket: "emventory-c2455.appspot.com",
    messagingSenderId: "956457180798",
    appId: "1:956457180798:web:0eb938d68c9c4bd467822f"
  };
  
  //var firebase = initializeApp(firebaseConfig);
  //console.log(firebase);

  const app = initializeApp(firebaseConfig);
  console.log(app);
  // Get a reference to the database service
  const db = getDatabase();
  
  function getAllCompanies(){

      var status = 1;
      const que = query(ref(db,'company'),orderByChild('status'),equalTo(status));

      get(que).then((snapshot) => {
        if (snapshot.exists()) {

          var companies = [];

          snapshot.forEach(function (childSnapshot) {

            companies.push(childSnapshot.val());

        });

        addCompanyItemsForDisplay(companies);

        //console.log(snapshot.val().name);
        } else {
          alert("Error: No Companies already added to the inventory");
        }
      }).catch((error) => {
        console.error(error);
      });
	
							
}

window.onload = getAllCompanies();

function  addCompanyItemsForDisplay(stocks){
  stocks.forEach(element => {

    sendToDisplay(element.comp_id, element.comp_name, element.comp_email, 
      element.comp_address, element.comp_phone, element.comp_description);

  });
}


var osahan_btn_group = document.getElementById('osahan_btn_group');
var bg_white = document.getElementById('bg_white');

var radioId = 1;

function sendToDisplay(comp_id,comp_name, comp_email, comp_address, comp_phone, comp_description){

  let btn_check = document.createElement('input');
  btn_check.setAttribute('type', 'radio');
  btn_check.setAttribute('id', 'btnradio'+radioId);
  btn_check.setAttribute('name', 'btnradio');
  btn_check.setAttribute('autocomplete', 'off');
  btn_check.checked = true;
	btn_check.classList.add ('btn-check');

  osahan_btn_group.appendChild(btn_check);


  let btn_outline_lightLabel = document.createElement('label');
  btn_outline_lightLabel.setAttribute('type', 'label');
  btn_outline_lightLabel.setAttribute('id', 'label'+radioId);
  btn_outline_lightLabel.setAttribute('for', 'btnradio'+radioId);
	btn_outline_lightLabel.classList.add ('btn','btn-outline-light','d-flex','align-items-center','gap-3','rounded','px-3','py-2','mt-2');


  let bi_houseItalics = document.createElement('i');
	bi_houseItalics.classList.add ('bi','bi-house');
  //
  btn_outline_lightLabel.appendChild(bi_houseItalics);

  let text_startSpan = document.createElement('span');
	text_startSpan.classList.add ('text-start');

  let fw_boldH6 = document.createElement('h6');
	fw_boldH6.classList.add ('mb-0','fw-bold');

  let h6Text = document.createTextNode(comp_name);
  fw_boldH6.appendChild(h6Text);

  text_startSpan.appendChild(fw_boldH6);

  let text_mutedDiv = document.createElement('div');
	text_mutedDiv.classList.add ('text-muted', 'small', 'text-opacity-50');

  let text_mutedDivText = document.createTextNode('Email : '+comp_email);
  text_mutedDiv.appendChild(text_mutedDivText);

  let br = document.createElement('br');
  text_mutedDiv.appendChild(br);


  let text_mutedDivTextPhone = document.createTextNode(' Phone: '+comp_phone);
  text_mutedDiv.appendChild(text_mutedDivTextPhone);

  text_startSpan.appendChild(text_mutedDiv);

  let bi_check_circle_filltalics = document.createElement('i');
	bi_check_circle_filltalics.classList.add ('bi','bi-check-circle-fill','ms-auto');

  let bi_check_circle_filltalicsDown = document.createElement('i');
	bi_check_circle_filltalicsDown.classList.add ('bi','bi-arrow-down-square-fill','ms-auto');
  
 // bi bi-arrow-down-square

  btn_outline_lightLabel.appendChild(text_startSpan);

  // if(stock_qty <= reorder_value){
  //   btn_outline_lightLabel.appendChild(bi_check_circle_filltalicsDown);

  // }
 // else if(stock_qty > reorder_value){
    btn_outline_lightLabel.appendChild(bi_check_circle_filltalics);

  //}
  


  let hiddenForItemID = document.createElement('input');
  hiddenForItemID.setAttribute('type', 'hidden');
  hiddenForItemID.setAttribute('value', comp_id);
  hiddenForItemID.setAttribute('id', 'hiddenID'+radioId);

  let itemID = document.createTextNode(comp_id);
  hiddenForItemID.appendChild(itemID);

  osahan_btn_group.appendChild(btn_outline_lightLabel);
  osahan_btn_group.appendChild(hiddenForItemID);
  bg_white.appendChild(osahan_btn_group);
  
  

  var el = document.getElementById('hiddenID'+radioId);
  var el2 = document.getElementById('label'+radioId);
  //console.log(el.innerText);


  el2.addEventListener("click", function(){
    
      //console.log(el.value);
      window.open('companydetails.html?comp_id='+comp_id+'&comp_name='+comp_name+'&comp_email='+comp_email+'&comp_address='
      +comp_address+'&comp_phone='+comp_phone+'&comp_description='+comp_description, "_self");
    }
  )
  radioId = radioId+1;

}





