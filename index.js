/**
 * Create wrapper strings.
 * @param {string} name
 * @param {string} [version]
 * @constructor
 */
function Wrapper(name, version) {

    this.header = '(function(require, module, exports) { // ' + name + (version === undefined ? '' : '@' + version) + '\n\n';

    if (/-json$/.test(name)) {
        this.header += 'module.exports = ';
    }

    this.footer = '\n\n' +
        '})(fin.Hypergrid.require, fin.Hypergrid.modules, fin.Hypergrid.modules.exports = {});\n' +
        (version === undefined ? '' : 'fin.Hypergrid.modules.exports.\$\$VERSION = \'' + version + '\';\n') +
        'fin.Hypergrid.modules[\'' + name + '\'] = fin.Hypergrid.modules.exports;\n' +
        'delete fin.Hypergrid.modules.exports;\n\n';

}

module.exports = Wrapper;
