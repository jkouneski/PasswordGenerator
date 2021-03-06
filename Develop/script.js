
//Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", customizePassword);

//Function to create an array for potential characters
function createArray(low, high) {
  var array = [];
  for (var i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

//Creating array of character codes for each character type
var uppercaseCodes = createArray(65, 90);
var lowercaseCodes = createArray(97, 122);
var numberCodes = createArray(48, 57);
var specialCodes = createArray(33, 47)
  .concat(createArray(58, 64))
  .concat(createArray(91, 96))
  .concat(createArray(123, 126));


// Function to ask user for password length
function customizePassword() {
  var passwordLength = prompt("How many characters in your password?");

  // Alert to restart if user does not choose a NUMBER beween 8 and 128
  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength >= 128) {
    alert("Password length must be a number between 8 - 128.");
    customizePassword();
    return;
  }

  // Series of confirmations for user to choose desired character types
  var confirmLowercase = confirm("Lowercase characters?");
  var confirmUppercase = confirm("Uppercase characters?");
  var confirmNumbers = confirm("Numbers?");
  var confirmSpecial = confirm("Special Characters?");

  //Alert ensures user chooses at least 1 character type
  if (
    !confirmLowercase && !confirmUppercase && !confirmNumbers && !confirmSpecial
  ) {
    alert("At least one character type required to proceed");
    customizePassword();
    return;
  }

// Pass user input prompt values to getUserSpecs
  getUserSpecs(
    passwordLength, confirmLowercase, confirmUppercase, confirmNumbers, confirmSpecial
  );
}

// Function to get random index from each array
function randomize(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];
  return randomElement;
}

// Function will evaluate the selected options and add random character codes to finalCharacters array
function getUserSpecs(
  passwordLength, confirmLowercase, confirmUppercase, confirmNumbers, confirmSpecial) 
  {

  // Array that we can add user selected character sets to and use to fill in rest of password
  var draftCharacters = [];

  // Array that we will push random characters to and then .join('') to get final password string
  var finalCharacters = [];

  // For each confirm returned True will crate just 1 random character code
  if (confirmLowercase) {
    draftCharacters = draftCharacters.concat(lowercaseCodes);
    finalCharacters.push(
      String.fromCharCode(randomize(lowercaseCodes))
    );
  }
  if (confirmUppercase) {
    draftCharacters = draftCharacters.concat(uppercaseCodes);
    finalCharacters.push(
      String.fromCharCode(randomize(uppercaseCodes))
    );
  }
  if (confirmNumbers) {
    draftCharacters = draftCharacters.concat(numberCodes);
    finalCharacters.push(
      String.fromCharCode(randomize(numberCodes))
    );
  }
  if (confirmSpecial) {
    draftCharacters = draftCharacters.concat(specialCodes);
    finalCharacters.push(
      String.fromCharCode(randomize(specialCodes))
    );
  }

  //Variable to see how many more random characters are needed
  var lengthCalculation = passwordLength - finalCharacters.length;

  //Loop to grab more random characters so password is the desired length
  for (var i = 0; i < lengthCalculation; i++) {
    finalCharacters.push(
      String.fromCharCode(randomize(draftCharacters))
    );
  }

  // Changing characters from elements in array into a string
  var generatePassword = finalCharacters.join('')
  writePassword(generatePassword)

}

// Write password to the #password input
function writePassword(password) {
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}