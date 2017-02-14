//Function that returns the reverse of a string
function reverseString(string){
    //if the input data is not a string data type or empty return null 
    if (typeof string != "string" || string === ''){
        return null;
    }
    //variable 'rev'denotes reversed string which takes the string been splitted,
    //reversed and then joined to form the reversed string
    var rev = string.split('').reverse().join('');
    //if the reverse of the string is the same as the original string then return true
    if (rev === string){
    	return true;
    }
    //if the reverse of the string is different from the original string then return the reversed string
    else{
    	return rev;
    } 	
}
module.exports = reverseString;