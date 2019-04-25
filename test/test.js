var assert = require('assert'),
    request = require('request'),
    maiThaiKitchen = require("../app.js"),
    base_url = "http://localhost:3030/"

const { expect } = require('chai');

//Test the server 200
describe("Test1: for Mai_Thai Kitchen server", function() {
      //it function to write what you expect
    it("should return status code of 200", function(done)
    {
        request.get(base_url, function(error, response, body){
            //expect(response.statusCode).toBe(200);
            assert.equal(200, response.statusCode);
            maiThaiKitchen.closeServer();
            done();
        });
    })
  });

/*  describe('sample test', function () {
    it('should work', function () {
      expect(true).to.be.true;
    });
  });*/
