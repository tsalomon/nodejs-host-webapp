
  var CLIENT_ID = '322062464962-d3t6i8agob1p9uo903lgauiso8ai3gh1';
  var SCOPES = ["https://www.googleapis.com/auth/calendar"];

  /**
   * Check if current user has authorized this application.
   */
  function checkAuth() {
	gapi.auth.authorize(
	  {
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	  }, handleAuthResult);
  }

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  function handleAuthResult(authResult) {
	var authorizeDiv = document.getElementById('authorize-div');
	if (authResult && !authResult.error) {
	  // Hide auth UI, then load client library.
	  authorizeDiv.style.display = 'none';
	  
	  //call functions here;
	  createEvent();
    console.log(courses);
		
	} else {
	  // Show auth UI, allowing the user to initiate authorization by
	  // clicking authorize button.
	  authorizeDiv.style.display = 'inline';
	}
  }
  
  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  function handleAuthClick(event) {
	gapi.auth.authorize(
	  {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
	  handleAuthResult);
	return false;
  }
  

  

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
	var pre = document.getElementById('output');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
  }
