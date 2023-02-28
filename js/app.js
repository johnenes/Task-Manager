 // var for ul
 var ul = document.querySelector('ul');
 var btn = document.getElementById('add-btn')

 // =================================ADD ITEM TO TASK LIST============================
 btn.addEventListener('click', function(e) {
         e.preventDefault();
         // var input tdg
         var addInput = document.getElementById('add-input');
         //Avoid submitting empty label
         if (addInput.value !== '') {
             //create list tag element
             var li = document.createElement('li'),
                 textParagraph = document.createElement('p'),
                 iconParagraph = document.createElement('p'),
                 firstIcon = document.createElement('i'),
                 secondIcon = document.createElement('i'),
                 input = document.createElement('input');
             //styling the icon
             firstIcon.style.padding = '10px 10px';
             firstIcon.style.color = "red";
             
             //adding css clsassName attribute
             secondIcon.className = "fa-sharp fa-solid fa-pen-to-square";
             firstIcon.className = "fa-solid fa-xmark";
             input.className = '"edit-note"';
             textParagraph.className = "text";
             //setAttribute for addInput
             input.setAttribute('type', 'text');
             textParagraph.textContent = addInput.value;

             //assign the list element to its children
             iconParagraph.appendChild(firstIcon);
             iconParagraph.appendChild(secondIcon);
             //  secondIcon.appendChild(svgIcon);
             li.appendChild(textParagraph);
             li.appendChild(iconParagraph);
             li.appendChild(input);
             ul.appendChild(li);
             //clear text input clicking on add button
             addInput.value = '';
         }
     })
     // =================================END OF ADDING ITEM TO TASK LIST=======================
     //===============================Edit and Delete===========================================
 ul.addEventListener('click', function(e) {
     //to make sure it only execute once is click, nothing esle execute except the class containing 
     //fa-pen-to-square 
     if (e.target.classList[2] === 'fa-pen-to-square') {
         //  console.log(e.target.classList[2]) // to access class attribute use the index . 
         //we want to access the paragraph holding the two <i>
         var parentParagraph = e.target.parentNode;
         //  we need the parentParagraph when click event occur
         parentParagraph.style.display = 'none';

         var note = parentParagraph.previousElementSibling;
         var input = parentParagraph.nextElementSibling;
         // to appear input element same time of event 
         input.style.display = 'block' // display input text in block
             //taking note for input
         input.value = note.textContent;

         ///Event Listeners for handing input value using kepress event 

         input.addEventListener('keypress', function(e) {
             //
             if (e.keyCode === 13) {
                 if (input.value !== '') {
                     // grab the input content and assign it note content 
                     note.textContent = input.value;
                     // we need to access the icon delete
                     parentParagraph.style.display = 'block';
                     input.style.display = 'none';
                     //  weed to control the ul from submiting when blank
                 } else {
                     // remove the ul tag from the form
                     var li = input.parentNode;
                     console.log(li);
                     li.parentNode.removeChild(li);
                 }
             }
         });
     } else if (e.target.classList[1] === "fa-xmark") {
         var list = e.target.parentNode.parentNode;
         list.parentNode.removeChild(list);
     }
 });
 // =================================END OF Edit and Delete=========================================== 
 // =================================Hide notes=======================================================
 var hideItem = document.querySelector('#hide');
 hideItem.addEventListener('click', function(e) {
         //check conditon if the items is checked then return true
         var label = document.querySelector('label');
         if (hideItem.checked) {
             label.textContent = "Unhide Notes";
             ul.style.display = 'none'

         } else {
             label.textContent = "hide Notes"
             ul.style.display = 'block';
         }
     })
     //==================================End of the Hide notes sections =======================================
     //==================================Search sections=======================================================
 var searchItems = document.querySelector('#search-list input')
 searchItems.addEventListener('keyup', function(e) {
     //grabing the input from the search box  and convert toUpperCase
     var searchChar = searchItems.value.toUpperCase();
     //  console.log(searchChar)
     //accessing the list items by tag name.
     var notes = ul.getElementsByTagName('li');
     //in order to compare the items we neeed to loop through the items.
     Array.from(notes).forEach(function(note) {
         // let grab the content of list items
         var paragraphText = note.firstElementChild.textContent;
         // transform the paragraphText toUpperCase
         if (paragraphText.toUpperCase().indexOf(searchChar) !== -1) {
             note.style.display = 'block';
         } else {
             note.style.display = 'none';
         }
     });
 });