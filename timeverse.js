//opens overlay
function openOverlay() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("duplicateBox").style.display = "block";
}
//closes openOverlay
function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("duplicateBox").style.display = "none";
}
$("#cancel").click(function() {
  closeOverlay();
});
$("#addAnyways").click(function() {
  addAnyways();
});

//when clicking on savedIcon sidebar opens
document.getElementById("savedIcon").addEventListener("click", showVerses);
//when clicking on savedSidebarIcon sidebar closes
document.getElementById("savedSidebarIcon").addEventListener("click", hideVerses);

//opens sidebar
function showVerses() {
  if ( $(window).width() > 600) {
    document.getElementById('savedVerses').style.width = "40vw";
    document.getElementById("notBar").style.marginRight = "40vw";
    document.getElementById('savedHeader').style.display = "block";
    document.getElementById('savedIcon').style.display = "none";
    document.getElementById("overlay2").style.display = "block";
    document.body.style.overflow = "hidden";
  }
  else {
    document.getElementById('savedHeader').style.display = "block";
    document.getElementById('savedVerses').style.width = "100vw";
    document.getElementById('savedIcon').style.display = "none";
    document.getElementById("overlay2").style.display = "block";
    document.body.style.overflow = "hidden";
  }
}
//closes sidebar
function hideVerses() {
  document.getElementById('savedVerses').style.width = "0vw";
  document.getElementById("notBar").style.marginRight = "0vw";
  document.getElementById('savedIcon').style.display = "block";
  document.getElementById("overlay2").style.display = "none";
  document.body.style.overflow = "visible";
}
//changes icon from savedVereses.png to whiteSaved.png
$(document).ready(function(){
  $("#savedSidebarIcon").hover(function(){
    var savedSidebarIcon = document.getElementById("savedSidebarIcon");
    savedSidebarIcon.src = "images/whiteSaved.png";
  }, function () {
    savedSidebarIcon.src = "images/savedVerses.png";
  });
});
//changes icon from logoBlack.png to greenLogo.png
$(document).ready(function(){
  $("#logoIcon").hover(function(){
    var logoIcon = document.getElementById("logoIcon");
    logoIcon.src = "images/greenLogo.png";
  }, function () {
    logoIcon.src = "images/logoBlack.png";
  });
});
//changes icon from savedVerses.png to greenSaved.png
$(document).ready(function(){
  $("#savedIcon").hover(function(){
    var savedIcon = document.getElementById("savedIcon");
    savedIcon.src = "images/greenSaved.png";
  }, function () {
    savedIcon.src = "images/savedVerses.png";
  });
});

//runs function giveOutput if you press Find My TimeVerse button or press enter in an inptut box
document.getElementById("findVerseButton").addEventListener("click", giveOutput);
document.getElementById("input1").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        giveOutput();
        $('html,body').animate({
            scrollTop: $("#scrollSpace").offset().top},
            'slow');
    }
});
document.getElementById("input2").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        giveOutput();
        $('html,body').animate({
            scrollTop: $("#scrollSpace").offset().top},
            'slow');
    }
});

//scrolls down to found timeverses
$("#findVerseButton").click(function() {
  $('html,body').animate({
      scrollTop: $("#scrollSpace").offset().top},
      'slow');
});

//scrolls to top
function scrollToTop() {
  $('html,body').animate({
      scrollTop: $("#timeHeader").offset().top},
      'slow');
}



var esvJSON, duplicateJSON, input1, input2, output, chapterIndex, verseIndex, bookName, randNum, bookList, bibleVerse, boolCheck, inputVerse, inputLength, intInput, intInput2, chapVerses, boolZeros, numInput2, find0, find00, chapList, chapLength, jsonVerse, chapReferences, verseReference, foundTitle, outputVerses, oneZero, notZero;
var int606 = false;


function giveOutput() {
	//variable management
	input1 = document.getElementById("input1").value;
	input1 = String(input1);
	input1 = input1.replace(/\b([0][0]*)/g, '');
	input2 = document.getElementById("input2").value;
	input2 = String(input2);
  input2 = input2 = input2.replace(/ /g, '');
	find0 = input2.includes("0");
	if (input2 == "10") {
		find0 = false;
	}
	find00 = input2.includes("00")
	chapterIndex = [...Array(13).keys()];
	verseIndex = [...Array(60).keys()];
	intInput = Number(input2);
	intInput2 = Number(input1)
	bookList = Object.keys(esvJSON);
	output = "";
  outputVerses = document.getElementById("output");
	inputLength = input2.length;
  oneZero = input2.replace(/\B\w/g, '');
  notZero = input2.replace(/\b\w/g, '')
  foundTitle = "TimeVerses Found";
  verseReference = bookName + " " + input1 + ":" + input2;
	//verses for whole chapters
	chapVerses = {
		"1": [esvJSON['Psalms'][1]],
		"2": [esvJSON['Acts'][2]],
		"3": [esvJSON['Ecclesiastes'][3]],
		"4": [esvJSON['Psalms'][4]],
		"5": [esvJSON['Deuteronomy'][5]],
		"6": [esvJSON['Deuteronomy'][6], esvJSON['2 Chronicles'][6], esvJSON['Matthew'][6]],
		"7": [esvJSON['Matthew'][7]],
		"8": [esvJSON['Romans'][8]],
		"9": [esvJSON['Psalms'][9], esvJSON['Genesis'][9]],
		"10": [esvJSON['John'][10], esvJSON['Hebrews'][10]],
		"11": [esvJSON['Luke'][11], esvJSON['Hebrews'][11]],
		"12": [esvJSON['Romans'][12], esvJSON['Isaiah'][12]]
	};
	//references for whole chapters
	chapReferences = {
		"1": ["Psalms 1"],
		"2": ["Acts 2"],
		"3": ["Ecclesiastes 3"],
		"4": ["Psalms 4"],
		"5": ["Deuteronomy 5"],
		"6": ["Deuteronomy 6", "2 Chronicles 6", "Matthew 6"],
		"7": ["Matthew 7"],
		"8": ["Romans 8"],
		"9": ["Psalms 9", "Genesis 9"],
		"10": ["John 10", "Hebrews 10"],
		"11": ["Luke 11", "Hebrews 11"],
		"12": ["Romans 12", "Isaiah 12"]
	}

  //removes all the created p elements so you can create new p elements
  var titles = document.getElementsByClassName("verseReference");
  var paras = document.getElementsByClassName("verseText");
  var buttons = document.getElementsByClassName("verseButton");
  while (buttons[0]) {
    buttons[0].parentNode.removeChild(buttons[0]);
  }
  while (paras[0]) {
    paras[0].parentNode.removeChild(paras[0]);
  }
  while (titles[0]) {
    titles[0].parentNode.removeChild(titles[0]);
  }

	//identifies how many chapters there are per hour
	if (find00 == true && input1 <= 12) {
		chapList = Object.values(chapVerses[input1]);
		chapLength = chapList.length;
		chapRange = Math.floor(Math.random()*chapLength);
	}
	//takes zeroes away from the front of single digit numbers in input2
	if (input1 != "6" || input2 != "06") {
		if (find00 == false) {
		input2 = input2.replace(/\b[0]/g, '')
		}
	}
		//loop that makes the list of verses
		for (var i = 0; i < bookList.length; i++) {
			// Book name
			bookName = bookList[i];
			// Get chapter
			inputVerse = esvJSON[bookName][input1];
			// if value is not 1-12 you get an error message
			if (chapterIndex.indexOf(intInput2) === -1 || verseIndex.indexOf(intInput) === -1) {
        while (paras[0]) {
          paras[0].parentNode.removeChild(paras[0]);
        }
        var newVerse = document.createElement("p");
        newVerse.innerHTML = "You do not have a valid time.";
        newVerse.className = "verseText";
        outputVerses.appendChild(newVerse);
			}
			//outputs #555 in Hymnal for worhsip and celebration
			else if (input1 == "5" && input2 == "55") {
        while (buttons[0]) {
          buttons[0].parentNode.removeChild(buttons[0]);
        }
        while (titles[0]) {
          titles[0].parentNode.removeChild(titles[0]);
        }
        while (paras[0]) {
          paras[0].parentNode.removeChild(paras[0]);
        }
        var newVerse = document.createElement("p");
        newVerse.innerHTML = "There are no verses with the reference 5:55, but there is a song";
        newVerse.className = "verseReference";
        outputVerses.insertBefore(newVerse, outputVerses.childNodes[0]);

        var newVerse = document.createElement("p");
        newVerse.innerHTML = "<br>The Hymnal for Worship & Celebration #555";
        newVerse.className = "verseReference";
        outputVerses.insertBefore(newVerse, outputVerses.childNodes[1]);

        var newVerse = document.createElement("p");
        newVerse.innerHTML = "Come, we that love the Lord, <br>And let our joys be known,<br>Join in a song with sweet accord,<br>Join in a song with sweet accord<br>And thus surround the throne,<br>And thus surround the throne.<br>Refrain:<br>We're marching to Zion,<br>Beautiful, beautiful Zion;<br>We're marching upward to Zion,<br>The beautiful city of God.";
        newVerse.className = "verseText";
        outputVerses.appendChild(newVerse);

        var button = document.createElement("button");
        button.innerHTML = "Save this Song";
        button.className = "verseButton";
        outputVerses.appendChild(button);
			}
			else if (input1 == "6" && input2 == "06") {
				input2 = input2.replace(/\b([0][0]*)/g, '')
				bibleVerse = inputVerse[input2];
				output += bookName + " " + input1 + ":" + input2 + " " + bibleVerse + "<br>" + "<br>";
				int606 = true;
			}
			//outputs the verse if there is a verse for the reference
			else if (inputVerse && inputVerse[input2]) {
				bibleVerse = inputVerse[input2];

        var newReference = document.createElement("p");
        newReference.innerHTML =  bookName + " " + input1 + ":" + input2;
        newReference.className = "verseReference";
        outputVerses.appendChild(newReference);

        var newVerse = document.createElement("p");
        newVerse.innerHTML = "<br>" + bibleVerse;
        newVerse.className = "verseText";
        outputVerses.appendChild(newVerse);

        var button = document.createElement("button");
        button.innerHTML = "Save this Verse";
        button.className = "verseButton";
        outputVerses.appendChild(button);

			}
		}


	//extra conditionals for special outputs of input2
	if (int606 === true) {
    var newVerse = document.createElement("p");
    newVerse.innerHTML = "The Mennonite Hymnal #606";
    newVerse.className = "verseReference";
    outputVerses.insertBefore(newVerse, outputVerses.childNodes[1]);

    var newVerse = document.createElement("p");
    newVerse.innerHTML = "Praise God, from whom all blessings flow<br>Praise Him, all creatures here below;<br>Praise Him above, ye heav'nly host;<br>Praise Father, Son, and Holy Ghost.<br>Amen";
    newVerse.className = "verseText";
    outputVerses.insertBefore(newVerse, outputVerses.childNodes[2]);

    var button = document.createElement("button");
    button.innerHTML = "Save this Song";
    button.className = "verseButton";
    outputVerses.insertBefore(button, outputVerses.childNodes[3]);
	}
	//displays the verses
	document.getElementById('output').style.display = 'block';
  document.getElementById('scrollSpace').style.display = 'block';
  document.getElementById('timeFound').style.display = 'block';
  document.getElementById('foundTitle').innerHTML = foundTitle;

//if input2 is 00, you get a whole chapter
	if ( $("#output").is(":empty") && find00 == true) {
		if (chapLength == 1) {
      while (paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
      }
      var newReference = document.createElement("p");
      newReference.innerHTML =  chapReferences[input1];
      newReference.className = "verseReference";
      outputVerses.appendChild(newReference);

      var newVerse = document.createElement("p");
      newVerse.innerHTML = "<br>" + Object.values(chapVerses[input1][0]);
      newVerse.className = "verseText";
      outputVerses.appendChild(newVerse);

      var button = document.createElement("button");
      button.innerHTML = "Save this Chapter";
      button.className = "verseButton";
      outputVerses.appendChild(button);
		}
    //if there are more than one full chapter per hour then it randomly choses one of the chapters to display
		else if (chapLength > 1) {
      while (paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
      }
      var newReference = document.createElement("p");
      newReference.innerHTML =  chapReferences[input1][chapRange];
      newReference.className = "verseReference";
      outputVerses.appendChild(newReference);

      var newVerse = document.createElement("p");
      newVerse.innerHTML = "<br>" + Object.values(chapVerses[input1][chapRange]);
      newVerse.className = "verseText";
      outputVerses.appendChild(newVerse);

      var button = document.createElement("button");
      button.innerHTML = "Save this Chapter";
      button.className = "verseButton";
      outputVerses.appendChild(button);
		}
    //some function that problably fixes an important problem but I forget what it does
		output = output.toString().replace(/\B[,]/g, ' ');
	}
		//if there are no verses for the reference, you get this error message
	if ( $("#output").is(":empty") ) {
    var newVerse = document.createElement("p");
    newVerse.innerHTML = "There are no verses with the reference" + " " + input1 + ":" + input2;
    newVerse.className = "verseText";
    outputVerses.appendChild(newVerse);
//	document.getElementById('output').innerHTML = output;
	}

	//converting booleans to their original state so I can run the function more than one time without problems
	int606 = false;
	boolZeros = false;

  //adds click event listener to buttons under verses
  var verseButton = document.getElementsByClassName("verseButton");
  for (var i = 0; i < verseButton.length; i++) {
    verseButton[i].addEventListener("click", saveVerses)
  }
}



//global variables for saveVerses()
var newVerseArray = [];
var verseCode = "";
var prevReference = "";
var prevVerse = "";

//saves verses
function saveVerses() {
  //finds verse above button
  prevVerse = $(this).prev("p")[0];
  //finds reference above verse
  prevReference = $(prevVerse).prev("p")[0].innerHTML;
  //finds innerHTML of verse above button
  prevVerse = prevVerse.innerHTML;
  //combines verse and reference
  prevVerse = prevVerse.replace(/<br>/g, '');
  //Object with all the books of the bible and a number with it
  var bibleBooks = {
    "Genesis": ["01"],
    "Exodus": ["02"],
    "Leviticus": ["03"],
    "Numbers": ["04"],
    "Deuteronomy" : ["05"],
    "Joshua": ["06"],
    "Judges": ["07"],
    "Ruth": ["08"],
    "1 Samuel": ["09"],
    "2 Samuel": ["10"],
    "1 Kings": ["11"],
    "2 Kings": ["12"],
    "1 Chronicles": ["13"],
    "2 Chronicles": ["14"],
    "Ezra": ["15"],
    "Nehemiah": ["16"],
    "Esther": ["17"],
    "Job": ["18"],
    "Psalms": ["19"],
    "Proverbs": ["20"],
    "Ecclesiastes": ["21"],
    "Song of Solomon": ["22"],
    "Isaiah": ["23"],
    "Jeremiah": ["24"],
    "Lamentations": ["25"],
    "Ezekiel": ["26"],
    "Daniel": ["27"],
    "Hosea": ["28"],
    "Joel": ["29"],
    "Amos": ["30"],
    "Obadiah": ["31"],
    "Jonah": ["32"],
    "Micah": ["33"],
    "Nahum": ["34"],
    "Habakkuk": ["35"],
    "Zephaniah": ["36"],
    "Haggai": ["37"],
    "Zechariah": ["38"],
    "Malachi": ["39"],
    "Matthew": ["40"],
    "Mark": ["41"],
    "Luke": ["42"],
    "John": ["43"],
    "Acts": ["44"],
    "Romans": ["45"],
    "1 Corinthians": ["46"],
    "2 Corinthians": ["47"],
    "Galatians": ["48"],
    "Ephesians": ["49"],
    "Philippians": ["50"],
    "Colossians": ["51"],
    "1 Thessalonians": ["52"],
    "2 Thessalonians": ["53"],
    "1 Timothy": ["54"],
    "2 Timothy": ["55"],
    "Titus": ["56"],
    "Philemon": ["57"],
    "Hebrews": ["58"],
    "James": ["59"],
    "1 Peter": ["60"],
    "2 Peter": ["61"],
    "1 John": ["62"],
    "2 John": ["63"],
    "3 John": ["64"],
    "Jude": ["65"],
    "Revelation" : ["66"]
  }
  //gets book name from reference
  if (this.innerHTML == "Save this Verse") {
    var wordReference = prevReference.replace(/ \d*:\d*/g, '');
  }
  else if (this.innerHTML == "Save this Chapter") {
    var wordReference = prevReference.replace(/ \d+/g, '');
  }
  wordReference = String(wordReference);
  //makes code for organizing verses, consists of reference and a number that correspons with the book
  if (this.innerHTML == "Save this Verse") {
    verseCode = /\d*:\d*/g.exec(prevReference)[0];
    var startVerse = /\d*:/g.exec(verseCode)[0];
    var endVerse = verseCode.replace(/\d*:/g, '');
    if (endVerse.length < 2) {
      verseCode = startVerse + "0" + endVerse;
    }
    verseCode = verseCode.replace(/:/g, '') + bibleBooks[wordReference][0];
    verseCode = Number(verseCode);
  }
  else if (this.innerHTML == "Save this Chapter") {
    verseCode = /\d+/g.exec(prevReference)[0] + "00" + bibleBooks[wordReference][0];
    verseCode = Number(verseCode);
  }
  else if (this.innerHTML == "Save this Song") {
    verseCode = /\d+/g.exec(prevReference)[0];
    verseCode = verseCode.slice(0,1) + verseCode.slice(1) + "00";
    verseCode = Number(verseCode);
  }
  //makes array of the code, reference, and verse
  newVerseArray = [];
  newVerseArray.push(verseCode);
  newVerseArray.push(prevReference);
  newVerseArray.push(prevVerse);

  //if verse is already in Saved Verses then it gives alert
  var duplicateVerse = false;

  for (var i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i][0] === newVerseArray[0]) {
      duplicateVerse = true;
    }
  }

  if (duplicateVerse == true) {
    openOverlay();
  }
  //gives alert if duplicate verse found
  if (duplicateVerse == false) {
    //scrolls to top
    scrollToTop();
    //opens saved verses after delay
    setTimeout(showVerses, 700);
    //empties saved verses list
    $("#savedVersesList").empty();
    //pushes newVerseArray to localStorageArray
    localStorageArray.push(newVerseArray);
    //sorts verses in numerical and book order
    function numSort(a, b) {
      if (a[0] < b[0]) {return -1};
      if (a[0] > b[0]) {return 1};
      return 0;
    }
    localStorageArray.sort(numSort);
    //saves verses to local storage
    localStorage.setItem("verses", JSON.stringify(localStorageArray));
    //turns local storage into Javascript readable objects
    var localVerses = JSON.parse(localStorage.getItem("verses"));
    //displays reference, verse and verse button
    localVerses.forEach(displayVerses);
  }

  //if there are no items in saved verses then it shows a message
  if (localStorageArray.length == 0) {
    document.getElementById("emptyStorage").innerHTML = "You have not saved any verses yet.";
  }
  else {
    document.getElementById("emptyStorage").style.display = "none";
  }

}
//localStorage.clear();

function addAnyways() {
  closeOverlay();
  //scrolls to top
  scrollToTop();
  //opens saved verses after delay
  setTimeout(showVerses, 700);
  //empties saved verses list
  $("#savedVersesList").empty();
  //pushes newVerseArray to localStorageArray
  localStorageArray.push(newVerseArray);
  //sorts verses in numerical and book order
  localStorageArray.sort();
  //saves verses to local storage
  localStorage.setItem("verses", JSON.stringify(localStorageArray));
  //turns local storage into Javascript readable objects
  var localVerses = JSON.parse(localStorage.getItem("verses"));
  //displays reference, verse and verse button
  localVerses.forEach(displayVerses);
}

//displays verses
function displayVerses(item) {
  //makes saved verse list a variable
  var savedList = document.getElementById("savedVersesList");
  //displays reference
  var savedVerseReference = document.createElement("p");
  savedVerseReference.innerHTML = item[1];
  savedVerseReference.className = "savedVerseReference";
  savedList.appendChild(savedVerseReference);

  //displays verse
  var savedVerse = document.createElement("p");
  savedVerse.innerHTML = item[2];
  savedVerse.className = "savedVerse";
  savedList.appendChild(savedVerse);

  //displays unsave verse button
  var unsaveButton = document.createElement("p");
  unsaveButton.innerHTML = "Unsave";
  unsaveButton.className = "unsaveButton";
  savedList.appendChild(unsaveButton);

  //adds event listener to unsave button
  var subVerseButton = document.getElementsByClassName("unsaveButton");
  for (var i = 0; i < subVerseButton.length; i++) {
    subVerseButton[i].addEventListener("click", unSaveVerse);
    subVerseButton[i].className = "unsaveButton";
    subVerseButton[i].className += " " + i;
  }
}

//array for all saved verses
var localStorageArray = [];
//displays saved verses when page loads
if (localStorage.length !== 0) {
  localStorage.getItem("verses");
  localStorageArray = JSON.parse(localStorage.getItem("verses"));
  //sorts verses in numerical and book order
  function numSort(a, b) {
    if (a[0] < b[0]) {return -1};
    if (a[0] > b[0]) {return 1};
    return 0;
  }
  localStorageArray.sort(numSort);
  localStorageArray.forEach(displayVerses);
}
//if there are no items in saved verses then it shows a message
if (localStorageArray.length == 0) {
  document.getElementById("emptyStorage").innerHTML = "You have not saved any verses yet.";
}
else {
  document.getElementById("emptyStorage").style.display = "none";
}

function unSaveVerse() {
  var buttonClass = $(this).attr('class');
  buttonClass = /\d/g.exec(buttonClass)[0];
  localStorageArray.splice(buttonClass, 1);
  //empties saved verses list
  $("#savedVersesList").empty();
  //saves verses to local storage
  localStorage.setItem("verses", JSON.stringify(localStorageArray));
  //turns local storage into Javascript readable objects
  var localVerses = JSON.parse(localStorage.getItem("verses"));
  //displays reference, verse and verse button
  localVerses.forEach(displayVerses);
  //if there are no items in saved verses then it shows a message
  if (localStorageArray.length === 0) {
    document.getElementById("emptyStorage").innerHTML = "You have not saved any verses yet.";
    document.getElementById("emptyStorage").style.display = "block";
  }
  else {
    document.getElementById("emptyStorage").style.display = "none";
  }
}
