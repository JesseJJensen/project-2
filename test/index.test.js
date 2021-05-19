var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

describe('App', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/').expect(200, done);
  });
});






<form method="POST" action="/faves">
    <input type="submit" value="Add to Favorites">
    <input type="hidden" name="title" value="<%= book.title %>">
    <input type="hidden" name="bookId" value="<%= book.id %>">
</form>
</li>


<p><%=book.authors%></p>
            <p><%=book.authors%></p>
            <p><%=book.publishedDate%></p>
            <p><%=book.publisher%></p>
            <p><%=book.ratingsCount%></p>
            <p><%=book.description%></p>
            <p><%=book.averageRating%></p>