
import './css/index.css'
import './less/index.less'
import imgUrl from './assets/1.jpg'

import $ from 'jquery'

$(function () {
    $('li:odd').css('color', 'red')
    $('li:even').css('color', 'green')
})

var img=document.createElement('img')
img.src=imgUrl
document.body.append(img)