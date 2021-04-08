// import _ from 'lodash';

//const JSON5 = require('json5')
import * as JSON5 from 'json5';

// import UIkit

import UIkit from 'uikit';
// import Icons from 'uikit/dist/js/uikit-icons';
// UIkit.use(Icons);

// import JQUERY

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;
window.jQuery = jQuery;

// import flatpicker

import flatpickr from "flatpickr";
import { Dutch } from "flatpickr/dist/l10n/nl.js"

flatpickr.localize(Dutch);

$(() => {
    $('[data-flatpicker]').each( (i,el) => {
        let config = $(el).data('flatpicker');
        config = JSON5.parse(config);
        flatpickr(el, config);
    })
});

// import CSS

import './uikit-ext.scss';

// ready

export {UIkit, $};