"use strict";module.exports={validate:function(cardNumber){var calc,calc2,trimmed=String(cardNumber).replace(/[\s]/g,""),length=trimmed.length,odd=!1,total=0;if(0===length)return!0;if(!/^[0-9]+$/.test(trimmed))return!1;for(var i=length;0<i;i--){if(calc=parseInt(trimmed.charAt(i-1)),odd){switch(calc2=2*calc){case 10:calc2=1;break;case 12:calc2=3;break;case 14:calc2=5;break;case 16:calc2=7;break;case 18:calc2=9;break;default:calc2=calc2}total+=calc2}else total+=calc;odd=!odd}return 0!==total&&total%10==0}};