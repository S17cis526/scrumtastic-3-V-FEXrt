"use strict";

module.exports = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
};

/** @function list
 * Sends a list of all projects as a JSON array.
 */
function list(req, res, db) {
  db.all("SELECT * FROM projects", [], function(err, projects){
    if(err){
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(projects));
  });
}

/** @function create
 * Creates new projects
 */
function create(req, res, db){
  var body = ""
  req.on("error", function(err){
    res.statusCode = 500
    res.end("Server Error");
  });
  req.on("data", function(data){
    body += data;
  });
  req.on("end", function(){
    var project = JSON.parse(body);
    db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?, ?, ?, ?, ?))",
      [project.name, project.description, project.version, project.repository, project.license], function(err){
          if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("Could not create");
            return;
          }
          res.statusCode = 200;
          res.end();
      });
  });
}

/**
Serves project with id
*/
function read(req, res, db){
  var id = req.params.id;
  db.get("SELECT * FROM projects WHERE id=?", [id], function(err, project){
    if(err){
      res.statusCode = 500;
      res.end();
      return;
    }
    if(!project){
      res.statusCode = 404;
      res.end("Project not found");
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(projects));
  })
}

function update(req, res, db){
    var id = req.params.id;
    var body = ""
    req.on("error", function(err){
      res.statusCode = 500
      res.end("Server Error");
    });
    req.on("data", function(data){
      body += data;
    });
    req.on("end", function(){
      var project = JSON.parse(body);
      db.run("UPDATE projects SET name=?, description=?, version=?, repository=?, license=? WHERE id=?",
        [project.name, project.description, project.version, project.repository, project.license, id], function(err){
            if(err){
              console.error(err);
              res.statusCode = 500;
              res.end("Could not update");
              return;
            }
            res.statusCode = 200;
            res.end();
        });
    });
}

function destroy(req, res, db){
  var id = req.params.id;
  db.run("DELETE FROM projects WHERE id=?", [id], function(err){
    if(err){
      res.statusCode = 500;
      res.end("Could not delete");
    }
    res.statusCode = 200;
    res.end();
  })
}
