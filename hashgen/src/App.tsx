import './App.css'
import React from "react"

async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

export default function App() {
	let [text, setText] = React.useState("")
  return (
    <main>
			<input placeholder="Hash/Previous hash" id="textBox" className="prevhash" title="From offhand nbt after _test command."/>
			<br />
			<input placeholder="Key" id="textBox" className="key"/>
			<br />
			<button onClick={
				function(){
					hash(document.getElementsByClassName("prevhash")[0].value + document.getElementsByClassName("key")[0].value).then((s) => {
						setText("Your hash is: " + s.substring(0, 16))
						document.getElementsByClassName("prevhash")[0].value = s.substring(0, 16)
					})
				}
			}>Generate hash</button>
			<p id="hashHolder">{text}</p>
			<p>To use this, put the key you got from discord and get your hash using "_getHash".<br />After filling in all the fields you just click "Generate hash" to get a new hash every time (which works!)</p>
    </main>
  )
}