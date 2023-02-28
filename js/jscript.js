// //accessing the ul element
var ul = document.querySelector('ul');
var btn = document.getElementById('add-btn');

btn.addEventListener('click', function(e) {
    e.preventDefault();
    //     //Accessing input from the form element add
    var addInput = document.getElementById('add-input');

    //     //check to make sure no empty input is submitted.
    if (addInput.value !== '') {
        // we need to create new element tag as li
        var li = document.createElement('li'),
            firstPar = document.createElement('p'),
            secondPar = document.createElement('p'),
            firstIcon = document.createElement('i'),
            secondIcon = document.createElement('i'),
            input = document.createElement('input');
        //styling the icon
        firstIcon.style.padding = '10px 10px';
        firstIcon.style.color = "red";

        //assign each element the class attributes to the new created element
        secondIcon.className = "fa-sharp fa-solid fa-pen-to-square";
        firstIcon.className = "fa-solid fa-xmark";
        input.className = '"edit-note"';
        firstPar.className = "text";
        //setAttribute for addInput
        input.setAttribute('type', 'text');
        firstPar.textContent = addInput.value;

        //Now let assign the each newest tag element to their parent element
        secondPar.appendChild(firstIcon);
        secondPar.appendChild(secondIcon);
        li.appendChild(firstPar);
        li.appendChild(secondPar);
        li.appendChild(input);
        ul.appendChild(li);

        //make sure not text should appear on the input text after it been added 
        addInput.value = ''
    }
});


// // ========================Working on Edit notes==================================
// //using the ul in the gobal execution context


ul.addEventListener('click', function(e) {
    //accessing the delete obj in the class using class attribute and make sure that 
    //it only click that particular object

    if (e.target.classList[2] === 'fa-pen-to-square') {
        // need to access the parent tag hold fa-pen-to-square tag  
        var parText = e.target.parentNode;
        parText.style.display = 'none'

        // accessing the tag before this current tag also after the current tage
        var note = parText.previousElementSibling;
        var input = parText.nextElementSibling;
        //grab the text in the input and sign to note
        input.style.display = 'block';
        input.value = note.textContent;

        // THE TEXT IN INPUT CAN NOW BE SUBMITED TO THE NOTES ONCE KEYPRESS IS RELESASED
        input.addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                if (input.value !== '') {
                    //assign the note to the input element
                    note.textContent = input.value;
                    console.log(note.textContent)
                    input.style.display = 'block'
                } else {
                    var li = input.parentNode;
                    li.parentNode.removeChild(li);
                }
            }

        });

    } else if (e.target.classList[1] === 'fa-xmark') {
        // console.log('Please select')
        //remove the list tag once keyboard enter is being pressed
        var list = e.target.parentNode.parentNode;
        list.parentNode.removeChild(list);
    }

});

//===============Hide Notes=================================


var hideNotes = document.querySelector('#hide-list input')
hideNotes.addEventListener('click', function(e) {
    if (hideNotes.checked) {
        ul.style.display = 'none'
    }

})