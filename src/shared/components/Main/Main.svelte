<script>
  export let name;

  //import Dropzone from "svelte-file-dropzone";
  //import ElectronService from '../../../app/core/electron.service';
  import fsManager from '../../fileFunctions';
  import { processFiles } from "../../../app/utils/processFiles";

  let files = {
    priceListFilePath:'',
    poFilePath: '',
  };

  let messageToDisplayToUser = ''; 

  function getPOFile(e) {
    files.poFilePath = fsManager.getFile();
  }

  function getPriceListFile(e) {
    files.priceListFilePath = fsManager.getFile();
  }

  function process(e) {
    processFiles({
      posFilePath: files.poFilePath, 
      priceListFilePath: files.priceListFilePath,
    })
  }

  require('electron').ipcRenderer.on('main-message',(event, x)=> {   
    switch (x.type) {
      case 'COMPLETED':
        messageToDisplayToUser = x.type;
        x.payload.errorData.map((row)=>{
          messageToDisplayToUser += '<div>' + row.poProductRow.ASIN + ' ' + row.message + '</div>';
        })
        break;
      default:
        messageToDisplayToUser = x.data;
    } 
    
  });

</script>

<h1>{name}</h1>

<div class="container">

  <div class="row">
    <div class="column column-100"><h3>{files.poFilePath}</h3></div>
  </div>
  <div class="row">
    <div class="column column-70">Select PO File</div>
    <div class="column column-30">
      <button on:click={getPOFile}>Select</button>
    </div>
  </div>

  <div class="row">
    <div class="column column-100"><h3>{files.priceListFilePath}</h3></div>
  </div>
  <div class="row">
    <div class="column  column-70">Select PriceList File</div>
    <div class="column  column-30">
      <button on:click={getPriceListFile}>Select</button>
    </div>
  </div>

 <h4> Output </h4>

  <div class="row">
    <div class="column column-100">
      <button on:click={process}>Process files</button>
    </div>
  </div>

</div>

<h3>
  Progress:
  {@html messageToDisplayToUser}
</h3>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>