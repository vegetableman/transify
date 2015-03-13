import transify from '../index.es6'
import insertCSS from 'insert-css'
import domReady from 'domready'
import domify from 'domify'
import addEventListener from 'add-event-listener'
import $ from 'queryselectorall'

const fs = require('fs')
const style = fs.readFileSync(__dirname+'/style.css', 'utf8')
insertCSS(style)

domReady(() => {
   document.body.appendChild(domify('<button id="add">Add</button>\
                                    <button id="remove">Remove</button>\
                                    <div class="example"></div>'))
   const t = transify(document.querySelector('.example'), {transitionName: 'example'})

   // Add
   addEventListener(document.getElementById('add'), 'click', () => {
       t.append(domify('<div class="child">Child</div>'))
   });

   // Remove
   addEventListener(document.getElementById('remove'), 'click', () => {
        $('.child').reverse().forEach((node, index) => {
            if (index === 0)
                t.remove(node)
        })
   });
})