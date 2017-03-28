import React, { Component } from 'react';

var lis = [];
for (var user=0; i<10; i++) {
  lis.push(<li><a href="#">{i + 1}</a></li>);
}

var Pagination = React.createClass({
  render{
    return(
      <div class="text-center">
        <ul class="pagination">
          <li><a href="#">«</a></li>
          {lis}
          <li><a href="#">»</a></li>
        </ul>
      </div>
    );
  }
});
