var NodeGit = require("../");
var Rebase = NodeGit.Rebase;
var normalizeOptions = NodeGit.Utils.normalizeOptions;
var shallowClone = NodeGit.Utils.shallowClone;

var _init = Rebase.init;
var _open = Rebase.open;
/**
 * Initializes a rebase
 * @async
 * @param {Repository} repo The repository to perform the rebase
 * @param {AnnotatedCommit} branch The terminal commit to rebase, or NULL to
 *                                 rebase the current branch
 * @param {AnnotatedCommit} upstream The commit to begin rebasing from, or NULL
 *                                   to rebase all reachable commits
 * @param {AnnotatedCommit} onto The branch to rebase onto, or NULL to rebase
 *                               onto the given upstream
 * @param {RebaseOptions} options Options to specify how rebase is performed,
 *                                or NULL
 * @param {Function} callback
 * @return {Remote}
 */
Rebase.init = function(repository, branch, upstream, onto, options) {
  var checkoutOptions;

  if (options) {
    options = shallowClone(options);
    checkoutOptions = options.checkoutOptions;
    delete options.checkoutOptions;

    options = normalizeOptions(options, NodeGit.RebaseOptions);
  } else {
    options = normalizeOptions({}, NodeGit.RebaseOptions);
    checkoutOptions = {
      checkoutStrategy: NodeGit.Checkout.STRATEGY.FORCE
    };
  }

  if (checkoutOptions) {
    options.checkoutOptions =
      normalizeOptions(checkoutOptions, NodeGit.CheckoutOptions);
  }

  return _init(repository, branch, upstream, onto, options);
};

/**
 * Opens an existing rebase that was previously started by either an invocation
 * of Rebase.open or by another client.
 * @async
 * @param {Repository} repo The repository that has a rebase in-progress
 * @param {RebaseOptions} options Options to specify how rebase is performed
 * @param {Function} callback
 * @return {Remote}
 */
Rebase.open = function(repository, options) {
  var checkoutOptions;

  if (options) {
    options = shallowClone(options);
    checkoutOptions = options.checkoutOptions;
    delete options.checkoutOptions;

    options = normalizeOptions(options, NodeGit.RebaseOptions);
  } else {
    options = normalizeOptions({}, NodeGit.RebaseOptions);
    checkoutOptions = {
      checkoutStrategy: NodeGit.Checkout.STRATEGY.SAFE
    };
  }

  if (checkoutOptions) {
    options.checkoutOptions =
      normalizeOptions(checkoutOptions, NodeGit.CheckoutOptions);
  }

  return _open(repository, options);
};
