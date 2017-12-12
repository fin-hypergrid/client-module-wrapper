/**
 * Create wrapper strings.
 * @param {string} name - module name
 * @param {string} version - Merged into standard header and footer.
 * @param {object} [options]
 * @param {boolean} [options.isJSON] - If truthy, wraps contents in `module.exports=` and `;`.
 * @param {string} [options.header] - Custom header (typically paired with a custom footer).
 * @param {string} [options.footer] - Custom footer (typically paired with a custom header).
 * @constructor
 */
function Wrapper(name, version, options) {

    options = options || {};

    var header = options.header ||
        '(function(require, module, exports) { // ${name}@${version}\n\n' +
        (options.isJSON ? 'module.exports = ' : '');

    var footer = options.footer ||
        (options.isJSON ? ';' : '') +
        '\n\n})(fin.Hypergrid.require, fin.Hypergrid.modules, fin.Hypergrid.modules.exports = {});\n' +
        'fin.Hypergrid.modules.exports.\$\$VERSION = \'${version}\';\n' +
        'fin.Hypergrid.modules[\'${name}\'] = fin.Hypergrid.modules.exports;\n' +
        'delete fin.Hypergrid.modules.exports;\n\n';

    this.header = merge(header);
    this.footer = merge(footer);

    function merge(s) {
        return s.replace(/\$\{(\w+)\}/g, function(match, p1) { return eval(p1); });
    }
}


Wrapper.prototype.wrap = function(code) {
    return this.header + code + this.footer;
};


module.exports = Wrapper;
