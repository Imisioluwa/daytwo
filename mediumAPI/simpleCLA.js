const readline = require('readline');
const request = require('request');

const Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>>> '
});

Interface.on('line', (input) => {
  switch(input.trim()) {
	case 'getAccess': 
	  consumer.getAccess();
	  break;
	case 'getUserProperty -name':
	  consumer.getUserProperty('name');
	  break;
	case 'getUserProperty -url':
	  consumer.getUserProperty('url');
	  break;
	case 'getUserProperty -id':
	  consumer.getUserProperty('id');
	  break;
	case 'postPublication':
	  consumer.postPublication();
    break;
	default:
	  console.log("Invalid command!");
	  break;
  }
  Interface.prompt();
});

class mediumApiConsumer {

  welcomeClient() {
  	console.log("Welcome to the simple medium command line application, enter getAccess to begin");
  }

  getAccess() {
    console.log('Visit the settings page of your medium account to generate a token: https://medium.com/me/settings');
  	Interface.question("Please enter your Medium integration token: ", (token) => {
  	  var uri = 'https://api.medium.com/v1/me';
  	  request({
  	  	url: uri,
  	  	type: "GET",
  	  	headers: {
  	  	  'Content-Type': 'application/json',
  	  	  'Authorization': 'Bearer '+token,
  	  	},
  	  }, (error, res, body) => {
  	  	if(!error && res.statusCode===200) {
  	  	  console.log('------------------------Valid Token! Account Accessed--------------------------');
  	  	  this.token= token;
  	  	  this.user = JSON.parse(body).data;
  	  	}
  	  	else {
  	  	  console.log("-----------------------Access denied! Check Token---------------------------");
  	  	}
  	  });
  	});
  	Interface.prompt();
  }

  getUserProperty(property) {
    if (this.hasOwnProperty('user')) {
  	  console.log(this.user[property]);
  	}
  	else {
  		console.log("Your medium account is yet to be accessed, Enter getAccess");
  	}
  }

  postPublication() {
  	if (!this.hasOwnProperty('user')) {
  	  console.log("Your medium account is yet to be accessed, Enter getAccess");
  	  return;
  	}
    var publication = {};
  	Interface.question("Enter post title: ", (title) => {
      publication["title"] = title;
      Interface.question("'markdown' or 'html'?: ", (contentFormat) => {
        publication["contentFormat"] = contentFormat;
        Interface.question("Write post content"+'\n', (content) => {
          publication["content"] = content;
          Interface.question("Would you like to give your post tags? Enter comma separated values: ", (tags) => {
            publication["tags"] = tags.split(',');
            console.log(tags);
            Interface.question("public, draft or unlisted?-----", (publishStatus) => {
              publication["publishStatus"] = publishStatus;
              var uri =  `https://api.medium.com/v1/users/${this.user.id}/posts`;
              request({
                url: uri,
                method: "POST",
                json: true,
                body: publication,
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json",
                  "Authorization": "Bearer "+this.token,
                },
              }, (error, res, body) => {
                if (!error && res.statusCode===201) {
                  var parsedData = JSON.parse(body).data;
                  console.log(`Published ${parsedData.title} at ${parsedData.url}`);
                }
                else {
                  console.log(error, res.statusCode);
                }
              });
            });
          });
        });
      });
    });
  }
} 

let consumer = new mediumApiConsumer();
consumer.welcomeClient();
Interface.prompt();