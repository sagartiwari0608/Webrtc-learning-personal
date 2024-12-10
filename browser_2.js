// Paste the actual SDP offer here obtained from the other browser
const offer = " offer ";

// now we create/declare this browser 2 window as another peer
const remoteConnection = new RTCPeerConnection();

// here as well we'll find our ICE candidates to which the other peer can connect.
remoteConnection.onicecandidate = (event) =>
  console.log(
    "New Ice Candidate found reprinting SDP",
    JSON.stringify(remoteConnection.localDescription)
  );

remoteConnection
  .setRemoteDescription(offer)
  .then((ack) => console.log("offer set!"));

remoteConnection
  .createAnswer()
  .then((answer) => {
    remoteConnection.setLocalDescription(answer);
  })
  .then((e) => {
    console.log("answer created and set to this browser's localdesciption");
  });
// once we excecute the above line then
// it will start looking for ice candidates and print in console
//  which then we'll pick up and paste as answer in the first browser

// Now here we need not create a data channel we will capture the data channel.
// this will happen after the connection is opened/successfull
remoteConnection.ondatachannel = (e) => {
  remoteConnection.dc = e.channel; // here we created our own variable dc and assigned the other party's data channel to it
  // now we can still to all the stuff that we did on the other side to confirm opening of channel and log all the messages.
  remoteConnection.dc.onopen = (e) => {
    console.log("Connection opened from browser 2 as well !!!");
  };
  remoteConnection.dc.onmessage = (e) =>
    console.log("message recieved", e.data);
};
remoteConnection.dc.send("mai vdia bhraa tu suna ");
