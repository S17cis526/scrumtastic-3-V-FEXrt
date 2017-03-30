module.exports = {
  list
};

function list(projects) {
  var table = $('<table>').addClass('table');
  var head = $('<tr>').append($('<h1>Name</h1>')).appendTo(table);
  projects.forEach(function(project){
    var row = $('<tr>').append(
      $('<td>').text(project.name)
    ).appendTo(table);
  });
  return table;
}
