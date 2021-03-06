import {AssertionError} from './error';
import {buildDefaultMessage, buildTypeErrorMessage} from './utils';
import {isObject, isArray} from './types';
import {postAssertCall, _initStepDeclarator} from './assertions.utils';

function objectIsNotEmpty(expected, message = '', _isSoft = false) {
  let resulter;
  message = message ? message : buildDefaultMessage('to not be empty', expected);
  if (!isObject(expected)) {
    resulter = new TypeError(buildTypeErrorMessage('object', expected));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (expected) {
    const targetKeysList = Object.keys(expected);

    if (!targetKeysList.length) {
      resulter = new AssertionError({
        message,
        expected: ['some', 'keys', 'should', 'exist'],
        actual: targetKeysList,
        operator: 'objectIsNotEmpty'
      });
    }
  }

  postAssertCall(resulter, message, expected, _isSoft);
}

function objectIsEmpty(expected, message = '', _isSoft = false) {
  let resulter;
  message = message ? message : buildDefaultMessage('to be empty', expected);

  if (!isObject(expected)) {
    resulter = new TypeError(buildTypeErrorMessage('object', expected));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (expected) {
    const targetKeysList = Object.keys(expected);

    if (targetKeysList.length) {
      resulter = new AssertionError({
        message,
        expected: {},
        actual: expected,
        operator: 'objectIsEmpty'
      });
    }
  }
  postAssertCall(resulter, message, expected, _isSoft);
}

function objectIncludesKeys(expected, actual: string[], message = '', _isSoft = false) {
  let resulter;
  message = message ? message : buildDefaultMessage('to includes keys', expected, actual);
  if (!isObject(expected)) {
    resulter = new TypeError(buildTypeErrorMessage('object', expected));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (!isArray(actual)) {
    resulter = new TypeError(buildTypeErrorMessage('array', actual));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (expected) {
    const targetKeysList = Object.keys(expected);
    const keysList = actual.filter((expectedKey) => !targetKeysList.includes(expectedKey));
    if (keysList.length) {
      resulter = new AssertionError({
        message,
        expected: targetKeysList,
        actual,
        operator: 'objectIncludesKeys'
      });
    }
  }

  postAssertCall(resulter, message, expected, _isSoft);
}

function objectIncludesMembers(expected, actual: {[k: string]: any}, message = '', _isSoft = false) {
  let resulter;
  message = message ? message : buildDefaultMessage('to includes keys', expected, actual);
  if (!isObject(expected)) {
    resulter = new TypeError(buildTypeErrorMessage('object', expected));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (!isObject(actual)) {
    resulter = new TypeError(buildTypeErrorMessage('object', actual));
    return postAssertCall(resulter, message, expected, _isSoft);
  }
  if (expected) {

    if (!(Object.keys(actual).every((k) => Object.keys(expected).includes(k)))) {
      resulter = new AssertionError({
        message,
        expected,
        actual,
        operator: 'objectIncludesMembers'
      });
      return postAssertCall(resulter, message, expected, _isSoft);
    }
  }

  postAssertCall(resulter, message, expected, _isSoft);
}

export {
  objectIncludesKeys,
  objectIncludesMembers,
  objectIsNotEmpty,
  objectIsEmpty
};
