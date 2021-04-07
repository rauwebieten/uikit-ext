import _ from 'lodash';

// import UIkit

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

// import JQUERY

import jQuery from "jquery";

const $ = jQuery;
window.$ = $;
window.jQuery = jQuery;

// import CSS

import './uikit-ext.scss';

// ready

console.log('UIkit-ext ready :)');

export {UIkit, $, _};