var path = require('path');
var coreCss = './node_modules/@redsift/ui-rs-core/dist/css/ui-rs-core.min.css';

module.exports = function setupTask(gulp, bundles) {
  function task() {
    var dest = path.join(bundles[0].outputFolder, 'css');
    return gulp.src(coreCss)
    .pipe(gulp.dest(dest))
  }

  // NOTE: To not execute a task each time the gulpfile defines a task with
  // gulp.task('task-name', ...) in the gulpfile we return a function here,
  // which gets called eventually when executing a task via gulp.
  return task;
}
