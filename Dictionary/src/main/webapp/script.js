/**
 * 
 */
var xhr = new XMLHttpRequest();
function search() {
	if(document.getElementById("word").value.trim()!="") {
		xhr.onreadystatechange = function() {
			if(this.readyState==4) {
				document.getElementById("word").value=="";
				console.log(this.responseText);
				if(this.responseText!="invalid") {
					var res = JSON.parse(this.responseText);
					console.log(res[0].meanings[0].partOfSpeech);
					console.log(res[0].meanings[0].definitions);
					var def = "";
					if(res[0].meanings[0].definitions.length>0) {
						def=res[0].meanings[0].definitions[0].definition;
						for(let i=1;i<res[0].meanings[0].definitions.length;i++) {
							console.log(res[0].meanings[0].definitions[i]);
							def += ", " + res[0].meanings[0].definitions[i].definition;
						}
					}
					var synonym = "";
					if(res[0].meanings[0].synonyms.length>0) {
						synonym = res[0].meanings[0].synonyms[0];
						for(let j=1;j<res[0].meanings[0].synonyms.length;j++) {
							synonym += ", " + res[0].meanings[0].synonyms[j];
						}
					}
					var antonym = "";
					if(res[0].meanings[0].antonyms.length>0) {
						antonym = res[0].meanings[0].antonyms[0];
						for(let k=1;k<res[0].meanings[0].antonyms.length;k++) {
							antonym += ", " + res[0].meanings[0].antonyms[k];
						}
					}
					document.getElementById("partOfSpeech").innerHTML = "<span class='lable'>Part of speech :</span><br>"+res[0].meanings[0].partOfSpeech;
					def!="" ? document.getElementById("defination").innerHTML = "<span class='lable'>Definations :</span><br>"+def : null;
					synonym!="" ? document.getElementById("synonym").innerHTML = "<span class='lable'>Synonym :</span><br>" + synonym : null;
					antonym!="" ? document.getElementById("antonym").innerHTML = "<span class='lable'>Antonym :</span><br>" + antonym : null;
				}
				else {
					document.getElementById("partOfSpeech").innerHTML = "<h1>Please enter valid word!!</h1>";
				}
			}
		}
		document.getElementById("defination").innerHTML = "";
		document.getElementById("synonym").innerHTML = "";
		document.getElementById("antonym").innerHTML = "";
		document.getElementById("partOfSpeech").innerHTML = "";
		var word = document.getElementById("word").value;
		console.log(word);
		xhr.open("POST","./DictioneryController");
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send("word="+word);
	}
	else {
		document.getElementById("defination").innerHTML = "";
		document.getElementById("synonym").innerHTML = "";
		document.getElementById("antonym").innerHTML = "";
		document.getElementById("partOfSpeech").innerHTML = "";
		document.getElementById("partOfSpeech").innerHTML = "<h1>Please enter valid word!!</h1>";
	}
}