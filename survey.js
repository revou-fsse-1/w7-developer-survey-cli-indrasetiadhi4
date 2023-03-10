import inquirer from "inquirer";

// functions
function validateName(input) {
  const reg = /^[a-z ,.'-]+$/i;

  if (!reg.test(input)) {
    return "Invalid Name";
  } else {
    return true;
  }
}

function validateEmail(input) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!reg.test(input)) {
    return "Invalid Email";
  } else {
    return true;
  }
}

function validateLibraries(input) {
  if (input.length == 0) {
    return "Select at least one library";
  } else {
    return true;
  }
}

function validateSalary(input) {
  if (isNaN(input)) {
    return "Salary must be a number";
  } else if (input <= 0) {
    return "Salary must be greater than 0";
  } else {
    return true;
  }
}

function experienceChecker(experience) {
  return experience === "yes";
}

function cleanName(rawName) {
  let words = rawName.split(" ");
  words = words.filter(isNotEmptyString);

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].toLowerCase().slice(1);
  }

  const cleanedName = words.join(" ");
  return cleanedName;
}

function isNotEmptyString(value) {
  return value !== "";
}

// questions
const questions = [
  {
    type: "input",
    name: "name",
    message: "What's your first name?",
    validate: (input) => validateName(input),
    filter: (input) => cleanName(input),
  },
  {
    type: "input",
    name: "email",
    message: (answers) => `Hello ${answers.name}, What's your email address?`,
    validate: (input) => validateEmail(input),
  },
  {
    type: "list",
    name: "isExperienced",
    message: "Are you an experienced developer?",
    choices: ["yes", "no"],
  },
  {
    type: "list",
    name: "yearsOfExperience",
    message: "How many years of experience you have with JavaScript?",
    choices: ["0-1", "1-3", "3-5", "5-10", "10+"],
    when: (answers) => experienceChecker(answers.isExperienced),
  },
  {
    type: "checkbox",
    name: "libraries",
    message: "What javascript libraries do you know?",
    choices: ["React.js", "Vue", "Angular", "Node.js", "jQuery", "D3.js"],
    when: (answers) => experienceChecker(answers.isExperienced),
    validate: (input) => validateLibraries(input),
  },
  {
    type: "number",
    name: "salary",
    message: "What is your desired salary?",
    when: (answers) => experienceChecker(answers.isExperienced),
    validate: (input) => validateSalary(input),
  },
];

// run your command
inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(JSON.stringify(answers, null, 2));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Your console environment is not supported!");
    } else {
      console.log(error);
    }
  });
