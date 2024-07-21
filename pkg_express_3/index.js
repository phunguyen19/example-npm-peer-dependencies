const express = require('express');

module.exports.inspect = () => {
  console.log('Is installed express:', !!express);
};
