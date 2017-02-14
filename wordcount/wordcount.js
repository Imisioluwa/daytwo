//function that counts the number of occurrence of words in a string
function wordS(wordstring){
	//creating object
  var countobj = {};
	//variable wordarray is assigned to the split of input string that matches one or more space characters
  var wordarray = wordstring.split(/\s+/);
	//looping through the wordarray
  for (var word of wordarray){
		//if the object has the same word property then increment by one
    if (countobj.hasOwnProperty(word)){
      countobj[word] += 1;
    }
        //return one
    else{		
      countobj[word] = 1;
	}    
  }
return countobj;
}
module.exports = wordS;