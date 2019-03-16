const elem = document.createElement('canvas');
elem.style.cssText = 'position:fixed;width:500px;height:200px;z-index:100;top:10px;left:80px;';
elem.id = 'roll-64-avatar';
document.body.appendChild(elem);

console.log('cs go');
//alert('tesst');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }