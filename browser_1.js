// here we created/declared a new peer for connection
const localConnection = new RTCPeerConnection();

// this is creation of data channel from where data will flow as of now i guess.
const dataChannel = localConnection.dataChannel("channel");

// here we are finding all the ice candidates (mediums through which another peer can connect to us)
localConnection.onicecandidate = (event) =>
  console.log(
    "New Ice Candidate found reprinting SDP",
    JSON.stringify(localConnection.localDescription)
  );

// with this line if i remember correctly a new offer will be created which we will get the actual offer string
// which we can then send out through whichever medium we (whatsapp, our own server, telegram or even through call by saying out each word one by one.)
localConnection
  .createOffer()
  .then((offer) => {
    localConnection.setLocalDescription(offer);
  })
  .then((acknowledge) =>
    console.log(
      "offer has been set successfully to our peer's local description",
      acknowledge
    )
  );

const answer = "paste json got from the browser 2";
localConnection
  .setRemoteDescription(answer)
  .then((ack) => console.log("answer set!!"));

// once the connection forms between both peers then we get this message.
dataChannel.onopen = (event) => console.log("Connection opened", event);

// now once connected both can keep sending data to each other.
// and this line will be excecuted upon recieving data
dataChannel.onmessage = (e) => console.log("just got a message", e, e.data);

dataChannel.send("yo bro ki haal ee");
