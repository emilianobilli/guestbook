


function htmlMessage(_name,_message,_address,_block)
{
	_html = '<div class="col-sm-1"></div><div class="col-sm-2"><div id="block" class="thumbnail"></div></div><div class="col-sm-9"><div class="panel panel-default"><div class="panel-heading"><strong>' + _name + '</strong> <span class="text-muted"> in block number: ' + _block + '</span></div><div class="panel-body">' + _message + '</div></div></div>';
	div   = document.createElement('div');
	div.className = "row";
	div.innerHTML = _html
	e = div.getElementsByClassName("thumbnail")[0];
	e.appendChild(blockies.create({ // All options are optional
			seed: _address, // seed used to generate icon data, default: random
			//color: '#dfe', // to manually specify the icon color, default: random
			bgcolor: '#aaa', // choose a different background color, default: random
			size: 15, // width/height of the icon in blocks, default: 8
			scale: 5, // width/height of each block in pixels, default: 4
			spotcolor: '#000' // each pixel has a 13% chance of being of a third color, 
			// default: random. Set to -1 to disable it. These "spots" create structures
			// that look like eyes, mouths and noses. 
	}));
	return div;
}

function pushMessage(id, msg)
{
	h    = document.getElementById(id);
	h.insertBefore(msg,h.firstChild);
}

var ContractAbi     = [{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_msg","type":"string"}],"name":"Message","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_msg","type":"string"}],"name":"PostMessage","type":"event"}];
var ContractAddress = "0xe59f2877a51e570fbf751a07d50899838e6b6cc7";

window.addEventListener('load', function() {

	  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
	if (typeof web3 !== 'undefined') {
		// Use Mist/MetaMask's provider
		w = new Web3(web3.currentProvider);
	} else {
		console.log("No hay MetaMask");
		window.alert("Please install Metamask and config it with RSK Mainnet. http://rsk.cexar.io:4444");
		throw "MetaMakask";
	}
	Contract = w.eth.contract(ContractAbi);
	c = Contract.at(ContractAddress);
	c.PostMessage({},{fromBlock: 279683, toBlock: 'latest'}).watch(function(error, result){
		console.log(result);
		if (!error) {
			pushMessage("message_board",htmlMessage(result.args['_name'],result.args['_msg'],result.args['_from'],result.blockNumber));
		}		
	});
	c.message.call(function(error,result) {
		if (!error)
			e = document.getElementById("ContractMessage");
			e.innerText = result;	
	});
	document.getElementById('send').addEventListener('click', function(){
		name    = document.getElementById('name').value;
		message = document.getElementById('message').value;
		value   = document.getElementById('value').value;
		c.Message(name,message,{value:1,gasPrice:183000000},function(e,r){console.log(r)});
	});
});

