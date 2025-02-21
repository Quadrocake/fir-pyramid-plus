import Screenshot from './screenshot.mjs'
import pyramidDefs from './trees.mjs';
import { copyDefs } from './dk.mjs'

let res = {};
let ICON_MODEL_URL = "";
let QUANTITY_MODEL_URL = "";

let stockpiles = [];
let imagesProcessed = 0;
let imagesTotal = 0;

let openedPanel = null;

export async function init(resources, icon_model_url, quantity_model_url) {
  res = resources;
  ICON_MODEL_URL = icon_model_url;
  QUANTITY_MODEL_URL = quantity_model_url;

  const ready = new Promise(function(resolve) {
    if (document.readyState != 'loading') {
      resolve();
    } else {
      window.addEventListener('DOMContentLoaded', () => resolve());
    }
  });

  await Promise.all([...Object.values(res), ready]).then(function (results) {
    let index = 0;
    for (const key of Object.keys(res)) {
      res[key] = results[index++];
    }
  });
  outputTotals();
  document.querySelector('.reset-pyramid').addEventListener('click', () => {
    stockpiles = [];
    imagesProcessed = 0;
    imagesTotal = 0;
    document.querySelector('.render').innerHTML = '';
    outputTotals();
  });
  // Add stockpile
  // document.querySelector('.add-pyramid').addEventListener('click', () => {
  //   stockpiles = [];
  //   imagesProcessed = 0;
  //   imagesTotal = 0;
  //   document.querySelector('.render').innerHTML = '';
  //   addPyramid();
  // });
  // document.getElementById("crated").addEventListener('change', () => {
  //   outputTotals();
  // });

  document.querySelector('select[name=format]').addEventListener('change', () => {
    outputTotals();
  });
  document.querySelector('select[name=definition]').addEventListener('change', () => {
    outputTotals();
  });
  document.querySelector('input[name=filter-full]').addEventListener('change', (e) => {
    if(e.target.checked) {
      document.querySelector('#pyramid').classList.add('filter-full');
    } else {
      document.querySelector('#pyramid').classList.remove('filter-full');
    }
  });
  if(document.querySelector('input[name=filter-full]').checked){
    document.querySelector('#pyramid').classList.add('filter-full');
  }

  document.querySelector('a[href="#help"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#help').classList.toggle('hidden');
  });
  document.querySelector('#help').addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.id == 'help') {
      document.querySelector('#help').classList.toggle('hidden');
    }
  });

}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
// function copyTextToClipboard(text) {
//   if (!navigator.clipboard) {
//     fallbackCopyTextToClipboard(text);
//     return;
//   }
//   navigator.clipboard.writeText(text).then(function() {
//     console.log('Async: Copying to clipboard was successful!');
//   }, function(err) {
//     console.error('Async: Could not copy text: ', err);
//   });
// }

export function registerDefaultListeners() {
  document.querySelector('form').addEventListener('submit', function(e) {
    // Prevent a submit that would lose our work
    e.preventDefault();
  });

  window.addEventListener('paste', function(event) {
    const files = event.clipboardData.files || [];
    const images = Array.prototype.filter.call(files, f => f.type.startsWith('image/'));
    if(images.length === 0) {
      return;
    }
    stockpiles = [];
    imagesProcessed = 0;
    imagesTotal = 0;

    addImages(images);
  });
}

export function addInputListener(input) {
  input.addEventListener('change', function() {
    if (!this.files.length) {
      return;
    }
    stockpiles = [];
    imagesProcessed = 0;
    imagesTotal = 0;

    const files = Array.from(this.files).sort(function(a, b) {
      // Consistent ordering based on when each screenshot was captured
      return a.lastModified - b.lastModified;
    });

    addImages(files);
  });
}

export function addDownloadTotalsListener(downloadTotals) {
  downloadTotals.addEventListener('click', function() {
    const totals = document.querySelector('div.report');
    html2canvas(totals, {
      width: totals.scrollWidth,
      height: totals.scrollHeight,
      windowWidth: totals.scrollWidth + 16,
      windowHeight: totals.scrollHeight + 16,
    }).then(function(canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();

      const time = new Date();
      link.download = time.toISOString() + "_" + 'foxhole-inventory-totals.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
}

export function addDownloadTSVListener(downloadTSV) {
  downloadTSV.addEventListener('click', function() {
    const items = [[
      'Stockpile Title',
      'Stockpile Name',
      'Structure Type',
      'Quantity',
      'Name',
      'Crated?',
      'Per Crate',
      'Total',
      'Description',
      'CodeName',
    ].join('\t')];
    for (const stockpile of stockpiles) {
      for (const element of stockpile.contents) {
        if (element.quantity == 0) {
          continue;
        }

        const details = res.CATALOG.find(e => e.CodeName == element.CodeName);
        if (typeof details == 'undefined') {
          continue;
        }
        const perCrate = ((details.ItemDynamicData || {}).QuantityPerCrate || 3)
            + (details.VehiclesPerCrateBonusQuantity || 0);
        const perUnit = element.isCrated ? perCrate : 1;

        items.push([
          stockpile.label.textContent.trim(),
          stockpile.header.name || '',
          stockpile.header.type || '',
          element.quantity,
          details.DisplayName,
          element.isCrated,
          element.isCrated ? perUnit : '',
          element.quantity * perUnit,
          details.Description,
          element.CodeName,
        ].join('\t'));
      }
    }

    const encoder = new TextEncoder();
    function toBinary(string) {
      // Expand UTF-8 characters to equivalent bytes
      let byteString = '';
      for (const byte of encoder.encode(string)) {
        byteString += String.fromCharCode(byte);
      }
      return byteString;
    }
    const base64TSV = window.btoa(toBinary(items.join('\n')));

    const link = document.createElement('a');
    link.href = `data:text/tab-separated-values;base64,${base64TSV}`;

    const time = new Date();
    link.download = time.toISOString() + "_" + 'foxhole-inventory.tsv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function stringValue(value, other) {
  return { userEnteredValue: { stringValue: value }, ...other };
}

function dateValue(date) {
  // Courtesy of https://stackoverflow.com/a/64814390
  const SheetDate = {
    origin: Date.UTC(1899, 11, 30, 0, 0, 0, 0),
    dayToMs: 24 * 60 * 60 * 1000,
  };
  const serial = (date.getTime() - SheetDate.origin) / SheetDate.dayToMs;
  return numberValue(serial, { userEnteredFormat: { numberFormat: { type: 'DATE_TIME' } } });
}

function numberValue(value, other) {
  return { userEnteredValue: { numberValue: value }, ...other };
}

export function getAppendGoogleRows(format="gapi") {
  const exportTime = new Date();
  const rows = [];
  stockpiles.sort( (a, b) => a.lastModified - b.lastModified );
  for (const stockpile of stockpiles) {
    const stockpileTime = new Date(stockpile.lastModified);
    const stockpileID = Math.floor(Math.random() * 1000000000000000);
    let isEmpty = true;
    for (const element of stockpile.contents) {
      if (element.quantity == 0) {
        continue;
      }
      isEmpty = false;

      const details = res.CATALOG.find(e => e.CodeName == element.CodeName);
      if (typeof details == 'undefined') {
        continue;
      }

      if (format == "gapi") {
        rows.push({
          values: [
            dateValue(exportTime),
            dateValue(stockpileTime),
            stringValue(stockpile.header.type || ''),
            stringValue(stockpile.header.name || ''),
            stringValue(stockpile.label.textContent.trim()),
            stringValue(element.CodeName),
            stringValue(details.DisplayName),
            numberValue(element.quantity),
            { userEnteredValue: { boolValue: element.isCrated } },
            numberValue(stockpileID),
          ],
        });
      } else if (format == "google-script") {
        rows.push([
          exportTime.toString(),
          stockpileTime.toString(),
          stockpile.header.type || '',
          stockpile.header.name || '',
          stockpile.label.textContent.trim(),
          element.CodeName,
          details.DisplayName,
          element.quantity,
          element.isCrated,
          stockpileID,
        ]);
      } else {
        console.error("Unexpected format");
      }
    }
    if (format == "google-script" && isEmpty) {
      rows.push([
        exportTime.toString(),
        stockpileTime.toString(),
        stockpile.header.type || '',
        stockpile.header.name || '',
        stockpile.label.textContent.trim(),
        "Update as empty stockpile",
        "nulling this stockpile",
        0,
        true,
        stockpileID,
      ]);
    }
  }
  return rows;
}

function addImages(files) {
  imagesTotal += files.length;

  const collage = document.querySelector('div.render');
  document.querySelector('.processing-status span').textContent = imagesProcessed + " of " + imagesTotal;

  files.forEach(function(file) {
    const container = document.createElement('div');

    const image = document.createElement('img');
    image.style.display = 'none';
    image.addEventListener('load', getProcessImage('@@UNUSED', file.lastModified), { once: true });
    image.src = URL.createObjectURL(file);
    container.appendChild(image);
    collage.innerHTML = '<span>Processing Screenshot...</span>';
    collage.appendChild(container);
  });
}

function gIds() {
  if (location.host == 'fir.gicode.net') {
    return {
      clientId: '432701922574-m5mkt6dp2bp8hbt27fuoo4s7bfhpq3jr.apps.googleusercontent.com',
      apiKey: 'AIzaSyB1FQ72hY28Ovc1mPbrBBVspj68-BvICOo',
      appId: '432701922574',
    };
  }

  return {
    clientId: '977197840282-f5c1jf3f4rumgnbv4rdm61l85gs0ue7m.apps.googleusercontent.com',
    apiKey: 'AIzaSyB0oavB9RY-kegde_YDLTM6H2PHhu5z7t4',
    appId: '977197840282',
  };
}

function getProcessImage(label, lastModified) {
  return function() {
    return processImage.call(this, label, lastModified);
  };

  async function processImage(_label, lastModified) {
    URL.revokeObjectURL(this.src);

    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    const context = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
    context.drawImage(this, 0, 0);

    const stockpile = await Screenshot.process(canvas, ICON_MODEL_URL, res.ICON_CLASS_NAMES, QUANTITY_MODEL_URL, res.QUANTITY_CLASS_NAMES);
    if (stockpile) {
      // document.querySelector('div.render span').remove();
      this.src = stockpile.box.canvas.toDataURL();
      stockpile.lastModified = lastModified;
      stockpiles.push(stockpile);
    }

    this.style.display = '';
    ++imagesProcessed;
    document.querySelector('.processing-status span').textContent = imagesProcessed + " of " + imagesTotal;

    if (imagesProcessed == imagesTotal) {
      window.stockpiles = stockpiles;
      window.stockpilesJSON = JSON.stringify(stockpiles.map(function(s) {
        return {
          file: 'base',
          box: {
            x: s.box.x,
            y: s.box.y,
            width: s.box.width,
            height: s.box.height,
          },
          header: {
            type: s.header.type || null,
            name: s.header.name || null,
          },
          contents: s.contents.map(function(e) {
            return {
              CodeName: e.CodeName,
              quantity: e.quantity,
              isCrated: e.isCrated,
            };
          }),
        };
      }), undefined, 2);

      outputTotals();

      // Timeout gives the UI a chance to reflow
      setTimeout(function() {
        const maxHeight = Array.from(document.querySelectorAll('div.render > div'))
            .map(e => e.getBoundingClientRect().height)
            .reduce((a, b) => Math.max(a, b), 0);

        const render = document.querySelector('div.render');
        if (maxHeight > render.clientHeight) {
          const margins = render.getBoundingClientRect().height - render.clientHeight;
          render.style.height = `${maxHeight + margins}px`;
        }
      }, 1);
    }
  }
}

// function addPyramid() {
//   const addpyramid = document.querySelector('div#addpyramid');
//   addpyramid.innerHTML = '';
//   console.log(res.CATALOG);
//   const addRowButton = document.createElement('button');
//   addRowButton.classList.add('addrow');
//   addRowButton.textContent = 'Add row'
//   addRowButton.addEventListener('click', () => {
//     pyramidDefs.test2.push([]);
//     outputTotals();
//   });

//   var copyPyramid = document.getElementById("copy-pyramid");
//   copyPyramid.addEventListener('click', () => {
//     navigator.clipboard.writeText(JSON.stringify(pyramidDefs.test2));
//   });

//   const selFaction = 'Wardens'
//   const categories = ['SmallArms', 'HeavyArms', 'HeavyAmmo', 'Utility', 'Medical', 'Supplies', 'Uniforms'];
//   categories.forEach((selcategory) => {
//     const colDiv = document.createElement('div');
//     colDiv.classList.add('col'); //change later
//     colDiv.setAttribute("id", selcategory);
//     colDiv.style.display = "none";
//     const categoryButton = document.createElement('button');
//     categoryButton.classList.add(selcategory);
//     categoryButton.classList.add('categBut');
//     categoryButton.innerHTML = selcategory;
//     categoryButton.addEventListener('click', () => {
//       if (document.getElementById(selcategory).style.display !== "none") {
//         // document.querySelector(`div.${selcategory}`).display = "none";
//         console.log(colDiv.display, colDiv);
//         colDiv.style.display = "none";
//       } else {
//         // document.querySelector(`div.${selcategory}`).display = "inline-block";
//         console.log(colDiv.style.display);
//         colDiv.style.display = "flex";
//       }
//     });
//     addpyramid.appendChild(categoryButton);
//     for (const catalogItem of res.CATALOG) {
//       const itemCategory = (catalogItem.ItemCategory || '').replace(/^EItemCategory::/, '');
//       const vehicleCategory = catalogItem.VehicleProfileType ? 'Vehicles' : undefined;
//       const structureCategory = catalogItem.BuildLocationType
//           || (catalogItem.ProfileType == 'EStructureProfileType::Shippable') ? 'Structures' : undefined;

//       const itemFaction = (catalogItem.FactionVariant || '').replace(/^EFactionId::/, '');
//       const itemName = catalogItem.DisplayName;
  
//       const category = itemCategory || vehicleCategory || structureCategory;
//       if (category == selcategory && (itemFaction == selFaction || itemFaction =='')) {
//         const itemDiv = document.createElement('div');
//         itemDiv.addEventListener("click", function(){
//           // pyramidDefs[0].push([catalogItem.CodeName, "100"])
//           console.log(catalogItem);
//           const activeRow = document.querySelector(".active");
//           if (activeRow){
//             // console.log(activeRow, activeRow.dataset);
//             pyramidDefs.test2[activeRow.dataset.rowindex].push([catalogItem.CodeName, "100"]);
//           } else {
//             pyramidDefs.test2[pyramidDefs.test2.length-1].push([catalogItem.CodeName, "100"]);
//           }
//           outputTotals();
//         });
//         itemDiv.classList.add('item');
//         // console.log(category)
//         itemDiv.classList.add(category);
//         const itemTooltip = document.createElement('span');
//         itemTooltip.innerHTML = itemName;
//         itemTooltip.classList.add('itemtooltip');
//         itemDiv.appendChild(itemTooltip);
  
//         const fallbackImg = document.createElement('img');
//         fallbackImg.src = `./foxhole/infantry-59/icons/${catalogItem.CodeName}.png`;
//         fallbackImg.width = 42;
//         fallbackImg.height = 42;
//         fallbackImg.alt = catalogItem.DisplayName;
//         itemDiv.appendChild(fallbackImg);
  
//         const labelSpan = document.createElement('span');
//         labelSpan.textContent = "+";
//         itemDiv.appendChild(labelSpan);
  
//         itemDiv.classList.add('full'); //test
        
//         colDiv.appendChild(itemDiv);
//       }
//     }
//     addpyramid.appendChild(colDiv);
//     addpyramid.appendChild(addRowButton);
//   });
//   // const selCategory = 'Uniforms'
// }

function outputTotals() {
  const totals = {};
  const categories = {};
  let countDiff = false;

  // if (stockpiles.length == 2){countDiff = true};
  // for (const stockpile of stockpiles) {
  for (const [i, stockpile] of stockpiles.entries()) {
    for (const element of stockpile.contents) {
      let key = element.CodeName;
      if (element.isCrated) {
        key += '-crated';
      }
      // console.log(totals);
      if (!totals[key]) {
        const catalogItem = res.CATALOG.find(e=>e.CodeName == element.CodeName);
        if (!catalogItem) {
          console.log(`${element.CodeName} missing from catalog`);
          continue;
        }

        const itemCategory = (catalogItem.ItemCategory || '').replace(/^EItemCategory::/, '');
        const vehicleCategory = catalogItem.VehicleProfileType ? 'Vehicles' : undefined;
        const structureCategory = catalogItem.BuildLocationType
            || (catalogItem.ProfileType == 'EStructureProfileType::Shippable') ? 'Structures' : undefined;

        const category = itemCategory || vehicleCategory || structureCategory;
        categories[category] ||= [];
        categories[category].push(key);

        totals[key] = {
          CodeName: element.CodeName,
          isCrated: element.isCrated,
          name: catalogItem.DisplayName,
          category: category,
          total: 0,
          collection: [],
        };
      }
      // totals[key].total += element.quantity; //sum changed to difference
      if (i == 0 && countDiff == true) {
        totals[key].total = element.quantity;
      } else if (i == 1 && countDiff == true) {
        console.log(key, totals[key].total, element.quantity);
        totals[key].total -= element.quantity;
      } else {
        totals[key].total += element.quantity;
      }
      totals[key].collection.push(element);
    }
  }

  const categoryOrder = {
    SmallArms: 1,
    HeavyArms: 2,
    HeavyAmmo: 3,
    Utility: 4,
    Medical: 5,
    Supplies: 6,
    Uniforms: 7,
    Vehicles: 8,
    Structures: 9,
  };
  const sortedCategories = Object.keys(categories).sort(function(a, b) {
    return (categoryOrder[a] || Infinity) - (categoryOrder[b] || Infinity);
  });

  // Pyramid  start
  const format = document.querySelector('select[name=format]').value;
  const definition = document.querySelector('select[name=definition]').value;
  const pyramid = document.querySelector('div#pyramid');
  pyramid.innerHTML = '';
  if(Object.keys(totals).length === 0){
    pyramid.classList.add('empty');
  } else {
    pyramid.classList.remove('empty');
  }
  
  const pyramidDef = pyramidDefs[definition];
  // const cratesTrue = document.getElementById("crated");
  // if (cratesTrue.checked == true){
  //   pyramidDef.forEach((row, index) =>{
  //     row.forEach((item, index2) => {
  //       const itemSet = [];
  //       if (!item[0].includes("-crated")) {
  //         pyramidDef[index][index2][0].split(',').forEach((item) => {
  //           itemSet.push(item + "-crated");
  //         })
  //       } else {
  //         itemSet.push(item[0]);
  //       }
  //       pyramidDef[index][index2][0] = itemSet.join();
  //     });
  //   });
  // } else {
  //   pyramidDef.forEach((row, index) =>{
  //     row.forEach((item, index2) => {
  //       if (item[0].includes("-crated")) {
  //         pyramidDef[index][index2][0] = pyramidDef[index][index2][0].replaceAll('-crated', '');
  //       }
  //     })
  //   })
  // }
  // if (cratesTrue.checked == true){
  //   if (!itemName.includes("-crated")) {
  //     const itemSet = [];
  //     pyramidDef[index][index2][0].split(',').forEach((item) => {
  //       itemSet.push(item + "-crated");
  //       // pyramidDef[index][index2][0] += item + "-crated,";
  //       // console.log(pyramidDef[index][index2][0]);
  //     });
  //     pyramidDef[index][index2][0] = itemSet.join();
  //     console.log(pyramidDef[index][index2][0]);
  //     // console.log(pyramidDef[index][index2][0].split(','));
  //     // pyramidDef[index][index2][0] += "-crated";
  //   }
  // } else {
  //   if (itemName.includes("-crated")) {
  //     pyramidDef[index][index2][0].replaceAll('-crated', '');
  //     // pyramidDef[index][index2][0].replace('-crated', '');
  //     console.log(pyramidDef[index][index2][0].split(','));
  //   }
  // }
  
  // console.log(totals);
  // console.log(pyramidDef);
  pyramidDef.map((row, index) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.setAttribute('data-rowindex', index);
    if (openedPanel && (openedPanel.dataset.rowindex == index)){
      rowDiv.classList.add('active');
    }

    row.map(([CodeNames, desired], index2) => {
      // Items (including groups of items)
      let desiredCrates = desired;
      const itemNames = CodeNames.split(',');
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      itemDiv.setAttribute('data-codename', itemNames[0]);
      // const removeItemButton = document.createElement('button');
      // removeItemButton.addEventListener('click', (event) => removeItem(event, pyramidDef));
      // itemDiv.appendChild(removeItemButton);

      let total = 0;
      let totalCrates = 0;
      // console.log(itemNames)
      for (const itemName of itemNames) {
        let item = totals[itemName];
        const catalogItem = res.CATALOG.find(e=>e.CodeName == itemName.replace('-crated', ''));
        const crateAmount = catalogItem.ItemDynamicData.QuantityPerCrate

        // Fallback item definition and image
        if(!item) {
          if (!catalogItem) {
            console.error(`${itemName} missing from catalog`);
            continue;
          }
          item = {
            category: (catalogItem.ItemCategory || '').replace(/^EItemCategory::/, ''),
            name: catalogItem.DisplayName || itemName,
            CodeName: itemName,
            total: 0
          };
        }
        desiredCrates = Math.ceil(desired / crateAmount);
        total += item.total;
        totalCrates += Math.floor(total / crateAmount)
        itemDiv.classList.add(item.category);
        itemDiv.title = itemDiv.title + `${item.name} or\n`

        // Icon Image
        if( item.collection ){
          itemDiv.appendChild(item.collection[0].iconBox.canvas)
        } else {
          const fallbackImg = document.createElement('img');
          fallbackImg.src = `./foxhole/infantry-59/icons/${item.CodeName}.png`;
          fallbackImg.width = 42;
          fallbackImg.height = 42;
          fallbackImg.alt = item.name;
          fallbackImg.addEventListener('click', (event) => removeItem(event, pyramidDef));
          itemDiv.appendChild(fallbackImg);
        }
      }
      // Finish Icon Grouping
      const labelSpan = document.createElement('span');
      if (stockpiles.length == 2) { //comparing two inventories
        total = 0 - total;
        // console.log(itemDiv.title, total);
      }
      if(format === 'required'){
        labelSpan.textContent = `${desired - total}`;
      } else if(format === 'crates'){
        if(Object.values(totals).length > 1 && Object.values(totals)[0].isCrated === true){
          labelSpan.textContent = `${desired - total}`;
        } else { labelSpan.textContent = `${Math.ceil((desiredCrates - totalCrates))}c` };
      } else if(format === 'current'){
        labelSpan.textContent = `${total}`;
      } else {
        labelSpan.textContent = `${total} / ${desired}`;
      }
      labelSpan.addEventListener('click', () => {
        // document.querySelector('select[name=format]').value = 'required';
        labelSpan.setAttribute('contentEditable', true);
      });
      labelSpan.addEventListener("focusout", (event) => {
        let item = event.currentTarget.parentElement;
        let userInput = item.dataset.codename;
        pyramidDef.forEach((row) => {
          row.forEach((item, index, object) => {
            if (item.includes(userInput)){
              // console.log(object[index][1], labelSpan.innerText);
              object[index][1] = labelSpan.innerText;
            }
          });
        })
        labelSpan.blur();
      });
      itemDiv.appendChild(labelSpan);
      itemDiv.title = itemDiv.title.trim().slice(0, -2).trim();

      // Status
      if (stockpiles.length != 2) { //comparing two inventories
        if(total < desired / 4) {
          itemDiv.classList.add('depleted');
        } else if (total < desired / 2) {
          itemDiv.classList.add('low');
        } else if (total < desired) {
          itemDiv.classList.add('medium');
        } else {
          itemDiv.classList.add('full');
        }
      } else {
        document.getElementById("pyramid").classList.add('empty');
      }
      rowDiv.appendChild(itemDiv);
    });
    const selectButton = document.createElement('button');
    selectButton.classList.add('selectrow');
    selectButton.textContent = '|'
    selectButton.addEventListener("click", function(){
      // const panels = document.querySelectorAll('.row');
      if (openedPanel){
        // console.log(openedPanel, openedPanel.classList);
        const activePanels = document.querySelectorAll(".active");
        activePanels.forEach((row) => {
          row.classList.remove("active")
        })
        // openedPanel.classList.remove('active');
      }
      this.parentElement.classList.add('active');
      openedPanel = this.parentElement; 
    });
    // rowDiv.appendChild(selectButton);
    pyramid.appendChild(rowDiv);
  });
  // Pyramid  end

  const report = document.querySelector('div.report');
  report.innerHTML = '';
  for (const category of sortedCategories) {
    const keys = categories[category];
    if (!keys) {
      continue;
    }
    keys.sort(function(a, b) {
      const crateDiff = totals[b].isCrated - totals[a].isCrated;
      if (crateDiff != 0) {
        return crateDiff;
      }
      return totals[b].total - totals[a].total;
    });

    const headerPrinted = {};
    for (const key of keys) {
      const type = totals[key];
      if (!headerPrinted[type.isCrated]) {
        if (type.isCrated || (!type.isCrated && !headerPrinted[true])) {
          const columnBreak = document.createElement('div');
          columnBreak.classList.add('column-break');
          report.appendChild(columnBreak);
        }

        const cell = document.createElement('div');
        const quantity = document.createElement('div');
        cell.appendChild(quantity);

        const name = document.createElement('h3');
        const suffix = type.isCrated ? ' (crated)' : '';
        name.textContent = category.replace(/([A-Z])/g, ' $1').trim() + suffix;
        cell.appendChild(name);
        report.appendChild(cell);

        headerPrinted[type.isCrated] = true;
      }

      const cell = document.createElement('div');
      const quantity = document.createElement('div');
      quantity.textContent = type.total;
      cell.appendChild(quantity);

      //cell.appendChild(type.collection[0].iconBox.canvas);

      const name = document.createElement('div');
      name.textContent = type.name;
      cell.appendChild(name);

      report.appendChild(cell);
    }
  }
}

const removeItem = (event, pyramidDef) => {
  let item = event.currentTarget.parentElement;
  let userInput = item.dataset.codename;
  // console.log(event.currentTarget, userInput);
  item.remove();
  pyramidDef.forEach((row) => {
    row.forEach((item, index, object) => {
      if (item.includes(userInput)){
        // console.log(item, object);
        object.splice(index,1);
      }
    });
  })
  // pyramidDef.splice(itemIndex, 1);
}

export function getStockpiles() {
  return stockpiles;
}
