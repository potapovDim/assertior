import {isSymbol, isFunction, isAsyncFunction} from './types';

function reformatMessageArguments(argument) {
  if ((typeof argument === 'string') && argument.length === 0) {
    return argument;
  }

  let stringified = '';
  if (argument === undefined) {
    stringified = 'undefined';
  } else if (isSymbol(argument)) {
    stringified = argument.toString();
  } else if (isFunction(argument) || isAsyncFunction(argument)) {
    stringified = argument.toString();
  } else {
    stringified = JSON.stringify(argument);
  }

  if (stringified.length > 30) {
    return `${stringified.split('').splice(0, 30).join('')}...`;
  }
  return stringified;
}

function buildDefaultMessage(condition, expected, actual: any = '') {
  return `Expect that ${reformatMessageArguments(expected)} ${condition} ${reformatMessageArguments(actual)}`;
}

function isObject(argument) {
  return Object.prototype.toString.call(argument) === '[object Object]';
}


function buildTypeErrorMessage(expectedType: string, argument) {
  return `Expected argument should be a ${expectedType}, but argument is ${reformatMessageArguments(argument)}`;
}

export {
  buildDefaultMessage,
  reformatMessageArguments,
  isObject,
  buildTypeErrorMessage
};
